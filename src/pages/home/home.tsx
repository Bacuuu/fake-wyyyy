import { View, Text } from '@tarojs/components'
import './home.scss'

type IProps = {
  user?: Object
}
function Home (props: IProps) {
  return (
    <View className='index'>
      <Text>HOME</Text>
    </View>
    )
}
export default Home