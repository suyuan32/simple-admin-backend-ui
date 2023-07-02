import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIDsReq, BaseIDReq } from '/@/api/model/baseModel';
import { TagInfo, TagListResp } from './model/tagModel';

enum Api {
  CreateTag = '/fms-api/tag/create',
  UpdateTag = '/fms-api/tag/update',
  GetTagList = '/fms-api/tag/list',
  DeleteTag = '/fms-api/tag/delete',
  GetTagById = '/fms-api/tag',
}

/**
 * @description: Get tag list
 */

export const getTagList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<TagListResp>>(
    { url: Api.GetTagList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new tag
 */
export const createTag = (params: TagInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateTag, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the tag
 */
export const updateTag = (params: TagInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateTag, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete tags
 */
export const deleteTag = (params: BaseIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteTag, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get tag By ID
 */
export const getTagById = (params: BaseIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<TagInfo>>(
    { url: Api.GetTagById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
