import { View, Text} from "@tarojs/components"
import { useSelector } from "react-redux"
import { IStoreType } from "@/types/store"
import { useDidShow } from "@tarojs/taro"
import { getRecommendSheet } from '@/api/indexpage'
import { getUserRecommendSheet } from '@/api/user'
import { useState } from "react"
import { numberFormatByZh } from "@/util"
const recommendSheet = function () {
  const user = useSelector((state:IStoreType) => state.user)
  const [songSheet, setSongSheet] = useState([])
  let req:any = {}

  useDidShow(() => {
    let _req = user.userInfo ? getUserRecommendSheet : getRecommendSheet
    // 如果没有改变
    if (req !== _req) {
      req = _req
      req({ limit: 6 }).then(r => {
        setSongSheet(r.result || r.recommend.slice(0, 6))
      })
    }
  })

  const jumper = function () {

  }

  return (
    <View>
      <Text onClick={jumper}>推荐歌单</Text>
      <View className="block-grid">
        {
          songSheet.map((i:any) => {
            return (
              <View className="block-item">
                <View className="block-item_img" style={`background-image: url(${i.picUrl})`}>
                  <Text className="block-item_hot">{numberFormatByZh(i.playcount || i.playCount, [5])}</Text>
                </View>
                {/* <Image  mode="aspectFit" ></Image> */}
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