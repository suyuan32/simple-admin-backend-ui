import { getSmsProviderList } from '/@/api/mcms/smsProvider';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

export const formSchema: FormSchema[] = [
  {
    field: 'phoneNumber',
    label: t('mcms.sms.phoneNumber'),
    component: 'Input',
    required: true,
  },
  {
    field: 'params',
    label: t('mcms.sms.params'),
    component: 'Input',
    required: true,
    helpMessage(_renderCallbackParams) {
      return t('mcms.sms.paramsHelp');
    },
  },
  {
    field: 'templateId',
    label: t('mcms.sms.templateId'),
    component: 'Input',
    helpMessage(_renderCallbackParams) {
      return t('mcms.sms.templateIdHelp');
    },
  },
  {
    field: 'signName',
    label: t('mcms.sms.signName'),
    component: 'Input',
  },
  {
    field: 'provider',
    label: t('mcms.emailLog.provider'),
    component: 'ApiSelect',
    componentProps: {
      api: getSmsProviderList,
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
