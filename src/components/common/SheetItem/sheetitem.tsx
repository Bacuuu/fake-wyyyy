import { Jumper } from "@/util"
import { View, Image, Text } from "@tarojs/components"
import styles from './index.module.scss'

const sheetItem = function (props) {
  const { sheetInfo } = props
  return (
    <View className={styles["sheet-item"]} onClick={() => Jumper.toSheet(sheetInfo.id)}>
      <Image className={styles["sheet-image"]} src={sheetInfo.coverImgUrl}></Image>
      <View className={styles["sheet-info"]}>
        <Text className={styles["title"] + " ellipsis"}>{sheetInfo.name}</Text>
        <Text className={styles["desc"] + " ellpsis"}>{`共${sheetInfo.trackCount}首` + (props.showCreator ? `，由 ${sheetInfo.creator.nickname} 创建` : '')}</Text>
      </View>
    </View>
  )
}

export default sheetItem