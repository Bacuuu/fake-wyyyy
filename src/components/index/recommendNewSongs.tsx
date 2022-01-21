import Taro from "@tarojs/taro"
import { getRecommentNewSongs } from "@/api/indexpage"
import { View, Text } from "@tarojs/components"
import { useEffect, useState } from "react"
import { Jumper } from "@/util"
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
      <View className="block-grid">
        {
          songs.map((i:any) => {
            return (
              <View className="block-item" onClick={() => Jumper.playSong(i.id)}>
                <View className="block-item_img" style={`background-image: url(${i.picUrl})`}>
                </View>
                <Text className="block-item_title">{i.name}</Text>
              </View>
            )
          })
        }
      </View>
    </View>
  )
}

export default recommentNewSongs