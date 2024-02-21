import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIDsReq, BaseIDReq } from '@/api/model/baseModel';
import { CloudFileTagInfo, CloudFileTagListResp } from './model/cloudFileTagModel';

enum Api {
  CreateCloudFileTag = '/fms-api/cloud_file_tag/create',
  UpdateCloudFileTag = '/fms-api/cloud_file_tag/update',
  GetCloudFileTagList = '/fms-api/cloud_file_tag/list',
  DeleteCloudFileTag = '/fms-api/cloud_file_tag/delete',
  GetCloudFileTagById = '/fms-api/cloud_file_tag',
}

/**
 * @description: Get cloud file tag list
 */

export const getCloudFileTagList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<CloudFileTagListResp>>(
    { url: Api.GetCloudFileTagList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new cloud file tag
 */
export const createCloudFileTag = (params: CloudFileTagInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateCloudFileTag, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the cloud file tag
 */
export const updateCloudFileTag = (params: CloudFileTagInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateCloudFileTag, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete cloud file tags
 */
export const deleteCloudFileTag = (params: BaseIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteCloudFileTag, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get cloud file tag By ID
 */
export const getCloudFileTagById = (params: BaseIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<CloudFileTagInfo>>(
    { url: Api.GetCloudFileTagById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
