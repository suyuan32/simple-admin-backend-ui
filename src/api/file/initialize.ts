import { defHttp } from '/@/utils/http/axios';
import { BaseResp } from '/@/api/model/baseModel';

enum Api {
  InitializeDatabase = '/file-manager/init/database',
}

/**
 * @description: initialize the core database
 */

export const initializeFileDatabase = () => {
  return defHttp.get<BaseResp>({ url: Api.InitializeDatabase });
};
