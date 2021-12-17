import Taro from "@tarojs/taro"
import { getRecommentNewSongs } from "@/api/indexpage"
import { getPlayUrl } from "@/api/music"
import { View, Text } from "@tarojs/components"
import { useEffect, useState } from "react"
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
  const musicPlay = function (id) {
    getPlayUrl({id})
      .then(r => {
        Taro.playBackgroundAudio({
          dataUrl: r.data[0].url
        })
      })
  }
  return (
    <View>
      <Text onClick={jumper}>推荐新歌</Text>
      <View className="block-grid">
        {
          songs.map((i:any) => {
            return (
              <View className="block-item" onClick={() => musicPlay(i.id)}>
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