export type serverSettings = {
  next?: NextFetchRequestConfig;
  cache?: RequestCache;
};
export type serverProps = {
  settings?: serverSettings | undefined;
  payload?: any;
};

export type clientSettings = {
  method: string;
  url: string;
  headers: any;
  withCredentials: true;
  data?: any;
  params?: any;
};

export type onSuccessFunction = (a: any) => void;
export type onFailureFunction = (a: any) => void;
export type onRejectFunction = (a: any) => void;
