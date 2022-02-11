import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtSlider } from 'taro-ui'
import './index.scss'
import { useEffect, useState } from 'react'
import { playNewSong, seek, pause, play, toggleMode } from '@/actions/music'
import { useSelector, useDispatch } from 'react-redux'
import { IStoreType } from '@/types/store'
import { throttle } from 'lodash'
import { millMinutes2Hms } from '@/util'
const playMenu = function (props) {
  const playModeList = {
    'SX': require('@/assets/images/shunxubofang2.png'),
    'SJ': require('@/assets/images/suijibofang2.png'),
    'DQ': require('@/assets/images/danquxunhuan2.png')
  }
  const music = useSelector((state:IStoreType) => state.music)
  const dispatch = useDispatch()
  // 根据歌曲id初始化播放
  useEffect(() => {
    if (!props.songId) return
    const ids = music.musicList.list.map(i => i.id)
    let flag = false
    // 不存在
    if (ids.indexOf(props.songId) === -1) {
      flag = true
    }
    dispatch(playNewSong(props.songId, flag))
  }, [props.songId])
  const audioManage = Taro.getBackgroundAudioManager()
  audioManage.onTimeUpdate(throttle(() => {
    setProgressVal(audioManage.currentTime)
  }, 1000))
  audioManage.onEnded(() => {
    const idx = music.musicList.list.findIndex(i => i.id === music.musicInfo.id)
    switch (music.musicList.playStatus) {
      // 顺序
      case 'SX':
        // 已经是最后一个
        if (music.musicList.list.length + 1 === idx) {
          break
        }
        const { id } = music.musicList.list[idx + 1]
        dispatch(playNewSong(id))
        break;
      // 随机
      case 'SJ':
        const length = music.musicList.list.length
        let next = idx
        while (idx === next) {
          next = Math.ceil(Math.random() * length)
        }
        const _id = music.musicList.list[next].id
        dispatch(playNewSong(_id))
        break;
      // 单曲
      case 'DQ':
        dispatch(playNewSong(music.musicInfo.id))
        break;
      default:
        break;
    }
  })
  // 初始化播放时间，放入redux中进行管理
  const [progressVal, setProgressVal] = useState(0)
  function processChange (event) {
    dispatch(seek({
      dt: event
    }))
    setProgressVal(event)
  }
  return (
    <View className="playmenu-wrap">
      <View className="progress">
        <Text>{ millMinutes2Hms(progressVal * 1000) }</Text>
        <AtSlider className="slider" blockSize={16} max={Math.floor(music.musicInfo.dt / 1000)} value={progressVal} blockColor='rgba(153, 153, 153, 1)' backgroundColor='rgba(153, 153, 153, 1)' activeColor='rgba(244, 157, 158, 1)' onChange={processChange}></AtSlider>
        <Text>{music.musicInfo.songLength}</Text>
      </View>
      <View className="dashboard">
        <Image className="outside" src={playModeList[music.musicList.playStatus]} onClick={() => dispatch(toggleMode())}></Image>
        <Image className="inside" src={require('@/assets/images/shangyiqu2.png')}></Image>
        <Image className="center" onClick={() => music.musicInfo.playState ? dispatch(pause()) : dispatch(play())} src={music.musicInfo.playState ? require('@/assets/images/bofangzhong2.png') : require('@/assets/images/zanting2.png') }></Image>
        <Image className="inside" src={require('@/assets/images/xiayiqu2.png')}></Image>
        <Image className="outside" src={require('@/assets/images/bofangliebiao2.png')}></Image>
      </View>
    </View>
  )
}

export default playMenu