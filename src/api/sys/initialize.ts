import { defHttp } from '/@/utils/http/axios';
import { BaseResp } from '/@/api/model/baseModel';

enum Api {
  InitializeDatabase = '/sys-api/core/init/database',
}

/**
 * @description: initialize the core database
 */

export const initialzeCoreDatabase = () => {
  return defHttp.get<BaseResp>({ url: Api.InitializeDatabase });
};
