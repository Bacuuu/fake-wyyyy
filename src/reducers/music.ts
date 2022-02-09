import { PLAY, PAUSE, ADD, CLEAN, TOGGLE, UPDATE_PLAYING_SONG } from "../constants/music";
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
    // 当前播放时长
    playedTime: '00:00',
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
          playState: true,
          id: '',
          name: '',
          picUrl: '',
          authName: '',
          songLength: '00:00',
          playedTime: '00:00',
          lyric: '',
          ...action.payload
        }
      })
    // 播放
    case PLAY:
      return Object.assign({}, state, {
        musicInfo: {
          playState: true
        }
      })
    // 暂停
    case PAUSE:
      return Object.assign({}, state, {
        musicInfo: {
          playState: false
        }
      })
    // 切换歌曲
    case TOGGLE:
      return Object.assign({}, state, {
        musicInfo: {
          playState: true,
          id: action.payload.id,
          songLength: action.payload.length,
          playedTime: '00:00',
        }
      })
    // 添加歌曲
    case ADD:
      return Object.assign({}, state, {
        musicList: {
          list: [...state.musicList.list, action.payload]
        }
      })
    // 清空播放列表
    case CLEAN: 
      return Object.assign({}, state, {
        musicList: {
          list: []
        }
      })
    default:
      return state
  }
}