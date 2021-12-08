import { View, Text } from '@tarojs/components'
import './home.scss'
import { useDispatch } from 'react-redux'
import { login } from '../../actions/user'

type IProps = {
  user?: Object
}
function Home (props: IProps) {
  const dispatch = useDispatch()
  function add123() {
    dispatch(login({
      phone: '',
      password: ''
    }))
  }
  return (
    <View className='index'>
      <Text>HOME</Text>
      <button onClick={add123}>登录</button>
    </View>
    )
}
export default Home