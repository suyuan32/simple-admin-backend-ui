import { BaseListResp } from '../../model/baseModel';

/**
 *  author: Ryan Su
 *  @description: role info response
 */
export interface RoleInfo {
  id: number;
  createdAt?: number;
  title: string;
  name: string;
  value: string;
  defaultRouter: string;
  status: number;
  remark: string;
  orderNo: number;
}

/**
 *  author: Ryan Su
 *  @description: role list resource
 */

export type RoleListResp = BaseListResp<RoleInfo>;
