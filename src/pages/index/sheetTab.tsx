import Taro, { useReady } from "@tarojs/taro"
import { getGreatSheet, getSheetTag } from "@/api/music"
import { ScrollView, View } from "@tarojs/components"
import { usePageScroll } from "@tarojs/taro"
import { useEffect, useState } from "react"
import { useLazyLoad } from "@/hooks"
const sheetTab = function () {
  const [sheet, setSheet] = useState([])
  const [tags, setTags] = useState([])
  // 抽离一个懒加载hook出去
  usePageScroll((e) => {
    console.log(e)
  })
  // todo
  useEffect(() => {
    getSheetTag()
      .then(r => {
        setTags(r.tags.map(i => i.name))
      })
    getGreatSheet({ limit: '20' })
      .then(r => {
        setSheet(r.playLists)
      })
  }, [])
  let onScroll = useLazyLoad(() => {
    console.log('nice')
  }, 200, '.tab-content')
  // useReady(() => {
  //   const query = Taro.createSelectorQuery()
  //   query.select('.tab-content')
  //     .boundingClientRect()
  //     .exec(res => {
  //       console.log(res)
  //     })
  // })
  // const onScroll = function (e) {
  //   console.log(e.detail)
  // }
  return (
    <ScrollView className="tab-content" scrollY onScroll={onScroll}>

    </ScrollView>
  )
}

export default sheetTab