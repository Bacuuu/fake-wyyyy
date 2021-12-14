export function filterBeforeMergeResponse (res) {
  if(res.code !== 200) {
    return {}
  }
  delete res.code
  res.iStatus && delete res.iStatus
  return res
}

export function numberFormatByZh (num, flag:number[] = []) {
  if (num < 10 ** (flag[0] || 4)) {
    return num.toFixed().toString()
  } else if (num < 10 ** (flag[1] || 8)) {
    return (num / 10000).toFixed(2) + '万'
  } else {
    return (num / 10 ** 8).toFixed(2) + '亿'
  }
}
