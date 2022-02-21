import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IStoreType } from '@/types/store'
import { AtButton, AtTag, AtList, AtListItem, AtMessage } from 'taro-ui'
import * as userAction from '@/actions/user'
import * as api from '@/api/user'
import styles from './me.module.scss'

type IProps = {
  user?: Object
}
function Me (props: IProps) {
  const user = useSelector((state:IStoreType) => state.user)
  const dispatch = useDispatch()
  let [hasLogin, setHasLogin] = useState(user.userInfo !== null)
  let [hasCheckin, setHasCheckin] = useState(false)
  useEffect(() => {
    setHasLogin(user.userInfo !== null)
  }, [user])

  useEffect(() => {
    if (hasLogin) {
      api.getUserCheckinStatus()
        .then(r => {
          setHasCheckin(r.data.today.todaySignedIn)
        })
    }
  }, [hasLogin])

  function menuList () {
    const menu = [{
      title: '我的消息',
      icon: 'mail'
    }, {
      title: '会员中心',
      icon: 'sketch'
    }, {
      title: '商城',
      icon: 'shopping-cart'
    }, {
      title: '设置',
      icon: 'settings'
    }, {
      title: '主题换肤',
      icon: 'lightning-bolt'
    }, {
      title: '定时关闭',
      icon: 'clock'
    }, {
      title: '音乐闹钟',
      icon: 'bell'
    }, {
      title: '分享wy4',
      icon: 'share'
    }, {
      title: '关于',
      icon: 'help'
    }]
    return (
      <AtList>
        {
        menu.map((i, index) => {
          return <AtListItem
            key={index}
            title={i.title}
            arrow='right'
            iconInfo={{ size: 20, color: '#D9D9D9', value: i.icon }}
          />})
        }
      </AtList>
    )
  }

  function toLogin () {
    Taro.navigateTo({
      url: '/pages/me/login'
    })
  }

  function signin () {
    api.dailySignin()
      .then(r => {
        if (r.code === 200) {
          setHasCheckin(true)
          Taro.atMessage({
            type: 'success',
            message: '签到成功'
          })
        } else {
          Taro.atMessage({
            type: 'error',
            message: '签到失败'
          })
        }
      })
  }

  async function logout () {
    const r:any = await dispatch(userAction.logout())
    if (r.code === 200) Taro.atMessage({
      type: 'success',
      message: '登出成功'
    })
  }

  return (
    <View className={styles["me-wrap"]}>
      {
        hasLogin 
          ? (
            <View className={styles["has-login"]}>
              <View className={styles["user-info"]}>
                <View className={styles["user-info__top"]}>
                  <Image className={styles["avatar"]} src={user?.userInfo?.profile?.avatarUrl} />
                  <View className={styles["basic-info"]}>
                    <View>{user?.userInfo?.profile?.nickname}</View>
                    <AtTag>Lv.{user?.userInfo?.level?.level}</AtTag>
                  </View>
                  <AtButton type='primary' circle={false} className="ding" disabled={hasCheckin} onClick={() => signin()}>{hasCheckin ? '已签到' : '签到'}</AtButton>
                  {/* <AtButton onClick={getuser}>123</AtButton> */}
                </View>
                <View className={styles["user-info__bottom"]}>
                  <View className={styles["bottom-item"]}>
                    <Text>动态</Text>
                    <Text className={styles["bottom-item__val"]}>{user?.userInfo?.profile.eventCount}</Text>
                  </View>
                  <View className={styles["bottom-item"]}>
                    <Text>关注</Text>
                    <Text className={styles["bottom-item__val"]}>{user?.userInfo?.profile.follows}</Text>
                  </View>
                  <View className={styles["bottom-item"]}>
                    <Text>粉丝</Text>
                    <Text className={styles["bottom-item__val"]}>{user?.userInfo?.profile.followeds}</Text>
                  </View>
                  <View className={styles["bottom-item tome"]}>我的资料</View>
                </View>
              </View>
              {menuList()}
              <AtButton type="primary" className={styles["logout"]} onClick={() => logout()}>退出登录</AtButton>
            </View>
          )
          : (
            <View className={styles["to-login"]}>
              <AtButton onClick={toLogin}>去登陆</AtButton>
            </View>
          )
      }
      <AtMessage></AtMessage>
    </View>
    )
}
export default Me