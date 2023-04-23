import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseResp, BaseIDReq } from '/@/api/model/baseModel';
import { MenuInfo, MenuListResp, RoleMenuResp } from './model/menuModel';

enum Api {
  CreateMenu = '/sys-api/menu/create',
  UpdateMenu = '/sys-api/menu/update',
  GetMenuList = '/sys-api/menu/list',
  DeleteMenu = '/sys-api/menu/delete',
  GetMenuById = '/sys-api/menu',
  GetMenuListByRole = '/sys-api/menu/role/list',
}

/**
 * @description: Get user menu list by role id
 */

export const getMenuListByRole = () => {
  return defHttp.get<BaseDataResp<RoleMenuResp>>({ url: Api.GetMenuListByRole });
};

/**
 * @description: Get menu list
 */

export const getMenuList = (mode: ErrorMessageMode = 'notice') => {
  return defHttp.get<BaseDataResp<MenuListResp>>(
    { url: Api.GetMenuList },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new menu
 */
export const createMenu = (params: MenuInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateMenu, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the menu
 */
export const updateMenu = (params: MenuInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateMenu, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete menus
 */
export const deleteMenu = (params: BaseIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteMenu, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get menu By ID
 */
export const getMenuById = (params: BaseIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<MenuInfo>>(
    { url: Api.GetMenuById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
