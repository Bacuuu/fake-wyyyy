import { useEffect, useState } from 'react'
import { View, Image, Text } from '@tarojs/components'
import { getIndexpageInfo } from '@/api/indexpage'
import { Swiper, SwiperItem } from '@tarojs/components'
import colorVar from '@/constants/colorVar'
import styles from './swiper.module.scss'
const swiper = function () {
  const [swiperList, setSwiperList] = useState([])
  useEffect(() => {
    getIndexpageInfo().then(r => {
      setSwiperList(r.data.blocks[0].extInfo.banners)
    })
  }, [])
  const swiperClick = function (i) {
    // todo 跳转
    switch (i.targetType ) {
      case 1:
        console.log('单曲')
        break;
      case 10:
        console.log('专辑')
        break;
      case 7001:
        console.log('直播')
        break;
      default:
        console.log(i.url)
        break;
    }
  }
  return (
    <Swiper
      className={styles["c-swiper"]}
      indicatorColor='#999'
      indicatorActiveColor='#333'
      circular
      indicatorDots
      autoplay>
      {
        swiperList.map((i:any) => {
          return (
            <SwiperItem onClick={() => swiperClick(i)}>
              <View className={styles["swiper-item"]}>
                <Image className={styles["item-bg"]} mode="aspectFit" src={i.pic} />
                <Text className={styles["item-title"]} style={`background-color: ${colorVar[i.titleColor]}`}>{i.typeTitle}</Text>
              </View>
            </SwiperItem>
          )
        })
      }
    </Swiper>
  )
}

export default swiper