import { FormSchema } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';

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
    component: 'Select',
    componentProps: {
      options: [
        { label: t('mcms.smsProvider.tencent'), value: 'tencent' },
        { label: t('mcms.smsProvider.aliyun'), value: 'aliyun' },
        { label: t('mcms.smsProvider.uni'), value: 'uni' },
      ],
    },
  },
];
