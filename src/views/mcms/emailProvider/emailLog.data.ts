import { h } from 'vue';
import { BasicColumn, FormSchema } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';
import { formatToDateTime } from '@/utils/dateUtil';
import { Tag } from 'ant-design-vue/lib/components';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('mcms.emailLog.target'),
    dataIndex: 'target',
    width: 50,
  },
  {
    title: t('mcms.emailLog.subject'),
    dataIndex: 'subject',
    width: 30,
  },
  {
    title: t('mcms.emailLog.content'),
    dataIndex: 'content',
    width: 100,
  },
  {
    title: t('mcms.emailLog.sendStatus'),
    dataIndex: 'sendStatus',
    width: 30,
    customRender: ({ record }) => {
      let resultText: string;
      if (record.sendStatus === 1) {
        resultText = t('common.successful');
      } else {
        resultText = t('common.failed');
      }
      return h(
        Tag,
        {
          color: record.sendStatus === 1 ? 'green' : 'red',
        },
        resultText,
      );
    },
  },
  {
    title: t('mcms.emailLog.provider'),
    dataIndex: 'provider',
    width: 30,
  },
  {
    title: t('common.createTime'),
    dataIndex: 'createdAt',
    width: 40,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'target',
    label: t('mcms.emailLog.target'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'subject',
    label: t('mcms.emailLog.subject'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'provider',
    label: t('mcms.emailLog.provider'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'sendStatus',
    label: t('mcms.emailLog.sendStatus'),
    component: 'Select',
    colProps: { span: 8 },
    defaultValue: 0,
    componentProps: {
      options: [
        { label: t('common.all'), value: 0 },
        { label: t('common.successful'), value: 1 },
        { label: t('common.failed'), value: 2 },
      ],
    },
  },
];
