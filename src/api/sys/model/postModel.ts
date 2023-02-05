import { BaseListResp } from '/@/api/model/baseModel';

/**
 *  @description: Post info response
 */
export interface PostInfo {
  id: number;
  createdAt?: number;
  trans: string;
  sort: number;
  name: string;
  code: string;
  remark: string;
}

/**
 *  @description: Post list response
 */

export type PostListResp = BaseListResp<PostInfo>;
