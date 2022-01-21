import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { getPlayUrl } from '@/api/music'
import { AtSlider } from 'taro-ui'
import './index.scss'
import { useEffect } from 'react'
const playMenu = function (props) {
  const musicPlay = function (id) {
    getPlayUrl({id}).then(r => {
        Taro.playBackgroundAudio({
          dataUrl: r.data[0].url
        })
      })
  }
  useEffect(() => {
    if (!props.songId) return
    musicPlay(props.songId)
  }, [props.songId])
  return (
    <View className="playmenu-wrap">
      <View className="progress">
        <Text>12:13</Text>
        <AtSlider className="slider" blockSize={16} blockColor='rgba(153, 153, 153, 1)' backgroundColor='rgba(153, 153, 153, 1)' activeColor='rgba(244, 157, 158, 1)'></AtSlider>
        <Text>45:12</Text>
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