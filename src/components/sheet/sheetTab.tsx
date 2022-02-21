import Taro from '@tarojs/taro'
import { getGreatSheet, getSheetTag } from "@/api/music"
import { ScrollView, View, Text } from "@tarojs/components"
import { useEffect, useRef, useState } from "react"
import { useLazyLoad } from "@/hooks"
import { numberFormatByZh } from '@/util'
import { AtIcon, AtFloatLayout, AtTag } from "taro-ui"
import { Jumper } from '@/util'
import styles from './sheetTab.module.scss'
const sheetTab = function () {
  const [sheet, setSheet] = useState([] as Array<Object>)
  const [tags, setTags] = useState([])
  const [checkedTags, setCheckedTags] = useState([] as Array<string>)
  const [isShowActionSheet, setShowActionSheet] = useState(false)
  const updateTime = useRef('')
  // 可以正常加载 1 | 加载中 2 | 无加载内容 3
  const loadStatus = useRef(1)

  function fetchSheetList(append = true) {
    if (loadStatus.current !== 1) {
      return
    }
    loadStatus.current = 2
    getGreatSheet({
        limit: '20',
        cat: checkedTags.join(','),
        before: updateTime.current
      })
      .then(r => {
        if (r.playlists.length < 20) {
          loadStatus.current = 3
        }
        if (append) {
          setSheet(list => [...list, ...r.playlists])
        } else {
          setSheet(r.playlists)
        }
        updateTime.current = r.playlists.length ? r.playlists.slice(-1)[0].updateTime : ''
      })
      .finally(() => {
        if (loadStatus.current !== 3) {
          loadStatus.current = 1
        }
      })
  }

  useEffect(() => {
    getSheetTag()
      .then(r => {
        setTags(r.tags.map(i => i.name))
      })
  }, [])
  useEffect(() => {
    loadStatus.current = 1
    updateTime.current = ''
    fetchSheetList(false)
  }, [checkedTags])
  let onScroll = useLazyLoad(() => {
    // 滚动底部200px的回调事件
    fetchSheetList()
  }, 200, '.tab-content')
  const clickSheetItem = function (id) {
    Jumper.toSheet(id)
  }
  const clickTagItem = function (e:{active: boolean, name: string}) {
    if (e.active) {
      const index = checkedTags.indexOf(e.name)
      setCheckedTags(tag => {
        const _tag = tag.slice()
        _tag.splice(index, 1)
        return _tag
      })
    } else {
      setCheckedTags(tag => [...tag, e.name])
    }
  }
  const showActionSheet = function () {
    setShowActionSheet(true)
  }
  return (
    <ScrollView className={styles["tab-content"]} scrollY onScroll={onScroll}>
      <View className={styles["sheet-header"]}>
        <Text>全部歌单</Text>
        <View className={styles["sheet-header_icon"]}>
          <AtIcon size="20" value="bullet-list" onClick={showActionSheet}></AtIcon>
        </View>
      </View>
      <View className={styles["sheet-content"]}>
      {
        sheet.map((i:any) => {
          return (
            <View className={styles["sheet-item"]} onClick={() => clickSheetItem(i.id)}>
              <View className={styles["sheet-item_bg"]} style={`background-image: url(${i.coverImgUrl})`}>
                <Text className={styles["sheet-item_hot"]}><AtIcon value='play' size='14' color='#FFF'></AtIcon>{numberFormatByZh(i.playCount)}</Text>
                <Text className={styles["sheet-item_tags"]}>{i.tags.slice(0, 3).join(' | ')}</Text>
              </View>
              <Text className={styles["sheet-item_title"]}>{i.name}</Text>
            </View>
          )
        })
      }
      </View>
      <AtFloatLayout isOpened={isShowActionSheet} onClose={() => setShowActionSheet(false)}>
        <View className={styles["float-tags"]}>
          {tags.map(i => {
            return (
              <View className={styles["float-tags__item"]}>
                <AtTag name={i} active={checkedTags.includes(i)} onClick={clickTagItem}>{i}</AtTag>
              </View>
            )
          })}
        </View>
      </AtFloatLayout>
    </ScrollView>
  )
}

export default sheetTab