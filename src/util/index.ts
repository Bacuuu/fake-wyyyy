import Taro from '@tarojs/taro'
import dayjs from 'dayjs'
// 拦截器中 响应参数合并过滤
export function filterBeforeMergeResponse (res) {
  if(res.code !== 200) {
    return {}
  }
  delete res.code
  res.iStatus && delete res.iStatus
  return res
}

// 数字标准化为中文换算
export function numberFormatByZh (num, flag:number[] = []) {
  if (num < 10 ** (flag[0] || 4)) {
    return num.toFixed().toString()
  } else if (num < 10 ** (flag[1] || 8)) {
    return (num / 10000).toFixed(2) + '万'
  } else {
    return (num / 10 ** 8).toFixed(2) + '亿'
  }
}

export function padZero (s:string | number) {
  const _s = s.toString()
  return _s.length < 2
    ? _s.length === 0
      ? '00'
      : '0' + _s 
    : _s
}

// 毫秒转化为 hh:mm:ss
export function millMinutes2Hms (time) {
  const _time = parseInt(time)
  const dura = dayjs.duration(_time)
  return time >= 1000 * 60 * 60
    ? `${padZero(dura.hours())}:${padZero(dura.minutes())}:${padZero(dura.seconds())}`
    : `${padZero(dura.minutes())}:${padZero(dura.seconds())}`
}

// 提示功能暂未开发
export function featureDelayMsg (e) {
  e.stopPropagation()
  Taro.atMessage({
    message: '功能暂未开发',
    type: 'info'
  })
}

export const Jumper = {
  // 跳转到歌曲播放页面
  playSong: function (id) {
    Taro.navigateTo({
      url: '/pages/musicplay/musicPlay' + '?songId=' + id
    })
  },
  // 跳转到歌单
  toSheet: function (id) {
    Taro.navigateTo({
      url: '/pages/sheet/sheetList?id=' + id,
    })
  }
}
