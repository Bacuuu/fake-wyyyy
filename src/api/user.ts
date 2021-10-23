import http from '@/http'
export const loginByPhone = (params) => {
  return http.post('/login/cellphone', params)
}

// 用户账号信息
export const getUserAccount = () => {
  return http.post('/user/account')
}

// 获取用户信息 , 歌单，收藏，mv, dj 数量
export const getUserMusicInfo = () => {
  return http.post('/user/subcount')
}

// 等级信息
export const getUserLevel = () => {
  return http.post('/user/level')
}

// 登录状态
export const getLoginStatus = () => {
  return http.post('/login/status')
}
