import {
  ADD,
  RESET
} from '../constants/user'

export const add = () => {
  return {
    type: ADD
  }
}
export const reset = () => {
  return {
    type: RESET
  }
}

// 异步的 action
export function asyncAdd () {
  return dispatch => {
    setTimeout(() => {
      dispatch(add())
    }, 2000)
  }
}