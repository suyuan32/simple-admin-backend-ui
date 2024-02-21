import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseResp } from '@/api/model/baseModel';
import { SendEmailReq, SendSmsReq } from './model/messageModel';

enum Api {
  SendEmail = '/sys-api/email/send',
  SendSms = '/sys-api/sms/send',
}

/**
 * @description: Send Email
 */

export const sendEmail = (params: SendEmailReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.SendEmail, params },
    { errorMessageMode: mode, successMessageMode: mode },
  );
};

/**
 * @description: Send Sms
 */

export const sendSms = (params: SendSmsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.SendSms, params },
    { errorMessageMode: mode, successMessageMode: mode },
  );
};
