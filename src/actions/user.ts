import {
  UPDATE,
  RESET
} from '@/constants/user'
import { loginByPhone, getLoginStatus } from '@/api/user'
import Taro from '@tarojs/taro'

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

export const login = ({ phone, password }: {phone: number, password: string}) => {
  return async dispatch => {
    const res:any = await loginByPhone({
      phone,
      password
    })
    res.iStatus && dispatch(update(res.data))
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