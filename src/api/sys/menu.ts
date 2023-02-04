import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import {
  RoleMenuResp,
  MenuListResp,
  CreateOrUpdateMenuReq,
  MenuParamList,
  CreateOrUpdateMenuParamReq,
} from './model/menuModel';
import { BaseDataResp, BaseIdReq, BaseResp } from '/@/api/model/baseModel';

enum Api {
  GetMenuListByRole = '/sys-api/menu/role',
  GetAllMenu = '/sys-api/menu/list',
  CreateOrUpdateMenu = '/sys-api/menu/create_or_update',
  DeleteMenu = '/sys-api/menu/delete',
  CreateOrUpdateMenuParam = '/sys-api/menu/param/create_or_update',
  DeleteMenuParam = '/sys-api/menu/param/delete',
  GetMenuParamsByMenuId = '/sys-api/menu/param/list',
}

/**
 * @description: Get user menu list by role id
 */

export const getMenuList = () => {
  return defHttp.get<BaseDataResp<RoleMenuResp>>({ url: Api.GetMenuListByRole });
};

/**
 *  author: ryan
 *  @description: Get all the menus
 */

export const getAllMenu = () => {
  return defHttp.get<BaseDataResp<MenuListResp>>({ url: Api.GetAllMenu });
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
    { url: Api.CreateOrUpdateMenu, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: Delete a menu
 */
export const deleteMenu = (params: BaseIdReq, mode: ErrorMessageMode = 'message') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteMenu, params: params },
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
    { url: Api.CreateOrUpdateMenuParam, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: Delete a menu parameter
 */
export const deleteMenuParam = (params: BaseIdReq, mode: ErrorMessageMode = 'message') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteMenuParam, params: params },
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
