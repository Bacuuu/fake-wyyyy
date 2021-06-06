import Taro from '@tarojs/taro'

type IType = (url: string, data?: object, otherParams?: object) => Promise<object>
type MethodType = (method: any) => IType
function mergeParams (params) {
  const defaultParams = {
    dataType: 'json',
    header:{},
    // cors_mode: process.env.NODE_ENV === 'development' ? '' : 'no-cors'
  }
  Object.assign(params, defaultParams)
  return params
}
const genMethod:MethodType = function (method) {
  return (url, data = {}, otherParams = {}) => {
    const _url = `http://localhost:3000${url}`
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
// const get: IType = (url, data = {}, otherParams = {}) => {
//   mergeParams(otherParams)
//   return Taro.request({
//     url,
//     method: 'GET',
//     data,
//     ...otherParams
//   })
// }
export default {
  get,
  post,
  put,
  delete: _delete
}