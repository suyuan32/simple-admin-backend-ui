import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseIDReq, BaseResp } from '/@/api/model/baseModel';
import { ApiListResp } from './model/apiModel';
import {
  ApiAuthorityReq,
  ApiListReq,
  MenuAuthorityInfo,
  ApiAuthorityResp,
} from './model/authorityModel';

enum Api {
  CreateOrUpdateApiAuthority = '/sys-api/authority/api/create_or_update',
  CreateOrUpdateMenuAuthority = '/sys-api/authority/menu/create_or_update',
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
 * @description: Get api authorization list
 */

export const getApiAuthority = (params: BaseIDReq) => {
  return defHttp.post<BaseDataResp<ApiAuthorityResp>>({ url: Api.GetRoleApiList, params });
};

/**
 *  author: ryan
 *  @description: create or update api authorization
 */
export const createOrUpdateApiAuthority = (
  params: ApiAuthorityReq,
  mode: ErrorMessageMode = 'notice',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateApiAuthority, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description:
 */

export const createOrUpdateMenuAuthority = (
  params: MenuAuthorityInfo,
  mode: ErrorMessageMode = 'notice',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateMenuAuthority, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: get role's menu authorization ids
 */

export const getMenuAuthority = (params: BaseIDReq) => {
  return defHttp.post<BaseDataResp<MenuAuthorityInfo>>({
    url: Api.GetRoleMenuList,
    params,
  });
};
