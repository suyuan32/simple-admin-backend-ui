import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseIdReq, BasePageReq, BaseResp } from '/@/api/model/baseModel';
import { ApiInfo, ApiListResp } from './model/apiModel';

enum Api {
  GetApiList = '/sys-api/api/list',
  CreateOrUpdateOrDeleteApi = '/sys-api/api',
}

/**
 * @description: Get user menu based on api id
 */

export const getApiList = (params: BasePageReq) => {
  return defHttp.post<ApiListResp>({ url: Api.GetApiList, params });
};

/**
 *  author: ryan
 *  @description: create a new api
 */
export const createOrUpdateApi = (params: ApiInfo, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateOrDeleteApi, params: params },
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
  return defHttp.delete<BaseResp>(
    { url: Api.CreateOrUpdateOrDeleteApi, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
