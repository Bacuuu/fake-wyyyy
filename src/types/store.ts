type IStoreType = {
  user: IStoreUserType
}

type IStoreUserType = {
  userInfo: {
    account: {
      account: {
        id: number;
        userName: string;
        type: number;
        status: number;
        whitelistAuthority: number;
        createTime: number;
        tokenVersion: number;
        ban: number;
        baoyueVersion: number;
        donateVersion: number;
        vipType: number;
        anonimousUser: boolean;
        paidFee: boolean;
      },
      profile: {
        userId: number;
        userType: number;
        nickname: string;
        avatarImgId: number;
        avatarUrl: string;
        backgroundImgId: number;
        backgroundUrl: string;
        signature: string;
        createTime: number;
        userName: string;
        accountType: number;
        shortUserName: string;
        birthday: number;
        authority: number;
        gender: number;
        accountStatus: number;
        province: number;
        city: number;
        authStatus: number;
        description: String;
        detailDescription: String;
        defaultAvatar: boolean;
        expertTags: String;
        experts: String;
        djStatus: number;
        locationStatus: number;
        vipType: number;
        followed: boolean;
        mutual: boolean;
        authenticated: boolean;
        lastLoginTime: number;
        lastLoginIP: string;
        remarkName: string;
        viptypeVersion: number;
        authenticationTypes: number;
        avatarDetail: string;
        anchor: boolean;
      }
    },
    level: {
      userId: number;
      info: string;
      progress: number;
      nextPlayCount: number;
      nextLoginCount: number;
      nowPlayCount: number;
      nowLoginCount: number;
      level: number;
    },
    musicinfo: {
      programCount: number;
      djRadioCount: number;
      mvCount: number;
      artistCount: number;
      newProgramCount: number;
      createDjRadioCount: number;
      createdPlaylistCount: number;
      subPlaylistCount: number;
    }
  }
}
export {
  IStoreType,
  IStoreUserType
}