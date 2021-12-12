import { View } from '@tarojs/components'
import { AtInput } from 'taro-ui'
import swiper from './swiper'
import './index.scss'

type IProps = {
  user?: Object
}
function Index (props: IProps) {
  const searchValChange = (val) => {
    console.log(val)
  }
  return (
    <View className='index'>
      <View className="header">
        <View className="iconfont icon-voice"></View>
        <AtInput
          className="search-input"
          name="search"
          onChange={searchValChange}
          placeholder="搜索音乐、歌词、电台"
          placeholderClass="header-input-placeholder"></AtInput>
        <View className="iconfont icon-musiclist"></View>
      </View>
      {swiper()}
    </View>
    )
}
export default Index