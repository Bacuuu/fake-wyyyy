import http from '@/http'
export const loginByPhone = (params) => {
  return http.post('/login/cellphone', params)
}