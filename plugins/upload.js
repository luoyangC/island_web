import { randomString } from '@/utils'

export default ({ app }, inject) => {
  const Upload = async(file, params = {}) => {
    const { data: oss } = await app.$api.getUploadToken()
    const formData = new FormData()
    const fileKey = oss.dir + randomString(20) + file.name
    formData.append('key', fileKey)
    formData.append('policy', oss.policy)
    formData.append('OSSAccessKeyId', oss.accessid)
    formData.append('success_action_status', 200)
    formData.append('signature', oss.signature)
    formData.append('file', file)
    for (const key in params) {
      formData.append(key, params[key])
    }
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    await app.$api.uploadToAliOSS(oss.host, formData, config)

    return oss.host + fileKey
  }
  inject('upload', Upload)
}
