import { Tag } from 'ant-design-vue/lib/components';
import { BasicColumn, FormSchema } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';
import { formatToDateTime } from '@/utils/dateUtil';
import { h } from 'vue';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('mcms.smsLog.phoneNumber'),
    dataIndex: 'phoneNumber',
    width: 50,
  },
  {
    title: t('mcms.smsLog.content'),
    dataIndex: 'content',
    width: 50,
  },
  {
    title: t('mcms.emailLog.sendStatus'),
    dataIndex: 'sendStatus',
    width: 20,
    customRender: ({ record }) => {
      let resultText : string;
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
    title: t('mcms.smsLog.provider'),
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
    field: 'phoneNumber',
    label: t('mcms.smsLog.phoneNumber'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'content',
    label: t('mcms.smsLog.content'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'provider',
    label: t('mcms.smsLog.provider'),
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

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },

  {
    field: 'phoneNumber',
    label: t('mcms.smsLog.phoneNumber'),
    component: 'Input',
    required: true,
  },
  {
    field: 'content',
    label: t('mcms.smsLog.content'),
    component: 'Input',
    required: true,
  },
  {
    field: 'sendStatus',
    label: t('mcms.smsLog.sendStatus'),
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'provider',
    label: t('mcms.smsLog.provider'),
    component: 'Input',
    required: true,
  },
];
