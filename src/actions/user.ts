import {
  UPDATE,
  RESET
} from '@/constants/user'
import { loginByPhone } from '@/api/user'
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

export const login = ({ phone, password }: {phone: number, password: number}) => {
  return async dispatch => {
    Taro.showLoading()
    const res:any = await loginByPhone({
      phone,
      password
    })
    Taro.hideLoading()
    res.iStatus && dispatch(update(res.data))
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