import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtSlider } from 'taro-ui'
import './index.scss'
import { useEffect, useState } from 'react'
import { playNewSong, seek, pause, play } from '@/actions/music'
import { useSelector, useDispatch } from 'react-redux'
import { IStoreType } from '@/types/store'
import { throttle } from 'lodash'
import { millMinutes2Hms } from '@/util'
const playMenu = function (props) {
  const music = useSelector((state:IStoreType) => state.music)
  const dispatch = useDispatch()
  // 根据歌曲id初始化播放
  useEffect(() => {
    if (!props.songId) return
    dispatch(playNewSong(props.songId))
  }, [props.songId])
  // 初始化播放时间，放入redux中进行管理，但是对于播放进度状态并非实时更新
  // 对于正常的播放来说，组件内使用定时器独自进行更新
  // 只有暂停，播放，拖动进度操作时，才会和redux进行同步
  const [progressVal, setProgressVal] = useState(0)
  function processChange (event) {
    dispatch(seek({
      dt: event
    }))
    setProgressVal(event)
  }
  // 播放状态
  // const [playStatus, setPlayStatus] = useState(false)
  // let interval:any = null
  useEffect(() => {
    const audioManage = Taro.getBackgroundAudioManager()
    audioManage.onTimeUpdate(throttle(() => {
      setProgressVal(audioManage.currentTime)
    }, 1000))
  }, [])
  return (
    <View className="playmenu-wrap">
      <View className="progress">
        <Text>{ millMinutes2Hms(progressVal * 1000) }</Text>
        <AtSlider className="slider" blockSize={16} max={Math.floor(music.musicInfo.dt / 1000)} value={progressVal} blockColor='rgba(153, 153, 153, 1)' backgroundColor='rgba(153, 153, 153, 1)' activeColor='rgba(244, 157, 158, 1)' onChange={processChange}></AtSlider>
        <Text>{music.musicInfo.songLength}</Text>
      </View>
      <View className="dashboard">
        <Image className="outside" src={require('@/assets/images/liebiaoxunhuan2.png')}></Image>
        <Image className="inside" src={require('@/assets/images/shangyiqu2.png')}></Image>
        <Image className="center" onClick={() => music.musicInfo.playState ? dispatch(pause()) : dispatch(play())} src={music.musicInfo.playState ? require('@/assets/images/bofangzhong2.png') : require('@/assets/images/zanting2.png') }></Image>
        <Image className="inside" src={require('@/assets/images/xiayiqu2.png')}></Image>
        <Image className="outside" src={require('@/assets/images/bofangliebiao2.png')}></Image>
      </View>
    </View>
  )
}

export default playMenu