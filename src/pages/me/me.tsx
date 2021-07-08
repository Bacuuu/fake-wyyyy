import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IStoreType } from '@/types/store'
import { AtButton, AtTag } from 'taro-ui'
import './me.scss'

type IProps = {
  user?: Object
}
function Me (props: IProps) {
  const user = useSelector((state:IStoreType) => state.user)
  let [hasLogin, setHasLogin] = useState(user.userInfo !== null)
  useEffect(() => {
    setHasLogin(user.userInfo !== null)
  }, [user])
  function toLogin () {
    Taro.navigateTo({
      url: '/pages/me/login'
    })
  }
  function getuser () {
    console.log(user)
    return user?.userInfo?.account?.profile?.avatarUrl
  }
  return (
    <View className='me-wrap'>
      {
        hasLogin 
          ? (
            <View className="has-login">
              <View className="user-info">
                <View className="user-info__top">
                  <Image className="avatar" src={user?.userInfo?.account?.profile?.avatarUrl} />
                  <View className="basic-info">
                    <View>{user.userInfo.account.profile.nickname}</View>
                    <AtTag>Lv.{user.userInfo.level.level}</AtTag>
                  </View>
                  <AtButton type="primary" circle={false} className="ding">签到</AtButton>
                  {/* <AtButton onClick={getuser}>123</AtButton> */}
                </View>
              </View>
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