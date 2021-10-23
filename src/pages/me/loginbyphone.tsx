import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IStoreType } from '@/types/store'
import { AtInput, AtIcon, AtButton, AtMessage } from 'taro-ui'
import { login } from '../../actions/user'
import './me.scss'

type IProps = {
  user?: Object
}
function LoginByPhone (props: IProps) {
  const [account, setAccount] = useState('')
  const [pwd, setPwd] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    
  }, [])


function inputChange (e, type) {
  if (type === 'account') {
    setAccount(e)
  } else {
    setPwd(e)
  }
}
async function handleLogin () {
  try {
    await dispatch(login({
      phone: account,
      password: pwd
    }))
    setTimeout(() => {
      Taro.switchTab({
        url: '/pages/me/me'
      })
    }, 300);
  } catch (err) {
  }
}

return (
    <View className='lbf-wrap'>
      <View className="lbf-input">
        <AtIcon value='iphone-x' size='20' color='#999'></AtIcon>
        <AtInput
          name="account"
          type="phone"
          border={false}
          placeholder="手机号"
          value={account}
          onChange={e => inputChange(e, 'account')}
        />
      </View>
      <View className="lbf-input">
        <AtIcon value="lock" size='20' color='#999'></AtIcon>
        <AtInput
          name="pwd"
          type="password"
          border={false}
          placeholder="输入登录密码"
          value={pwd}
          onChange={e => inputChange(e, 'pwd')}
        />
      </View>
      <View className="lbf-btns">
        <AtButton type="primary" onClick={handleLogin}>登录</AtButton>
        <Text>重设密码</Text>
      </View>
      <AtMessage></AtMessage>
    </View>
    )
}
export default LoginByPhone