/**
 * @description: Login interface parameters
 */
export interface LoginReq {
  username: string;
  password: string;
  captcha: string;
  captchaId: string;
}

/**
 * @description: Register interface parameters
 */
export interface RegisterReq {
  username: string;
  password: string;
  email: string;
  captcha: string;
  captchaId: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResp {
  userId: string | number;
  token: string;
  role: RoleInfo;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 昵称
  nickname: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}

export interface CaptchaResp {
  captchaId: string;
  imgPath: string;
}

export interface UserListReq {
  page: number;
  pageSize: number;
  username: string;
  nickname: string;
  email: string;
  mobile: string;
}

export interface UserInfo {
  id: number;
  UUID?: string;
  username: string;
  nickname: string;
  email: string;
  mobile: string;
  roleId: number;
  avatar: string;
  status: number;
  password?: string;
  createdAt?: number;
  updateAt?: number;
}

export interface UserListResp {
  total: number;
  data: UserInfo[];
}

export interface UserProfile {
  avatar: string;
  nickname: string;
  email: string;
  mobile: string;
}

export interface ChangePasswordReq {
  oldPassword: string;
  newPassword: string;
}
