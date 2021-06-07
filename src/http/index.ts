import Taro from '@tarojs/taro'

type IType = (url: string, data?: object, otherParams?: object) => Promise<object>
type MethodType = (method: any) => IType
function mergeParams (params) {
  const defaultParams = {
    dataType: 'json',
    header:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    // cors_mode: process.env.NODE_ENV === 'development' ? '' : 'no-cors'
  }
  Object.assign(params, defaultParams)
}
const genMethod:MethodType = function (method) {
  return (url, data = {}, otherParams = {}) => {
    let _url = `http://localhost:3000${url}`
    if (method.toUpperCase() === 'POST') {
      const timestamp = +new Date()
      _url+=`?timestamp=${timestamp}`
    }
    mergeParams(otherParams)
    return Taro.request({
      url: _url,
      method: method.toUpperCase(),
      data,
      ...otherParams
    })
  }
}
const get = genMethod('get')
const post = genMethod('post')
const put = genMethod('put')
const _delete = genMethod('delete')
export default {
  get,
  post,
  put,
  delete: _delete
}