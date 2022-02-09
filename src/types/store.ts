type IStoreType = {
  user: IStoreUserType,
  music: IStoreMusicType
}

type IStoreUserType = {
  userInfo: {
    account: any,
    profile: any,
    level: any,
    musicinfo: any
  }
}

interface IMusic {
  id: ''
}

type IStoreMusicType = {
  musicList: {
    list: Array<IMusic>,
    playStatus: 'SX' | 'SJ' | 'DQ'
  },
  musicInfo: {
    playState: boolean,
    id: string,
    url: string,
    name: string,
    picUrl: string,
    authName: string,
    songLength: string,
    playedTime: string,
    lyric: string
  }
}

export {
  IStoreType,
  IStoreUserType,
  IStoreMusicType
}