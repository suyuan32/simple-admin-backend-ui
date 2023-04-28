import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';
import { Switch } from 'ant-design-vue';
import { h } from 'vue';
import { getMemberRankList } from '../../../api/member/memberRank';
import { updateMember } from '../../../api/member/member';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('sys.login.username'),
    dataIndex: 'username',
    width: 100,
  },
  {
    title: t('sys.user.nickname'),
    dataIndex: 'nickname',
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
        onChange(checked, _) {
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 0;
          updateMember({ id: record.id, status: newStatus })
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
    width: 70,
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
  },
  {
    field: 'nickname',
    label: t('sys.user.nickname'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'mobile',
    label: t('sys.login.mobile'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'email',
    label: t('sys.login.email'),
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
    field: 'username',
    label: t('sys.login.username'),
    component: 'Input',
    required: true,
  },
  {
    field: 'password',
    label: t('sys.login.password'),
    component: 'Input',
  },
  {
    field: 'nickname',
    label: t('sys.user.nickname'),
    component: 'Input',
    required: true,
  },
  {
    field: 'rankId',
    label: t('sys.member.rankId'),
    component: 'ApiSelect',
    required: true,
    defaultValue: 1,
    componentProps: {
      api: getMemberRankList,
      params: {
        page: 1,
        pageSize: 1000,
      },
      resultField: 'data.data',
      labelField: 'trans',
      valueField: 'id',
    },
  },
  {
    field: 'mobile',
    label: t('sys.login.mobile'),
    component: 'Input',
  },
  {
    field: 'email',
    label: t('sys.login.email'),
    component: 'Input',
    required: true,
  },
  {
    field: 'avatar',
    label: t('sys.user.avatar'),
    component: 'Input',
  },
  {
    field: 'status',
    label: t('common.status'),
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
