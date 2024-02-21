import { getEmailProviderList } from '@/api/mcms/emailProvider';
import { FormSchema } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();

export const formSchema: FormSchema[] = [
  {
    field: 'target',
    label: t('mcms.email.targetAddress'),
    component: 'Input',
    required: true,
  },
  {
    field: 'subject',
    label: t('mcms.email.subject'),
    component: 'Input',
    required: true,
  },
  {
    field: 'content',
    label: t('mcms.email.content'),
    component: 'InputTextArea',
    required: true,
  },
  {
    field: 'provider',
    label: t('mcms.emailLog.provider'),
    component: 'ApiSelect',
    required: true,
    defaultValue: 'tencent',
    componentProps: {
      api: getEmailProviderList,
      params: {
        page: 1,
        pageSize: 1000,
      },
      resultField: 'data.data',
      labelField: 'name',
      valueField: 'name',
    },
  },
];
