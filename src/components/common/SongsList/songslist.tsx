import { View, Text, Image } from "@tarojs/components"
import { featureDelayMsg, Jumper } from '@/util'
import { AtMessage } from "taro-ui"
import './index.scss'
const songslist = function (props: {list:Object[]}) {
  return (
    <View className="list-wrap">
      {props.list.map((i:any, index) => {
        return (
          <View className="list-item">
            <View className="index">{index}</View>
            <View className="item-right" onClick={() => Jumper.playSong(i.id)}>
              <View className="info">
                <Text className="name ellipsis">{i.name}</Text>
                <Text className="from ellipsis">{i.from}</Text>
              </View>
              <View className="operation">
                <Image className="mv" onClick={featureDelayMsg} src={require('@/assets/images/mv.png')}></Image>
              </View>
            </View>
          </View>
        )
      })}
      <AtMessage></AtMessage>
    </View>
  )
}

export default songslist