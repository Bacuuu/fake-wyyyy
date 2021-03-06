import http from '@/http'

// 登录
export const loginByPhone = (params) => {
  return http.post('/login/cellphone', params)
}

// 登出
export const logout = () => {
  return http.post('/logout')
}

// 用户账号信息
export const getUserAccount = () => {
  return http.post('/user/account')
}

// 获取用户是否签到
export const getUserCheckinStatus = () => {
  return http.post('/signin/progress')
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

// 签到
export const dailySignin = () => {
  return http.post('/daily_signin')
}

// 推荐歌单（登录）
export const getUserRecommendSheet = (params ?:Object) => http.post('/recommend/resource', params)

// 获取用户歌单，创建的和收藏的都在里面了
export const getUserSheet = (params: {uid: number, limit?: number, offset?: number}) => http.post('/user/playlist', params)
