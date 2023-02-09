import { BaseListResp } from '/@/api/model/baseModel';

/**
 *  @description: Token info response
 */
export interface TokenInfo {
  id: string;
  createdAt?: number;
  updatedAt?: number;
  status?: number;
  uuid?: string;
  token?: string;
  source?: string;
  expiredAt?: number;
}

/**
 *  @description: Token list response
 */

export type TokenListResp = BaseListResp<TokenInfo>;
