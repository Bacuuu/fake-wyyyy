import { View, Image } from '@tarojs/components'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IStoreType } from '@/types/store'
import Taro from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import avatar from '@/assets/images/login_avatar.png'
import styles from './me.module.scss'

type IProps = {
  user?: Object
}
function loginByPhone () {
  Taro.navigateTo({
    url: '/pages/me/loginbyphone'
  })
}
function Login (props: IProps) {
  const user = useSelector((state:IStoreType) => state.user)
  let [hasLogin] = useState(user.userInfo !== null)
  useEffect(() => {
    
  }, [])
  return (
    <View className={styles['login-wrap']}>
      {
        hasLogin 
          ? (
            <View className={styles["has-login"]}>

            </View>
          )
          : (
            <View className={styles["to-login"]}>
              <View className={styles["avatar"]}>
                <Image src={avatar}></Image>
              </View>
              <AtButton className={styles["button"]} type="primary" onClick={loginByPhone}>登陆</AtButton>
              <AtButton className={styles["button"]}>注册</AtButton>
            </View>
          )
      }
    </View>
    )
}
export default Login