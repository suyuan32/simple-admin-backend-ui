import { defHttp } from '@/utils/http/axios';
import { BaseResp } from '@/api/model/baseModel';

enum Api {
  InitializeMMSDatabase = '/mms-api/init/database',
}

/**
 * @description: initialize the member management service database
 */

export const initializeMMSDatabase = () => {
  return defHttp.get<BaseResp>({ url: Api.InitializeMMSDatabase });
};
