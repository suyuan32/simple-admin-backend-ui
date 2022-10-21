import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseIdReq, BasePageReq, BaseResp } from '/@/api/model/baseModel';
import { TokenInfo, TokenListResp } from './model/tokenModel ';

enum Api {
  GetTokenList = '/sys-api/token/list',
  CreateOrUpdateOrDeleteToken = '/sys-api/token',
  SetTokenStatus = '/sys-api/token/status',
  Logout = '/sys-api/token/logout',
}

/**
 * @description: Get token list
 */

export const getTokenList = (params: BasePageReq) => {
  return defHttp.post<TokenListResp>({ url: Api.GetTokenList, params });
};

/**
 *  author: ryan
 *  @description: create or update a new token
 */
export const createOrUpdateApi = (params: TokenInfo, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateOrDeleteToken, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: delete token
 */
export const deleteToken = (params: BaseIdReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.delete<BaseResp>(
    { url: Api.CreateOrUpdateOrDeleteToken, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: set token status
 */
export const setTokenStatus = (id: number, status: number) =>
  defHttp.post({ url: Api.SetTokenStatus, params: { id, status } });

/**
 *  author: Ryan Su
 *  @description: Force logging out
 */

export const logout = (uuid: string) => defHttp.post({ url: Api.Logout, params: { UUID: uuid } });
