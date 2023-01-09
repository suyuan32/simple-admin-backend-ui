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
  UserProfile,
  ChangePasswordReq,
} from './model/userModel';

import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseResp, BaseUUIDReq, BaseUUIDsReq } from '../model/baseModel';

enum Api {
  Login = '/sys-api/user/login',
  Register = '/sys-api/user/register',
  Logout = '/sys-api/user/logout',
  GetUserInfo = '/sys-api/user/info',
  GetPermCode = '/sys-api/user/perm',
  GetCaptcha = '/sys-api/captcha',
  GetUserList = '/sys-api/user/list',
  CreateOrUpdateUser = '/sys-api/user/create_or_update',
  DeleteUser = '/sys-api/user/delete',
  BatchDeleteUser = '/sys-api/user/batch_delete',
  SetUserStatus = '/sys-api/user/status',
  GetProfile = '/sys-api/user/profile',
  ChangePassword = '/sys-api/user/change-password',
}

/**
 * @description: user login api
 */
export function login(params: LoginReq, mode: ErrorMessageMode = 'message') {
  return defHttp.post<BaseDataResp<LoginResp>>(
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
export function register(params: RegisterReq, mode: ErrorMessageMode = 'message') {
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
export function getCaptcha(mode: ErrorMessageMode = 'message') {
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
 * @description: get user's basic info
 */

export function getUserInfo() {
  return defHttp.get<BaseDataResp<GetUserInfoModel>>(
    { url: Api.GetUserInfo },
    { errorMessageMode: 'none' },
  );
}

export function getPermCode() {
  return defHttp.get<BaseDataResp<string[]>>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

/**
 * @description: get user menu based on api id
 */

export const getUserList = (params: UserListReq) => {
  return defHttp.post<BaseDataResp<UserListResp>>({ url: Api.GetUserList, params });
};

/**
 *  author: Ryan Su
 *  @description: create or update a new user
 */

export const createOrUpdateUser = (params: UserInfo, mode: ErrorMessageMode = 'message') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateUser, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: delete a user
 */

export const deleteUser = (params: BaseUUIDReq, mode: ErrorMessageMode = 'message') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteUser, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: batch delete users
 */
export const batchDeleteUser = (params: BaseUUIDsReq, mode: ErrorMessageMode = 'message') => {
  return defHttp.post<BaseResp>(
    { url: Api.BatchDeleteUser, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  author: Ryan Su
 *  @description: set role's status
 */
export const setUserStatus = (id: string, status: number) =>
  defHttp.post({ url: Api.SetUserStatus, params: { id, status } });

/**
 *  author: Ryan Su
 *  @description: Get user profile
 */
export function getUserProfile() {
  return defHttp.get<BaseDataResp<UserProfile>>(
    { url: Api.GetProfile },
    { errorMessageMode: 'message' },
  );
}

/**
 *  author: Ryan Su
 *  @description: update user profile
 */
export function updateProfile(params: UserProfile) {
  return defHttp.post<BaseResp>({ url: Api.GetProfile, params }, { errorMessageMode: 'message' });
}

/**
 *  author: Ryan Su
 *  @description: change user password
 */

export function changePassword(params: ChangePasswordReq) {
  return defHttp.post<BaseResp>(
    { url: Api.ChangePassword, params },
    { errorMessageMode: 'message' },
  );
}
