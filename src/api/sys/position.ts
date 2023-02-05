import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIdsReq, BaseIdReq } from '/@/api/model/baseModel';
import { PositionInfo, PositionListResp } from './model/positionModel';

enum Api {
  CreateOrUpdatePosition = '/sys-api/position/create_or_update',
  GetPositionList = '/sys-api/position/list',
  DeletePosition = '/sys-api/position/delete',
  BatchDeletePosition = '/sys-api/position/batch_delete',
  SetPositionStatus = '/sys-api/position/status',
}

/**
 * @description: Get position list
 */

export const getPositionList = (params: BaseListReq) => {
  return defHttp.post<BaseDataResp<PositionListResp>>({ url: Api.GetPositionList, params });
};

/**
 *  @description: create a new position
 */
export const createOrUpdatePosition = (params: PositionInfo, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateOrUpdatePosition, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  @description: delete position
 */
export const deletePosition = (params: BaseIdReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeletePosition, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  @description: batch delete positions
 */
export const batchDeletePosition = (params: BaseIdsReq, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<BaseResp>(
    { url: Api.BatchDeletePosition, params: params },
    {
      errorMessageMode: mode,
    },
  );
};

/**
 *  @description: set the position status
 */
export const setPositionStatus = (id: string, status: number) =>
  defHttp.post({ url: Api.SetPositionStatus, params: { id, status } });
