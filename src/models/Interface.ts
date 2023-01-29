export interface authContextType {
  user: any;
  signin: (user: any, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

export interface infoSuccessResponseType {
  success: boolean;
  data: {
    info: string
  };
}

export interface authSuccessResponseType {
  success: boolean;
  data: {
    token: string
  };
}

export interface userInfoSuccessResponseType {
  success: boolean;
  data: {
    fullname: string
    email: string
  };
}

export interface authorSuccessResponseType {
  success: boolean;
  data: {
    authorId: number
    name: string
  };
}

export interface quoteSuccessResponseType {
  success: boolean;
  data: {
    quoteId: number,
    authorId: number,
    quote: string
  };
}
