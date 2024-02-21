import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import {
  LoginReq,
  LoginResp,
  GetUserInfoModel,
  RegisterReq,
  UserListResp,
  UserInfo,
  UserProfile,
  ChangePasswordReq,
  ResetByEmailInfo,
  ResetBySmsInfo,
  LoginByEmailReq,
  LoginBySmsReq,
  RegisterByEmailReq,
  RegisterBySmsReq,
} from './model/userModel';
import { BaseDataResp, BaseListReq, BaseResp, BaseUUIDReq, BaseUUIDsReq } from '../model/baseModel';

enum Api {
  CreateUser = '/sys-api/user/create',
  UpdateUser = '/sys-api/user/update',
  GetUserList = '/sys-api/user/list',
  DeleteUser = '/sys-api/user/delete',
  GetUserById = '/sys-api/user',
  Login = '/sys-api/user/login',
  LoginByEmail = '/sys-api/user/login_by_email',
  LoginBySms = '/sys-api/user/login_by_sms',
  Register = '/sys-api/user/register',
  RegisterByEmail = '/sys-api/user/register_by_email',
  RegisterBySms = '/sys-api/user/register_by_sms',
  Logout = '/sys-api/user/logout',
  GetUserInfo = '/sys-api/user/info',
  GetPermCode = '/sys-api/user/perm',
  Profile = '/sys-api/user/profile',
  ChangePassword = '/sys-api/user/change_password',
  ResetPasswordByEmail = '/sys-api/user/reset_password_by_email',
  ResetPasswordBySms = '/sys-api/user/reset_password_by_sms',
}

/**
 * @description: Get user list
 */

export const getUserList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<UserListResp>>(
    { url: Api.GetUserList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new user
 */
export const createUser = (params: UserInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateUser, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the user
 */
export const updateUser = (params: UserInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateUser, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete users
 */
export const deleteUser = (params: BaseUUIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteUser, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get user By ID
 */
export const getUserById = (params: BaseUUIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<UserInfo>>(
    { url: Api.GetUserById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 * @description: User login api
 */
export function login(params: LoginReq, mode: ErrorMessageMode = 'notice') {
  return defHttp.post<BaseDataResp<LoginResp>>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
}

/**
 * @description: User login by email api
 */
export function loginByEmail(params: LoginByEmailReq, mode: ErrorMessageMode = 'notice') {
  return defHttp.post<BaseDataResp<LoginResp>>(
    {
      url: Api.LoginByEmail,
      params,
    },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
}

/**
 * @description: User login by sms api
 */
export function loginBySms(params: LoginBySmsReq, mode: ErrorMessageMode = 'notice') {
  return defHttp.post<BaseDataResp<LoginResp>>(
    {
      url: Api.LoginBySms,
      params,
    },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
}

/**
 * @description: User register api
 */
export function register(params: RegisterReq, mode: ErrorMessageMode = 'notice') {
  return defHttp.post<BaseResp>(
    {
      url: Api.Register,
      params,
    },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
}

/**
 * @description: User register by email api
 */
export function registerByEmail(params: RegisterByEmailReq, mode: ErrorMessageMode = 'notice') {
  return defHttp.post<BaseResp>(
    {
      url: Api.RegisterByEmail,
      params,
    },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
}

/**
 * @description: User register by Sms api
 */
export function registerBySms(params: RegisterBySmsReq, mode: ErrorMessageMode = 'notice') {
  return defHttp.post<BaseResp>(
    {
      url: Api.RegisterBySms,
      params,
    },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
}

/**
 * @description: Get user's basic info
 */

export function getUserInfo() {
  return defHttp.get<BaseDataResp<GetUserInfoModel>>(
    { url: Api.GetUserInfo },
    { errorMessageMode: 'notice' },
  );
}

export function getPermCode() {
  return defHttp.get<BaseDataResp<string[]>>(
    { url: Api.GetPermCode },
    { errorMessageMode: 'notice' },
  );
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout }, { errorMessageMode: 'notice' });
}

/**
 *  author: Ryan Su
 *  @description: Get user profile
 */
export function getUserProfile() {
  return defHttp.get<BaseDataResp<UserProfile>>(
    { url: Api.Profile },
    { errorMessageMode: 'notice' },
  );
}

/**
 *  author: Ryan Su
 *  @description: update user profile
 */
export function updateProfile(params: UserProfile, mode: ErrorMessageMode = 'notice') {
  return defHttp.post<BaseResp>(
    { url: Api.Profile, params },
    { errorMessageMode: mode, successMessageMode: mode },
  );
}

/**
 *  author: Ryan Su
 *  @description: change user password
 */

export function changePassword(params: ChangePasswordReq) {
  return defHttp.post<BaseResp>(
    { url: Api.ChangePassword, params },
    { errorMessageMode: 'notice' },
  );
}

/**
 *  author: Ryan Su
 *  @description: reset user password by email
 */

export function resetPasswordByEmail(params: ResetByEmailInfo, mode: ErrorMessageMode = 'notice') {
  return defHttp.post<BaseResp>(
    { url: Api.ResetPasswordByEmail, params },
    { errorMessageMode: mode, successMessageMode: mode },
  );
}

/**
 *  author: Ryan Su
 *  @description: reset user password by email
 */

export function resetPasswordBySms(params: ResetBySmsInfo, mode: ErrorMessageMode = 'notice') {
  return defHttp.post<BaseResp>(
    { url: Api.ResetPasswordBySms, params },
    { errorMessageMode: mode, successMessageMode: mode },
  );
}
