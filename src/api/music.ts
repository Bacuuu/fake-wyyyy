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
export const doSearch =  (params:{keywords:string, limit?:number, offset?:number, type?:number}) => http.post('/search', params)

/**
 * 顶层评论
 * @param params 
 * type: 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型
    0: 歌曲
    1: mv
    2: 歌单
    3: 专辑
    4: 电台
    5: 视频
    6: 动态

  * sortType: 排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序

  * cursor: 当sortType为 3 时且页数不是第一页时需传入,值为上一条数据的 time
 * @returns 
 */
export const getTopComment = (params:{id:string, type:number, pageNo?:number, pageSize?:number, sortType?:number, cursor?:string}) => http.post('/comment/new', params)

// 楼内评论
export const getFloorComment = (params:{parentCommentId:string, id:string, type:number | string}) => http.post('/comment/floor', params)

/**
 * 给评论点赞
 * @param params 
 * id : 资源 id, 如歌曲 id,mv id
 * 
 * cid : 评论 id
 * 
 * t : 是否点赞 , 1 为点赞 ,0 为取消点赞
 * 
 * type: 数字 , 资源类型 , 对应歌曲 , mv, 专辑 , 歌单 , 电台, 视频对应以下类型
    0: 歌曲
    1: mv
    2: 歌单
    3: 专辑
    4: 电台
    5: 视频
    6: 动态
 */
export const toggleCommentLike = (params:{id:string, cid:string, t:1 | 0, type:number}) => http.post('/comment/like', params)

// 增加/删除评论
/**
 * 
 * @param params 
 * t 0 删除 1 发送, 2 回复
 * type 0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台 5: 视频 6: 动态
 * id:对应资源 id
 * content 要发送的内容
 * commentId 回复的评论 id (回复评论时必填)
 * @returns 
 */
export const hackComment = (params:{t:number, type:number, id:string, content:string, commentId?:string}) => http.post('/comment', params)