import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('sys.oauthProvider.name'),
    dataIndex: 'name',
    width: 100,
  },
  {
    title: t('sys.oauthProvider.clientId'),
    dataIndex: 'clientId',
    width: 100,
  },
  {
    title: t('sys.oauthProvider.clientSecret'),
    dataIndex: 'clientSecret',
    width: 100,
  },
  {
    title: t('sys.oauthProvider.redirectUrl'),
    dataIndex: 'redirectUrl',
    width: 100,
  },
  {
    title: t('sys.oauthProvider.scopes'),
    dataIndex: 'scopes',
    width: 100,
  },
  {
    title: t('sys.oauthProvider.authUrl'),
    dataIndex: 'authUrl',
    width: 100,
  },
  {
    title: t('sys.oauthProvider.tokenUrl'),
    dataIndex: 'tokenUrl',
    width: 100,
  },
  {
    title: t('sys.oauthProvider.authStyle'),
    dataIndex: 'authStyle',
    width: 100,
  },
  {
    title: t('sys.oauthProvider.infoUrl'),
    dataIndex: 'infoUrl',
    width: 100,
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
    field: 'name',
    label: t('sys.oauthProvider.name'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'clientId',
    label: t('sys.oauthProvider.clientId'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'clientSecret',
    label: t('sys.oauthProvider.clientSecret'),
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
    label: t('sys.oauthProvider.name'),
    component: 'Input',
  },
  {
    field: 'clientId',
    label: t('sys.oauthProvider.clientId'),
    component: 'Input',
  },
  {
    field: 'clientSecret',
    label: t('sys.oauthProvider.clientSecret'),
    component: 'Input',
  },
  {
    field: 'redirectUrl',
    label: t('sys.oauthProvider.redirectUrl'),
    component: 'Input',
  },
  {
    field: 'scopes',
    label: t('sys.oauthProvider.scopes'),
    component: 'Input',
  },
  {
    field: 'authUrl',
    label: t('sys.oauthProvider.authUrl'),
    component: 'Input',
  },
  {
    field: 'tokenUrl',
    label: t('sys.oauthProvider.tokenUrl'),
    component: 'Input',
  },
  {
    field: 'authStyle',
    label: t('sys.oauthProvider.authStyle'),
    component: 'InputNumber',
  },
  {
    field: 'infoUrl',
    label: t('sys.oauthProvider.infoUrl'),
    component: 'Input',
  },
];
