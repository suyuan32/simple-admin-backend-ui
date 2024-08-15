import { Tag } from 'ant-design-vue';
import { h } from 'vue';
import { BasicColumn, FormSchema } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';
import { formatToDateTime } from '@/utils/dateUtil';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('sys.taskLog.startedAt'),
    dataIndex: 'startedAt',
    width: 50,
    customRender: ({ record }) => {
      return formatToDateTime(record.startedAt);
    },
  },
  {
    title: t('sys.taskLog.finishedAt'),
    dataIndex: 'finishedAt',
    width: 50,
    customRender: ({ record }) => {
      return formatToDateTime(record.finishedAt);
    },
  },
  {
    title: t('sys.taskLog.result'),
    dataIndex: 'result',
    width: 30,
    customRender: ({ record }) => {
      let resultText: string;
      if (record.result === 1) {
        resultText = t('common.successful');
      } else {
        resultText = t('common.failed');
      }
      return h(
        Tag,
        {
          color: record.result === 1 ? 'green' : 'red',
        },
        resultText,
      );
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'result',
    label: t('sys.taskLog.result'),
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
