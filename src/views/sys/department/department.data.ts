import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';
import { setDepartmentStatus } from '/@/api/sys/department';
import { Switch } from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { h } from 'vue';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('sys.department.name'),
    dataIndex: 'name',
    width: 100,
  },
  {
    title: t('sys.department.leader'),
    dataIndex: 'leader',
    width: 100,
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
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 0;
          setDepartmentStatus(record.id, newStatus)
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
    width: 70,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: t('sys.department.name'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'leader',
    label: t('sys.department.leader'),
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
    label: t('sys.department.name'),
    component: 'Input',
  },
  {
    field: 'ancestors',
    label: t('sys.department.ancestors'),
    component: 'Input',
  },
  {
    field: 'leader',
    label: t('sys.department.leader'),
    component: 'Input',
  },
  {
    field: 'phone',
    label: t('sys.department.phone'),
    component: 'Input',
  },
  {
    field: 'email',
    label: t('sys.department.email'),
    component: 'Input',
  },
  {
    field: 'sort',
    label: t('sys.department.sort'),
    component: 'InputNumber',
  },
  {
    field: 'remark',
    label: t('common.remark'),
    component: 'Input',
  },
  {
    field: 'parentId',
    label: t('sys.department.parentId'),
    component: 'InputNumber',
  },
  {
    field: 'status',
    label: t('sys.department.status'),
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
