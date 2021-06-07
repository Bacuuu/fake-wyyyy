import { useEffect, useState } from 'react'
import { View, Text } from '@tarojs/components'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/user'
import { IStoreType } from '@/types/store'
import './index.scss'

type IProps = {
  user?: Object
}
function Index (props: IProps) {
  // const [ user ] = useState(() => {})
  const redux = useSelector((state: IStoreType) => state.user)
  const dispatch = useDispatch()
  // console.log(redux.userInfo)
  function add123() {
    dispatch(login({
      phone: 15528022331,
      password: 123323
    }))
    console.log(redux.userInfo)
  }
  function add345() {
    console.log(redux)
  }
  return (
    <View className='index'>
      <Text>Hello world</Text>
      <button onClick={add123}>333</button>
      <button onClick={add345}>333</button>
    </View>
    )
}
export default Index