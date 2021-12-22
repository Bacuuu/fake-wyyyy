import { View, Text, ScrollView } from '@tarojs/components'
import { AtInput, AtTabs, AtTabsPane, AtIcon  } from 'taro-ui'
import { MyTabs, MyTabItem } from '@/components/common/Mytabs'
import Swiper from '../../components/index/swiper'
import RecommendSheet from '../../components/index/recommendSheet'
import RecommendNewSongs from '../../components/index/recommendNewSongs'
import SheetTab from '../../components/sheet/sheetTab'
import './index.scss'
import { useState } from 'react'

type IProps = {
  user?: Object
}
function Index (props: IProps) {
  const searchValChange = (val) => {
    console.log(val)
  }
  const tabList = ['个性推荐', '歌单', '主播电台', '排行榜']
  const [tabIdx, setTabIdx] = useState(0)
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
      <MyTabs className="tabs" tabs={tabList}>
        <MyTabItem index={0}>
          <ScrollView scrollY className="tab-content">
            <Swiper></Swiper>
            <View className="menu">
              <View className="menu-item">
                <View className="menu-item_icon">
                  <AtIcon value='sound' size='20' color='#888' />
                </View>
                <Text>私人FM</Text>
              </View>
              <View className="menu-item">
                <View className="menu-item_icon">
                  <AtIcon value='menu' size='20' color='#888' />
                </View>
                每日歌曲推荐
              </View>
              <View className="menu-item">
                <View className="menu-item_icon">
                  <AtIcon value='analytics' size='20' color='#888' />
                </View>
                云音乐热歌榜
              </View>
            </View>
            <RecommendSheet />
            <RecommendNewSongs />
          </ScrollView>
        </MyTabItem>
        <MyTabItem index={1}>
          <SheetTab></SheetTab>
        </MyTabItem>
      </MyTabs>
    </View>
  )
}
export default Index