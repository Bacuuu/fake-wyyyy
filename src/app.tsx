import { Component } from 'react'
import './app.scss'
import { Provider } from 'react-redux'
import configStore from './store'
import { AtMessage } from 'taro-ui'
import 'taro-ui/dist/style/index.scss'

const store = configStore()
class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return (
      <Provider store={store}>
        <AtMessage />
        {this.props.children}
      </Provider>
    )
  }
}

export default App
