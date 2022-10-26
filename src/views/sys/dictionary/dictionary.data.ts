import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('common.title'),
    dataIndex: 'title',
    width: 200,
  },
  {
    title: t('common.name'),
    dataIndex: 'name',
    width: 50,
  },
  {
    title: t('common.description'),
    dataIndex: 'description',
    width: 200,
    customRender: ({ record }) => {
      return t(record.description);
    },
  },
  {
    title: t('common.statusName'),
    dataIndex: 'status',
    width: 50,
    customRender: ({ record }) => {
      if (record.status) {
        return t('common.on');
      }
      return t('common.off');
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

export const detailColumns: BasicColumn[] = [
  {
    title: t('common.title'),
    dataIndex: 'title',
    width: 200,
  },
  {
    title: t('common.key'),
    dataIndex: 'key',
    width: 50,
  },
  {
    title: t('common.value'),
    dataIndex: 'value',
    width: 200,
    customRender: ({ record }) => {
      return t(record.description);
    },
  },
  {
    title: t('common.statusName'),
    dataIndex: 'status',
    width: 50,
    customRender: ({ record }) => {
      if (record.status) {
        return t('common.on');
      }
      return t('common.off');
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
    field: 'title',
    label: t('common.title'),
    defaultValue: '',
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 100 }],
  },
  {
    field: 'name',
    label: t('common.name'),
    defaultValue: '',
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 10 }],
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
    field: 'title',
    label: t('common.title'),
    required: true,
    component: 'Input',
    rules: [{ max: 100 }],
  },
  {
    field: 'name',
    label: t('common.name'),
    required: true,
    component: 'Input',
    rules: [{ max: 10 }],
  },
  {
    field: 'description',
    label: t('sys.apis.description'),
    required: true,
    component: 'Input',
    rules: [{ max: 50 }],
  },
  {
    field: 'status',
    label: t('common.statusName'),
    required: true,
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

export const detailSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'title',
    label: t('common.title'),
    required: true,
    component: 'Input',
    rules: [{ max: 100 }],
  },
  {
    field: 'key',
    label: t('common.key'),
    required: true,
    component: 'Input',
    rules: [{ max: 10 }],
  },
  {
    field: 'value',
    label: t('common.value'),
    required: true,
    component: 'Input',
  },
  {
    field: 'status',
    label: t('common.statusName'),
    required: true,
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
