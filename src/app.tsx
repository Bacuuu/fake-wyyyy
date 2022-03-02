
import { Provider } from 'react-redux'
import configStore from './store'
import { AtMessage } from 'taro-ui'
// import 'taro-ui/dist/style/index.scss'
import '@/assets/css/taro-ui.css'
import '@/assets/iconfont.css'
import './app.scss'
import './overwrite.scss'
import dayjs from 'dayjs'
import Duration from 'dayjs/plugin/Duration'
dayjs.extend(Duration)
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
