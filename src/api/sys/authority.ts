import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseIdReq, BaseResp } from '/@/api/model/baseModel';
import { ApiListResp } from './model/apiModel';
import {
  ApiAuthorityReq,
  ApiListReq,
  MenuAuthorityInfo,
  ApiAuthorityResp,
} from './model/authorityModel';

enum Api {
  CreateOrUpdateOrDeleteApiAuthority = '/sys-api/authority/api',
  CreateOrUpdateOrDeleteMenuAuthority = '/sys-api/authority/menu',
  GetRoleMenuList = '/sys-api/authority/menu/role',
  GetRoleApiList = '/sys-api/authority/api/role',
  GetApiList = '/sys-api/api/list',
}

/**
 *  author: Ryan Su
 *  @description: this function is used to get api list for authorization
 */

export const getApiList = (params: ApiListReq) => {
  return defHttp.post<BaseDataResp<ApiListResp>>({ url: Api.GetApiList, params });
};

/**
 * @description: Get user menu based on api id
 */

export const getApiAuthority = (params: BaseIdReq) => {
  return defHttp.post<BaseDataResp<ApiAuthorityResp>>({ url: Api.GetRoleApiList, params });
};

/**
 *  author: ryan
 *  @description: create a new menu
 */
export const createOrUpdateApiAuthority = (
  params: ApiAuthorityReq,
  mode: ErrorMessageMode = 'message',
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
export const deleteApiAuthority = (params: BaseIdReq, mode: ErrorMessageMode = 'message') => {
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
  mode: ErrorMessageMode = 'message',
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
  return defHttp.post<BaseDataResp<MenuAuthorityInfo>>({
    url: Api.GetRoleMenuList,
    params,
  });
};
