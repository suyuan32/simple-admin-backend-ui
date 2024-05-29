import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { useMessage } from '@/hooks/web/useMessage';
import { useI18n } from '@/hooks/web/useI18n';
import { DataNode } from 'ant-design-vue/lib/tree';
import { ApiInfo } from '@/api/sys/model/apiModel';
import { ApiAuthorityInfo } from '@/api/sys/model/authorityModel';
import { formatToDateTime } from '@/utils/dateUtil';
import { updateRole } from '@/api/sys/role';
import { clone, concat, unique } from 'remeda';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('sys.role.roleName'),
    dataIndex: 'trans',
    width: 50,
  },
  {
    title: t('sys.role.roleValue'),
    dataIndex: 'code',
    width: 20,
  },
  {
    title: t('common.status'),
    dataIndex: 'status',
    width: 50,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === 1,
        checkedChildren: t('common.on'),
        unCheckedChildren: t('common.off'),
        loading: record.pendingStatus,
        onChange(checked, _) {
          const { createMessage } = useMessage();
          if (record.id == 1) {
            createMessage.warn(t('sys.role.adminStatusChangeForbidden'));
            return;
          }

          record.pendingStatus = true;
          const newStatus = checked ? 1 : 2;
          updateRole({ id: record.id, status: newStatus })
            .then(() => {
              record.status = newStatus;
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: t('common.remark'),
    dataIndex: 'remark',
    width: 50,
  },
  {
    title: t('common.createTime'),
    dataIndex: 'createdAt',
    width: 50,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: t('sys.role.roleName'),
    required: true,
    component: 'Input',
    rules: [{ max: 30 }],
  },
  {
    field: 'sort',
    label: t('sys.menu.order'),
    defaultValue: 0,
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'code',
    label: t('sys.role.roleValue'),
    required: true,
    component: 'Input',
    rules: [{ min: 1, max: 20 }],
  },
  {
    field: 'defaultRouter',
    label: t('sys.role.defaultRouter'),
    required: true,
    component: 'Input',
    rules: [{ max: 80 }],
  },
  {
    field: 'status',
    label: t('common.status'),
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: t('common.on'), value: 1 },
        { label: t('common.off'), value: 0 },
      ],
    },
  },
  {
    label: t('common.remark'),
    field: 'remark',
    component: 'InputTextArea',
    rules: [{ max: 200 }],
  },
];

/**
 *  author: Ryan Su
 *  @description: this function is used to convert menu data into tree node data
 */

export function convertApiTreeData(params: ApiInfo[]): DataNode[] {
  const finalData: DataNode[] = [];
  const apiData: DataNode[] = [];
  if (params.length === 0) {
    return apiData;
  }

  const apiMap = new Map<string, string>();
  const serviceMap = new Map<string, boolean>();
  for (let i = 0; i < params.length; i++) {
    apiMap.set(params[i].group, params[i].serviceName);
    serviceMap.set(params[i].serviceName, true);
  }

  for (const k of apiMap.keys()) {
    const apiTmp: DataNode = {
      title: k,
      key: k,
      children: [],
    };

    for (let i = 0; i < params.length; i++) {
      if (params[i].group == k) {
        apiTmp.children?.push({
          title: params[i].trans,
          key: params[i].id as number,
          disableCheckbox: params[i].isRequired,
        });
      }
    }

    apiData.push(apiTmp);
  }

  for (const k1 of serviceMap.keys()) {
    const svcTmp: DataNode = {
      title: k1,
      key: k1,
      children: [],
    };

    for (let i = 0; i < apiData.length; i++) {
      if (apiMap.get(apiData[i].title) === k1) {
        svcTmp.children?.push(clone(apiData[i]));
      }
    }

    finalData.push(svcTmp);
  }

  return finalData;
}

/**
 *  author: Ryan Su
 *  @description: convert checked data into authorized data
 */
export function convertApiCheckedKeysToReq(checked: number[], data: ApiInfo[]): ApiAuthorityInfo[] {
  // delete string keys
  const pureDigit: number[] = [];
  for (let i = 0; i < checked.length; i++) {
    if (typeof checked[i] === 'number') {
      pureDigit.push(checked[i]);
    }
  }

  // sort data
  data.sort(function (a, b) {
    if (a.id !== undefined && b.id !== undefined) return a.id - b.id;
    return 1;
  });
  pureDigit.sort(function (a, b) {
    return a - b;
  });
  // convert data
  const target: ApiAuthorityInfo[] = [];
  let j = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === pureDigit[j]) {
      target.push({
        path: data[i].path,
        method: data[i].method,
      });
      j++;
    }
  }
  return target;
}

/**
 *  author: Ryan Su
 *  @description: this function is used to convert authorization api response into checked keys
 */

export function convertApiToCheckedKeys(checked: ApiAuthorityInfo[], data: ApiInfo[]): number[] {
  const dataMap = new Map();
  const authorityApis: number[] = [];
  const requiredAPIs: number[] = [];
  data.forEach(function (value, _key) {
    if (value.isRequired == true) {
      requiredAPIs.push(value.id as number);
    }
  });

  for (let i = 0; i < data.length; i++) {
    dataMap.set(data[i].path + data[i].method, data[i].id);
  }
  for (let i = 0; i < checked.length; i++) {
    authorityApis.push(dataMap.get(checked[i].path + checked[i].method));
  }

  const result = unique(concat(authorityApis, requiredAPIs));
  return result;
}
