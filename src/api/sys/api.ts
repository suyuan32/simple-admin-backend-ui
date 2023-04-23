import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIDsReq, BaseIDReq } from '/@/api/model/baseModel';
import { ApiInfo, ApiListResp } from './model/apiModel';

enum Api {
  CreateApi = '/sys-api/api/create',
  UpdateApi = '/sys-api/api/update',
  GetApiList = '/sys-api/api/list',
  DeleteApi = '/sys-api/api/delete',
  GetApiById = '/sys-api/api',
}

/**
 * @description: Get api list
 */

export const getApiList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<ApiListResp>>(
    { url: Api.GetApiList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new api
 */
export const createApi = (params: ApiInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateApi, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the api
 */
export const updateApi = (params: ApiInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateApi, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete apis
 */
export const deleteApi = (params: BaseIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteApi, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get api By ID
 */
export const getApiById = (params: BaseIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<ApiInfo>>(
    { url: Api.GetApiById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
