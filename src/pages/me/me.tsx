import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IStoreType } from '@/types/store'
import { AtButton } from 'taro-ui'
import './me.scss'

type IProps = {
  user?: Object
}
function Me (props: IProps) {
  const user = useSelector((state:IStoreType) => state.user)
  let [hasLogin] = useState(user.userInfo !== null)
  useEffect(() => {
    if (!hasLogin) {
      console.log('aha')
    }
  }, [])
  function toLogin () {
    Taro.navigateTo({
      url: '/pages/me/login'
    })
  }
  return (
    <View className='me-wrap'>
      {
        hasLogin 
          ? (
            <View className="has-login">

            </View>
          )
          : (
            <View className="to-login">
              <AtButton onClick={toLogin}>去登陆</AtButton>
            </View>
          )
      }
    </View>
    )
}
export default Me