import { getLyric, getPlayUrl, getSongDetail } from '@/api/music'
import { PLAY, PAUSE, UPDATE_PLAYING_SONG } from '@/constants/music'
import { millMinutes2Hms } from '@/util'
import Taro from '@tarojs/taro'
const audioManage = Taro.getBackgroundAudioManager()
// audioManage.onTimeUpdate(throttle(() => {
//   console.log(audioManage.currentTime)
// }, 1000))

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

// 播放
const miniPlay = () => {
  return {
    type: PLAY
  }
}

//暂停
const miniPause = () => {
  return {
    type: PAUSE
  }
}

// 控制进度
export const seek = (params: {dt: number}) => {
  const { dt } = params
  audioManage.seek(dt)
  audioManage.play()
  return {
    type: UPDATE_PLAYING_SONG,
    payload: {
      playedTime: millMinutes2Hms(dt * 1000),
      playedDt: dt
    }
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
    Taro.playBackgroundAudio({
      dataUrl: url,
      coverImgUrl: al.picUrl,
      title: al.name
    })
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

export const updatePlayingSong = params => {
  return {
    type: UPDATE_PLAYING_SONG,
    payload: params
  }
}
