import Taro from '@tarojs/taro'
import { getGreatSheet, getSheetTag } from "@/api/music"
import { ScrollView, View, Text } from "@tarojs/components"
import { usePageScroll } from "@tarojs/taro"
import { useEffect, useState } from "react"
import { useLazyLoad } from "@/hooks"
import { numberFormatByZh } from '@/util'
import { AtIcon } from "taro-ui"
const sheetTab = function () {
  const [sheet, setSheet] = useState([])
  const [tags, setTags] = useState([])
  const [isShowActionSheet, setShowActionSheet] = useState(false)
  usePageScroll((e) => {
    console.log(e)
  })
  useEffect(() => {
    getSheetTag()
      .then(r => {
        setTags(r.tags.map(i => i.name))
      })
    getGreatSheet({ limit: '20' })
      .then(r => {
        setSheet(r.playlists)
      })
  }, [])
  let onScroll = useLazyLoad(() => {
    console.log('nice')
  }, 200, '.tab-content')
  const clickSheetItem = function () {
    Taro.navigateTo({
      url: '/pages/sheet/sheetList'
    })
  }
  const showActionSheet = function () {
    setShowActionSheet(true)
  }
  return (
    <ScrollView className="tab-content" scrollY onScroll={onScroll}>
      <View className="sheet-header">
        <Text>全部歌单</Text>
        <View className="sheet-header_icon">
          <AtIcon size="20" value="bullet-list" onClick={showActionSheet}></AtIcon>
        </View>
      </View>
      <View className="sheet-content">
      {
        sheet.map((i:any) => {
          return (
            <View className="sheet-item" onClick={clickSheetItem}>
              <View className="sheet-item_bg" style={`background-image: url(${i.coverImgUrl})`}>
                <Text className="sheet-item_hot"><AtIcon value='play' size='14' color='#FFF'></AtIcon>{numberFormatByZh(i.playCount)}</Text>
                <Text className="sheet-item_tags">{i.tags.slice(0, 3).join(' | ')}</Text>
              </View>
              <Text className="sheet-item_title">{i.name}</Text>
            </View>
          )
        })
      }
      </View>
    </ScrollView>
  )
}

export default sheetTab