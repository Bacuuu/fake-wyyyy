import Taro from '@tarojs/taro'
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

// 提示功能暂未开发
export function featureDelayMsg (e) {
  e.stopPropagation()
  Taro.atMessage({
    message: '功能暂未开发',
    type: 'info'
  })
}
