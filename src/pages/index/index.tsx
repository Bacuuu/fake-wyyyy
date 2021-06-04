import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { connect } from 'react-redux'
import { add, reset } from '../../actions/user'
import './index.scss'

@connect(({ user }) => ({
  user
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  reset () {
    dispatch(reset())
  },
}))
class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Text>Hello world</Text>
      </View>
    )
  }
}
export default Index