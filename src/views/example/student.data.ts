import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('Name'),
    dataIndex: 'name',
    width: 100,
  },
  {
    title: t('Age'),
    dataIndex: 'age',
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
    field: 'Name',
    label: t('name'),
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
    field: 'Name',
    label: t('name'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'Age',
    label: t('age'),
    component: 'Input',
    colProps: { span: 8 },
  },
];
