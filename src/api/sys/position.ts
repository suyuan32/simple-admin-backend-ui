import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseListReq, BaseResp, BaseIDsReq, BaseIDReq } from '/@/api/model/baseModel';
import { PositionInfo, PositionListResp } from './model/positionModel';

enum Api {
  CreatePosition = '/sys-api/position/create',
  UpdatePosition = '/sys-api/position/update',
  GetPositionList = '/sys-api/position/list',
  DeletePosition = '/sys-api/position/delete',
  GetPositionById = '/sys-api/position',
}

/**
 * @description: Get position list
 */

export const getPositionList = (params: BaseListReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<PositionListResp>>(
    { url: Api.GetPositionList, params },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new position
 */
export const createPosition = (params: PositionInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.CreatePosition, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the position
 */
export const updatePosition = (params: PositionInfo, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdatePosition, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete positions
 */
export const deletePosition = (params: BaseIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeletePosition, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get position By ID
 */
export const getPositionById = (params: BaseIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<PositionInfo>>(
    { url: Api.GetPositionById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
