import Taro from '@tarojs/taro'
import qs from 'qs'
/**
 * 改变全局loading的状态，关闭时会延迟200ms再关闭，如果期间又调用on，则取消关闭定时器，避免闪一下
 * @param sw on | off
 */
const changeLoading = (function () {
  const timer: any = null;
  return function (sw: 'on' | 'off') {
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

/**
 * 对响应返回的statusCode进行判断处理
 * @param status 
 * @param errMsg 
 */
function judgeStatusCode (status, errMsg) {
  if (status !== 200) {
    Taro.atMessage({
      message: errMsg || '调用服务错误',
      type: 'error'
    })
    throw Error('服务状态错误')
  }
}

function parseCookie (cookie: string):object {
  const cookieList = cookie.split(';')
  const cookieObj = {}
  try {
    cookieList.forEach(i => {
      if (i.includes('=')) {
        const kv =  i.split('=');
        cookieObj[kv[0]] = kv[1]
      } else {
        return true
      }
    })
    return cookieObj
  } catch (error) {
    console.error(`序列化cookie:${cookie}出错`, error)
    return {}
  }
}

/**
 * 
 * @param cookieObj 由于cookie中的Max-age | Path | Expires不是cookie实际的值，所以携带cookie时进行过滤
 * @returns 已经过滤的cookie
 */
function cookieFilter (cookieObj: Object) {
  const _cookieObj = {}
  Object.entries(cookieObj).map(([k, v]) => {
    const reg = /Max-Age|Path|Expires/
    if (!reg.test(k)) {
      _cookieObj[k] = v
    }
  })
  return _cookieObj
}
/**
 * 对已有的cookie和新的cookie进行合并，新的会覆盖以前的
 * @param defaultcookie 以前的cookie
 * @param setCookie 需要新设置的cookie
 * @returns 设置后的cookie
 */
function mergeCookie (defaultcookie:string, setCookie:string):string {
  let defaultCookieObj = qs.parse(defaultcookie, { delimiter: ';' })
  let setCookieObj = qs.parse(setCookie, { delimiter: ';' })
  defaultCookieObj = cookieFilter(defaultCookieObj)
  setCookieObj = cookieFilter(setCookieObj)
  return qs.stringify({
    ...defaultCookieObj,
    ...setCookieObj
  }, {
    encode: false,
    delimiter: ';'
  })
}

/**
 * 响应拦截器
 * @param chain 请求对象数据
 * @returns 处理后的请求
 */
function requestInterceptor (chain) {
  const { requestParams } = chain
  console.log(Taro.getStorageSync('cookie'))
  requestParams.header.Cookie = Taro.getStorageSync('cookie')
  // requestParams.header.Cookie = 'ahaddddd'
  changeLoading('on')
  return chain.proceed(requestParams)
    .then(responseSuccessInterceptor)
    .catch(responseErrInterceptor)
}


/**
 * 正常响应时的响应拦截器
 * @param response 响应对象
 * @returns 处理后的响应
 */
const responseSuccessInterceptor = function (response) {
  // 这里取到的cookies就是setCookie的val，数组、多个cookie
  const { statusCode, errMsg, cookies }:
  {statusCode: number, errMsg: string, cookies: string[]} = response
  const defaultCookie = Taro.getStorageSync('cookie')
  // if (cookies) {
  Taro.setStorageSync('cookie', mergeCookie(defaultCookie, cookies.join('')))
  // }
  // response.header['Set-Cookie'] = 'a=323;'
  changeLoading('off')
  judgeStatusCode(statusCode, errMsg)
  return {
    ...response,
    iStatus: true
  }
}

/**
 * 请求出错时的响应拦截器
 * @param response 响应对象
 * @returns 处理后的响应对象
 */
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
export {
  requestInterceptor,
}