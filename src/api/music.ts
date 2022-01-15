import http from '@/http'

// 播放url
export const getPlayUrl = (params:{ id:String, br ?:String }) => http.post('/song/url', params)

// 获取推荐歌单
export const getGreatSheet = (params?: {cat?: String, limit?:String, before?: String}) => http.post('/top/playlist/highquality', params)

// 获取歌单tags
export const getSheetTag = () => http.post('/playlist/highquality/tags')

// 歌单详情
export const getSheetDetail = (params: {id: string, s?: number}) => http.post('/playlist/detail', params)

// 根据歌单id获取歌曲
export const getSongsBySheetId = (params: {id: string}) => http.post('/playlist/track/all', params)

// 收藏/取消收藏歌单
export const collectSheet = (params: {t: 1 | 2,id: string}) => http.post('/playlist/subscribe', params)