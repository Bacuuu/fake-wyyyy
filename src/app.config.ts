export default {
  pages: [
    'pages/index/index',
    'pages/sheet/sheetList',
    'pages/home/home',
    'pages/us/us',
    'pages/me/me',
    'pages/me/login',
    'pages/me/loginbyphone',
    'pages/musicplay/musicPlay'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    list: [{
      iconPath: './assets/baricon/music.png',
      selectedIconPath: './assets/baricon/_music.png',
      pagePath: 'pages/index/index',
      text: '发现音乐'
    }, {
      iconPath: './assets/baricon/home.png',
      selectedIconPath: './assets/baricon/_home.png',
      pagePath: 'pages/home/home',
      text: '我的音乐'
    }, {
      iconPath: './assets/baricon/us.png',
      selectedIconPath: './assets/baricon/_us.png',
      pagePath: 'pages/us/us',
      text: '朋友'
    }, {
      iconPath: './assets/baricon/me.png',
      selectedIconPath: './assets/baricon/_me.png',
      pagePath: 'pages/me/me',
      text: '账号'
    }],
    color: '#8a8a8a',
    selectedColor: '#333'
  }
}
