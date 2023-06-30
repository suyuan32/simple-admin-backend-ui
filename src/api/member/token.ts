import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import {
  BaseDataResp,
  BaseListReq,
  BaseResp,
  BaseUUIDsReq,
  BaseUUIDReq,
} from '/@/api/model/baseModel';
import { TokenInfo, TokenListResp } from '../sys/model/tokenModel';

enum Api {
  CreateToken = '/mms-api/token/create',
  UpdateToken = '/mms-api/token/update',
  GetTokenList = '/mms-api/token/list',
  DeleteToken = '/mms-api/token/delete',
  GetTokenById = '/mms-api/token',
  Logout = '/mms-api/token/logout',
}

/**
 * @description: Get token list
 */

export const getTokenList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<TokenListResp>>(
    { url: Api.GetTokenList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new token
 */
export const createToken = (params: TokenInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateToken, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the token
 */
export const updateToken = (params: TokenInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateToken, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete tokens
 */
export const deleteToken = (params: BaseUUIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteToken, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get token By ID
 */
export const getTokenById = (params: BaseUUIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<TokenInfo>>(
    { url: Api.GetTokenById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  @description: Force user log out
 */

export const logout = (id: string, mode: ErrorMessageMode = 'notice') =>
  defHttp.post(
    { url: Api.Logout, params: { id: id } },
    { errorMessageMode: mode, successMessageMode: mode },
  );
