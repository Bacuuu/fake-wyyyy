import { View, Text, Image } from "@tarojs/components"
import { featureDelayMsg, Jumper } from '@/util'
import { AtMessage } from "taro-ui"
import styles from './index.module.scss'
const songslist = function (props: {list:Object[]}) {
  return (
    <View className={styles["list-wrap"]}>
      {props.list.map((i:any, index) => {
        return (
          <View className={styles["list-item"]}>
            <View className={styles["index"]}>{index}</View>
            <View className={styles["item-right"]} onClick={() => Jumper.playSong(i.id)}>
              <View className={styles["info"]}>
                <Text className={styles["name"] + " ellipsis"}>{i.name}</Text>
                <Text className={styles["from"] + " ellipsis"}>{i.from}</Text>
              </View>
              <View className={styles["operation"]}>
                <Image className={styles["mv"]} onClick={featureDelayMsg} src={require('@/assets/images/mv.png')}></Image>
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