import http from '@/http'
export const loginByPhone = (params) => {
  return http.post('/login/cellphone', params)
}

export const getLoginStatus = () => {
  return http.post('/login/status')
}
