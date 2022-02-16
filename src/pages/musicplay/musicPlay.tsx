import { View, Image, Text } from "@tarojs/components"
import { useEffect, useState } from "react"
import Taro, { useRouter } from "@tarojs/taro"
import { AtMessage } from "taro-ui"
import { featureDelayMsg, mmssSSS2millMinutes } from '@/util'
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
  const query = Taro.createSelectorQuery()
  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: music.musicInfo.name
    })
  }, [music.musicInfo.name])
  // 'dish' 碟片  | 'lyric' 歌词
  const [displayMode, setDisplayMode] = useState('dish')
  // 歌词
  // [[timing], [readLyric]]
  const [formatedLyric, setFormatedLyric] = useState([[], []] as [Array<number>, Array<string>])
  // 歌词模块dom的高度信息
  const [lyricheight, setLyricheight] = useState(0)
  // 当前时间HH:mm:ss
  const [processTime, setProcessTime] = useState('00:00:00')
  // 处理歌词
  useEffect(() => {
    const lyricList = music.musicInfo.lyric.split('\n')
    const reg = /\[[0-9]+:[0-9]+.[0-9]+\]/i
    const res = [[], []] as [Array<number>, Array<string>]
    lyricList.forEach(i => {
      const _time = reg.exec(i)
      if (_time) {
        // 去除 [ ]
        res[0].push(mmssSSS2millMinutes(_time[0].slice(1, -1)))
        res[1].push(i.replace(reg, ''))
      } else {
        res[0].push(0)
        res[1].push(i)
      }
    })
    setFormatedLyric(res)
    query.select('.play-board')
    .boundingClientRect()
    .exec(res => {
      setLyricheight(res.height)
    })
  }, [music.musicInfo.lyric])
  // 进度更新回调，拿到毫秒
  const processCb = function (e) {
    if(processTime === e) return
    setProcessTime(e)
    const index = formatedLyric[0].indexOf(e)
    if (index !== -1) {
      console.log(index)
    }
  }
  // 非实时更新 做不了这个事情
  // useEffect(() => {

  // }, [music.musicInfo.playedDt])
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
            {formatedLyric[1].map(i => {
              return (
                <Text className="lyric-item">{i}</Text>
              )
            })}
          </View>
        </View>
      </View>
      <View className="play-menu">
        <PlayMenu songId={router.params.songId} onProcessCallback={processCb}></PlayMenu>
      </View>
      <AtMessage />
    </View>
  )
}

export default musicPlay