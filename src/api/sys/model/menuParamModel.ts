import { BaseListResp } from '/@/api/model/baseModel';

/**
 *  @description: MenuParam info response
 */
export interface MenuParamInfo {
  id: number;
  createdAt?: number;
  updatedAt?: number;
  type?: string;
  key?: string;
  value?: string;
  menuId?: number;
}

export interface MenuParamListReq {
  menuId: number;
}

/**
 *  @description: MenuParam list response
 */

export type MenuParamListResp = BaseListResp<MenuParamInfo>;
