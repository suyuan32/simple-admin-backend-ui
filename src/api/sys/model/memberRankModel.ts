import { BaseListResp } from '/@/api/model/baseModel';

/**
 *  @description: MemberRank info response
 */
export interface MemberRankInfo {
  id: number;
  createdAt?: number;
  name: string;
  description: string;
  remark: string;
}

/**
 *  @description: MemberRank list response
 */

export type MemberRankListResp = BaseListResp<MemberRankInfo>;
