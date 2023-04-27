import { defHttp } from '/@/utils/http/axios';
import { BaseResp } from '/@/api/model/baseModel';

enum Api {
  InitializeDatabase = '/fms-api/init/database',
}

/**
 * @description: initialize the file manager database
 */

export const initializeFileDatabase = () => {
  return defHttp.get<BaseResp>({ url: Api.InitializeDatabase });
};
