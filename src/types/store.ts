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
  id: string,
  name: string
}

type IStoreMusicType = {
  musicList: {
    list: Array<IMusic>,
    playStatus: 'SX' | 'SJ' | 'DQ' | 'XH'
  },
  musicInfo: {
    playState: boolean,
    id: string,
    url: string,
    name: string,
    picUrl: string,
    authName: string,
    songLength: string,
    dt: number,
    playedTime: string,
    playedDt: number,
    lyric: string
  }
}

export {
  IMusic,
  IStoreType,
  IStoreUserType,
  IStoreMusicType
}