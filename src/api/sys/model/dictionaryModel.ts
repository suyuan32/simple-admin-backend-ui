import { BaseListResp } from '../../model/baseModel';

/**
 *  author: Ryan Su
 *  @description: dictionary info response
 */
export interface DictionaryInfo {
  id: number;
  createdAt?: number;
  name: string;
  title: string;
  description: string;
  status: boolean;
}

/**
 *  author: Ryan Su
 *  @description: dictionary list response
 */

export type DictionaryListResp = BaseListResp<DictionaryInfo>;

/**
 *  author: Ryan Su
 *  @description: dictionary detail info response
 */
export interface DictionaryDetailInfo {
  id: number;
  createdAt?: number;
  title: string;
  key: string;
  value: string;
  status: number;
  parentId: number;
}

/**
 *  author: Ryan Su
 *  @description: dictionary detail list response
 */

export type DictionaryDetailListResp = BaseListResp<DictionaryDetailInfo>;
