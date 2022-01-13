import { View, Image, Text } from "@tarojs/components"
import { useEffect, useState } from "react"
import { getSheetDetail } from "@/api/music"
import { useRouter } from "@tarojs/taro"
import './sheetList.scss'
interface Irouter {
  params: {
    id: string
  },
  path: string
}
const sheetList = function () {
  const router:Irouter = useRouter()
  const [baseInfo, setBaseInfo] = useState({
    name: '',
    coverImgUrl: '',
    commentCount: 0,
    description: '',
    createTime: '',
    creator: {
      nickname: '',
      avatarUrl: ''
    }
  })
  useEffect(() => {
    console.log(router.params.id)
    getSheetDetail({
      id: router.params.id
    }).then(r => {
      const { name, coverImgUrl, description } = r.playlist
      const { nickname, avatarUrl } = r.playlist.creator
      setBaseInfo({
        name,
        coverImgUrl,
        description,
        commentCount: 0,
        createTime: '',
        creator: {
          nickname,
          avatarUrl
        }
      })
    })
  }, [])
  return (
    <View className="sheetlist-wrap">
      <View className="sheetlist-header">
        <View className="info">
          <Image className="coverimg" src={baseInfo.coverImgUrl}></Image>
          <View className="about">
            <Text>
              {baseInfo.name}
            </Text>
            <View className="creator">
              <Image className="creator-avatar" src={baseInfo.creator.avatarUrl}></Image>
              {baseInfo.creator.nickname}
            </View>
          </View>
        </View>
        <View className="operation">
          <View className="operation-item">
            <Image src={require('@/assets/images/shoucang.png')}></Image>
          </View>
          <View className="operation-item">
            <Image src={require('@/assets/images/pinglun.png')}></Image>
          </View>
          <View className="operation-item">
            <Image src={require('@/assets/images/fenxiang.png')}></Image>
          </View>
          <View className="operation-item">
            <Image src={require('@/assets/images/xiazai.png')}></Image>
          </View>
        </View>
      </View>
    </View>
  )
}
export default sheetList