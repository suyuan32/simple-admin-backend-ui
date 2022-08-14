import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { RoleMenuResp, MenuListResp, MenuParams, CreateOrUpdateMenuReq } from './model/menuModel';
import { BaseIdReq, BaseResp } from '/@/api/model/baseModel';

enum Api {
  GetMenuListByRole = '/sys-api/menu/role',
  GetAllMenu = '/sys-api/menu/list',
  CreateOrUpdateOrDeleteMenu = '/sys-api/menu',
}

/**
 * @description: Get user menu based on role id
 */

export const getMenuList = () => {
  return defHttp.get<RoleMenuResp>({ url: Api.GetMenuListByRole });
};

/**
 *  author: ryan
 *  @description: get all the menu list
 */

export const getAllMenu = (params?: MenuParams) => {
  return defHttp.get<MenuListResp>({ url: Api.GetAllMenu, params });
};

/**
 *  author: ryan
 *  @description: create a new menu
 */
export const createOrUpdateMenu = (
  params: CreateOrUpdateMenuReq,
  mode: ErrorMessageMode = 'modal',
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
 *  @description: delete menu
 */
export const deleteMenu = (params: BaseIdReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.delete<BaseResp>(
    { url: Api.CreateOrUpdateOrDeleteMenu, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
