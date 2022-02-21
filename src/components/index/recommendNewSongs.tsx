import Taro from "@tarojs/taro"
import { getRecommentNewSongs } from "@/api/indexpage"
import { View, Text } from "@tarojs/components"
import { useEffect, useState } from "react"
import { Jumper } from "@/util"
import styles from "./recommendGrid.module.scss"
const recommentNewSongs = function () {
  const jumper = function () {

  }
  const [songs, setSongs] = useState([])
  useEffect(() => {
    getRecommentNewSongs({ limit: 6 })
      .then(r => {
        setSongs(r.result)
      })
  }, [])
  return (
    <View>
      <Text onClick={jumper}>推荐新歌</Text>
      <View className={styles["block-grid"]}>
        {
          songs.map((i:any) => {
            return (
              <View className={styles["block-item"]} onClick={() => Jumper.playSong(i.id)}>
                <View className={styles["block-item_img"]} style={`background-image: url(${i.picUrl})`}>
                </View>
                <Text className={styles["block-item_title"]}>{i.name}</Text>
              </View>
            )
          })
        }
      </View>
    </View>
  )
}

export default recommentNewSongs