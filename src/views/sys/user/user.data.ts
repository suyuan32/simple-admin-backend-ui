import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { setUserStatus } from '/@/api/sys/user';
import { getRoleList } from '/@/api/sys/role';
import { getDepartmentList } from '/@/api/sys/department';
import { getPositionList } from '/@/api/sys/position';

const { t } = useI18n();

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
          const { createMessage } = useMessage();
          if (record.id == 1) {
            createMessage.warn(t('sys.role.adminStatusChangeForbidden'));
            return;
          }

          record.pendingStatus = true;
          const newStatus = checked ? 1 : 0;
          setUserStatus(record.id, newStatus)
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
    field: 'desc',
    label: t('sys.user.description'),
    required: false,
    component: 'Input',
    rules: [{ max: 30 }],
  },
  {
    field: 'homePath',
    label: t('sys.user.homePath'),
    required: false,
    defaultValue: '/dashboard',
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
    component: 'ApiSelect',
    componentProps: {
      api: getRoleList,
      params: {
        page: 1,
        pageSize: 100,
      },
      resultField: 'data.data',
      labelField: 'title',
      valueField: 'id',
    },
  },
  {
    field: 'departmentId',
    label: t('sys.department.userDepartment'),
    component: 'ApiTreeSelect',
    required: true,
    defaultValue: 1,
    componentProps: {
      api: getDepartmentList,
      params: {
        page: 1,
        pageSize: 1000,
        name: '',
        leader: '',
      },
      resultField: 'data.data',
      labelField: 'trans',
      valueField: 'id',
    },
  },
  {
    field: 'positionId',
    label: t('sys.position.userPosition'),
    component: 'ApiSelect',
    required: true,
    componentProps: {
      api: getPositionList,
      params: {
        page: 1,
        pageSize: 1000,
        name: '',
      },
      resultField: 'data.data',
      labelField: 'trans',
      valueField: 'id',
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
