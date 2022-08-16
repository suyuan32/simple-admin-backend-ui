import { defHttp } from '/@/utils/http/axios';
import { BaseResp } from '/@/api/model/baseModel';

enum Api {
  InitializeDatabase = '/sys-api/core/init_database',
}

/**
 * @description: Get user menu based on api id
 */

export const initialzeDatabase = () => {
  return defHttp.get<BaseResp>({ url: Api.InitializeDatabase });
};
