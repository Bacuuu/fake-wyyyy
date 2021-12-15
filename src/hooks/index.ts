import Taro from '@tarojs/taro'
import { useReady } from "@tarojs/taro"
import { useState } from 'react'

export const useLazyLoad = function (cb:Function, toBottom?:number, el?:string) {
  const [height, setHeight] = useState(0)
  useReady(() => {
    const query = Taro.createSelectorQuery()
    const _el = el || '#loading-content'
    query.select(_el)
    .boundingClientRect()
    .exec(res => {
      if (!res[0]) throw new Error("未找到元素"+ _el);
      setHeight(res[0].height)
    })
  })
  const onScroll = function (e) {
    const { scrollTop, scrollHeight } = e.detail
    if (scrollTop + height > scrollHeight - (toBottom || 200)) {
      cb()
    }
  }
  return onScroll
}