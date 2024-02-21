import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIDsReq, BaseIDReq } from '@/api/model/baseModel';
import { SmsProviderInfo, SmsProviderListResp } from './model/smsProviderModel';

enum Api {
  CreateSmsProvider = '/sys-api/sms_provider/create',
  UpdateSmsProvider = '/sys-api/sms_provider/update',
  GetSmsProviderList = '/sys-api/sms_provider/list',
  DeleteSmsProvider = '/sys-api/sms_provider/delete',
  GetSmsProviderById = '/sys-api/sms_provider',
}

/**
 * @description: Get sms provider list
 */

export const getSmsProviderList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<SmsProviderListResp>>(
    { url: Api.GetSmsProviderList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new sms provider
 */
export const createSmsProvider = (params: SmsProviderInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateSmsProvider, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the sms provider
 */
export const updateSmsProvider = (params: SmsProviderInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateSmsProvider, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete sms providers
 */
export const deleteSmsProvider = (params: BaseIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteSmsProvider, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get sms provider By ID
 */
export const getSmsProviderById = (params: BaseIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<SmsProviderInfo>>(
    { url: Api.GetSmsProviderById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
