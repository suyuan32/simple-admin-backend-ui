import { BasicColumn, FormSchema } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';
import { formatToDateTime } from '@/utils/dateUtil';
import { updateConfiguration } from '@/api/sys/configuration';
import { Switch } from 'ant-design-vue';
import { h } from 'vue';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('sys.configuration.name'),
    dataIndex: 'name',
    width: 100,
  },
  {
    title: t('sys.configuration.key'),
    dataIndex: 'key',
    width: 100,
  },
  {
    title: t('sys.configuration.category'),
    dataIndex: 'category',
    width: 100,
  },
  {
    title: t('sys.configuration.remark'),
    dataIndex: 'remark',
    width: 100,
  },
  {
    title: t('common.status'),
    dataIndex: 'state',
    width: 50,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.state === true,
        checkedChildren: t('common.on'),
        unCheckedChildren: t('common.off'),
        loading: record.pendingStatus,
        onChange(checked, _) {
          record.pendingStatus = true;
          const newState = !!checked;
          updateConfiguration({ id: record.id, state: newState })
            .then(() => {
              record.state = newState;
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
    width: 70,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: t('sys.configuration.name'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'key',
    label: t('sys.configuration.key'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'category',
    label: t('sys.configuration.category'),
    component: 'Input',
    required: false,
    colProps: { span: 8 },
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
    label: t('sys.configuration.name'),
    component: 'Input',
    required: true,
  },
  {
    field: 'key',
    label: t('sys.configuration.key'),
    component: 'Input',
    required: true,
  },
  {
    field: 'value',
    label: t('sys.configuration.value'),
    component: 'Input',
    required: true,
  },
  {
    field: 'category',
    label: t('sys.configuration.category'),
    component: 'Input',
    required: true,
  },
  {
    field: 'remark',
    label: t('common.remark'),
    component: 'Input',
    required: false,
  },
  {
    field: 'sort',
    label: t('common.sort'),
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'state',
    label: t('common.status'),
    component: 'RadioButtonGroup',
    defaultValue: true,
    componentProps: {
      options: [
        { label: t('common.on'), value: true },
        { label: t('common.off'), value: false },
      ],
    },
  },
];
