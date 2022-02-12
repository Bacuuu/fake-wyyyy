import { getLyric, getPlayUrl, getSongDetail } from '@/api/music'
import { PLAY, PAUSE, UPDATE_PLAYING_SONG, ADD, UNSHIFT, TOGGLE_PLAY_MODE, CLEAN, DELETE_ONE_IN_PLAYLIST } from '@/constants/music'
import { IMusic } from '@/types/store'
import { millMinutes2Hms } from '@/util'
import Taro from '@tarojs/taro'
const audioManage = Taro.getBackgroundAudioManager()


// 播放
export const play = () => {
  return dispatch => {
    audioManage.play()
    const time = audioManage.currentTime
    dispatch(updatePlayingSong({
      playedTime: millMinutes2Hms((time * 1000).toFixed()),
      playedDt: Math.floor(time * 1000)
    }))
    dispatch(miniPlay())
  }
}

// 暂停
export const pause = () => {
  return dispatch => {
    audioManage.pause()
    const time = audioManage.currentTime
    dispatch(updatePlayingSong({
      playedTime: millMinutes2Hms((time * 1000).toFixed()),
      playedDt: Math.floor(time * 1000)
    }))
    dispatch(miniPause())
  }
}

// 控制进度
export const seek = (params: {dt: number}) => {
  const { dt } = params
  audioManage.seek(dt)
  audioManage.paused && audioManage.play()
  return {
    type: UPDATE_PLAYING_SONG,
    payload: {
      playedTime: millMinutes2Hms(dt * 1000),
      playedDt: dt
    }
  }
}

// 切换歌曲播放模式
export const toggleMode = () => {
  return {
    type: TOGGLE_PLAY_MODE
  }
}

// 根据id播放新的歌曲
export const playNewSong = (id:string, flag?:boolean) => {
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
    Taro.playBackgroundAudio({
      dataUrl: url,
      coverImgUrl: al.picUrl,
      title: al.name
    })
    // 插入歌曲队列
    flag && dispatch(unshiftToList({
      id,
      name: al.name,
      authName: ar[0].name
    }))
    dispatch(updatePlayingSong({
      id,
      name: al.name,
      picUrl: al.picUrl,
      authName: ar[0].name,
      songLength: millMinutes2Hms(dt),
      dt,
      lyric: lyric.lrc.lyric,
      url
    }))
  }
}

// 添加歌曲到播放列表
export const addToList = (params:IMusic) => {
  return {
    type: ADD,
    payload: params
  }
}

// 头部添加到播放列表
export const unshiftToList = (params:IMusic) => {
  return {
    type: UNSHIFT,
    payload: params
  }
}

// 清空播放列表
export const cleanList = () => {
  return {
    type: CLEAN
  }
}

// 更新播放列表
export const deleteOneById = (params:{id: string}) => {
  return {
    type: DELETE_ONE_IN_PLAYLIST,
    payload: params
  }
}

const updatePlayingSong = params => {
  return {
    type: UPDATE_PLAYING_SONG,
    payload: params
  }
}

// 播放
const miniPlay = () => {
  return {
    type: PLAY
  }
}

// 暂停
const miniPause = () => {
  return {
    type: PAUSE
  }
}