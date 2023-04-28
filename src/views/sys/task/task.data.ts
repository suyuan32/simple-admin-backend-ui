import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';
import { updateTask } from '/@/api/sys/task';
import { Switch } from 'ant-design-vue';
import { h } from 'vue';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('sys.task.name'),
    dataIndex: 'name',
    width: 100,
  },
  {
    title: t('sys.task.taskGroup'),
    dataIndex: 'taskGroup',
    width: 50,
  },
  {
    title: t('sys.task.cronExpression'),
    dataIndex: 'cronExpression',
    width: 100,
  },
  {
    title: t('sys.task.pattern'),
    dataIndex: 'pattern',
    width: 60,
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
          updateTask({ id: record.id, status: newStatus })
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
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: t('sys.task.name'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 50 }],
  },
  {
    field: 'taskGroup',
    label: t('sys.task.taskGroup'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 40 }],
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
    label: t('sys.task.name'),
    component: 'Input',
    required: true,
    rules: [{ max: 50 }],
  },
  {
    field: 'taskGroup',
    label: t('sys.task.taskGroup'),
    component: 'Input',
    required: true,
    rules: [{ max: 40 }],
  },
  {
    field: 'cronExpression',
    label: t('sys.task.cronExpression'),
    component: 'Input',
    required: true,
    rules: [{ max: 80 }],
  },
  {
    field: 'pattern',
    label: t('sys.task.pattern'),
    component: 'Input',
    required: true,
    rules: [{ max: 100 }],
  },
  {
    field: 'payload',
    label: t('sys.task.payload'),
    component: 'Input',
    required: true,
  },
  {
    field: 'status',
    label: t('sys.task.status'),
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
