import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';
import { updateSmsProvider } from '/@/api/mcms/smsProvider';
import { useRedo } from '/@/hooks/web/usePage';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('mcms.smsProvider.name'),
    dataIndex: 'name',
    width: 100,
  },
  {
    title: t('mcms.smsProvider.isDefault'),
    dataIndex: 'isDefault',
    width: 100,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.isDefault === true,
        checkedChildren: t('common.yes'),
        unCheckedChildren: t('common.no'),
        loading: record.pendingStatus,
        onChange(checked, _) {
          record.pendingStatus = true;
          updateSmsProvider({ id: record.id, isDefault: checked as boolean })
            .then(() => {
              record.isDefault = checked;
              const redo = useRedo();
              redo();
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
    field: 'name',
    label: t('mcms.smsProvider.name'),
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
    label: t('mcms.smsProvider.name'),
    component: 'Input',
    required: true,
  },
  {
    field: 'secretId',
    label: t('mcms.smsProvider.secretId'),
    component: 'Input',
    required: true,
  },
  {
    field: 'secretKey',
    label: t('mcms.smsProvider.secretKey'),
    component: 'Input',
    required: true,
  },
  {
    field: 'region',
    label: t('mcms.smsProvider.region'),
    component: 'Input',
    required: true,
  },
  {
    field: 'isDefault',
    label: t('mcms.smsProvider.isDefault'),
    component: 'RadioButtonGroup',
    required: true,
    defaultValue: false,
    componentProps: {
      options: [
        { label: t('common.yes'), value: true },
        { label: t('common.no'), value: false },
      ],
    },
  },
];
