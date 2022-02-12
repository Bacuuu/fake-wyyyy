import { cleanList, deleteOneById, toggleMode } from "@/actions/music"
import music from "@/reducers/music"
import { IStoreMusicType } from "@/types/store"
import { View, Text } from "@tarojs/components"
import { useDispatch } from "react-redux"
import { AtIcon } from "taro-ui"
import './index.scss'
const PlayList = function (props:IStoreMusicType) {
  const dic = {
    'SX': '顺序播放',
    'SJ': '随机播放',
    'DQ': '单曲播放',
    'XH': '循环播放'
  }
  const dispatch = useDispatch()
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
                <AtIcon onClick={() => dispatch(deleteOneById({id: i.id}))} className="close-icon" value='close' size='20' color='#999'></AtIcon>
              </View>
            )
          })
        }
      </View>
    </View>
  )
}

export default PlayList