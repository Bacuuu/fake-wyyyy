import { View, Text } from '@tarojs/components'
import { SheetItem } from '@/components/common/SheetItem'
import styles from './home.module.scss'
import { useEffect, useState } from 'react'
import { getUserSheet } from '@/api/user'
import { useSelector } from 'react-redux'
import { IStoreType } from '@/types/store'

interface ISheetType {
  collected: Array<Object>,
  created: Array<Object>
}

function Home () {
  const user = useSelector((state:IStoreType) => state.user)
  const [sheetInfo, setSheetInfo] = useState({collected: [], created: []} as ISheetType)
  useEffect(() => {
    // 跳转去登录
    if (!user.userInfo) return
    getUserSheet({
      uid: user.userInfo.profile.userId
    }).then(r => {
      if (r.playlist) {
        setSheetInfo(s => {
          return {
            ...s,
            collected: r.playlist.filter(i => i.userId !== user.userInfo.profile.userId),
            created: r.playlist.filter(i => i.userId === user.userInfo.profile.userId)
          }
        })
      }
    })
  }, [user.userInfo])
  return (
    <View className={styles["home"]}>
      <Text>我创建的歌单</Text>
      {sheetInfo.created.map(i => {
        return (
          <SheetItem sheetInfo={i} showCreator={false}></SheetItem>
        )
      })}
      <Text>我收藏的歌单</Text>
      {sheetInfo.collected.map(i => {
        return (
          <SheetItem sheetInfo={i} showCreator></SheetItem>
        )
      })}
    </View>
    )
}
export default Home