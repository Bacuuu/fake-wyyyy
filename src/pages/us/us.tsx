import { View, Text } from '@tarojs/components'
import './us.scss'

type IProps = {
  user?: Object
}
function Us (props: IProps) {
  return (
    <View className='index'>
      <Text>US</Text>
    </View>
    )
}
export default Us