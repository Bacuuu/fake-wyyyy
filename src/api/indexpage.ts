import http from '@/http'

// 获取首页轮播信息
export const getIndexpageInfo:any = (params ?:Object) => http.post('/homepage/block/page', params)

// 推荐歌单
export const getRecommendSongs:any = (params ?:Object) => http.post('/personalized', params)
