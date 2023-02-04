import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseIdReq, BaseListReq, BaseResp } from '/@/api/model/baseModel';
import {
  DictionaryDetailInfo,
  DictionaryDetailListResp,
  DictionaryInfo,
  DictionaryListResp,
} from './model/dictionaryModel';

enum Api {
  GetDictionaryList = '/sys-api/dict/list',
  CreateOrUpdateDictionary = '/sys-api/dict/create_or_update',
  DeleteDictionary = '/sys-api/dict/delete',
  GetDictionaryDetailList = '/sys-api/dict/detail/list',
  CreateOrUpdateDictionaryDetail = '/sys-api/dict/detail/create_or_update',
  DeleteDictionaryDetail = '/sys-api/dict/detail/delete',
}

/**
 * @description: Get dictionary list
 */

export const getDictionaryList = (params: BaseListReq) => {
  return defHttp.post<BaseDataResp<DictionaryListResp>>({ url: Api.GetDictionaryList, params });
};

/**
 *  author: ryan
 *  @description: create or update a new dictionary
 */
export const createOrUpdateDictionary = (
  params: DictionaryInfo,
  mode: ErrorMessageMode = 'modal',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateDictionary, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: delete a dictionary
 */
export const deleteDictionary = (params: BaseIdReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteDictionary, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 * @description: Get dictionary detail list
 */

export const getDictionaryDetailList = (params: BaseListReq) => {
  return defHttp.post<BaseDataResp<DictionaryDetailListResp>>({
    url: Api.GetDictionaryDetailList,
    params,
  });
};

/**
 *  author: ryan
 *  @description: create a new dictionary detail
 */
export const createOrUpdateDictionaryDetail = (
  params: DictionaryDetailInfo,
  mode: ErrorMessageMode = 'modal',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateDictionaryDetail, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: delete a dictionary detail
 */
export const deleteDictionaryDetail = (params: BaseIdReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteDictionaryDetail, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
