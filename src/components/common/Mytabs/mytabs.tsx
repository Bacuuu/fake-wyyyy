import { View } from "@tarojs/components"
import MytabsItem from '@/components/common/Mytabs/mytabItem'
import styles from './index.module.scss'
import { useState } from "react"
import { strongifyStyles } from "@/util"

const strongStyles = strongifyStyles(styles)

const mytabs = function ({children, tabs, className}) {
  const [tabInner, setTabInner] = useState(childrenFilter())
  const [activeTab, setActiveTab] = useState(0)
  const tabClick = function (e) {
    setActiveTab(e)
  }
  function childrenFilter () {
    // els
    if (Array.isArray(children)) {
      return children.filter(i => {
        return i.type && i.type === MytabsItem
      })
    } else if (children.type === MytabsItem) {
      return [children]
    } else {
      return []
    }
  }
  return (
    <View className={strongStyles(`mytabs-wrap ${className}`)}>
      <View className={styles["mytabs-header"] + " no-scroll"}>
        {
          tabs.map((i, index) => {
            return (
              <View className={strongStyles(`mytabs-header_item ${activeTab === index ? 'is-active' : ''}`)} style={`width:${100 / tabs.length}%`} onClick={() =>tabClick(index)}>
                {i}
              </View>
            )
          })
        }
      </View>
      {tabInner.map(i => {
        return (
          <View className={strongStyles(`mytabs-content ${i.props.index === activeTab ? 'is-active' : '' }`)}>
            {i}
          </View>
        )
      })}
    </View>
  )
}

export default mytabs