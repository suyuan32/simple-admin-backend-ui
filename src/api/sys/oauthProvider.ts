import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIDsReq, BaseIDReq } from '/@/api/model/baseModel';
import {
  OauthLoginReq,
  OauthProviderInfo,
  OauthProviderListResp,
  RedirectResp,
} from './model/oauthProviderModel';
import { LoginResp } from './model/userModel';

enum Api {
  CreateOauthProvider = '/sys-api/oauth_provider/create',
  UpdateOauthProvider = '/sys-api/oauth_provider/update',
  GetOauthProviderList = '/sys-api/oauth_provider/list',
  DeleteOauthProvider = '/sys-api/oauth_provider/delete',
  GetOauthProviderById = '/sys-api/oauth_provider',
  OauthLogin = '/sys-api/oauth/login',
  OauthLoginCallback = '/sys-api/oauth/login/callback',
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

/**
 *  author: Ryan Su
 *  @description: oauth log in
 */
export const oauthLogin = (params: OauthLoginReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<RedirectResp>(
    { url: Api.OauthLogin, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: oauth log in callback
 */
export const oauthLoginCallback = (URL: string, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get<LoginResp>(
    {
      url: Api.OauthLoginCallback + URL,
    },
    {
      errorMessageMode: mode,
      retryRequest: { isOpenRetry: false, count: 1, waitTime: 1000 },
    },
  );
};
