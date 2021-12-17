import { View, Text, ScrollView } from '@tarojs/components'
import { AtInput, AtTabs, AtTabsPane, AtIcon } from 'taro-ui'
import swiper from '../../components/index/swiper'
import recommendSheet from '../../components/index/recommendSheet'
import recommendNewSongs from '../../components/index/recommendNewSongs'
import sheetTab from '../../components/sheet/sheetTab'
import './index.scss'
import { useState } from 'react'

type IProps = {
  user?: Object
}
function Index (props: IProps) {
  const searchValChange = (val) => {
    console.log(val)
  }
  const tabList = [{
    title: '个性推荐'
  }, {
    title: '歌单'
  }, {
    title: '主播电台'
  }, {
    title: '排行榜'
  }]
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
      <AtTabs className="tabs" current={tabIdx} tabList={tabList} onClick={setTabIdx}>
        <AtTabsPane current={tabIdx} index={0} >
          <ScrollView scrollY className="tab-content">
            {swiper()}
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
            {recommendSheet()}
            {recommendNewSongs()}
          </ScrollView>
        </AtTabsPane>
        <AtTabsPane current={tabIdx} index={1}>
          {sheetTab()}
        </AtTabsPane>
      </AtTabs>
    </View>
  )
}
export default Index