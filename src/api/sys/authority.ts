import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseIdReq, BaseResp } from '/@/api/model/baseModel';
import { ApiListResp } from './model/apiModel';
import {
  ApiAuthorityReq,
  ApiListReq,
  MenuAuthorityInfo,
  ApiAuthorityResp,
} from './model/authorityModel';

enum Api {
  CreateOrUpdateOrDeleteApiAuthority = '/authority/api',
  CreateOrUpdateOrDeleteMenuAuthority = '/authority/menu',
  GetRoleMenuList = '/authority/menu/role',
  GetRoleApiList = '/authority/api/role',
  GetApiList = '/api/list',
}

/**
 *  author: Ryan Su
 *  @description: this function is used to get api list for authorization
 */

export const getApiList = (params: ApiListReq) => {
  return defHttp.post<ApiListResp>({ url: Api.GetApiList, params });
};

/**
 * @description: Get user menu based on api id
 */

export const getApiAuthority = (params: BaseIdReq) => {
  return defHttp.post<ApiAuthorityResp>({ url: Api.GetRoleApiList, params });
};

/**
 *  author: ryan
 *  @description: create a new menu
 */
export const createOrUpdateApiAuthority = (
  params: ApiAuthorityReq,
  mode: ErrorMessageMode = 'modal',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateOrDeleteApiAuthority, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: delete menu
 */
export const deleteApiAuthority = (params: BaseIdReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.delete<BaseResp>(
    { url: Api.GetRoleMenuList, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description:
 */

export const createOrUpdateMenuAuthority = (
  params: MenuAuthorityInfo,
  mode: ErrorMessageMode = 'modal',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateOrDeleteMenuAuthority, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: get role's menu authorization ids
 */

export const getMenuAuthority = (params: BaseIdReq) => {
  return defHttp.post<MenuAuthorityInfo>({
    url: Api.GetRoleMenuList,
    params,
  });
};
