import { useEffect, useState } from 'react'
import { View, Image, Text } from '@tarojs/components'
import { getIndexpageInfo } from '@/api/indexpage'
import { Swiper, SwiperItem } from '@tarojs/components'
const swiper = function () {
  const [swiperList, setSwiperList] = useState([])
  useEffect(() => {
    getIndexpageInfo().then(r => {
      setSwiperList(r.data.blocks[0].extInfo.banners)
    })
  }, [])
  return (
    <Swiper
      className="c-swiper"
      indicatorColor='#999'
      indicatorActiveColor='#333'
      circular
      indicatorDots
      autoplay>
      {
        swiperList.map((i:any) => {
          return (
            <SwiperItem>
              <View className="swiper-item">
                <Image className="item-bg" mode="aspectFit" src={i.pic} />
                <Text className="item-title" style={`background-color: ${i.titleColor}`}>{i.typeTitle}</Text>
              </View>
            </SwiperItem>
          )
        })
      }
    </Swiper>
  )
}

export default swiper