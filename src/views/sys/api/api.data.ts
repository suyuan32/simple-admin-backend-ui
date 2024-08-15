import { h } from 'vue';
import { BasicColumn, FormSchema } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';
import { formatToDateTime } from '@/utils/dateUtil';
import { Tag } from 'ant-design-vue';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('sys.apis.path'),
    dataIndex: 'path',
    width: 50,
  },
  {
    title: t('sys.apis.group'),
    dataIndex: 'group',
    width: 20,
  },
  {
    title: t('sys.apis.serviceName'),
    dataIndex: 'serviceName',
    width: 20,
  },
  {
    title: t('sys.apis.description'),
    dataIndex: 'trans',
    width: 80,
  },
  {
    title: t('sys.apis.method'),
    dataIndex: 'method',
    width: 20,
  },
  {
    title: t('common.required'),
    dataIndex: 'isRequired',
    width: 10,
    customRender: ({ record }) => {
      let resultText = '';
      if (record.isRequired === true) {
        resultText = t('common.yes');
      } else {
        resultText = t('common.no');
      }
      return h(
        Tag,
        {
          color: record.isRequired === true ? 'green' : 'red',
        },
        () => resultText,
      );
    },
  },
  {
    title: t('common.createTime'),
    dataIndex: 'createdAt',
    width: 30,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'path',
    label: t('sys.apis.path'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 200 }],
  },
  {
    field: 'serviceName',
    label: t('sys.apis.serviceName'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 20 }],
  },
  {
    field: 'group',
    label: t('sys.apis.group'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 80 }],
  },
  {
    field: 'description',
    label: t('sys.apis.description'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 100 }],
  },
  {
    field: 'method',
    label: t('sys.apis.method'),
    component: 'Select',
    componentProps: {
      options: [
        { label: 'GET', value: 'GET' },
        { label: 'POST', value: 'POST' },
        { label: 'DELETE', value: 'DELETE' },
        { label: 'PUT', value: 'PUT' },
        { label: 'PATCH', value: 'PATCH' },
      ],
    },
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
    field: 'path',
    label: t('sys.apis.path'),
    required: true,
    component: 'Input',
    rules: [{ max: 200 }],
  },
  {
    field: 'serviceName',
    label: t('sys.apis.serviceName'),
    component: 'Input',
    helpMessage: t('sys.apis.serviceNameHelpMessage'),
    rules: [{ max: 20 }],
  },
  {
    field: 'group',
    label: t('sys.apis.group'),
    required: true,
    component: 'Input',
    rules: [{ max: 80 }],
  },
  {
    field: 'description',
    label: t('sys.apis.description'),
    required: true,
    component: 'Input',
    rules: [{ max: 100 }],
  },
  {
    field: 'method',
    label: t('sys.apis.method'),
    required: true,
    component: 'Select',
    componentProps: {
      options: [
        { label: 'GET', value: 'GET' },
        { label: 'POST', value: 'POST' },
        { label: 'DELETE', value: 'DELETE' },
        { label: 'PUT', value: 'PUT' },
        { label: 'PATCH', value: 'PATCH' },
      ],
    },
  },
  {
    field: 'isRequired',
    label: t('common.required'),
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: t('common.yes'), value: true },
        { label: t('common.no'), value: false },
      ],
    },
    helpMessage: t('sys.apis.isRequiredHelpMessage'),
  },
];
