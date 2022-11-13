import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { setUserStatus } from '/@/api/sys/user';
import { RoleInfo } from '/@/api/sys/model/roleModel';

const { t } = useI18n();
interface compOption {
  label: string;
  value: string | number;
}

// get role options data
export const roleOptionData = (roleInfoInStore: RoleInfo[], type: number): compOption[] => {
  const result: compOption[] = [];
  // type 1 means search schema
  if (type === 1) {
    result.push({ label: '全部', value: 0 });
  }
  for (let i = 0; i < roleInfoInStore.length; i++) {
    result.push({
      label: roleInfoInStore[i].title,
      value: roleInfoInStore[i].id,
    });
  }
  return result;
};

export const columns: BasicColumn[] = [
  {
    title: t('sys.login.username'),
    dataIndex: 'username',
    width: 30,
  },
  {
    title: t('sys.user.nickname'),
    dataIndex: 'nickname',
    width: 30,
  },
  {
    title: t('sys.login.email'),
    dataIndex: 'email',
    width: 80,
  },
  {
    title: t('common.statusName'),
    dataIndex: 'status',
    width: 20,
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
          setUserStatus(record.id, newStatus)
            .then(() => {
              record.status = newStatus;
              createMessage.success(t('common.changeStatusSuccess'));
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
    field: 'username',
    label: t('sys.login.username'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 30 }],
  },
  {
    field: 'nickname',
    label: t('sys.user.nickname'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 30 }],
  },
  {
    field: 'roleId',
    label: t('sys.role.roleTitle'),
    component: 'Select',
    colProps: { span: 8 },
    componentProps: {
      // search form does not support updateSchema function yet
      // therefore we have to manually set the options
      options: [
        { label: t('common.all'), value: 0 },
        { label: t('sys.role.admin'), value: 1 },
        { label: t('sys.role.stuff'), value: 2 },
        { label: t('sys.role.member'), value: 3 },
      ],
    },
  },
  {
    field: 'mobile',
    label: t('sys.login.mobile'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 18 }],
  },
  {
    field: 'email',
    label: t('sys.login.email'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ type: 'email' }],
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'avatar',
    label: t('sys.user.avatar'),
    defaultValue: '',
    component: 'Input',
    show: false,
  },
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'username',
    label: t('sys.login.username'),
    required: true,
    component: 'Input',
    rules: [{ max: 30 }],
  },
  {
    field: 'nickname',
    label: t('sys.user.nickname'),
    required: true,
    component: 'Input',
    rules: [{ max: 30 }],
  },
  {
    field: 'mobile',
    label: t('sys.login.mobile'),
    component: 'Input',
    rules: [{ max: 18 }],
  },
  {
    field: 'email',
    label: t('sys.login.email'),
    required: true,
    component: 'Input',
    rules: [{ type: 'email' }],
  },
  {
    field: 'password',
    label: t('sys.login.password'),
    component: 'Input',
    rules: [{ min: 6, max: 30 }],
  },
  {
    field: 'roleId',
    label: t('sys.role.roleTitle'),
    required: true,
    component: 'Select',
    componentProps: {
      options: [],
    },
  },
  {
    field: 'status',
    label: t('sys.menu.statusName'),
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
