import { cleanList, deleteOneById, toggleMode } from "@/actions/music"
import { IStoreMusicType, IStoreType } from "@/types/store"
import { playTool } from "@/util"
import { View, Text } from "@tarojs/components"
import { useDispatch, useSelector } from "react-redux"
import { AtIcon } from "taro-ui"
import './index.scss'
const PlayList = function (props:IStoreMusicType) {
  const dic = {
    'SX': '顺序播放',
    'SJ': '随机播放',
    'DQ': '单曲播放',
    'XH': '循环播放'
  }
  const music = useSelector((state:IStoreType) => state.music)
  const dispatch = useDispatch()
  function deleteOneSong (id) {
    dispatch(deleteOneById({id}))
    // 如果id是正在播放的，则播放下一曲
    if (id === music.musicInfo.id) {
      playTool.next(music, dispatch)
    }
  }
  return (
    <View className="playlist-wrap">
      <View className="header">
        <Text onClick={() => dispatch(toggleMode())}>{dic[props.musicList.playStatus]}</Text>
        <Text>({props.musicList.list.length})</Text>
        <AtIcon onClick={() => dispatch(cleanList())} className="clean" value='trash' size='20' color='#999'></AtIcon>
      </View>
      <View className="list">
        {
          props.musicList.list.map(i => {
            return (
              <View className="list-item">
                <View className="info">
                  {
                    props.musicInfo.id === i.id && <AtIcon className="icon-playing" value='volume-plus' size='16' color='#999'></AtIcon>
                  }
                  <Text className="name ellipsis">{i.name}</Text>
                  <Text> -- </Text>
                  <Text className="auth-name ellipsis">{i.authName}</Text>
                </View>
                <AtIcon onClick={() => deleteOneSong(i.id)} className="close-icon" value='close' size='20' color='#999'></AtIcon>
              </View>
            )
          })
        }
      </View>
    </View>
  )
}

export default PlayList