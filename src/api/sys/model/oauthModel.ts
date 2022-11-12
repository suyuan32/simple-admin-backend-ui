import { BaseDataResp, BaseListResp } from '../../model/baseModel';

/**
 *  author: Ryan Su
 *  @description: provider info response
 */
export interface ProviderInfo {
  id: number;
  createdAt?: number;
  name: string;
  clientId: string;
  clientSecret: string;
  redirectURL: string;
  scopes: string;
  authURL: string;
  tokenURL: string;
  authStyle: string;
  infoURL: string;
}

/**
 *  author: Ryan Su
 *  @description: provider list response
 */

export type ProviderListResp = BaseListResp<ProviderInfo>;

/**
 *  author: Ryan Su
 *  @description: Oauth log in request parameters
 */
export interface OauthLoginReq {
  state: string;
  provider: string;
}

/**
 *  author: Ryan Su
 *  @description: redirect response
 */
export type RedirectResp = BaseDataResp<RedirectInfo>;

/**
 *  author: Ryan Su
 *  @description: redirect information
 */
export interface RedirectInfo {
  URL: string;
}
