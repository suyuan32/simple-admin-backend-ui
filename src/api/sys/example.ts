import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseResp } from '/@/api/model/baseModel';
import { HelloReq } from './model/exampleModel';

enum Api {
  Hello = '/sys-api/example/hello',
}

/**
 * @description: Get hello msg
 */

export const Hello = (params: HelloReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.Hello, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
