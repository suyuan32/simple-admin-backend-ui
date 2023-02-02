import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('sys.department.name'),
    dataIndex: 'name',
    width: 100,
  },
  {
    title: t('sys.department.sort'),
    dataIndex: 'sort',
    width: 50,
  },
  {
    title: t('sys.department.status'),
    dataIndex: 'status',
    width: 50,
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
    label: t('sys.department.name'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'leader',
    label: t('sys.department.leader'),
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
    field: 'name',
    label: t('sys.department.name'),
    component: 'Input',
  },
  {
    field: 'leader',
    label: t('sys.department.leader'),
    component: 'Input',
  },
  {
    field: 'phone',
    label: t('sys.department.phone'),
    component: 'Input',
  },
  {
    field: 'email',
    label: t('sys.department.email'),
    component: 'Input',
  },
  {
    field: 'sort',
    label: t('sys.department.sort'),
    component: 'Input',
  },
  {
    field: 'status',
    label: t('sys.department.status'),
    component: 'Input',
  },
];
