import { View, Text, Image } from '@tarojs/components'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IStoreType } from '@/types/store'
import { AtInput, AtIcon, AtButton } from 'taro-ui'
import './me.scss'

type IProps = {
  user?: Object
}
function inputChange (e, type) {
  console.log(e, type)
}
function LoginByPhone (props: IProps) {
  const user = useSelector((state:IStoreType) => state.user)
  let [hasLogin] = useState(user.userInfo !== null)
  useEffect(() => {
    
  }, [])
  return (
    <View className='lbf-wrap'>
      <View className="lbf-input">
        <AtIcon value='iphone-x' size='20' color='#999'></AtIcon>
        <AtInput
          name="account"
          border={false}
          placeholder="手机号"
          onChange={e => inputChange(e, 'account')}
        />
      </View>
      <View className="lbf-input">
        <AtIcon value="lock" size='20' color='#999'></AtIcon>
        <AtInput
          name="pwd"
          border={false}
          placeholder="输入登录密码"
          onChange={e => inputChange(e, 'pwd')}
        />
      </View>
      <View className="lbf-btns">
        <AtButton type="primary" >登陆</AtButton>
        <Text>重设密码</Text>
      </View>
    </View>
    )
}
export default LoginByPhone