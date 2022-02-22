import { View, Text } from "@tarojs/components"
import { useEffect, useState } from "react"
import { AtInput } from "taro-ui"
import styles from './search.module.scss'
import Taro, { useRouter } from "@tarojs/taro"
import { doSearch } from "@/api/music"
import SongsList from "@/components/common/SongsList/songslist"
const search = function () {
  const goBack = () => Taro.navigateBack()
  const [searchVal, setSearchVal] = useState('')
  const [songsList, setSongsList] = useState([] as Array<object>)
  const router = useRouter()
  useEffect(() => {
    const keyword = router?.params?.keyword
    if (keyword) {
      setSearchVal(keyword)
      doSearch({
        keywords: keyword
      }).then(r => {
        setSongsList(r.result.songs.map(i => {
          return {
            ...i,
            from: i.artists[0].name
          }
        }))
      })
    }
  }, [])
  return (
    <View className={styles["search-wrap"]}>
      <View className={styles['search-input'] + ' search-input'}>
        <AtInput
          name="search-input-result"
          value={searchVal}
          editable={false}
          className={styles["input"]}
          onClick={goBack}
          onChange={() => {}}>
        </AtInput>
        <Text onClick={goBack}>取消</Text>
      </View>
      <SongsList list={songsList}></SongsList>
    </View>
  )
}

export default search
