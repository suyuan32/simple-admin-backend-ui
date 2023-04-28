import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';
import { getDepartmentList, updateDepartment } from '/@/api/sys/department';
import { Switch } from 'ant-design-vue';
import { h } from 'vue';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('sys.department.name'),
    dataIndex: 'trans',
    width: 60,
  },
  {
    title: t('sys.department.leader'),
    dataIndex: 'leader',
    width: 60,
  },
  {
    title: t('common.status'),
    dataIndex: 'status',
    width: 20,
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
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 0;
          updateDepartment({ id: record.id, status: newStatus })
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
    width: 50,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: t('sys.department.name'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 50 }],
  },
  {
    field: 'leader',
    label: t('sys.department.leader'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 20 }],
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
    label: t('sys.department.name'),
    component: 'Input',
    required: true,
    rules: [{ min: 1, max: 200 }],
  },
  {
    field: 'parentId',
    label: t('sys.department.parentId'),
    component: 'ApiTreeSelect',
    required: true,
    defaultValue: 0,
    componentProps: {
      api: getDepartmentList,
      params: {
        page: 1,
        pageSize: 1000,
        name: '',
        leader: '',
      },
      resultField: 'data.data',
      labelField: 'trans',
      valueField: 'id',
      defaultValue: {
        id: 0,
        parentId: -1,
        label: t('sys.department.firstLevelDepartment'),
        value: 0,
      },
    },
  },
  {
    field: 'ancestors',
    label: t('sys.department.ancestors'),
    component: 'Input',
    rules: [{ max: 200 }],
  },
  {
    field: 'leader',
    label: t('sys.department.leader'),
    component: 'Input',
    required: true,
    rules: [{ max: 20 }],
  },
  {
    field: 'phone',
    label: t('sys.department.phone'),
    component: 'Input',
    required: true,
    rules: [{ max: 18 }],
  },
  {
    field: 'email',
    label: t('sys.department.email'),
    component: 'Input',
    required: true,
    rules: [{ max: 70 }],
  },
  {
    field: 'sort',
    label: t('sys.department.sort'),
    component: 'InputNumber',
    required: true,
    rules: [{ type: 'number', max: 10000 }],
  },
  {
    field: 'remark',
    label: t('common.remark'),
    component: 'Input',
    rules: [{ max: 200 }],
  },
  {
    field: 'status',
    label: t('sys.department.status'),
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: t('common.on'), value: 1 },
        { label: t('common.off'), value: 0 },
      ],
    },
  },
];
