import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { Icon } from '/@/components/Icon';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('sys.menu.menuName'),
    dataIndex: 'name',
    width: 200,
    align: 'left',
    customRender: ({ record }) => {
      return t(record.title);
    },
  },
  {
    title: t('sys.menu.icon'),
    dataIndex: 'icon',
    width: 50,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.icon });
    },
  },
  {
    title: t('sys.menu.component'),
    dataIndex: 'component',
    width: 200,
  },
  {
    title: t('sys.menu.order'),
    dataIndex: 'orderNo',
    width: 80,
  },
  {
    title: t('sys.menu.statusName'),
    dataIndex: 'disabled',
    width: 80,
    customRender: ({ record }) => {
      const status = record.disabled;
      const enable = ~~status === 0;
      const color = enable ? 'green' : 'red';
      const text = enable ? t('common.on') : t('common.off');
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: t('common.createTime'),
    dataIndex: 'createAt',
    width: 180,
    customRender: ({ record }) => {
      return formatToDateTime(record.createAt);
    },
  },
];

const isMenu = (type: Number) => type === 1;

export const formSchema: FormSchema[] = [
  {
    field: 'type',
    label: t('sys.menu.type'),
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: t('sys.menu.directory'), value: 0 },
        { label: t('sys.menu.menu'), value: 1 },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },
  {
    field: 'name',
    label: t('sys.menu.menuName'),
    component: 'Input',
    required: true,
  },
  {
    field: 'parentId',
    label: t('sys.menu.menuParent'),
    component: 'TreeSelect',
    componentProps: {
      // set the field name of the data from the server, the below show that
      // the label show the field of data.name
      fieldNames: {
        label: 'name',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'title',
    label: t('sys.menu.menuTitle'),
    component: 'Input',
    required: true,
  },
  {
    field: 'orderNo',
    label: t('sys.menu.order'),
    defaultValue: 0,
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'icon',
    label: t('sys.menu.icon'),
    component: 'IconPicker',
    required: true,
  },
  {
    field: 'path',
    label: t('sys.menu.routePath'),
    component: 'Input',
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'component',
    label: t('sys.menu.componentPath'),
    component: 'Input',
    required: true,
  },
  {
    field: 'redirect',
    label: t('sys.menu.redirectPath'),
    component: 'Input',
    defaultValue: '',
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'currentActiveMenu',
    label: t('sys.menu.currentActiveMenu'),
    component: 'Input',
    defaultValue: '',
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'disabled',
    label: t('sys.menu.statusName'),
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: t('common.on'), value: false },
        { label: t('common.off'), value: true },
      ],
    },
  },
  {
    field: 'isExt',
    label: t('sys.menu.isHttpPath'),
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: t('common.yes'), value: true },
        { label: t('common.no'), value: false },
      ],
    },
  },
  {
    field: 'keepAlive',
    label: '是否缓存',
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: t('common.yes'), value: true },
        { label: t('common.no'), value: false },
      ],
    },
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'hideMenu',
    label: t('sys.menu.isHidden'),
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: t('common.yes'), value: true },
        { label: t('common.no'), value: false },
      ],
    },
  },
  {
    field: 'hideBreadcrumb',
    label: t('sys.menu.isBreadcrumbShown'),
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: t('common.yes'), value: true },
        { label: t('common.no'), value: false },
      ],
    },
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'closeTab',
    label: t('sys.menu.isAutoCloseTab'),
    component: 'RadioButtonGroup',
    defaultValue: true,
    componentProps: {
      options: [
        { label: t('common.yes'), value: true },
        { label: t('common.no'), value: false },
      ],
    },
    ifShow: ({ values }) => isMenu(values.type),
  },
];
