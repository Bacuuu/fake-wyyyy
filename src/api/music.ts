import http from '@/http'

// 播放url
export const getPlayUrl = (params:{ id:String, br ?:String }) => http.post('/song/url', params)

// 获取推荐歌单
export const getGreatSheet = (params?: {cat?: String, limit?:String, before?: String}) => http.post('/top/playlist/highquality', params)

// 获取歌单tags
export const getSheetTag = () => http.post('/playlist/highquality/tags')