/**
 *  author: Ryan Su
 *  @description:
 */

import { BaseListResp } from '../../model/baseModel';

export interface MenuAuthorityInfo {
  roleId: number;
  menuIds: number[];
}

/**
 *  author: Ryan Su
 *  @description: this interface is used to get the api list for authorization
 */

export interface ApiListReq {
  page: number;
  pageSize: number;
  path?: string;
  group?: string;
  description?: string;
  method?: string;
}

/**
 *  author: Ryan Su
 *  @description:
 */

export interface ApiAuthorityReq {
  roleId: number;
  data: ApiAuthorityInfo[];
}

export interface ApiAuthorityInfo {
  path: string;
  method: string;
}

export type ApiAuthorityResp = BaseListResp<ApiAuthorityInfo>;
