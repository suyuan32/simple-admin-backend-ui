import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIdsReq, BaseIdReq } from '/@/api/model/baseModel';
import { MemberRankInfo, MemberRankListResp } from './model/memberRankModel';

enum Api {
  CreateOrUpdateMemberRank = '/sys-api/member_rank/create_or_update',
  GetMemberRankList = '/sys-api/member_rank/list',
  DeleteMemberRank = '/sys-api/member_rank/delete',
  BatchDeleteMemberRank = '/sys-api/member_rank/batch_delete',
}

/**
 * @description: Get member rank list
 */

export const getMemberRankList = (params: BaseListReq) => {
  return defHttp.post<BaseDataResp<MemberRankListResp>>({ url: Api.GetMemberRankList, params });
};

/**
 *  @description: create a new member rank
 */
export const createOrUpdateMemberRank = (
  params: MemberRankInfo,
  mode: ErrorMessageMode = 'modal',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateMemberRank, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  @description: delete member rank
 */
export const deleteMemberRank = (params: BaseIdReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteMemberRank, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  @description: batch delete member ranks
 */
export const batchDeleteMemberRank = (params: BaseIdsReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.BatchDeleteMemberRank, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
