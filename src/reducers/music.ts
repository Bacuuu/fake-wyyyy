import { PLAY, PAUSE, ADD, CLEAN, UPDATE_PLAYING_SONG, UNSHIFT } from "../constants/music";
import { IStoreMusicType } from "@/types/store";
const INITIAL_STATE:IStoreMusicType = {
  // 音乐列表状态管理
  musicList: {
    // 播放歌曲
    list: [],
    // 播放顺序
    // 顺序 SX 随机 SJ 单曲 DQ
    playStatus: 'SX'
  },
  // 当前播放音乐状态
  musicInfo: {
    // 播放状态
    playState: false,
    // 歌曲id
    id: '',
    // 歌曲url
    url: '',
    // 歌曲名字
    name: '',
    // 封面图片
    picUrl: '',
    //作者名字
    authName: '',
    // 歌曲总时长
    songLength: '00:00',
    // 时长 ms
    dt: 0,
    // 当前播放时长
    playedTime: '00:00',
    // 播放的时长
    playedDt: 0,
    // 歌词
    lyric: ''
  }
}
export default function music (state = INITIAL_STATE, action) {
  switch (action.type) {
    // 更新正在播放歌曲
    case UPDATE_PLAYING_SONG:
      return Object.assign({}, state, {
        musicInfo: {
          ...state.musicInfo,
          playState: true,
          ...action.payload
        }
      })
    // 播放
    case PLAY:
      return Object.assign({}, state, {
        musicInfo: {
          ...state.musicInfo,
          playState: true
        }
      })
    // 暂停
    case PAUSE:
      return Object.assign({}, state, {
        musicInfo: {
          ...state.musicInfo,
          playState: false
        }
      })
    // 添加歌曲
    case ADD:
      return Object.assign({}, state, {
        musicList: {
          ...state.musicList,
          list: [...state.musicList.list, action.payload]
        }
      })
    // 向头部添加歌曲
    case UNSHIFT:
      return Object.assign({}, state, {
        musicList: {
          ...state.musicList,
          list: [action.payload, ...state.musicList.list]
        }
      })
    // 清空播放列表
    case CLEAN: 
      return Object.assign({}, state, {
        musicList: {
          ...state.musicList,
          list: []
        }
      })
    default:
      return state
  }
}