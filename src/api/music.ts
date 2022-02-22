import http from '@/http'

// 播放url
export const getPlayUrl = (params:{ id:String, br ?:String }) => http.post('/song/url', params)

// 获取无损url，使非 VIP 账号获取这些歌曲的无损音频
export const getPerfectPlayUrl = (params:{ id:String, br ?:String }) => http.post('/song/download/url', params)

// 获取歌词
export const getLyric = (params: {id: String}) => http.post('/lyric', params)

// 获取歌曲详情
export const getSongDetail = (params: {ids: String}) => http.post('/song/detail', params)

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

// 获取搜索热词
export const getSearchHotWords = () => http.post('/search/hot')

// 搜索建议，type=mobile适用
export const getSearchSuggestion = (params: {keywords: string, type?: 'mobile'}) => http.post('/search/suggest', params)

// 搜索
export const serach =  (params:{keywords:string, limit?:number, offset?:number, type?:number}) => http.post('/search', params)