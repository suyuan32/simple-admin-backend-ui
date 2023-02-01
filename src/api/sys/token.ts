import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import {
  BaseDataResp,
  BasePageReq,
  BaseResp,
  BaseUUIDReq,
  BaseUUIDsReq,
} from '/@/api/model/baseModel';
import { TokenInfo, TokenListResp } from './model/tokenModel ';

enum Api {
  GetTokenList = '/sys-api/token/list',
  CreateOrUpdateToken = '/sys-api/token/create_or_update',
  DeleteToken = '/sys-api/token/delete',
  BatchDeleteToken = '/sys-api/token/batch_delete',
  SetTokenStatus = '/sys-api/token/status',
  Logout = '/sys-api/token/logout',
}

/**
 * @description: Get token list
 */

export const getTokenList = (params: BasePageReq) => {
  return defHttp.post<BaseDataResp<TokenListResp>>({ url: Api.GetTokenList, params });
};

/**
 *  author: ryan
 *  @description: create or update a new token
 */
export const createOrUpdateApi = (params: TokenInfo, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateToken, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: delete a token
 */
export const deleteToken = (params: BaseUUIDReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteToken, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: batch delete tokens
 */
export const batchDeleteToken = (params: BaseUUIDsReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.BatchDeleteToken, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: set the token status
 */
export const setTokenStatus = (id: string, status: number) =>
  defHttp.post({ url: Api.SetTokenStatus, params: { id, status } });

/**
 *  author: Ryan Su
 *  @description: Force logging out
 */

export const logout = (uuid: string) => defHttp.post({ url: Api.Logout, params: { UUID: uuid } });
