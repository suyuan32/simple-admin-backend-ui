import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseIdReq, BasePageReq, BaseResp, BaseIdsReq } from '/@/api/model/baseModel';
import { StudentInfo, StudentListResp } from './model/studentModel';

enum Api {
  CreateOrUpdateStudent = '/example-api/student/create_or_update',
  GetStudentList = '/example-api/student/list',
  DeleteStudent = '/example-api/student/delete',
  BatchDeleteStudent = '/example-api/student/batch_delete',
}

/**
 * @description: Get student list
 */

export const getStudentList = (params: BasePageReq) => {
  return defHttp.post<BaseDataResp<StudentListResp>>({ url: Api.GetStudentList, params });
};

/**
 *  @description: create a new student
 */
export const createOrUpdateStudent = (params: StudentInfo, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdateStudent, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  @description: delete student
 */
export const deleteStudent = (params: BaseIdReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteStudent, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  @description: batch delete students
 */
export const batchDeleteStudent = (params: BaseIdsReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.BatchDeleteStudent, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
