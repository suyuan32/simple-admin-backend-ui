import { BaseListResp } from '../../model/baseModel';

/**
 *  author: Ryan Su
 *  @description: token info response
 */
export interface TokenInfo {
  id: number;
  createdAt?: number;
  UUID: string;
  token: string;
  source: string;
  status: string;
  expiredAt: number;
}

/**
 *  author: Ryan Su
 *  @description: token list response
 */

export type TokenListResp = BaseListResp<TokenInfo>;
