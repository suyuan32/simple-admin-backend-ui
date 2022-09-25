import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { Icon } from '/@/components/Icon';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';

const { t } = useI18n();

export const extraParamColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 200,
    align: 'left',
  },
  {
    title: t('sys.menu.paramType'),
    dataIndex: 'dataType',
    width: 200,
    align: 'left',
  },
  {
    title: t('sys.menu.paramKey'),
    dataIndex: 'key',
    width: 200,
    align: 'left',
  },
  {
    title: t('sys.menu.paramValue'),
    dataIndex: 'value',
    width: 200,
    align: 'left',
  },
  {
    title: t('common.action'),
    dataIndex: 'action',
    width: 200,
    align: 'left',
  },
];

export interface paramFormData {
  id: number;
  menuId: number;
  dataType: string;
  key: string;
  value: string;
}

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
      return formatToDateTime(record.createdAt);
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
    rules: [{ max: 50 }],
  },
  {
    field: 'parentId',
    label: t('sys.menu.menuParent'),
    component: 'TreeSelect',
    defaultValue: {
      label: t('sys.menu.rootMenu'),
      key: 'root',
      value: 1,
    },
    componentProps: {
      // set the field name of the data from the server, the below show that
      // the label show the field of data.name
      fieldNames: {
        label: 'title',
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
    rules: [{ max: 50 }],
  },
  {
    field: 'orderNo',
    label: t('sys.menu.order'),
    defaultValue: 0,
    component: 'InputNumber',
    required: true,
    rules: [{ type: 'number', max: 1000 }],
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
    rules: [{ max: 200 }],
  },
  {
    field: 'component',
    label: t('sys.menu.componentPath'),
    component: 'Input',
    required: true,
    rules: [{ max: 100 }],
  },
  {
    field: 'redirect',
    label: t('sys.menu.redirectPath'),
    component: 'Input',
    defaultValue: '',
    ifShow: ({ values }) => isMenu(values.type),
    rules: [{ max: 100 }],
  },
  {
    field: 'frameSrc',
    label: t('sys.menu.frameSrc'),
    component: 'Input',
    defaultValue: '',
    ifShow: ({ values }) => isMenu(values.type),
    rules: [{ max: 100 }],
  },
  {
    field: 'dynamicLevel',
    label: t('sys.menu.dynamicLevel'),
    defaultValue: 20,
    component: 'InputNumber',
    required: true,
    rules: [{ type: 'number', max: 30 }],
  },
  {
    field: 'realPath',
    label: t('sys.menu.realPath'),
    component: 'Input',
    defaultValue: '',
    ifShow: ({ values }) => isMenu(values.type),
    rules: [{ max: 200 }],
  },
  {
    field: 'currentActiveMenu',
    label: t('sys.menu.currentActiveMenu'),
    component: 'Input',
    defaultValue: '',
    ifShow: ({ values }) => isMenu(values.type),
    rules: [{ max: 50 }],
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
    field: 'ignoreKeepAlive',
    label: t('sys.menu.isKeepAlive'),
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: t('common.yes'), value: false },
        { label: t('common.no'), value: true },
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
        { label: t('common.yes'), value: false },
        { label: t('common.no'), value: true },
      ],
    },
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'hideTab',
    label: t('sys.menu.hideTab'),
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
    field: 'carryParam',
    label: t('sys.menu.carryParam'),
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
    field: 'hideChildrenInMenu',
    label: t('sys.menu.hideChildrenInMenu'),
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
    field: 'affix',
    label: t('sys.menu.affix'),
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
    field: 'hideTab',
    label: t('sys.menu.hideTab'),
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
];
