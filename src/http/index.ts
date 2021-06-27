import { IResponseType } from '@/types/common'
import Taro from '@tarojs/taro'
import { requestInterceptor } from './interceptor'
type IType = (url: string, data?: object, otherParams?: object) => Promise<any>
type MethodType = (method: any) => IType

function mergeParams (params) {
  const defaultParams = {
    dataType: 'json',
    header:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    mode: process.env.NODE_ENV === 'development' ? 'cors' : 'no-cors'
  }
  Object.assign(params, defaultParams)
}
Taro.addInterceptor(requestInterceptor)

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