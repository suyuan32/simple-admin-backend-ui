import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import {
  RoleMenuResp,
  MenuListResp,
  MenuParams,
  CreateOrUpdateMenuReq,
  MenuParamList,
  CreateOrUpdateMenuParamReq,
} from './model/menuModel';
import { BaseDataResp, BaseIdReq, BaseResp } from '/@/api/model/baseModel';

enum Api {
  GetMenuListByRole = '/sys-api/menu/role',
  GetAllMenu = '/sys-api/menu/list',
  CreateOrUpdateOrDeleteMenu = '/sys-api/menu',
  CreateOrUpdateOrDeleteMenuParam = '/sys-api/menu/param',
  GetMenuParamsByMenuId = '/sys-api/menu/param/list',
}

/**
 * @description: Get user menu based on role id
 */

export const getMenuList = () => {
  return defHttp.get<BaseDataResp<RoleMenuResp>>({ url: Api.GetMenuListByRole });
};

/**
 *  author: ryan
 *  @description: Get all the menu list
 */

export const getAllMenu = (params?: MenuParams) => {
  return defHttp.get<BaseDataResp<MenuListResp>>({ url: Api.GetAllMenu, params });
};

/**
 *  author: ryan
 *  @description: Create a new menu
 */
export const createOrUpdateMenu = (
  params: CreateOrUpdateMenuReq,
  mode: ErrorMessageMode = 'message',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateOrDeleteMenu, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: Delete menu
 */
export const deleteMenu = (params: BaseIdReq, mode: ErrorMessageMode = 'message') => {
  return defHttp.delete<BaseResp>(
    { url: Api.CreateOrUpdateOrDeleteMenu, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: ryan
 *  @description: Create a new menu parameter for the menu
 */
export const createOrUpdateMenuParam = (
  params: CreateOrUpdateMenuParamReq,
  mode: ErrorMessageMode = 'message',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateOrDeleteMenuParam, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: Delete menu parameter
 */
export const deleteMenuParam = (params: BaseIdReq, mode: ErrorMessageMode = 'message') => {
  return defHttp.delete<BaseResp>(
    { url: Api.CreateOrUpdateOrDeleteMenuParam, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description:
 */
export const getMenuParamListByMenuId = (params: BaseIdReq, mode: ErrorMessageMode = 'message') => {
  return defHttp.post<BaseDataResp<MenuParamList>>(
    { url: Api.GetMenuParamsByMenuId, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
