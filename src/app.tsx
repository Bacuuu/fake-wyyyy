
import { Provider } from 'react-redux'
import configStore from './store'
import { AtMessage } from 'taro-ui'
import 'taro-ui/dist/style/index.scss'
import '@/assets/iconfont.css'
import './app.scss'
const store = configStore()
function App (props: any) {
  // this.props.children 是将要会渲染的页面
  return (
    <Provider store={store}>
      <AtMessage />
      {props.children}
    </Provider>
  )
}

export default App
