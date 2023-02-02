import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIdsReq, BaseIdReq } from '/@/api/model/baseModel';
import { DepartmentInfo, DepartmentListResp } from './model/departmentModel';

enum Api {
  CreateOrUpdateDepartment = '/sys-api/department/create_or_update',
  GetDepartmentList = '/sys-api/department/list',
  DeleteDepartment = '/sys-api/department/delete',
  BatchDeleteDepartment = '/sys-api/department/batch_delete',
  SetDepartmentStatus = '/sys-api/department/status',
}

/**
 * @description: Get department list
 */

export const getDepartmentList = (params: BaseListReq) => {
  return defHttp.post<BaseDataResp<DepartmentListResp>>({ url: Api.GetDepartmentList, params });
};

/**
 *  @description: create a new department
 */
export const createOrUpdateDepartment = (
  params: DepartmentInfo,
  mode: ErrorMessageMode = 'modal',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateDepartment, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  @description: delete department
 */
export const deleteDepartment = (params: BaseIdReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteDepartment, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  @description: batch delete departments
 */
export const batchDeleteDepartment = (params: BaseIdsReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.BatchDeleteDepartment, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  @description: set the department status
 */
export const setDepartmentStatus = (id: string, status: number) =>
  defHttp.post({ url: Api.SetDepartmentStatus, params: { id, status } });
