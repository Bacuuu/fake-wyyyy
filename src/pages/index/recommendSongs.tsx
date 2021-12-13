import { View, Button} from "@tarojs/components"
import { useSelector } from "react-redux"
import { IStoreType } from "@/types/store"
import { useDidShow } from "@tarojs/taro"
import { getRecommendSongs } from '@/api/indexpage'
import { getUserRecommendSongs } from '@/api/user'
const recommendSongs = function () {
  const user = useSelector((state:IStoreType) => state.user)
  let req:any = {}
  useDidShow(() => {
    let _req = user.userInfo ? getUserRecommendSongs : getRecommendSongs
    // 如果没有改变
    if (req !== _req) {
      req = _req
      req().then(r => {
        console.log(r)
      })
    }
  })
  return (
    <View>
      <Button onClick={() => console.log(user)}>123</Button>
    </View>
  )
}

export default recommendSongs