import { getLyric, getPlayUrl, getSongDetail } from '@/api/music'
import { PLAY, PAUSE, TOGGLE, UPDATE_PLAYING_SONG } from '@/constants/music'
import { millMinutes2Hms } from '@/util'
import Taro from '@tarojs/taro'
const audioManage = Taro.getBackgroundAudioManager()
// 播放
export const play = params => {
  audioManage.play()
  return {
    type: PLAY,
    payload: params
  }
}

//暂停
export const pause = params => {
  audioManage.pause()
  return {
    type: PAUSE,
    payload: params
  }
}

export const playNewSong = id => {
  return async dispatch => {
    const detail = await getSongDetail({
      ids: id
    })
    const lyric = await getLyric({
      id
    })
    const { data } = await getPlayUrl({
      id
    })
    const url = data[0].url
    const {al = {}, ar = [{}], dt = 0} = detail.songs[0]
    dispatch(updatePlayingSong({
      id,
      name: al.name,
      picUrl: al.picUrl,
      authName: ar[0].name,
      songLength: millMinutes2Hms(dt),
      lyric: lyric.lrc.lyric,
      url
    }))
  }
}

export const updatePlayingSong = params => {
  return {
    type: UPDATE_PLAYING_SONG,
    payload: params
  }
}

// 切换歌曲
export const toggleSong = (params: {id: string, length: string}) => {
  
  return {
    type: TOGGLE,
    payload: params
  }
}