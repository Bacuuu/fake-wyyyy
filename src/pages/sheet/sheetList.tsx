import { View, Image, Text } from "@tarojs/components"
import { useEffect, useState } from "react"
import { getSheetDetail, getSongsBySheetId, collectSheet } from "@/api/music"
import { useRouter } from "@tarojs/taro"
import { numberFormatByZh } from '@/util'
import { SongsList } from '@/components/common/SongsList'
import styles from './sheetList.module.scss'
interface Irouter {
  params: {
    id: string
  }
}
const sheetList = function () {
  const router:Irouter = useRouter()
  const collect = function () {
    const c = collected
    collectSheet({
      id: router.params.id,
      t: c ? 2 : 1
    }).then(r => {
      if (r.code === 200) {
        setCollected(e => !e)
        setBaseInfo(e => {
          return {
            ...e,
            subscribedCount: e.subscribedCount + (c ? -1 : 1)
          }
        })
      }
    })
  }
  const [collected, setCollected] = useState(false)
  const [baseInfo, setBaseInfo] = useState({
    name: '',
    coverImgUrl: '',
    description: '',
    createTime: '',
    subscribedCount: 0,
    shareCount: 0,
    commentCount: 0,
    creator: {
      nickname: '',
      avatarUrl: ''
    }
  })
  const [songs, setSongs] = useState([])
  useEffect(() => {
    getSheetDetail({
      id: router.params.id
    }).then(r => {
      const { name, coverImgUrl, description, subscribedCount, shareCount, commentCount, subscribed } = r.playlist
      const { nickname, avatarUrl } = r.playlist.creator
      setCollected(subscribed)
      setBaseInfo({
        name,
        coverImgUrl,
        description,
        subscribedCount,
        shareCount,
        commentCount,
        createTime: '',
        creator: {
          nickname,
          avatarUrl
        }
      })
    })
    getSongsBySheetId({
      id: router.params.id
    }).then(r => {
      setSongs(r.songs.map(i => {
        return {
          name: i.name,
          creator: i.ar[0].name,
          from: i.al.name,
          id: i.id
        }
      }))
    })
  }, [])
  return (
    <View className={styles["sheetlist-wrap"]}>
      <View className={styles["sheetlist-header"]}>
        <View className={styles["info"]}>
          <Image className={styles["coverimg"]} src={baseInfo.coverImgUrl}></Image>
          <View className={styles["about"]}>
            <Text>
              {baseInfo.name}
            </Text>
            <View className={styles["creator"]}>
              <Image className={styles["creator-avatar"]} src={baseInfo.creator.avatarUrl}></Image>
              {baseInfo.creator.nickname}
            </View>
          </View>
        </View>
        <View className={styles["operation"]}>
          <View className={styles["operation-item"]} onClick={collect}>
            <Image src={collected ? require('@/assets/images/shoucang-red.png') : require('@/assets/images/shoucang.png')}></Image>
            <Text>{numberFormatByZh(baseInfo.subscribedCount)}</Text>
          </View>
          <View className={styles["operation-item"]}>
            <Image src={require('@/assets/images/pinglun.png')}></Image>
            <Text>{numberFormatByZh(baseInfo.commentCount)}</Text>
          </View>
          <View className={styles["operation-item"]}>
            <Image src={require('@/assets/images/fenxiang.png')}></Image>
            <Text>{numberFormatByZh(baseInfo.shareCount)}</Text>
          </View>
        </View>
      </View>
      <View className={styles["sheetlist-songlist"]}>
        <SongsList list={songs}></SongsList>
      </View>
    </View>
  )
}
export default sheetList