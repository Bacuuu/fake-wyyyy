import { View, Text } from '@tarojs/components'
import './me.scss'

type IProps = {
  user?: Object
}
function Me (props: IProps) {
  return (
    <View className='index'>
      <Text>ME</Text>
    </View>
    )
}
export default Me