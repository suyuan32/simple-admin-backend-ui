import { BaseListResp } from '/@/api/model/baseModel';

/**
 *  @description: Department info response
 */
export interface DepartmentInfo {
  id: number;
  createdAt?: number;
  status: number;
  name: string;
  ancestors: string;
  leader: string;
  phone: string;
  email: string;
  sort: number;
  remark: string;
  parentId: number;
}

/**
 *  @description: Department list response
 */

export type DepartmentListResp = BaseListResp<DepartmentInfo>;
