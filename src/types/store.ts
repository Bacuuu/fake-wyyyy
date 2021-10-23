type IStoreType = {
  user: IStoreUserType
}

type IStoreUserType = {
  userInfo: {
    account: any,
    profile: any,
    level: any,
    musicinfo: any
  }
}
export {
  IStoreType,
  IStoreUserType
}