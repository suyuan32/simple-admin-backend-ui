import { BaseDataResp } from '../../model/baseModel';

export type UploadApiResult = BaseDataResp<UploadInfo>;

export interface UploadInfo {
  name: string;
  url: string;
}
