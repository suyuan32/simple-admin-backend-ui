import { BaseListResp } from '/@/api/model/baseModel';

/**
 *  @description: DictionaryDetail info response
 */
export interface DictionaryDetailInfo {
  id: number;
  createdAt?: number;
  updatedAt?: number;
  status?: number;
  title?: string;
  key?: string;
  value?: string;
}

/**
 *  @description: DictionaryDetail list response
 */

export type DictionaryDetailListResp = BaseListResp<DictionaryDetailInfo>;

/**
 *  @description: Dictionary name request
 */
export interface DictionaryNameReq {
  name: string;
}
