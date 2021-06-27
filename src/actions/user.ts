import {
  UPDATE,
  RESET
} from '@/constants/user'
import Taro from '@tarojs/taro'
import { AtMessage } from 'taro-ui'
import { loginByPhone, getUserAccount, getUserLevel, getUserMusicInfo, getLoginStatus } from '@/api/user'
import { filterBeforeMergeResponse } from '@/util'

export const update = (params) => {
  return {
    type: UPDATE,
    payload: params
  }
}
export const reset = () => {
  return {
    type: RESET
  }
}

export const login = ({ phone, password }: {phone: number | string, password: string}) => {
  return async dispatch => {
    const res = await loginByPhone({
      phone,
      password
    })
    if (res.code !== 200) {
      const err = res.message || res.msg || '登录错误'
      Taro.atMessage({
        message: err,
        type: 'error'
      })
      throw Error(err)
    }
    Taro.atMessage({
      message: '登录成功',
      type: 'success'
    })
    const promiseList = [
    getUserAccount(),
    getUserLevel(),
    getUserMusicInfo()]
    const userInfo = {
      account: null,
      level: null,
      musicinfo: null
    }
    Promise.all(promiseList)
      .then(r => {
        if (r.some(i => i.code !== 200)) {
          Taro.atMessage({
            message: '获取部分用户信息失败',
            type: 'warning'
          })
        }
        console.log(r)
        userInfo.account = filterBeforeMergeResponse(r[0])
        userInfo.level = filterBeforeMergeResponse(r[1])
        userInfo.musicinfo = filterBeforeMergeResponse(r[2])
      })
    res.iStatus && dispatch(update(userInfo))
  }
}

export const loginStatus = () => {
  return async dispatch => {
    const res:any = await getLoginStatus()
    console.log(res)
  }
}

// export const fetchUserInfo = () => {
//   return async dispatch => {
//     Taro.showLoading()
//     const res:IResponseType = await http.get('/search?keywords=badguy')
//     Taro.hideLoading()
//     dispatch(update(res.data))
//   }
// }
// 异步的 action
export function asyncAdd () {
  return dispatch => {
    setTimeout(() => {
      dispatch(update(123))
    }, 2000)
  }
}