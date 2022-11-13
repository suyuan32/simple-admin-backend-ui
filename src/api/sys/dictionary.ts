import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseIdReq, BasePageReq, BaseResp } from '/@/api/model/baseModel';
import {
  DictionaryDetailInfo,
  DictionaryDetailListResp,
  DictionaryInfo,
  DictionaryListResp,
} from './model/dictionaryModel';

enum Api {
  GetDictionaryList = '/sys-api/dict/list',
  CreateOrUpdateOrDeleteDictionary = '/sys-api/dict',
  GetDictionaryDetailList = '/sys-api/dict/detail/list',
  CreateOrUpdateOrDeleteDictionaryDetail = '/sys-api/dict/detail',
}

/**
 * @description: Get dictionary list
 */

export const getDictionaryList = (params: BasePageReq) => {
  return defHttp.post<BaseDataResp<DictionaryListResp>>({ url: Api.GetDictionaryList, params });
};

/**
 *  author: ryan
 *  @description: create a new dictionary
 */
export const createOrUpdateDictionary = (
  params: DictionaryInfo,
  mode: ErrorMessageMode = 'modal',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateOrDeleteDictionary, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: delete dictionary
 */
export const deleteDictionary = (params: BaseIdReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.delete<BaseResp>(
    { url: Api.CreateOrUpdateOrDeleteDictionary, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 * @description: Get dictionary detail list
 */

export const getDictionaryDetailList = (params: BasePageReq) => {
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
    { url: Api.CreateOrUpdateOrDeleteDictionaryDetail, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: delete dictionary detail
 */
export const deleteDictionaryDetail = (params: BaseIdReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.delete<BaseResp>(
    { url: Api.CreateOrUpdateOrDeleteDictionaryDetail, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
