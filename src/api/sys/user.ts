import { defHttp } from '/@/utils/http/axios';
import {
  LoginReq,
  LoginResp,
  GetUserInfoModel,
  CaptchaResp,
  RegisterReq,
  UserListReq,
  UserListResp,
  UserInfo,
} from './model/userModel';

import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseIdReq, BaseResp } from '../model/baseModel';

enum Api {
  Login = '/sys-api/user/login',
  Register = '/sys-api/user/register',
  Logout = '/sys-api/logout',
  GetUserInfo = '/sys-api/user/info',
  GetPermCode = '/sys-api/user/perm',
  GetCaptcha = '/sys-api/captcha',
  GetUserList = '/sys-api/user/list',
  CreateOrUpdateOrDeleteUser = '/sys-api/user',
  SetUserStatus = '/sys-api/user/status',
}

/**
 * @description: user login api
 */
export function login(params: LoginReq, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResp>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: user register api
 */
export function register(params: RegisterReq, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<BaseResp>(
    {
      url: Api.Register,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: get captcha api
 */
export function getCaptcha(mode: ErrorMessageMode = 'modal') {
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
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

// user management

/**
 * @description: Get user menu based on api id
 */

export const getUserList = (params: UserListReq) => {
  return defHttp.post<UserListResp>({ url: Api.GetUserList, params });
};

/**
 *  author: ryan
 *  @description: create a new user
 */
export const createOrUpdateUser = (params: UserInfo, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateOrDeleteUser, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: delete user
 */
export const deleteUser = (params: BaseIdReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.delete<BaseResp>(
    { url: Api.CreateOrUpdateOrDeleteUser, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: set role's status
 */
export const setUserStatus = (id: number, status: number) =>
  defHttp.post({ url: Api.SetUserStatus, params: { id, status } });
