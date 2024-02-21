import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import {
  BaseDataResp,
  BaseListReq,
  BaseResp,
  BaseUUIDsReq,
  BaseUUIDReq,
} from '@/api/model/baseModel';
import { SmsLogInfo, SmsLogListResp } from './model/smsLogModel';

enum Api {
  CreateSmsLog = '/sys-api/sms_log/create',
  UpdateSmsLog = '/sys-api/sms_log/update',
  GetSmsLogList = '/sys-api/sms_log/list',
  DeleteSmsLog = '/sys-api/sms_log/delete',
  GetSmsLogById = '/sys-api/sms_log',
}

/**
 * @description: Get sms log list
 */

export const getSmsLogList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<SmsLogListResp>>(
    { url: Api.GetSmsLogList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new sms log
 */
export const createSmsLog = (params: SmsLogInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateSmsLog, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the sms log
 */
export const updateSmsLog = (params: SmsLogInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateSmsLog, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete sms logs
 */
export const deleteSmsLog = (params: BaseUUIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteSmsLog, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get sms log By ID
 */
export const getSmsLogById = (params: BaseUUIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<SmsLogInfo>>(
    { url: Api.GetSmsLogById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
