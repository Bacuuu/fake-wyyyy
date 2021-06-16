import { View, Image } from '@tarojs/components'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IStoreType } from '@/types/store'
import { AtButton } from 'taro-ui'
import avatar from '@/assets/images/login_avatar.png'
import './me.scss'

type IProps = {
  user?: Object
}
function Login (props: IProps) {
  const user = useSelector((state:IStoreType) => state.user)
  let [hasLogin] = useState(user.userInfo !== null)
  useEffect(() => {
    
  }, [])
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
              <View className="avatar">
                <Image src={avatar}></Image>
              </View>
              <AtButton type="primary">登陆</AtButton>
              <AtButton>注册</AtButton>
            </View>
          )
      }
    </View>
    )
}
export default Login