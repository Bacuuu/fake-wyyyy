import http from '@/http'

// 获取首页轮播信息
export const getIndexpageInfo:any = (params ?:Object) => http.post('/homepage/block/page', params)

// 推荐歌单
export const getRecommendSheet:any = (params ?:Object) => http.post('/personalized', params)

// 推荐新音乐
export const getRecommentNewSongs:any = (params ?:Object) => http.post('/personalized/newsong', params)

