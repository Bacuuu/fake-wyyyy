import { View } from "@tarojs/components"
import './index.scss'
const songslist = function (props: {list:Object[]}) {

  return (
    <View className="list-wrap">
      {props.list.map((i:any) => {
        return (
          <View className="list-item">
            {i.name}
          </View>
        )
      })}
    </View>
  )
}

export default songslist