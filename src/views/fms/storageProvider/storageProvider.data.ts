import { BasicColumn, FormSchema } from '@/components/Table';
import { useI18n } from '@/hooks/web/useI18n';
import { formatToDateTime } from '@/utils/dateUtil';
import { updateStorageProvider } from '@/api/fms/storageProvider';
import { Switch } from 'ant-design-vue';
import { h } from 'vue';
import { useRedo } from '@/hooks/web/usePage';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('fms.storageProvider.name'),
    dataIndex: 'name',
    width: 50,
  },
  {
    title: t('fms.storageProvider.isDefault'),
    dataIndex: 'isDefault',
    width: 20,
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
          updateStorageProvider({ id: record.id, isDefault: checked as boolean })
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
    title: t('common.status'),
    dataIndex: 'state',
    width: 20,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.state === true,
        checkedChildren: t('common.on'),
        unCheckedChildren: t('common.off'),
        loading: record.pendingStatus,
        onChange(checked, _) {
          record.pendingStatus = true;
          const newState = !!checked;
          updateStorageProvider({ id: record.id, state: newState })
            .then(() => {
              record.state = newState;
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
    width: 30,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: t('fms.storageProvider.name'),
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
    label: t('fms.storageProvider.name'),
    component: 'Input',
    required: true,
    helpMessage: t('fms.storageProvider.nameHelpMessage'),
  },
  {
    field: 'bucket',
    label: t('fms.storageProvider.bucket'),
    component: 'Input',
    required: true,
  },
  {
    field: 'secretId',
    label: t('fms.storageProvider.secretId'),
    component: 'Input',
    required: true,
  },
  {
    field: 'secretKey',
    label: t('fms.storageProvider.secretKey'),
    component: 'Input',
    required: true,
  },
  {
    field: 'endpoint',
    label: t('fms.storageProvider.endpoint'),
    component: 'Input',
    required: true,
  },
  {
    field: 'folder',
    label: t('fms.storageProvider.folder'),
    component: 'Input',
    helpMessage: t('fms.storageProvider.folderHelpMessage'),
  },
  {
    field: 'region',
    label: t('fms.storageProvider.region'),
    component: 'Input',
    required: true,
  },
  {
    field: 'useCdn',
    label: t('fms.storageProvider.useCdn'),
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: t('common.on'), value: true },
        { label: t('common.off'), value: false },
      ],
    },
    required: true,
  },
  {
    field: 'cdnUrl',
    label: t('fms.storageProvider.cdnUrl'),
    component: 'Input',
  },
  {
    field: 'isDefault',
    label: t('fms.storageProvider.isDefault'),
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: t('common.on'), value: true },
        { label: t('common.off'), value: false },
      ],
    },
    required: true,
  },
  {
    field: 'state',
    label: t('fms.storageProvider.state'),
    component: 'RadioButtonGroup',
    defaultValue: true,
    componentProps: {
      options: [
        { label: t('common.on'), value: true },
        { label: t('common.off'), value: false },
      ],
    },
    required: true,
  },
];
