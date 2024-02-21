import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIDsReq, BaseIDReq } from '@/api/model/baseModel';
import { EmailProviderInfo, EmailProviderListResp } from './model/emailProviderModel';

enum Api {
  CreateEmailProvider = '/sys-api/email_provider/create',
  UpdateEmailProvider = '/sys-api/email_provider/update',
  GetEmailProviderList = '/sys-api/email_provider/list',
  DeleteEmailProvider = '/sys-api/email_provider/delete',
  GetEmailProviderById = '/sys-api/email_provider',
}

/**
 * @description: Get email provider list
 */

export const getEmailProviderList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<EmailProviderListResp>>(
    { url: Api.GetEmailProviderList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new email provider
 */
export const createEmailProvider = (
  params: EmailProviderInfo,
  mode: ErrorMessageMode = 'notice',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateEmailProvider, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the email provider
 */
export const updateEmailProvider = (
  params: EmailProviderInfo,
  mode: ErrorMessageMode = 'notice',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateEmailProvider, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete email providers
 */
export const deleteEmailProvider = (params: BaseIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteEmailProvider, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get email provider By ID
 */
export const getEmailProviderById = (params: BaseIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<EmailProviderInfo>>(
    { url: Api.GetEmailProviderById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
