import { View, Image, Text } from "@tarojs/components"
import { useEffect, useState } from "react"
import Taro, { useRouter } from "@tarojs/taro"
import { AtMessage } from "taro-ui"
import { binChop, featureDelayMsg, mmssSSS2millMinutes } from '@/util'
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
  // [[timing], [readLyric]]
  const [formatedLyric, setFormatedLyric] = useState([[], []] as [Array<number>, Array<string>])
  // 当前歌词块信息 处于第几块
  const [blockIndex, setBlockIndex] = useState(0)
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
      }
    })
    setFormatedLyric(res)
  }, [music.musicInfo.lyric])
  // 进度更新回调，拿到毫秒
  const processCb = function (e:number) {
    // 进行时间比较，确定行数
    // 降级进行查询,，优先使用上一次的值进行比较，否则再使用二分法进行寻找
    const len = formatedLyric[0].length
    // 已经是最后一个
    if (len === blockIndex) return
    if (formatedLyric[0][blockIndex] < e) {
      // 上一次结果递增
      if (formatedLyric[0][blockIndex + 1] >= e) {
        setBlockIndex(blockIndex + 1)
      } else {
        // 二分查找，后分段
        const next = binChop(formatedLyric[0], e, blockIndex)
        setBlockIndex(next)
      }
    } else {
      // 二分查找，前分段
        const next = binChop(formatedLyric[0], e, 0, blockIndex)
        setBlockIndex(next)
        console.log(e, formatedLyric[0][next],formatedLyric[1][next])
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
          // style={`padding-top: ${parseInt(Taro.pxTransform(28)) * blockIndex}rpx`}
          onClick={() => setDisplayMode('dish')}>
          <View className="lyric-block" style={
            `transform: translateY(calc(50% - ${parseInt(Taro.pxTransform(28)) * blockIndex}rpx))`}>
            {formatedLyric[1].map((i, index) => {
              return (
                <Text className={"lyric-item " + (index === blockIndex ? 'is-current' : '')}>{i}</Text>
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