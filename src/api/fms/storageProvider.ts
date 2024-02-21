import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIDsReq, BaseIDReq } from '@/api/model/baseModel';
import { StorageProviderInfo, StorageProviderListResp } from './model/storageProviderModel';

enum Api {
  CreateStorageProvider = '/fms-api/storage_provider/create',
  UpdateStorageProvider = '/fms-api/storage_provider/update',
  GetStorageProviderList = '/fms-api/storage_provider/list',
  DeleteStorageProvider = '/fms-api/storage_provider/delete',
  GetStorageProviderById = '/fms-api/storage_provider',
}

/**
 * @description: Get storage provider list
 */

export const getStorageProviderList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<StorageProviderListResp>>(
    { url: Api.GetStorageProviderList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new storage provider
 */
export const createStorageProvider = (
  params: StorageProviderInfo,
  mode: ErrorMessageMode = 'notice',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateStorageProvider, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the storage provider
 */
export const updateStorageProvider = (
  params: StorageProviderInfo,
  mode: ErrorMessageMode = 'notice',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateStorageProvider, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete storage providers
 */
export const deleteStorageProvider = (params: BaseIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteStorageProvider, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get storage provider By ID
 */
export const getStorageProviderById = (params: BaseIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<StorageProviderInfo>>(
    { url: Api.GetStorageProviderById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
