import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseIdReq, BasePageReq, BaseResp } from '/@/api/model/baseModel';
import { RoleInfo, RoleListResp } from './model/roleModel';

enum Api {
  GetRoleList = '/sys-api/role/list',
  CreateOrUpdateOrDeleteRole = '/sys-api/role',
  SetRoleStatus = '/sys-api/role/status',
}

/**
 * @description: Get user menu based on role id
 */

export const getRoleList = (params: BasePageReq) => {
  return defHttp.post<RoleListResp>({ url: Api.GetRoleList, params });
};

/**
 *  author: ryan
 *  @description: create a new menu
 */
export const createOrUpdateRole = (params: RoleInfo, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateOrDeleteRole, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: delete menu
 */
export const deleteRole = (params: BaseIdReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.delete<BaseResp>(
    { url: Api.CreateOrUpdateOrDeleteRole, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: set role's status
 */
export const setRoleStatus = (id: number, status: number) =>
  defHttp.post({ url: Api.SetRoleStatus, params: { id, status } });
