import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIDsReq, BaseIDReq } from '/@/api/model/baseModel';
import { DepartmentInfo, DepartmentListResp } from './model/departmentModel';

enum Api {
  CreateDepartment = '/sys-api/department/create',
  UpdateDepartment = '/sys-api/department/update',
  GetDepartmentList = '/sys-api/department/list',
  DeleteDepartment = '/sys-api/department/delete',
  GetDepartmentById = '/sys-api/department',
}

/**
 * @description: Get department list
 */

export const getDepartmentList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<DepartmentListResp>>(
    { url: Api.GetDepartmentList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new department
 */
export const createDepartment = (params: DepartmentInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateDepartment, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the department
 */
export const updateDepartment = (params: DepartmentInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateDepartment, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete departments
 */
export const deleteDepartment = (params: BaseIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteDepartment, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get department By ID
 */
export const getDepartmentById = (params: BaseIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<DepartmentInfo>>(
    { url: Api.GetDepartmentById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
