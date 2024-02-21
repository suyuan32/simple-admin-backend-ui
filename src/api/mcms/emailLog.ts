import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import {
  BaseDataResp,
  BaseListReq,
  BaseResp,
  BaseUUIDsReq,
  BaseUUIDReq,
} from '@/api/model/baseModel';
import { EmailLogInfo, EmailLogListResp } from './model/emailLogModel';

enum Api {
  CreateEmailLog = '/sys-api/email_log/create',
  UpdateEmailLog = '/sys-api/email_log/update',
  GetEmailLogList = '/sys-api/email_log/list',
  DeleteEmailLog = '/sys-api/email_log/delete',
  GetEmailLogById = '/sys-api/email_log',
}

/**
 * @description: Get email log list
 */

export const getEmailLogList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<EmailLogListResp>>(
    { url: Api.GetEmailLogList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new email log
 */
export const createEmailLog = (params: EmailLogInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateEmailLog, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the email log
 */
export const updateEmailLog = (params: EmailLogInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateEmailLog, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete email logs
 */
export const deleteEmailLog = (params: BaseUUIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteEmailLog, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get email log By ID
 */
export const getEmailLogById = (params: BaseUUIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<EmailLogInfo>>(
    { url: Api.GetEmailLogById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
