import { View, Image, Text } from "@tarojs/components"
import { useEffect, useState } from "react"
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

  const music = useSelector((state:IStoreType) => state.music)
  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: music.musicInfo.name
    })
  }, [music.musicInfo.name])
  // 'dish' 碟片  | 'lyric' 歌词
  const [displayMode, setDisplayMode] = useState('dish')
  // 歌词
  const [formatedLyric, setFormatedLyric] = useState([] as Array<Array<string>>)
  // 处理歌词
  useEffect(() => {
    const lyricList = music.musicInfo.lyric.split('\n')
    const reg = /\[[0-9]+:[0-9]+.[0-9]+\]/i
    setFormatedLyric(lyricList.map(i => {
      const _time = reg.exec(i)
      let res = ['', '']
      if (_time) {
        res = [_time[0], i.replace(reg, '')]
      } else {
        res = ['', i]
      }
      return res
    }))
  }, [music.musicInfo.lyric])
  return (
    <View className="play-wrap">
      <View className="play-board">
        <View
          className={"board dish " + (displayMode === 'dish' ? 'is-active' : '')}
          onClick={() => setDisplayMode('lyric')}>
          <Image className="song-dish" src={music.musicInfo.picUrl} mode="aspectFit"></Image>
          <View className="operation">
            <Image src={require('@/assets/images/shoucang2.png')} onClick={featureDelayMsg}></Image>
            <Image src={require('@/assets/images/pinglun2.png')} onClick={featureDelayMsg}></Image>
            <Image src={require('@/assets/images/xiazai2.png')} onClick={featureDelayMsg}></Image>
          </View>
        </View>
        <View
          className={"board lyric " + (displayMode === 'lyric' ? 'is-active' : '')}
          onClick={() => setDisplayMode('dish')}>
          <View className="lyric-block">
            {formatedLyric.map(i => {
              return (
                <Text className="lyric-item">{i[1]}</Text>
              )
            })}
          </View>
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