import { View, Text } from "@tarojs/components"
import { useEffect, useState } from "react"
import { AtInput, AtIcon } from "taro-ui"
import styles from './search.module.scss'
import Taro, { navigateTo, useReady } from "@tarojs/taro"
import { debounce } from 'lodash'
import { getSearchHotWords, getSearchSuggestion } from "@/api/music"
const search = function () {
  // 搜索输入值
  const [searchVal, setSearchVal] = useState('')
  // 搜索热词
  const [hotWords, setHotWords] = useState([])
  // 历史记录
  const [searchRecord, setSearchRecord] = useState([] as Array<string>)
  // 悬浮框高度
  const [tipsMarginTop, setTipsMarginTop] = useState(0)
  // 搜索建议
  const [searchTips, setSearchTips] = useState([])
  useEffect(() => {
    getSearchHotWords().then(r => {
      if (r.result) {
        setHotWords(r.result.hots.map(i => i.first))
      }
    })
    Taro.getStorage({
      key: 'searchRecord',
      success: (res) => {
        setSearchRecord(res.data)
      },
    })
  }, [])
  // 获取dom 进行覆盖
  useReady(() => {
    Taro.createSelectorQuery()
      .select('.search-input')
      .boundingClientRect()
      .exec(r => {
        console.log(r)
        setTipsMarginTop(r[0].height)
      })
  })
  const goBack = () => Taro.navigateBack()
  // debounce无效
  const handleSearchTips = debounce(function (v:string) {
    if (!v) {
      setSearchTips([])
      return
    }
    getSearchSuggestion({
      keywords: v,
      type: 'mobile'
    }).then(r => {
      r.result.allMatch && setSearchTips(r.result.allMatch.map(i => i.keyword))
    })
  }, 300)
  const searchValChange = function (v) {
    // 发现输入框失焦的时候会触发onChange
    if (v === searchVal) return
    setSearchVal(v)
    handleSearchTips(v)
  }
  const handleSearch = function (keyword:string) {
    // 清空搜索建议
    setSearchTips([])
    // 传入搜索值，覆盖
    if (keyword) {
      setSearchVal(keyword)
    } else {
      keyword = searchVal
    }
    const set = Array.from(new Set([keyword, ...searchRecord]))
    setSearchRecord(set)
    Taro.setStorage({
      key: 'searchRecord',
      data: set
    })
    navigateTo({
      url: `/pages/search/searchresult?keyword=${keyword}`
    })
  }
  const removeSearchRecord = function (tag) {
    const newList = searchRecord.filter(i => i !==tag)
    setSearchRecord(newList)
    Taro.setStorage({
      key: 'searchRecord',
      data: newList
    })
  }
  return (
    <View className={styles["search-wrap"]}>
      <View className={styles['search-input'] + ' search-input'}>
        <AtInput
          name="search-input"
          value={searchVal}
          focus
          className={styles["input"]}
          onChange={searchValChange}
          onConfirm={handleSearch}>
        </AtInput>
        <Text onClick={goBack}>取消</Text>
      </View>
      <View className={styles["search-tips"]} style={"top:" + tipsMarginTop + "px"}>
        {
          searchTips.map(i => {
            return(
              <View className={styles["tips-item"]}>
                <AtIcon value="search" size="16"></AtIcon>
                <Text className={styles["tips-item__text"]}>{i}</Text>
              </View>
            )
          })
        }
      </View>
      <Text className={styles["block-title"]}>热门搜索</Text>
      <View className={styles["hot-search"]}>
        {hotWords.map(i => {
          return (
            <View className={styles["hot-tag"]} onClick={() => handleSearch(i)}>{i}</View>
          )
        })}
      </View>
      <Text className={styles["block-title"]}>搜索记录</Text>
      <View className={styles["search-record"]}>
        {
          searchRecord.map(i => {
            return (
              <View className={styles["record-item"]} onClick={() => handleSearch(i)}>
                <AtIcon value='clock' color="rgba(153, 153, 153, 1)"></AtIcon>
                <Text className={styles["record-item__text"]}>{i}</Text>
                <AtIcon value="close" color="rgba(153, 153, 153, 1)" onClick={() => removeSearchRecord(i)}></AtIcon>
              </View>
            )
          })
        }
      </View>
    </View>
  )
}

export default search
