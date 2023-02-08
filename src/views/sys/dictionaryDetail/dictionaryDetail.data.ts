import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';
import { updateDictionaryDetail } from '/@/api/sys/dictionaryDetail';
import { Switch } from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { h } from 'vue';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('sys.dictionaryDetail.title'),
    dataIndex: 'title',
    width: 100,
  },
  {
    title: t('sys.dictionaryDetail.key'),
    dataIndex: 'key',
    width: 100,
  },
  {
    title: t('sys.dictionaryDetail.value'),
    dataIndex: 'value',
    width: 100,
  },
  {
    title: t('common.status'),
    dataIndex: 'status',
    width: 50,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === 1,
        checkedChildren: t('common.on'),
        unCheckedChildren: t('common.off'),
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          const { createMessage } = useMessage();
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 2;
          updateDictionaryDetail({ id: record.id, status: newStatus })
            .then((data) => {
              record.status = newStatus;
              if (data.code == 0) createMessage.success(t('common.changeStatusSuccess'));
            })
            .catch(() => {
              createMessage.error(t('common.changeStatusFailed'));
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
    width: 70,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: t('sys.dictionaryDetail.title'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'key',
    label: t('sys.dictionaryDetail.key'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'value',
    label: t('sys.dictionaryDetail.value'),
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
    field: 'title',
    label: t('sys.dictionaryDetail.title'),
    component: 'Input',
  },
  {
    field: 'key',
    label: t('sys.dictionaryDetail.key'),
    component: 'Input',
  },
  {
    field: 'value',
    label: t('sys.dictionaryDetail.value'),
    component: 'Input',
  },
  {
    field: 'status',
    label: t('sys.dictionaryDetail.status'),
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: t('common.on'), value: 1 },
        { label: t('common.off'), value: 2 },
      ],
    },
  },
];
