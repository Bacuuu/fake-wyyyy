import { getGreatSheet, getSheetTag } from "@/api/music"
import { View } from "@tarojs/components"
import { useEffect, useState } from "react"

const sheetTab = function () {
  const [sheet, setSheet] = useState([])
  const [tags, setTags] = useState([])
  // 抽离一个懒加载hook出去
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
  return (
    <View>

    </View>
  )
}

export default sheetTab