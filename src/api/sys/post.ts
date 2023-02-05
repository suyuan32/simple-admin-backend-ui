import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIdsReq, BaseIdReq } from '/@/api/model/baseModel';
import { PostInfo, PostListResp } from './model/postModel';

enum Api {
  CreateOrUpdatePost = '/sys-api/post/create_or_update',
  GetPostList = '/sys-api/post/list',
  DeletePost = '/sys-api/post/delete',
  BatchDeletePost = '/sys-api/post/batch_delete',
  SetPostStatus = '/sys-api/post/status',
}

/**
 * @description: Get post list
 */

export const getPostList = (params: BaseListReq) => {
  return defHttp.post<BaseDataResp<PostListResp>>({ url: Api.GetPostList, params });
};

/**
 *  @description: create a new post
 */
export const createOrUpdatePost = (params: PostInfo, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdatePost, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  @description: delete post
 */
export const deletePost = (params: BaseIdReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeletePost, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  @description: batch delete posts
 */
export const batchDeletePost = (params: BaseIdsReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.BatchDeletePost, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  @description: set the post status
 */
export const setPostStatus = (id: string, status: number) =>
  defHttp.post({ url: Api.SetPostStatus, params: { id, status } });
