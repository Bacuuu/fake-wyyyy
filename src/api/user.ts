import http from '@/http'
export const loginByPhone = (params) => {
  return http.post('/login/cellphone', params)
}

export const getUserAccount = () => {
  return http.post('/user/account')
}

export const getUserMusicInfo = () => {
  return http.post('/user/subcount')
}

export const getUserLevel = () => {
  return http.post('/user/level')
}

export const getLoginStatus = () => {
  return http.post('/login/status')
}
