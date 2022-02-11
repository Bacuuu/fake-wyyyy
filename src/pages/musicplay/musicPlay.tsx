import { View, Image } from "@tarojs/components"
import { useEffect, useState } from "react"
import { getSongDetail, getLyric } from '@/api/music'
import Taro, { useRouter } from "@tarojs/taro"
import { AtMessage } from "taro-ui"
import { featureDelayMsg } from '@/util'
import PlayMenu from '@/components/common/PlayMenu'
import './musicPlay.scss'
import { useSelector } from "react-redux"
import { IStoreType } from "@/types/store"
const musicPlay =  function () {
  interface Irouter {
    params: {
      songId: string
    }
  }
  const router:Irouter = useRouter()
  // const [songInfo, setSongInfo] = useState({
  //   id: '',
  //   name: '',
  //   picUrl: '',
  //   authName: ''
  // })

  const music = useSelector((state:IStoreType) => state.music)
  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: music.musicInfo.name
    })
  }, [music.musicInfo.name])
  return (
    <View className="play-wrap">
      <View className="play-board">
        <View className="board dish">
          <Image className="song-dish" src={music.musicInfo.picUrl} mode="aspectFit"></Image>
          <View className="operation">
            <Image src={require('@/assets/images/shoucang2.png')} onClick={featureDelayMsg}></Image>
            <Image src={require('@/assets/images/pinglun2.png')} onClick={featureDelayMsg}></Image>
            <Image src={require('@/assets/images/xiazai2.png')} onClick={featureDelayMsg}></Image>
          </View>
        </View>
        <View className="board lyric">

        </View>
      </View>
      <View className="play-menu">
        <PlayMenu songId={router.params.songId}></PlayMenu>
      </View>
      <AtMessage />
    </View>
  )
}

export default musicPlay