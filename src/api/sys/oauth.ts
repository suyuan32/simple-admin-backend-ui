import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseIdReq, BasePageReq, BaseResp } from '/@/api/model/baseModel';
import { OauthLoginReq, ProviderInfo, ProviderListResp, RedirectResp } from './model/oauthModel';
import { LoginResp } from './model/userModel';

enum Api {
  OauthLogin = '/sys-api/oauth/login',
  OauthLoginCallback = '/sys-api/oauth/login/callback',
  GetProviderList = '/sys-api/oauth/provider/list',
  CreateOrUpdateProvider = '/sys-api/oauth/provider/create_or_update',
  DeleteProvider = '/sys-api/oauth/provider/delete',
}

/**
 * @description: Get provider list
 */

export const getProviderList = (params: BasePageReq) => {
  return defHttp.post<BaseDataResp<ProviderListResp>>({ url: Api.GetProviderList, params });
};

/**
 *  author: ryan
 *  @description: create or update a provider
 */
export const createOrUpdateProvider = (params: ProviderInfo, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateProvider, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: delete a provider
 */
export const deleteProvider = (params: BaseIdReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteProvider, params: params },
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
