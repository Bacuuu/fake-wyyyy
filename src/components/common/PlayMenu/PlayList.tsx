import { cleanList, deleteOneById, playNewSong, toggleMode } from "@/actions/music"
import { IStoreMusicType, IStoreType } from "@/types/store"
import { playTool } from "@/util"
import { View, Text } from "@tarojs/components"
import { useDispatch, useSelector } from "react-redux"
import { AtIcon } from "taro-ui"
import styles from './index.module.scss'
const PlayList = function (props:IStoreMusicType) {
  const dic = {
    'SX': '顺序播放',
    'SJ': '随机播放',
    'DQ': '单曲播放',
    'XH': '循环播放'
  }
  const music = useSelector((state:IStoreType) => state.music)
  const dispatch = useDispatch()
  function deleteOneSong (id, e) {
    e[0].stopPropagation()
    dispatch(deleteOneById({id}))
    // 如果id是正在播放的，则播放下一曲
    if (id === music.musicInfo.id) {
      playTool.next(music, dispatch)
    }
  }
  return (
    <View className={styles["playlist-wrap"]}>
      <View className={styles["header"]}>
        <Text onClick={() => dispatch(toggleMode())}>{dic[props.musicList.playStatus]}</Text>
        <Text>({props.musicList.list.length})</Text>
        <AtIcon onClick={() => dispatch(cleanList())} className={styles["clean"]} value='trash' size='20' color='#999'></AtIcon>
      </View>
      <View className={styles["list"]}>
        {
          props.musicList.list.map(i => {
            return (
              <View className={styles["list-item"]} onClick={() => dispatch(playNewSong(i.id))}>
                <View className={styles["info"]}>
                  {
                    props.musicInfo.id === i.id && <AtIcon className={styles["icon-playing"]} value='volume-plus' size='16' color='#999'></AtIcon>
                  }
                  <Text className={styles["name"] + "ellipsis"}>{i.name}</Text>
                  <Text> -- </Text>
                  <Text className={styles["auth-name"] + "ellipsis"}>{i.authName}</Text>
                </View>
                <AtIcon onClick={(e) => deleteOneSong(i.id, e)} className={styles["close-icon"]} value='close' size='20' color='#999'></AtIcon>
              </View>
            )
          })
        }
      </View>
    </View>
  )
}

export default PlayList