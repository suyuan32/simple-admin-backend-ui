import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIDsReq, BaseIDReq } from '/@/api/model/baseModel';
import { TaskInfo, TaskListResp } from './model/taskModel';

enum Api {
  CreateTask = '/sys-api/task/create',
  UpdateTask = '/sys-api/task/update',
  GetTaskList = '/sys-api/task/list',
  DeleteTask = '/sys-api/task/delete',
  GetTaskById = '/sys-api/task',
}

/**
 * @description: Get task list
 */

export const getTaskList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<TaskListResp>>(
    { url: Api.GetTaskList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new task
 */
export const createTask = (params: TaskInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateTask, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the task
 */
export const updateTask = (params: TaskInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateTask, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete tasks
 */
export const deleteTask = (params: BaseIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteTask, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get task By ID
 */
export const getTaskById = (params: BaseIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<TaskInfo>>(
    { url: Api.GetTaskById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
