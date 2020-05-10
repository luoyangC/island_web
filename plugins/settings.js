const settings = {
  aliOSS: 'https://luoyangc.oss-cn-shanghai.aliyuncs.com/media/'
}

export default ({ app }, inject) => {
  inject('settings', settings)
}
