import { View, Text} from "@tarojs/components"
import { useSelector } from "react-redux"
import { IStoreType } from "@/types/store"
import { useDidShow } from "@tarojs/taro"
import { getRecommendSheet } from '@/api/indexpage'
import { getUserRecommendSheet } from '@/api/user'
import { useState } from "react"
import { numberFormatByZh, Jumper } from "@/util"
const recommendSheet = function () {
  const user = useSelector((state:IStoreType) => state.user)
  const [songSheet, setSongSheet] = useState([])
  const [req, setReq] = useState(new Function())

  useDidShow(() => {
    let _req = user.userInfo ? getUserRecommendSheet : getRecommendSheet
    // 如果改变
    if (req !== _req) {
      // 这里好坑，这里想设置新值为函数，但是作为回调函数去运行了，返回了promise
      setReq(() => _req)
      _req({ limit: 6 }).then(r => {
        setSongSheet(r.result || r.recommend.slice(0, 6))
      })
    }
  })

  return (
    <View>
      <Text>推荐歌单</Text>
      <View className="block-grid">
        {
          songSheet.map((i:any) => {
            return (
              <View className="block-item" onClick={() => Jumper.toSheet(i.id)}>
                <View className="block-item_img" style={`background-image: url(${i.picUrl})`}>
                  <Text className="block-item_hot">{numberFormatByZh(i.playcount || i.playCount, [5])}</Text>
                </View>
                <Text className="block-item_title">{i.name}</Text>
              </View>
            )
          })
        }
      </View>
    </View>
  )
}

export default recommendSheet