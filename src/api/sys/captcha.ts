import { BaseDataResp } from '../model/baseModel';
import { CaptchaResp, GetEmailCaptchaReq, GetSmsCaptchaReq } from './model/captcha';
import { ErrorMessageMode } from '/#/axios';
import { defHttp } from '@/utils/http/axios';

enum Api {
  GetCaptcha = '/sys-api/captcha',
  SendEmailCaptcha = '/sys-api/captcha/email',
  SendSmsCaptcha = '/sys-api/captcha/sms',
}

/**
 * @description: Get captcha api
 */
export function getCaptcha(mode: ErrorMessageMode = 'notice') {
  return defHttp.get<BaseDataResp<CaptchaResp>>(
    {
      url: Api.GetCaptcha,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: Send email captcha
 */
export function getEmailCaptcha(params: GetEmailCaptchaReq, mode: ErrorMessageMode = 'notice') {
  return defHttp.post<BaseDataResp<string>>(
    {
      url: Api.SendEmailCaptcha,
      params: params,
    },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
}

/**
 * @description: Send sms captcha
 */

export function getSmsCaptcha(params: GetSmsCaptchaReq, mode: ErrorMessageMode = 'notice') {
  return defHttp.post<BaseDataResp<string>>(
    {
      url: Api.SendSmsCaptcha,
      params: params,
    },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
}
