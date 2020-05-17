import Api from '@/api'
import { parseTime } from '@/utils'

export default ({ app, redirect, store }, inject) => {
  const axios = app.$axios

  axios.defaults.timeout = 60 * 1000
  axios.defaults.baseURL = 'https://luoyangc.cn/api/v1'

  axios.onRequest(config => {
    const token = app.$cookies.get('token')
    if (token) config.headers.Authorization = 'JWT' + ' ' + token
    config.metadata = { startTime: new Date() }
    return config
  }, error => {
    console.log('request error :', error)
  })

  axios.onResponse(response => {
    response.config.metadata.endTime = new Date()
    response.duration = response.config.metadata.endTime - response.config.metadata.startTime
    console.log(
      '%s  %dms  %s %s params:%o data:%o  message:%s',
      parseTime(response.config.metadata.endTime),
      response.duration,
      response.config.method,
      response.config.url,
      response.config.params || {},
      response.config.data && (typeof response.config.data === 'string') ? JSON.parse(response.config.data) : {},
      response.data.message || 'ok'
    )
    if (response.config.url.includes('oss-cn-shanghai.aliyuncs.com')) {
      return Promise.resolve({ message: 'success' })
    }
    if (response.data.code === 2000) {
      return Promise.resolve(response.data)
    } else {
      !process.server && app.$message.error(response.data.message)
      switch (response.data.code) {
        case 4001:
          app.$cookies.remove('token')
          store.dispatch('logout')
          redirect('/login')
          break
        case 4003:
          redirect('/login')
          return Promise.reject({ statusCode: 403, message: response.data.message })
        case 4004:
          return Promise.reject({ statusCode: 404, message: response.data.message })
        default:
          return Promise.reject(null)
      }
    }
  })

  axios.onError(err => {
    return Promise.reject(err)
  })

  // 注册api
  inject('api', Api(app.$axios))
}
