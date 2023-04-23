import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import {
  BaseDataResp,
  BaseListReq,
  BaseResp,
  BaseUUIDsReq,
  BaseUUIDReq,
} from '/@/api/model/baseModel';
import { MemberInfo, MemberListResp } from './model/memberModel';

enum Api {
  CreateMember = '/mms-api/member/create',
  UpdateMember = '/mms-api/member/update',
  GetMemberList = '/mms-api/member/list',
  DeleteMember = '/mms-api/member/delete',
  GetMemberById = '/mms-api/member',
}

/**
 * @description: Get member list
 */

export const getMemberList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<MemberListResp>>(
    { url: Api.GetMemberList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new member
 */
export const createMember = (params: MemberInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateMember, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the member
 */
export const updateMember = (params: MemberInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateMember, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete members
 */
export const deleteMember = (params: BaseUUIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteMember, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get member By ID
 */
export const getMemberById = (params: BaseUUIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<MemberInfo>>(
    { url: Api.GetMemberById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
