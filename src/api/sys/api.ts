import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseIdReq, BasePageReq, BaseResp } from '/@/api/model/baseModel';
import { ApiInfo, ApiListResp } from './model/apiModel';

enum Api {
  GetApiList = '/sys-api/api/list',
  CreateOrUpdateApi = '/sys-api/api/create_or_update',
  DeleteApi = '/sys-api/api/delete',
}

/**
 * @description: Get api list
 */

export const getApiList = (params: BasePageReq) => {
  return defHttp.post<BaseDataResp<ApiListResp>>({ url: Api.GetApiList, params });
};

/**
 *  author: ryan
 *  @description: create a new api
 */
export const createOrUpdateApi = (params: ApiInfo, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateApi, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: delete api
 */
export const deleteApi = (params: BaseIdReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteApi, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
