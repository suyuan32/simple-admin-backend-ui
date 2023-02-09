import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseResp, BaseIDsReq, BaseIDReq } from '/@/api/model/baseModel';
import { MenuParamInfo, MenuParamListReq, MenuParamListResp } from './model/menuParamModel';

enum Api {
  CreateMenuParam = '/sys-api/menu_param/create',
  UpdateMenuParam = '/sys-api/menu_param/update',
  GetMenuParamList = '/sys-api/menu_param/list',
  DeleteMenuParam = '/sys-api/menu_param/delete',
  GetMenuParamById = '/sys-api/menu_param',
}

/**
 * @description: Get menu param list
 */

export const getMenuParamList = (params: MenuParamListReq, mode: ErrorMessageMode = 'message') => {
  return defHttp.post<BaseDataResp<MenuParamListResp>>(
    { url: Api.GetMenuParamList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new menu param
 */
export const createMenuParam = (params: MenuParamInfo, mode: ErrorMessageMode = 'message') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateMenuParam, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the menu param
 */
export const updateMenuParam = (params: MenuParamInfo, mode: ErrorMessageMode = 'message') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateMenuParam, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete menu params
 */
export const deleteMenuParam = (params: BaseIDsReq, mode: ErrorMessageMode = 'message') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteMenuParam, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  @description: Get menu param By ID
 */
export const getMenuParamById = (params: BaseIDReq, mode: ErrorMessageMode = 'message') => {
  return defHttp.post<BaseDataResp<MenuParamInfo>>(
    { url: Api.GetMenuParamById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
