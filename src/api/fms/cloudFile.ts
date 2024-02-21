import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode, UploadFileParams } from '/#/axios';
import {
  BaseDataResp,
  BaseListReq,
  BaseResp,
  BaseUUIDsReq,
  BaseUUIDReq,
} from '@/api/model/baseModel';
import { CloudFileInfo, CloudFileListResp } from './model/cloudFileModel';
import { AxiosProgressEvent } from 'axios';
import { UploadApiResp } from '../sys/model/uploadModel';

enum Api {
  CreateCloudFile = '/fms-api/cloud_file/create',
  UpdateCloudFile = '/fms-api/cloud_file/update',
  GetCloudFileList = '/fms-api/cloud_file/list',
  DeleteCloudFile = '/fms-api/cloud_file/delete',
  GetCloudFileById = '/fms-api/cloud_file',
  uploadFile = '/fms-api/cloud_file/upload',
}

/**
 * @description: Get cloud file list
 */

export const getCloudFileList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<CloudFileListResp>>(
    { url: Api.GetCloudFileList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new cloud file
 */
export const createCloudFile = (params: CloudFileInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateCloudFile, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the cloud file
 */
export const updateCloudFile = (params: CloudFileInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateCloudFile, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete cloud files
 */
export const deleteCloudFile = (params: BaseUUIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteCloudFile, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get cloud file By ID
 */
export const getCloudFileById = (params: BaseUUIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<CloudFileInfo>>(
    { url: Api.GetCloudFileById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
) {
  return defHttp.uploadFile<BaseDataResp<UploadApiResp>>(
    {
      url: Api.uploadFile,
      onUploadProgress,
      timeout: 300 * 1000,
    },
    params,
  );
}
