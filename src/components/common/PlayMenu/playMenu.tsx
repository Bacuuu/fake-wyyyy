import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { getPlayUrl } from '@/api/music'
import { AtSlider } from 'taro-ui'
import './index.scss'
import { useEffect, useState } from 'react'
import { playNewSong } from '@/actions/music'
import { useSelector, useDispatch } from 'react-redux'
import { IStoreType } from '@/types/store'
const playMenu = function (props) {
  const music = useSelector((state:IStoreType) => state.music)
  const dispatch = useDispatch()
  // 根据歌曲id初始化播放
  useEffect(() => {
    if (!props.songId) return
    dispatch(playNewSong(props.songId))
    console.log(music)
  }, [props.songId])
  // 初始化播放时间，放入redux中进行管理，但是对于播放进度状态并非实时更新
  // useState
  return (
    <View className="playmenu-wrap">
      <View className="progress">
        <Text>{music.musicInfo.playedTime}</Text>
        <AtSlider className="slider" blockSize={16} blockColor='rgba(153, 153, 153, 1)' backgroundColor='rgba(153, 153, 153, 1)' activeColor='rgba(244, 157, 158, 1)'></AtSlider>
        <Text>{music.musicInfo.songLength}</Text>
      </View>
      <View className="dashboard">
        <Image className="outside" src={require('@/assets/images/liebiaoxunhuan2.png')}></Image>
        <Image className="inside" src={require('@/assets/images/shangyiqu2.png')}></Image>
        <Image className="center" src={require('@/assets/images/zanting2.png')}></Image>
        <Image className="inside" src={require('@/assets/images/xiayiqu2.png')}></Image>
        <Image className="outside" src={require('@/assets/images/bofangliebiao2.png')}></Image>
      </View>
    </View>
  )
}

export default playMenu