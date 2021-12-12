import http from '@/http'

export const getIndexpageInfo:any = (params ?:Object)=> http.post('/homepage/block/page', params)