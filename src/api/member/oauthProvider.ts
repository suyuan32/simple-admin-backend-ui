import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIDsReq, BaseIDReq } from '/@/api/model/baseModel';
import { OauthProviderInfo, OauthProviderListResp } from '../sys/model/oauthProviderModel';

enum Api {
  CreateOauthProvider = '/mms-api/oauth_provider/create',
  UpdateOauthProvider = '/mms-api/oauth_provider/update',
  GetOauthProviderList = '/mms-api/oauth_provider/list',
  DeleteOauthProvider = '/mms-api/oauth_provider/delete',
  GetOauthProviderById = '/mms-api/oauth_provider',
  OauthLogin = '/mms-api/oauth/login',
  OauthLoginCallback = '/mms-api/oauth/login/callback',
}

/**
 * @description: Get oauth provider list
 */

export const getOauthProviderList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<OauthProviderListResp>>(
    { url: Api.GetOauthProviderList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new oauth provider
 */
export const createOauthProvider = (
  params: OauthProviderInfo,
  mode: ErrorMessageMode = 'notice',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOauthProvider, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the oauth provider
 */
export const updateOauthProvider = (
  params: OauthProviderInfo,
  mode: ErrorMessageMode = 'notice',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateOauthProvider, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete oauth providers
 */
export const deleteOauthProvider = (params: BaseIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteOauthProvider, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get oauth provider By ID
 */
export const getOauthProviderById = (params: BaseIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<OauthProviderInfo>>(
    { url: Api.GetOauthProviderById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
