import { defHttp } from '@/utils/http/axios';
import { BaseResp } from '@/api/model/baseModel';

enum Api {
  InitializeDatabase = '/sys-api/core/init/database',
  InitializeJobDatabase = '/sys-api/core/init/job_database',
  InitializeMcmsDatabase = '/sys-api/core/init/mcms_database',
}

/**
 * @description: initialize the core database
 */

export const initialzeCoreDatabase = () => {
  return defHttp.get<BaseResp>({ url: Api.InitializeDatabase });
};

/**
 * @description: initialize the job management service database
 */

export const initializeJobDatabase = () => {
  return defHttp.get<BaseResp>({ url: Api.InitializeJobDatabase });
};

/**
 * @description: initialize the message center management service database
 */

export const initializeMcmsDatabase = () => {
  return defHttp.get<BaseResp>({ url: Api.InitializeMcmsDatabase });
};
