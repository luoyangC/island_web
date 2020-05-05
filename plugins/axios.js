import qs from 'qs'
import Api from '@/api'
import { parseTime } from '@/utils'

export default ({ app }, inject) => {
  const axios = app.$axios

  axios.defaults.timeout = 5000
  axios.defaults.baseURL = 'https://luoyangc.cn/api/v1'

  axios.onRequest(config => {
    const token = app.$cookies.get('token')
    if (token) config.headers.Authorization = 'JWT' + ' ' + token
    config.metadata = { startTime: new Date() }
    config.data = qs.stringify(config.data, { allowDots: true })
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
      response.config.data && JSON.parse(response.config.data) || {},
      response.data.message || 'ok'
    )
    return Promise.resolve(response)
  })

  axios.onError(err => {
    err.config.metadata.endTime = new Date()
    err.duration = err.config.metadata.endTime - err.config.metadata.startTime
    console.log(
      '%s  %dms  %s %s params:%o data:%o  message:%s',
      parseTime(err.config.metadata.endTime),
      err.duration < 100 ? '0' + err.duration : err.duration,
      err.config.method,
      err.config.url,
      err.config.params || {},
      err.config.data && JSON.parse(err.config.data) || {},
      err.response && err.response.status || '未知错误'
    )
    return Promise.reject(err.response)
  })

  // 注册api
  inject('api', Api(app.$axios))
}
