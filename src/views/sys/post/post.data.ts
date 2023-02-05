import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';
import { setPostStatus } from '/@/api/sys/post';
import { Switch } from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { h } from 'vue';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('sys.post.name'),
    dataIndex: 'trans',
    width: 80,
  },
  {
    title: t('sys.post.code'),
    dataIndex: 'code',
    width: 50,
  },
  {
    title: t('common.remark'),
    dataIndex: 'remark',
    width: 100,
  },
  {
    title: t('common.order'),
    dataIndex: 'sort',
    width: 30,
  },
  {
    title: t('common.statusName'),
    dataIndex: 'status',
    width: 40,
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
          const newStatus = checked ? 1 : 0;
          setPostStatus(record.id, newStatus)
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
    width: 50,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: t('sys.post.name'),
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
    label: t('sys.post.name'),
    component: 'Input',
  },
  {
    field: 'code',
    label: t('sys.post.code'),
    component: 'Input',
  },
  {
    field: 'remark',
    label: t('common.remark'),
    component: 'Input',
  },
  {
    field: 'sort',
    label: t('common.order'),
    component: 'InputNumber',
  },
  {
    field: 'status',
    label: t('common.statusName'),
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: t('common.on'), value: 1 },
        { label: t('common.off'), value: 0 },
      ],
    },
  },
];
