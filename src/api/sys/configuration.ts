import { defHttp } from '@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';
import { BaseDataResp, BaseResp, BaseIDsReq, BaseIDReq } from '@/api/model/baseModel';
import {
  ConfigurationInfo,
  ConfigurationListResp,
  ConfigurationListReq,
} from './model/configurationModel';

enum Api {
  CreateConfiguration = '/sys-api/configuration/create',
  UpdateConfiguration = '/sys-api/configuration/update',
  GetConfigurationList = '/sys-api/configuration/list',
  GetPublicSystemConfigurationList = '/sys-api/configuration/system/list',
  DeleteConfiguration = '/sys-api/configuration/delete',
  GetConfigurationById = '/sys-api/configuration',
}

/**
 * @description: Get configuration list
 */

export const getConfigurationList = (
  params: ConfigurationListReq,
  mode: ErrorMessageMode = 'notice',
) => {
  return defHttp.post<BaseDataResp<ConfigurationListResp>>(
    { url: Api.GetConfigurationList, params },
    { errorMessageMode: mode },
  );
};

/**
 * @description: Get public system configuration list
 */

export const getPublicSystemConfigurationList = (mode: ErrorMessageMode = 'none') => {
  return defHttp.get<BaseDataResp<ConfigurationListResp>>(
    { url: Api.GetPublicSystemConfigurationList },
    { errorMessageMode: mode },
  );
};

/**
 *  @description: Create a new configuration
 */
export const createConfiguration = (
  params: ConfigurationInfo,
  mode: ErrorMessageMode = 'notice',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.CreateConfiguration, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Update the configuration
 */
export const updateConfiguration = (
  params: ConfigurationInfo,
  mode: ErrorMessageMode = 'notice',
) => {
  return defHttp.post<BaseResp>(
    { url: Api.UpdateConfiguration, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Delete configurations
 */
export const deleteConfiguration = (params: BaseIDsReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseResp>(
    { url: Api.DeleteConfiguration, params: params },
    {
      errorMessageMode: mode,
      successMessageMode: mode,
    },
  );
};

/**
 *  @description: Get configuration By ID
 */
export const getConfigurationById = (params: BaseIDReq, mode: ErrorMessageMode = 'notice') => {
  return defHttp.post<BaseDataResp<ConfigurationInfo>>(
    { url: Api.GetConfigurationById, params: params },
    {
      errorMessageMode: mode,
    },
  );
};
