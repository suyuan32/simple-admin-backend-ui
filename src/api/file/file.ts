import { UploadApiResult } from '../sys/model/uploadModel';
import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode, UploadFileParams } from '/#/axios';
import { BaseDataResp, BaseIdReq, BasePageReq, BaseResp } from '../model/baseModel';
import { FileListResp, updateFileInfoReq } from './model/fileModel';

enum Api {
  uploadFile = '/file-manager/upload',
  GetFileList = '/file-manager/file/list',
  UpdateFileInfo = '/file-manager/file',
  SetFileStatus = '/file-manager/file/status',
  DownloadFile = '/file-manager/file/download',
}

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) {
  return defHttp.uploadFile<BaseDataResp<UploadApiResult>>(
    {
      url: Api.uploadFile,
      onUploadProgress,
    },
    params,
  );
}

/**
 * @description: Get file list
 */

export const getFileList = (params: BasePageReq) => {
  return defHttp.post<BaseDataResp<FileListResp>>({ url: Api.GetFileList, params });
};

/**
 *  author: ryan
 *  @description: update file info
 */
export const UpdateFileInfo = (params: updateFileInfoReq, mode: ErrorMessageMode = 'message') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateFileInfo, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: delete api
 */
export const deleteFile = (params: BaseIdReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.delete<BaseResp>(
    { url: Api.UpdateFileInfo, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: set file's status
 */
export const setFileStatus = (id: number, status: number) =>
  defHttp.post({ url: Api.SetFileStatus, params: { id, status } });

/**
 *  author: Ryan Su
 *  @description: download file
 */

export const downloadFile = (id: number, mode: ErrorMessageMode = 'none') =>
  defHttp.get(
    {
      url: Api.DownloadFile + '/' + id,
      responseType: 'blob',
    },
    { errorMessageMode: mode },
  );
