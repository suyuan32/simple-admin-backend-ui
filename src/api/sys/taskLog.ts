import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIDsReq, BaseIDReq } from '/@/api/model/baseModel';
import { TaskLogInfo, TaskLogListResp } from './model/taskLogModel';

enum Api {
  CreateTaskLog = '/sys-api/task_log/create',
  UpdateTaskLog = '/sys-api/task_log/update',
  GetTaskLogList = '/sys-api/task_log/list',
  DeleteTaskLog = '/sys-api/task_log/delete',
  GetTaskLogById = '/sys-api/task_log',
}

/**
 * @description: Get task log list
 */

export const getTaskLogList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<TaskLogListResp>>(
    { url: Api.GetTaskLogList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new task log
 */
export const createTaskLog = (params: TaskLogInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateTaskLog, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the task log
 */
export const updateTaskLog = (params: TaskLogInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateTaskLog, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete task logs
 */
export const deleteTaskLog = (params: BaseIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteTaskLog, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get task log By ID
 */
export const getTaskLogById = (params: BaseIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<TaskLogInfo>>(
    { url: Api.GetTaskLogById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
