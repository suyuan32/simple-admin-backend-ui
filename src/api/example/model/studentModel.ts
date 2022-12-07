import { BaseListResp } from '/@/api/model/baseModel';

/**
 *  @description: Student info response
 */
export interface StudentInfo {
  id: number;
  createdAt?: number;
  name: string;
  age: number;
}

/**
 *  @description: Student list response
 */

export type StudentListResp = BaseListResp<StudentInfo>;
