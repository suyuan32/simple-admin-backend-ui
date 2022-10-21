import { Switch } from 'ant-design-vue';
import { h } from 'vue';
import { setTokenStatus } from '/@/api/sys/token';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { useMessage } from '/@/hooks/web/useMessage';
import { formatToDateTime } from '/@/utils/dateUtil';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: 'UUID',
    dataIndex: 'UUID',
    width: 200,
  },
  {
    title: 'Token',
    dataIndex: 'token',
    width: 200,
  },
  {
    title: t('common.source'),
    dataIndex: 'source',
    width: 30,
  },
  {
    title: t('common.statusName'),
    dataIndex: 'status',
    width: 120,
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
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 0;
          const { createMessage } = useMessage();
          setTokenStatus(record.id, newStatus)
            .then(() => {
              record.status = newStatus;
              createMessage.success(t('common.updateSuccess'));
            })
            .catch(() => {
              createMessage.error(t('common.updateFailed'));
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
    dataIndex: 'createAt',
    width: 70,
    customRender: ({ record }) => {
      return formatToDateTime(record.createAt);
    },
  },
  {
    title: t('common.expireAt'),
    dataIndex: 'expireAt',
    width: 70,
    customRender: ({ record }) => {
      return formatToDateTime(record.expireAt);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'UUID',
    label: 'UUID',
    defaultValue: '',
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 30 }],
  },
  {
    field: 'username',
    label: t('sys.login.username'),
    defaultValue: '',
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 30 }],
  },
  {
    field: 'email',
    label: t('sys.login.email'),
    defaultValue: '',
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 50 }],
  },
  {
    field: 'nickname',
    label: t('sys.user.nickname'),
    defaultValue: '',
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 20 }],
  },
];
