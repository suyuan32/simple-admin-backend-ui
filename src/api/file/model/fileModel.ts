import { BaseListResp } from '../../model/baseModel';

/**
 *  author: Ryan Su
 *  @description: file info response
 */
export interface fileInfo {
  id: number;
  createdAt?: number;
  name: string;
  fileType: string;
  size: number;
  path: string;
  publicPath: string;
}

/**
 *  author: Ryan Su
 *  @description: file list response
 */

export type FileListResp = BaseListResp<fileInfo>;

/**
 *  author: Ryan Su
 *  @description: change status request
 */
export interface changeStatusReq {
  id: number;
  status: boolean;
}

/**
 *  author: Ryan Su
 *  @description: update file info request
 */
export interface updateFileInfoReq {
  id: number;
  name: string;
}
