import { UploadApiResult } from '../sys/model/uploadModel';
import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';

enum Api {
  uploadFile = '/uploader/upload',
}

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: Api.uploadFile,
      onUploadProgress,
    },
    params,
  );
}
