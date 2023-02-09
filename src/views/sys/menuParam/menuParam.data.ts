import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('sys.menuParam.type'),
    dataIndex: 'type',
    width: 100,
  },
  {
    title: t('sys.menuParam.key'),
    dataIndex: 'key',
    width: 100,
  },
  {
    title: t('sys.menuParam.value'),
    dataIndex: 'value',
    width: 100,
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
    field: 'type',
    label: t('sys.menuParam.type'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'key',
    label: t('sys.menuParam.key'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'value',
    label: t('sys.menuParam.value'),
    component: 'Input',
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
    field: 'type',
    label: t('sys.menuParam.type'),
    component: 'Input',
  },
  {
    field: 'key',
    label: t('sys.menuParam.key'),
    component: 'Input',
  },
  {
    field: 'value',
    label: t('sys.menuParam.value'),
    component: 'Input',
  },
];
