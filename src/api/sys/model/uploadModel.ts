export interface UploadApiResp {
  msg: string;
  code: number;
  data: UploadInfo;
}

export interface UploadInfo {
  name: string;
  url: string;
}
