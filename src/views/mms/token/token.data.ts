import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';
import { updateToken } from '/@/api/member/token';
import { Switch } from 'ant-design-vue';
import { h } from 'vue';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: 'UUID',
    dataIndex: 'id',
    width: 80,
  },
  {
    title: 'Token',
    dataIndex: 'token',
    width: 50,
  },
  {
    title: t('common.source'),
    dataIndex: 'source',
    width: 50,
  },
  {
    title: t('common.status'),
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
        onChange(checked, _) {
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 2;
          updateToken({ id: record.id, status: newStatus })
            .then(() => {
              record.status = newStatus;
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
  {
    title: t('common.expiredAt'),
    dataIndex: 'expiredAt',
    width: 50,
    customRender: ({ record }) => {
      return formatToDateTime(record.expiredAt);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'UUID',
    label: 'UUID',
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 30 }],
  },
  {
    field: 'username',
    label: t('sys.login.username'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 30 }],
  },
  {
    field: 'email',
    label: t('sys.login.email'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 50 }],
  },
  {
    field: 'nickname',
    label: t('sys.user.nickname'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 20 }],
  },
];
