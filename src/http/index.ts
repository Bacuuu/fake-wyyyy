import { IResponseType } from '@/types/common'
import Taro from '@tarojs/taro'
type IType = (url: string, data?: object, otherParams?: object) => Promise<IResponseType>
type MethodType = (method: any) => IType
type SwitchType = 'on' | 'off'
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

function judgeStatusCode (status, errMsg) {
  if (status !== 200) {
    Taro.atMessage({
      message: errMsg || '调用服务错误',
      type: 'error'
    })
    throw Error('服务状态错误')
  }
}
const changeLoading = (function () {
  const timer: any = null;
  return function (sw: SwitchType) {
    timer && clearTimeout(timer)
    if (sw === 'on') {
      Taro.showLoading()
    } else if(sw === 'off') {
      setTimeout(() => {
        Taro.hideLoading()
      }, 200);
    }
  }
})()
function responseInterceptor(response) {
  const { statusCode, errMsg } = response
  changeLoading('off')
  judgeStatusCode(statusCode, errMsg)
  return {
    ...response,
    iStatus: true
  }
}

function responseErrInterceptor(response) {
  const { statusText } = response
  Taro.atMessage({
    type: 'error',
    message: statusText || '调用服务错误'
  })
  return {
    ...response,
    iStatus: false
  }
}
function requestInterceptor (chain) {
  const { requestParams } = chain
  changeLoading('on')
  return chain.proceed(requestParams)
    .then(responseInterceptor)
    .catch(responseErrInterceptor)
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