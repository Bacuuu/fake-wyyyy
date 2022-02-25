import { getSongDetail, getTopComment, toggleCommentLike } from "@/api/music"
import { strongifyStyles } from "@/util"
import { View, Text, Image } from "@tarojs/components"
import { useRouter } from "@tarojs/taro"
import { useState, useEffect } from "react"
import { AtTextarea, AtIcon, AtMessage, AtButton } from "taro-ui"
import { cloneDeep } from 'lodash'
import styles from './comment.module.scss'
interface Irouter {
  params: {
    songId: string
  }
}
interface Icomment {
  user: {
    id: number,
    name: string,
    picUrl: string
  },
  comment: {
    id: string,
    content: string,
    displayTime: boolean,
    timeStr: string,
    likedCount: number,
    liked: boolean,
    replayCount: number,
    showReplyCount: boolean
  }
}
const strongyStyles = strongifyStyles(styles)
const comment = function () {
  const router:Irouter = useRouter()
  const [commentVal, setCommentVal] = useState('')
  const [songInfo, setSongInfo] = useState({
    name: '',
    authName: '',
    picUrl: ''
  })
  const [commentSort, setCommentSort] = useState('byHot')
  const [commentList, setCommentList] = useState([] as Array<Icomment>)
  useEffect(() => {
    getSongDetail({
      ids: router.params.songId
    }).then(r => {
      setSongInfo({
        name: r.songs[0].al.name,
        authName: r.songs[0].ar[0].name,
        picUrl: r.songs[0].al.picUrl
      })
    })
  }, [])
  enum sortDic {
    byHot = 2,
    byTime = 3
  }
  useEffect(() => {
    getTopComment({
      id: router.params.songId,
      type: 0,
      sortType: sortDic[commentSort]
    }).then(r => {
      setCommentList(r.data.comments.map(i => {
        return {
          user: {
            id: i.user.userId,
            name: i.user.nickname,
            picUrl: i.user.avatarUrl
          },
          comment: {
            id: i.commentId,
            content: i.content,
            displayTime: i.needDisplayTime,
            timeStr: i.timeStr,
            likedCount: i.likedCount,
            liked: i.liked,
            replayCount: i.showFloorComment.replyCount,
            showReplyCount: i.showFloorComment.showReplyCount
          }
        }
      }))
    })
  }, [commentSort])
  const changeSort = function (e) {
    setCommentSort(e)
  }
  // 评论点赞逻辑
  const toggleLike = function (info:Icomment) {
    toggleCommentLike({
      id: router.params.songId,
      cid: info.comment.id,
      t: info.comment.liked ? 0 : 1,
      type: 0
    }).then(r => {
      console.log(r)
      if (r.code === 200) {
        setCommentList(e => {
          const copyVal = cloneDeep(e)
          const currentIndex = copyVal.findIndex(i => i.comment.id === info.comment.id)
          if (currentIndex !== -1) {
            // 拷贝 更换值
            const copyC = copyVal[currentIndex]
            if (info.comment.liked) {
              copyC.comment.liked = false
              copyC.comment.likedCount --
            } else {
              copyC.comment.liked = true
              copyC.comment.likedCount ++
            }
            // 替换值
            copyVal.splice(currentIndex, 1, copyC)
          }
          return copyVal
        })
      }
    })
  }
  // 点击回复某人
  const replySomeone = function (userInfo) {
    
  }
  return (
    <View className={styles["comment-wrap"]}>
      <View className={styles["song-info"]}>
        <Image src={songInfo.picUrl}></Image>
        <View className={styles["info-content"]}>
          <Text className={styles["name"]}>{songInfo.name}</Text>
          <Text className={styles["auth-name"]}>{songInfo.authName}</Text>
        </View>
      </View>
      <View>
        <View className={styles["block-header"]}>
          <Text className={styles["block-header__text"]}>歌曲评论</Text>
          <View className={styles["block-header__sort"]}>
            <Text onClick={() => changeSort('byHot')} className={commentSort === 'byHot' ? styles["is-current"] : ""}>最热</Text>
            <Text className={styles["divider"]}>|</Text>
            <Text onClick={() =>changeSort('byTime')} className={commentSort === 'byTime' ? styles["is-current"] : ""}>最新</Text>
          </View>
        </View>
        <View className={styles["comment-list"]}>
          {
            commentList.map(i => {
              return (
                <View className={styles["comment-block"]}>
                  <View className={styles["avatar"]}>
                    <Image src={i.user.picUrl}></Image>
                  </View>
                  <View className={styles["info"]}>
                    <View className={styles["info-top"]}>
                      <Text className="ellipsis">{i.user.name}</Text>
                      <View className={styles["like"]} onClick={() => toggleLike(i)}>
                        <Text>{i.comment.likedCount || ''}</Text>
                        <AtIcon value="heart-2" size="16" color={i.comment.liked ? 'rgb(255, 42, 42)' : 'rgb(153, 153, 153)'}></AtIcon>
                      </View>
                    </View>
                    <View className={styles["info-middle"]}>{i.comment.timeStr}</View>
                    <View className={styles["info-bottom"]}>{i.comment.content}</View>
                    <View className={strongyStyles("info-more" + (i.comment.showReplyCount ? "" : " hidden"))}>
                      {i.comment.replayCount}条回复&gt;
                    </View>
                  </View>
                </View>
              )
            })
          }
        </View>
      </View>
      <View className={styles["comment-input"]}>
        <AtTextarea height={40} count={false} fixed className={styles["input-content"]} value={commentVal} onChange={(e:string) => setCommentVal(e)}></AtTextarea>
        <AtButton type="primary" className={styles["btn-release"]}>发布</AtButton>
      </View>
      <AtMessage></AtMessage>
    </View>
  )
}

export default comment