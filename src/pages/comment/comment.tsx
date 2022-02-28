import { getSongDetail, getTopComment, hackComment, toggleCommentLike } from "@/api/music"
import { strongifyStyles } from "@/util"
import { View, Text, Image } from "@tarojs/components"
import Taro, { useRouter } from "@tarojs/taro"
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
type sortTypes = 'byHot' | 'byTime'
const strongyStyles = strongifyStyles(styles)
const comment = function () {
  const router:Irouter = useRouter()
  const [commentVal, setCommentVal] = useState('')
  const [textareaHeight, setTextareaHeight] = useState(30)
  const [textareaOnFocus, setTextareaOnFocus] = useState(false)
  const [songInfo, setSongInfo] = useState({
    name: '',
    authName: '',
    picUrl: ''
  })
  const [commentSort, setCommentSort] = useState('byHot' as sortTypes)
  const [commentList, setCommentList] = useState([] as Array<Icomment>)
  const [curRplTo, setCurRplTo] = useState({} as Icomment)
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
  const getCommentsBySort = function () {
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
  }
  useEffect(() => {
    getCommentsBySort()
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
  const replySomeone = function (comment) {
    setCurRplTo(comment)
    setTextareaOnFocus(false)
    Taro.nextTick(() => {
      setTextareaOnFocus(true)
    })
  }
  const textareaLineChange = function (e) {
    setTextareaHeight(e.detail.heightRpx + 10)
  }
  const handleSubmitComment = function () {
    let params = {
      t: 1,
      type: 0,
      id: router.params.songId,
      content: commentVal,
      commentId: ''
    }
    let afterCommentCb = () => {
      // 已经是按照时间排序
      if (commentSort === 'byTime') {
        getCommentsBySort()
      } else {
        setCommentSort('byTime')
      }
    }
    // 是回复某人
    if (curRplTo.user) {
      params.t = 2
      params.commentId = curRplTo.comment.id
      afterCommentCb = () => {
        setCommentList(comments => {
          const _comments = cloneDeep(comments)
          const index = _comments.findIndex(i => i.comment.id === curRplTo.comment.id)
          _comments[index].comment.replayCount ++ 
          return _comments
        })
      }
    }
    hackComment(params).then(r => {
      if (r.code === 200) {
        afterCommentCb()
        setCommentVal('')
      } else {
        // 提示
      }
    })
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
                <View className={styles["comment-block"]} onClick={() =>replySomeone(i)}>
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
        {
          curRplTo.user &&
          <View className={styles["reply-to"]}>
              <Text>回复 </Text>
              <Text> {curRplTo?.user?.name}</Text>
              <View className={styles["icon-close"]} onClick={() => setCurRplTo({} as Icomment)}>x</View>
            </View>
        }
        <View className={styles["reply-content"]}>
          <AtTextarea
            height={textareaHeight}
            count={false}
            fixed
            focus={textareaOnFocus}
            autoFocus={textareaOnFocus}
            className={styles["input-content"]}
            value={commentVal}
            onChange={(e:string) => setCommentVal(e)}
            onLinechange={e => textareaLineChange(e)}></AtTextarea>
          <AtButton type="primary" className={styles["btn-release"]} onClick={handleSubmitComment}>发布</AtButton>
        </View>
      </View>
      <AtMessage></AtMessage>
    </View>
  )
}

export default comment