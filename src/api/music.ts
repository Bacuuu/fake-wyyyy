import http from '@/http'

export const getPlayUrl = (params:{ id:String, br ?:String }) => http.post('/song/url', params)