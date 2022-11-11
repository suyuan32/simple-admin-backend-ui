import { BaseListResp } from '../../model/baseModel';

/**
 *  author: Ryan Su
 *  @description: api info response
 */
export interface ApiInfo {
  id: number;
  createdAt?: number;
  title: string;
  path: string;
  description: string;
  group: string;
  method: string;
}

/**
 *  author: Ryan Su
 *  @description: api list response
 */

export type ApiListResp = BaseListResp<ApiInfo>;
