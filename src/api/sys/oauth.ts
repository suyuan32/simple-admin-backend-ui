import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseIdReq, BasePageReq, BaseResp } from '/@/api/model/baseModel';
import { OauthLoginReq, ProviderInfo, ProviderListResp } from './model/oauthModel';
import { LoginResp } from './model/userModel';

enum Api {
  OauthLogin = '/sys-api/oauth/login',
  OauthLoginCallback = '/sys-api//oauth/login/callback',
  GetProviderList = '/sys-api/oauth/provider/list',
  CreateOrUpdateOrDeleteProvider = '/sys-api/oauth/provider',
}

/**
 * @description: Get provider list
 */

export const getProviderList = (params: BasePageReq) => {
  return defHttp.post<ProviderListResp>({ url: Api.GetProviderList, params });
};

/**
 *  author: ryan
 *  @description: create or update a provider
 */
export const createOrUpdateProvider = (params: ProviderInfo, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateOrDeleteProvider, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: delete provider
 */
export const deleteProvider = (params: BaseIdReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.delete<BaseResp>(
    { url: Api.CreateOrUpdateOrDeleteProvider, params: params },
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
  return defHttp.post<BaseResp>(
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
    { url: URL },
    {
      errorMessageMode: mode,
    },
  );
};
