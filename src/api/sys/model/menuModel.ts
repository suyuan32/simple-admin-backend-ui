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
 *  @description: the items for menu list table
 */
export interface MenuInfo {
  id?: number;
  type?: number;
  trans?: string;
  parentId?: number;
  path?: string;
  name?: string;
  redirect?: string;
  component?: string;
  sort?: number;
  disabled?: boolean;
  meta: Meta;
  createdAt?: number;
  updatedAt?: number;
}

interface Meta {
  title?: string;
  icon?: string;
  hideMenu?: boolean;
  hideBreadcrumb?: boolean;
  ignoreKeepAlive?: boolean;
  hideTab?: boolean;
  frameSrc?: string;
  carryParam?: boolean;
  hideChildrenInMenu?: boolean;
  affix?: boolean;
  dynamicLevel?: number;
  realPath?: string;
}

/**
 *  author: ryan
 *  @description: menu list response model
 */
export type MenuListResp = BaseListResp<MenuInfo>;

/**
 * @description: Get menu return value
 */
export type RoleMenuResp = BaseListResp<RouteItem>;
