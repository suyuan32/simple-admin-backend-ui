import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIDsReq, BaseIDReq } from '/@/api/model/baseModel';
import { RoleInfo, RoleListResp } from './model/roleModel';

enum Api {
  CreateRole = '/sys-api/role/create',
  UpdateRole = '/sys-api/role/update',
  GetRoleList = '/sys-api/role/list',
  DeleteRole = '/sys-api/role/delete',
  GetRoleById = '/sys-api/role',
}

/**
 * @description: Get role list
 */

export const getRoleList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<RoleListResp>>(
    { url: Api.GetRoleList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new role
 */
export const createRole = (params: RoleInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateRole, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the role
 */
export const updateRole = (params: RoleInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateRole, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete roles
 */
export const deleteRole = (params: BaseIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteRole, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get role By ID
 */
export const getRoleById = (params: BaseIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<RoleInfo>>(
    { url: Api.GetRoleById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
