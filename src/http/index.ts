import { IResponseType } from '@/types/common'
import Taro from '@tarojs/taro'
type IType = (url: string, data?: object, otherParams?: object) => Promise<IResponseType>
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

function judgeStatusCode (statusCode) {
  if (statusCode !== 201) {
    Taro.atMessage({
      message: '',
      type: 'error'
    })
    return
  }
}

function responseInterceptor(response) {
  const { statusCode } = response
  judgeStatusCode(statusCode)
  return response
}

function requestInterceptor (chain) {
  const { requestParams } = chain
  return chain.proceed(requestParams)
    .then(responseInterceptor)
    .catch(err => console.log(err))
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