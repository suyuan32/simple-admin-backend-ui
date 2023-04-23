import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIDsReq, BaseIDReq } from '/@/api/model/baseModel';
import { DictionaryInfo, DictionaryListResp } from './model/dictionaryModel';

enum Api {
  CreateDictionary = '/sys-api/dictionary/create',
  UpdateDictionary = '/sys-api/dictionary/update',
  GetDictionaryList = '/sys-api/dictionary/list',
  DeleteDictionary = '/sys-api/dictionary/delete',
  GetDictionaryById = '/sys-api/dictionary',
}

/**
 * @description: Get dictionary list
 */

export const getDictionaryList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<DictionaryListResp>>(
    { url: Api.GetDictionaryList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new dictionary
 */
export const createDictionary = (params: DictionaryInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateDictionary, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the dictionary
 */
export const updateDictionary = (params: DictionaryInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateDictionary, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete dictionarys
 */
export const deleteDictionary = (params: BaseIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteDictionary, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get dictionary By ID
 */
export const getDictionaryById = (params: BaseIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<DictionaryInfo>>(
    { url: Api.GetDictionaryById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
