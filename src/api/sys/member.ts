import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import {
  BaseDataResp,
  BaseListReq,
  BaseResp,
  BaseUUIDReq,
  BaseUUIDsReq,
} from '/@/api/model/baseModel';
import { MemberInfo, MemberListResp } from './model/memberModel';

enum Api {
  CreateOrUpdateMember = '/sys-api/member/create_or_update',
  GetMemberList = '/sys-api/member/list',
  DeleteMember = '/sys-api/member/delete',
  BatchDeleteMember = '/sys-api/member/batch_delete',
  SetMemberStatus = '/sys-api/member/status',
}

/**
 * @description: Get member list
 */

export const getMemberList = (params: BaseListReq) => {
  return defHttp.post<BaseDataResp<MemberListResp>>({ url: Api.GetMemberList, params });
};

/**
 *  @description: create a new member
 */
export const createOrUpdateMember = (params: MemberInfo, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateMember, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  @description: delete member
 */
export const deleteMember = (params: BaseUUIDReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteMember, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  @description: batch delete members
 */
export const batchDeleteMember = (params: BaseUUIDsReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.BatchDeleteMember, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  @description: set the member status
 */
export const setMemberStatus = (id: string, status: number) =>
  defHttp.post({ url: Api.SetMemberStatus, params: { id, status } });
