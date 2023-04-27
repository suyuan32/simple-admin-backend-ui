import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('sys.memberRank.name'),
    dataIndex: 'trans',
    width: 100,
  },
  {
    title: t('sys.memberRank.description'),
    dataIndex: 'description',
    width: 100,
  },
  {
    title: t('sys.memberRank.remark'),
    dataIndex: 'remark',
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
    field: 'name',
    label: t('sys.memberRank.name'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'description',
    label: t('sys.memberRank.description'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'remark',
    label: t('sys.memberRank.remark'),
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
    label: t('sys.memberRank.name'),
    component: 'Input',
  },
  {
    field: 'code',
    label: t('sys.memberRank.code'),
    component: 'Input',
  },
  {
    field: 'description',
    label: t('sys.memberRank.description'),
    component: 'Input',
  },
  {
    field: 'remark',
    label: t('sys.memberRank.remark'),
    component: 'Input',
  },
];
