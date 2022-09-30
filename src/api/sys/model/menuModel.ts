import type { RouteMeta } from 'vue-router';
import { BaseListResp } from '../../model/baseModel';
export interface RouteItem {
  path: string;
  component: any;
  meta: RouteMeta;
  name?: string;
  alias?: string | string[];
  redirect?: string;
  caseSensitive?: boolean;
  children?: RouteItem[];
}

/**
 *  author: ryan
 *  @description: Get menu by page
 */
export interface MenuPageResp {
  total: number;
  data: RouteItem[];
}

/**
 *  author: ryan
 *  @description: menu params for get all menu api
 */

export type MenuParams = {
  menuName?: string;
  status?: string;
};

/**
 *  author: ryan
 *  @description: the items for menu list table
 */
export interface MenuListItem {
  id: number;
  type: number;
  parentId: number;
  path: string;
  name: string;
  redirect: string;
  component: string;
  orderNo: number;
  disabled: boolean;
  title: string;
  icon: string;
  hideMenu: boolean;
  hideBreadcrumb: boolean;
  currentActiveMenu: string;
  ignoreKeepAlive: boolean;
  hideTab: boolean;
  frameSrc: string;
  carryParam: boolean;
  hideChildrenInMenu: boolean;
  affix: boolean;
  dynamicLevel: number;
  realPath: string;
  children: MenuListItem[];
}

/**
 *  author: ryan
 *  @description: menu list response model
 */
export type MenuListResp = BaseListResp<MenuListItem>;

/**
 *  author: ryan
 *  @description: create menu reqest model
 */
export interface CreateOrUpdateMenuReq {
  id: number;
  type: number;
  parentId: number;
  path: string;
  name: string;
  redirect: string;
  component: string;
  orderNo: number;
  disabled: boolean;
  title: string;
  icon: string;
  hideMenu: boolean;
  hideBreadcrumb: boolean;
  currentActiveMenu: string;
  ignoreKeepAlive: boolean;
  hideTab: boolean;
  frameSrc: string;
  carryParam: boolean;
  hideChildrenInMenu: boolean;
  affix: boolean;
  dynamicLevel: number;
  realPath: string;
}

/**
 * @description: Get menu return value
 */
export type RoleMenuResp = RouteItem[];

/**
 *  author: Ryan Su
 *  @description: Create or update a extra menu parameter request
 */
export interface CreateOrUpdateMenuParamReq {
  id: number;
  dataType: string;
  menuId: number;
  value: string;
  key: string;
}

/**
 *  author: Ryan Su
 *  @description: Menu extra parameter information
 */
export interface MenuParamInfo extends CreateOrUpdateMenuParamReq {
  createAt: number;
  updateAt: number;
}

/**
 *  author: Ryan Su
 *  @description: Menu parameters list
 */
export interface MenuParamList {
  total: number;
  data: MenuParamInfo[];
}
