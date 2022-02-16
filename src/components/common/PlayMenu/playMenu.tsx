import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtSlider, AtFloatLayout } from 'taro-ui'
import './index.scss'
import { useEffect, useState } from 'react'
import { playNewSong, seek, pause, play, toggleMode } from '@/actions/music'
import { useSelector, useDispatch } from 'react-redux'
import { IStoreType } from '@/types/store'
import { throttle } from 'lodash'
import { millMinutes2Hms, playTool } from '@/util'
import PlayList from './PlayList'
const playMenu = function (props) {
  const playModeList = {
    'SX': require('@/assets/images/shunxubofang2.png'),
    'SJ': require('@/assets/images/suijibofang2.png'),
    'DQ': require('@/assets/images/danquxunhuan2.png'),
    'XH': require('@/assets/images/liebiaoxunhuan2.png')
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
  // 时间更新
  audioManage.onTimeUpdate(throttle(() => {
    setProgressVal(audioManage.currentTime)
  }, 1000))
  // 播放结束
  audioManage.onEnded(() => playTool.next(music, dispatch))
  // 初始化播放时间，放入redux中进行管理
  const [progressVal, setProgressVal] = useState(0)
  function processChange (event) {
    dispatch(seek({
      dt: event
    }))
    setProgressVal(event)
  }
  // 播放列表相关逻辑
  const [isShowPlaylist, toggleShowPlaylist] = useState(false)
  return (
    <View className="playmenu-wrap">
      <View className="progress">
        <Text>{ millMinutes2Hms(progressVal * 1000) }</Text>
        <AtSlider className="slider" blockSize={16} max={Math.floor(music.musicInfo.dt / 1000)} value={progressVal} blockColor='rgba(153, 153, 153, 1)' backgroundColor='rgba(153, 153, 153, 1)' activeColor='rgba(244, 157, 158, 1)' onChange={processChange}></AtSlider>
        <Text>{music.musicInfo.songLength}</Text>
      </View>
      <View className="dashboard">
        <Image className="outside" src={playModeList[music.musicList.playStatus]} onClick={() => dispatch(toggleMode())}></Image>
        <Image className="inside" onClick={() => playTool.prev(music, dispatch)} src={require('@/assets/images/shangyiqu2.png')}></Image>
        <Image className="center" onClick={() => music.musicInfo.playState ? dispatch(pause()) : dispatch(play())} src={music.musicInfo.playState ? require('@/assets/images/bofangzhong2.png') : require('@/assets/images/zanting2.png') }></Image>
        <Image className="inside" onClick={() => playTool.next(music, dispatch)}  src={require('@/assets/images/xiayiqu2.png')}></Image>
        <Image className="outside" onClick={() => toggleShowPlaylist(true)} src={require('@/assets/images/bofangliebiao2.png')}></Image>
      </View>
      <AtFloatLayout isOpened={isShowPlaylist} onClose={() => toggleShowPlaylist(false)}>
        <PlayList musicList={music.musicList} musicInfo={music.musicInfo}></PlayList>
      </AtFloatLayout>
    </View>
  )
}

export default playMenu