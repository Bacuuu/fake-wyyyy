import { View, Image } from "@tarojs/components"
import { useEffect, useState } from "react"
import { getSongDetail, getLyric, getPlayUrl } from '@/api/music'
import Taro, { useRouter } from "@tarojs/taro"
import { AtMessage } from "taro-ui"
import { featureDelayMsg } from '@/util'
import PlayMenu from '@/components/common/PlayMenu'
import './musicPlay.scss'
const musicPlay =  function () {
  interface Irouter {
    params: {
      songId: string
    }
  }
  const router:Irouter = useRouter()
  const [songInfo, setSongInfo] = useState({
    id: '',
    name: '',
    picUrl: '',
    authName: ''
  })

  useEffect(() => {
    getSongDetail({ids: router.params.songId})
      .then(r => {
        const { al, ar } = r.songs[0]
        setSongInfo({
          id: router.params.songId,
          name: al.name,
          picUrl: al.picUrl,
          authName: ar[0].name
        })
        Taro.setNavigationBarTitle({
          title: al.name
        })
      })
    getLyric({id: router.params.songId})
    getPlayUrl({
      id: router.params.songId
    })
  }, [])
  return (
    <View className="play-wrap">
      <View className="play-board">
        <View className="board dish">
          <Image className="song-dish" src={songInfo.picUrl} mode="aspectFit"></Image>
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
        <PlayMenu></PlayMenu>
      </View>
      <AtMessage />
    </View>
  )
}

export default musicPlay