import { h } from 'vue';
import { BasicColumn, FormSchema } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';
import { formatToDateTime } from '@/utils/dateUtil';
import { Switch } from 'ant-design-vue';
import { updateEmailProvider } from '@/api/mcms/emailProvider';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('mcms.emailProvider.name'),
    dataIndex: 'name',
    width: 50,
  },
  {
    title: t('mcms.emailProvider.emailAddr'),
    dataIndex: 'emailAddr',
    width: 50,
  },
  {
    title: t('mcms.emailProvider.isDefault'),
    dataIndex: 'isDefault',
    width: 20,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.isDefault === true,
        checkedChildren: t('common.yes'),
        unCheckedChildren: t('common.no'),
        loading: record.pendingStatus,
        onChange(checked, _) {
          record.pendingStatus = true;
          updateEmailProvider({ id: record.id, isDefault: checked as boolean })
            .then(() => {
              record.isDefault = checked;
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
    width: 20,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: t('mcms.emailProvider.name'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'emailAddr',
    label: t('mcms.emailProvider.emailAddr'),
    component: 'Input',
    colProps: { span: 8 },
  },
];

const isPlain = (type: Number) => type === 1;

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },

  {
    field: 'name',
    label: t('mcms.emailProvider.name'),
    component: 'Input',
    required: true,
  },
  {
    field: 'authType',
    label: t('mcms.emailProvider.authType'),
    component: 'Select',
    required: true,
    componentProps: {
      options: [
        { label: 'plain', value: 1 },
        { label: 'CRAMMD5', value: 2 },
      ],
    },
  },
  {
    field: 'emailAddr',
    label: t('mcms.emailProvider.emailAddr'),
    component: 'Input',
    required: true,
    ifShow: ({ values }) => isPlain(values.authType),
  },
  {
    field: 'password',
    label: t('mcms.emailProvider.password'),
    component: 'Input',
    required: true,
    ifShow: ({ values }) => isPlain(values.authType),
  },
  {
    field: 'hostName',
    label: t('mcms.emailProvider.hostName'),
    component: 'Input',
    required: true,
    ifShow: ({ values }) => isPlain(values.authType),
  },
  {
    field: 'identify',
    label: t('mcms.emailProvider.identify'),
    component: 'Input',
    required: true,
    ifShow: ({ values }) => !isPlain(values.authType),
  },
  {
    field: 'secret',
    label: t('mcms.emailProvider.secret'),
    component: 'Input',
    required: true,
    ifShow: ({ values }) => !isPlain(values.authType),
  },
  {
    field: 'port',
    label: t('mcms.emailProvider.port'),
    component: 'InputNumber',
    required: true,
    ifShow: ({ values }) => isPlain(values.authType),
  },
  {
    field: 'tls',
    label: t('mcms.emailProvider.tls'),
    component: 'RadioButtonGroup',
    required: true,
    defaultValue: false,
    componentProps: {
      options: [
        { label: t('common.yes'), value: true },
        { label: t('common.no'), value: false },
      ],
    },
  },
  {
    field: 'isDefault',
    label: t('mcms.emailProvider.isDefault'),
    component: 'RadioButtonGroup',
    required: true,
    defaultValue: false,
    componentProps: {
      options: [
        { label: t('common.yes'), value: true },
        { label: t('common.no'), value: false },
      ],
    },
  },
];
