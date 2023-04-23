import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIDsReq, BaseIDReq } from '/@/api/model/baseModel';
import { DictionaryDetailInfo, DictionaryDetailListResp } from './model/dictionaryDetailModel';

enum Api {
  CreateDictionaryDetail = '/sys-api/dictionary_detail/create',
  UpdateDictionaryDetail = '/sys-api/dictionary_detail/update',
  GetDictionaryDetailList = '/sys-api/dictionary_detail/list',
  DeleteDictionaryDetail = '/sys-api/dictionary_detail/delete',
  GetDictionaryDetailById = '/sys-api/dictionary_detail',
}

/**
 * @description: Get dictionary detail list
 */

export const getDictionaryDetailList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<DictionaryDetailListResp>>(
    { url: Api.GetDictionaryDetailList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new dictionary detail
 */
export const createDictionaryDetail = (
  params: DictionaryDetailInfo,
  mode: ErrorMessageMode = 'notice',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateDictionaryDetail, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the dictionary detail
 */
export const updateDictionaryDetail = (
  params: DictionaryDetailInfo,
  mode: ErrorMessageMode = 'notice',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateDictionaryDetail, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete dictionary details
 */
export const deleteDictionaryDetail = (params: BaseIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteDictionaryDetail, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get dictionary detail By ID
 */
export const getDictionaryDetailById = (params: BaseIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<DictionaryDetailInfo>>(
    { url: Api.GetDictionaryDetailById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
