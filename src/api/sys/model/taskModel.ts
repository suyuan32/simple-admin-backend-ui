import { BaseListResp } from '@/api/model/baseModel';

/**
 *  @description: Task info response
 */
export interface TaskInfo {
  id?: number;
  createdAt?: number;
  updatedAt?: number;
  status?: number;
  name?: string;
  taskGroup?: string;
  cronExpression?: string;
  pattern?: string;
  payload?: string;
}

/**
 *  @description: Task list response
 */

export type TaskListResp = BaseListResp<TaskInfo>;
