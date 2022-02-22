import Taro from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { AtInput, AtTabs, AtTabsPane, AtIcon, AtMessage } from 'taro-ui'
import Tab from '@/components/common/Mytabs'
import Swiper from '../../components/index/swiper'
import RecommendSheet from '../../components/index/recommendSheet'
import RecommendNewSongs from '../../components/index/recommendNewSongs'
import SheetTab from '../../components/sheet/sheetTab'
import PlayMenu from '@/components/common/PlayMenu'
import styles from './index.module.scss'
import { useState } from 'react'
import { featureDelayMsg, Jumper } from '@/util'

type IProps = {
  user?: Object
}
function Index (props: IProps) {
  const searchValChange = (val) => {
    console.log(val)
  }
  const toSearch = function () {
    Taro.navigateTo({
      url: '/pages/search/search'
    })
  }
  const tabList = ['个性推荐', '歌单', '主播电台', '排行榜']
  const [tabIdx, setTabIdx] = useState(0)
  return (
    <View className={styles["index"]}>
      <View className={styles["header"]}>
        <View className={ styles["iconfont"] + " iconfont icon-voice"} onClick={featureDelayMsg}></View>
        <AtInput
          className={styles["search-input"]}
          name="search"
          editable={false}
          onClick={toSearch}
          onChange={searchValChange}
          placeholder="搜索音乐、歌单"
          placeholderClass={styles["header-input-placeholder"]}></AtInput>
        <View className={styles["iconfont"] + " iconfont icon-musiclist"} onClick={featureDelayMsg}></View>
      </View>
      <Tab.MyTabs className={styles["tabs"]} tabs={tabList}>
        <Tab.MyTabItem index={0}>
          <ScrollView scrollY className={styles["tab-content"] + ' tab-content'}>
            <Swiper></Swiper>
            <View className={styles["menu"]}>
              <View className={styles["menu-item"]}>
                <View className={styles["menu-item_icon"]}>
                  <AtIcon value='sound' size='20' color='#888' />
                </View>
                <Text>私人FM</Text>
              </View>
              <View className={styles["menu-item"]}>
                <View className={styles["menu-item_icon"]}>
                  <AtIcon value='menu' size='20' color='#888' />
                </View>
                每日歌曲推荐
              </View>
              <View className={styles["menu-item"]}>
                <View className={styles["menu-item_icon"]}>
                  <AtIcon value='analytics' size='20' color='#888' />
                </View>
                云音乐热歌榜
              </View>
            </View>
            <RecommendSheet />
            <RecommendNewSongs />
          </ScrollView>
        </Tab.MyTabItem>
        <Tab.MyTabItem index={1}>
          <SheetTab></SheetTab>
        </Tab.MyTabItem>
      </Tab.MyTabs>
      <PlayMenu></PlayMenu>
      <AtMessage></AtMessage>
    </View>
  )
}
export default Index