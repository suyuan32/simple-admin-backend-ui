import { BasicColumn, FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { useI18n } from '/@/hooks/web/useI18n';
import { DataNode } from 'ant-design-vue/lib/tree';
import { ApiInfo } from '/@/api/sys/model/apiModel';
import { ApiAuthorityInfo } from '/@/api/sys/model/authorityModel';
import { formatToDateTime } from '/@/utils/dateUtil';
import { updateRole } from '/@/api/sys/role';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('sys.role.roleName'),
    dataIndex: 'trans',
    width: 200,
  },
  {
    title: t('sys.role.roleValue'),
    dataIndex: 'code',
    width: 180,
  },
  {
    title: t('common.sort'),
    dataIndex: 'sort',
    width: 50,
  },
  {
    title: t('common.status'),
    dataIndex: 'status',
    width: 120,
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
    title: t('common.createTime'),
    dataIndex: 'createdAt',
    width: 180,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
  {
    title: t('common.remark'),
    dataIndex: 'remark',
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
    rules: [{ type: 'number', max: 10000 }],
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
  const apiData: DataNode[] = [];
  if (params.length === 0) {
    return apiData;
  }

  const apiMap = new Map<string, boolean>();
  for (let i = 0; i < params.length; i++) {
    apiMap.set(params[i].group, true);
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
          title: t(params[i].trans),
          key: params[i].id,
        });
      }
    }

    apiData.push(apiTmp);
  }
  return apiData;
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
    return a.id - b.id;
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
  const result: number[] = [];
  for (let i = 0; i < data.length; i++) {
    dataMap.set(data[i].path + data[i].method, data[i].id);
  }
  for (let i = 0; i < checked.length; i++) {
    result.push(dataMap.get(checked[i].path + checked[i].method));
  }
  return result;
}
