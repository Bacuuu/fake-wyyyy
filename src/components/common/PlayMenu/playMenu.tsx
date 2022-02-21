import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtSlider, AtFloatLayout, AtIcon } from 'taro-ui'
import styles from './index.module.scss'
import { useEffect, useState } from 'react'
import { playNewSong, seek, pause, play, toggleMode } from '@/actions/music'
import { useSelector, useDispatch } from 'react-redux'
import { IStoreType } from '@/types/store'
import { throttle } from 'lodash'
import { millMinutes2Hms, playTool, strongifyStyles } from '@/util'
import PlayList from './PlayList'
interface IProps {
  songId?: string,
  onProcessCallback?: Function,
  type?: 'mini' | 'normal'
}

const strongStyles = strongifyStyles(styles)

const playMenu = function (props:IProps) {
  // 默认mini
  props.type = props.type || 'mini'
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
  // TODO BUG throttle无效
  audioManage.onTimeUpdate(throttle(() => {
    props.onProcessCallback && props.onProcessCallback(audioManage.currentTime * 1000)
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
    props.type === 'mini'
    ?
      <View className={styles["mini-playmenu"]}>
        <View className={strongStyles("mini img-wrap")}>
          <Image src={music.musicInfo.picUrl}></Image>
        </View>
        <View className={strongStyles("mini info")}>
          <Text className={styles["name"]}>{music.musicInfo.name}</Text>
          <Text className={styles["authname"]}> - {music.musicInfo.authName}</Text>
        </View>
        <View className={strongStyles("mini operation")}>
          <View className={styles["btn-pp"]} onClick={() => music.musicInfo.playState ? dispatch(pause()) : dispatch(play())}>
            <AtIcon value={music.musicInfo.playState ? 'pause' : 'play'} size='24'></AtIcon>
          </View>
          <View className={styles["btn-playlist"]} onClick={() => toggleShowPlaylist(true)}>
            <AtIcon value='playlist' size='24'></AtIcon>
          </View>
        </View>
        <AtFloatLayout isOpened={isShowPlaylist} onClose={() => toggleShowPlaylist(false)}>
          <PlayList musicList={music.musicList} musicInfo={music.musicInfo}></PlayList>
        </AtFloatLayout>
      </View>
    :
      <View className={styles["playmenu-wrap"]}>
        <View className={styles["progress"]}>
          <Text>{ millMinutes2Hms(progressVal * 1000) }</Text>
          <AtSlider className={styles["slider"]} blockSize={16} max={Math.floor(music.musicInfo.dt / 1000)} value={progressVal} blockColor='rgba(153, 153, 153, 1)' backgroundColor='rgba(153, 153, 153, 1)' activeColor='rgba(244, 157, 158, 1)' onChange={processChange}></AtSlider>
          <Text>{music.musicInfo.songLength}</Text>
        </View>
        <View className={styles["dashboard"]}>
          <Image className={styles["outside"]} src={playModeList[music.musicList.playStatus]} onClick={() => dispatch(toggleMode())}></Image>
          <Image className={styles["inside"]} onClick={() => playTool.prev(music, dispatch)} src={require('@/assets/images/shangyiqu2.png')}></Image>
          <Image className={styles["center"]} onClick={() => music.musicInfo.playState ? dispatch(pause()) : dispatch(play())} src={music.musicInfo.playState ? require('@/assets/images/bofangzhong2.png') : require('@/assets/images/zanting2.png') }></Image>
          <Image className={styles["inside"]} onClick={() => playTool.next(music, dispatch)}  src={require('@/assets/images/xiayiqu2.png')}></Image>
          <Image className={styles["outside"]} onClick={() => toggleShowPlaylist(true)} src={require('@/assets/images/bofangliebiao2.png')}></Image>
        </View>
        <AtFloatLayout isOpened={isShowPlaylist} onClose={() => toggleShowPlaylist(false)}>
          <PlayList musicList={music.musicList} musicInfo={music.musicInfo}></PlayList>
        </AtFloatLayout>
      </View>
    
  )
}

export default playMenu