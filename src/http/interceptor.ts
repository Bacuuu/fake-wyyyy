import Taro from '@tarojs/taro'
import qs from 'qs'
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
    console.log(`序列化cookie:${cookie}出错`, error)
    return {}
  }
}



function mergeCookie (defaultcookie:string, setCookie:string):string {
  const defaultCookieObj = qs.parse(defaultcookie)
  const setCookieObj = qs.parse(setCookie)
  return qs.stringify({
    ...defaultCookieObj,
    ...setCookieObj
  })
}

function requestInterceptor (chain) {
  const { requestParams } = chain
  console.log(requestParams)
  requestParams.header.Cookie = Taro.getStorageSync('cookie')
  changeLoading('on')
  return chain.proceed(requestParams)
    .then(responseSuccessInterceptor)
    .catch(responseErrInterceptor)
}

const responseSuccessInterceptor = function (response) {
  const { statusCode, errMsg, cookies } = response
  // if (cookies) {
  const setCookie = response.header['Set-Cookie']
  Taro.setStorageSync('cookie', mergeCookie(setCookie, cookies))
  // }
  // response.header['Set-Cookie'] = 'a=323;'
  changeLoading('off')
  // console.log(response)
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
export {
  requestInterceptor,
}