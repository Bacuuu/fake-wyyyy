import { getFloorComment, getSongDetail, getTopComment, hackComment, toggleCommentLike } from "@/api/music"
import { View, Text, Image } from "@tarojs/components"
import Taro, { useRouter } from "@tarojs/taro"
import { useState, useEffect, useMemo } from "react"
import { AtTextarea, AtIcon, AtMessage, AtButton, AtFloatLayout } from "taro-ui"
import { cloneDeep } from 'lodash'
import styles from './comment.module.scss'
import { Jumper, numberFormatByZh } from "@/util"
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
    showReplyCount: boolean,
    beReplied?: null | {
      userName: string,
      userId: number,
      commentId: string,
      commentContent: string
    }
  }
}
type sortTypes = 'byHot' | 'byTime'
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
  const [showFloorComment, setShowFloorComment] = useState(false)
  const [floorComments, setFloorComments] = useState([] as Array<Icomment>)
  useEffect(() => {
    getSongDetail({
      ids: router.params.songId
    }).then(r => {
      setSongInfo({
        name: r.songs[0].name,
        authName: r.songs[0].ar[0].name,
        picUrl: r.songs[0].al.picUrl
      })
    })
  }, [])
  useEffect(() => {
    setCurRplTo({} as Icomment)
  }, [showFloorComment])
  enum sortDic {
    byHot = 2,
    byTime = 3
  }
  // 评论格式转化 接口数据 -> Icomment
  const commentTransfer = function (e):Icomment {
    const beReplied = Array.isArray(e.beReplied) && e.beReplied.length
        ? {
            userId: e.beReplied[0].user.userId,
            userName:e.beReplied[0].user.nickname,
            commentId: e.beReplied[0].beRepliedCommentId,
            commentContent: e.beReplied[0].content,
          }
        : null
    return {
      user: {
        id: e.user.userId,
        name: e.user.nickname,
        picUrl: e.user.avatarUrl
      },
      comment: {
        id: e.commentId,
        content: e.content,
        displayTime: e.needDisplayTime,
        timeStr: e.timeStr,
        likedCount: e.likedCount,
        liked: e.liked,
        replayCount: e?.showFloorComment?.replyCount || 0,
        showReplyCount: e?.showFloorComment?.showReplyCount || false,
        beReplied
      }
    }
  }
  const getCommentsBySort = function () {
    getTopComment({
      id: router.params.songId,
      type: 0,
      sortType: sortDic[commentSort]
    }).then(r => {
      setCommentList(r.data.comments.map(i => {
        return commentTransfer(i)
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
  const toggleLike = function (e, info:Icomment) {
    e.stopPropagation()
    // 确定是楼内还是普通
    const updateCommentListFunc = showFloorComment ? setFloorComments : setCommentList
    toggleCommentLike({
      id: router.params.songId,
      cid: info.comment.id,
      t: info.comment.liked ? 0 : 1,
      type: 0
    }).then(r => {
      if (r.code === 200) {
        updateCommentListFunc(e => {
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
  // 行数改变
  const textareaLineChange = function (e) {
    setTextareaHeight(e.detail.heightRpx + 10)
  }
  // 提交评论
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
        Taro.atMessage({
          type: 'warning',
          message: r.msg
        })
      }
    })
  }
  // 查看楼内评论
  const handleShowFloorComment = function (e, params:{
    commentId: string,
    sourceId: string,
    sourceType: number
  }) {
    e.stopPropagation()
    getFloorComment({
      parentCommentId: params.commentId,
      id: params.sourceId,
      type: params.sourceType
    }).then(r => {
      if (r.data) {
        setFloorComments(Array.prototype.concat.call([], commentTransfer(r.data.ownerComment), r.data.comments.map(i => commentTransfer(i))))
      }
    })
    setShowFloorComment(true)
  }
  const SingleComment = function(props:{info: Icomment}) {
    return (
    <View className={styles["comment-block"]} onClick={() => replySomeone(props.info)}>
      <View className={styles["avatar"]}>
        <Image src={props.info.user.picUrl}></Image>
      </View>
      <View className={styles["info"]}>
        <View className={styles["info-top"]}>
          <Text className="ellipsis">{props.info.user.name}</Text>
          <View className={styles["like"]} onClick={e => toggleLike(e, props.info)}>
            <Text>{numberFormatByZh(props.info.comment.likedCount) === '0' ? '' : numberFormatByZh(props.info.comment.likedCount)}</Text>
            <AtIcon value="heart-2" size="16" color={props.info.comment.liked ? 'rgb(255, 42, 42)' : 'rgb(153, 153, 153)'}></AtIcon>
          </View>
        </View>
        <View className={styles["info-middle"]}>{props.info.comment.timeStr}</View>
        <View className={styles["info-bottom"]}>{props.info.comment.content}</View>
        {
          props.info.comment.showReplyCount ? 
          <View className={styles["info-more"]} onClick={(e) => handleShowFloorComment(e, {
            commentId:props.info.comment.id,
            sourceId: router.params.songId,
            sourceType: 0
            })}>
            {props.info.comment.replayCount}条回复&gt;
          </View> :
          ''
        }
        {
          // 数据样式及判断
          // 符合展示回复的评论的情况
          floorComments.length && props.info.comment.beReplied && props.info.comment.beReplied.commentId !== floorComments[0].comment.id
          ? <View className={styles["floor-comment"]}>
              <Text className={styles["user"]}>@{props.info.comment.beReplied.userName}</Text>
              <Text>：{props.info.comment.beReplied.commentContent}</Text>
            </View>
          : ''
        }
      </View>
    </View>
    )
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
            useMemo(()=> {
              return commentList.map(i => {
                return (
                  <SingleComment info={i}></SingleComment>
                )
              })
            }, [commentList])
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
      <AtFloatLayout className="custom-at at-floatlayout-high" isOpened={showFloorComment} onClose={() => setShowFloorComment(false)}>
        <View className={styles["floor-comment__wrap"] + ' no-scroll'}>
        {
          useMemo(() => {
            return floorComments.length
              ? floorComments.map(i => {
                return <SingleComment info={i}></SingleComment>
              })
              : ''
          }, [floorComments])
        }
        </View>
      </AtFloatLayout>
    </View>
  )
}

export default comment