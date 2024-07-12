import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import Icon from '@/components/Icon/Icon.vue';
import { useI18n } from '@/hooks/web/useI18n';
import { formatToDateTime } from '@/utils/dateUtil';
import { getMenuList } from '@/api/sys/menu';
import { ColumnType } from 'ant-design-vue/lib/table';
import { ParentIdEnum } from '@/enums/appEnum';

const { t } = useI18n();

export const extraParamColumns: ColumnType[] = [
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

export const columns: BasicColumn[] = [
  {
    title: t('sys.menu.menuName'),
    dataIndex: 'trans',
    width: 200,
    align: 'left',
  },
  {
    title: t('sys.menu.icon'),
    width: 50,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.icon });
    },
  },
  {
    title: t('sys.apis.serviceName'),
    dataIndex: 'serviceName',
    width: 100,
  },
  {
    title: t('sys.menu.routePath'),
    dataIndex: 'path',
    width: 200,
  },
  {
    title: t('sys.menu.order'),
    dataIndex: 'sort',
    width: 80,
  },
  {
    title: t('common.status'),
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
    title: t('sys.menu.isHidden'),
    dataIndex: 'hideMenu',
    width: 80,
    customRender: ({ record }) => {
      const status = record.hideMenu;
      const enable = ~~status === 1;
      const color = enable ? 'green' : 'red';
      const text = enable ? t('common.yes') : t('common.no');
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: t('common.createTime'),
    dataIndex: 'createdAt',
    width: 180,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
];

const isMenu = (type: Number) => type === 1;
const isElement = (type: Number) => type === 2;

export const formSchema: FormSchema[] = [
  {
    field: 'menuType',
    label: t('sys.menu.type'),
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: t('sys.menu.directory'), value: 0 },
        { label: t('sys.menu.menu'), value: 1 },
        { label: t('sys.menu.element'), value: 2 },
      ],
    },
    colProps: { lg: 24, md: 24, sm: 24 },
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
    colProps: { lg: 11, md: 11, sm: 11 },
  },
  {
    field: 'title',
    label: t('sys.menu.menuTitle'),
    component: 'Input',
    required: true,
    rules: [{ max: 50 }],
    colProps: { lg: 11, md: 11, sm: 11, offset: 2 },
  },
  {
    field: 'parentId',
    label: t('sys.menu.menuParent'),
    component: 'ApiTreeSelect',
    required: true,
    componentProps: {
      api: getMenuList,
      resultField: 'data.data',
      labelField: 'trans',
      valueField: 'id',
      defaultValue: {
        id: ParentIdEnum.DEFAULT,
        parentId: -1,
        label: t('sys.menu.rootMenu'),
        value: ParentIdEnum.DEFAULT,
      },
    },
    defaultValue: ParentIdEnum.DEFAULT,
    colProps: { lg: 11, md: 11, sm: 11 },
  },
  {
    field: 'icon',
    label: t('sys.menu.icon'),
    component: 'IconPicker',
    required: true,
    colProps: { lg: 11, md: 11, sm: 11, offset: 2 },
    ifShow: ({ values }) => !isElement(values.menuType),
  },
  {
    field: 'serviceName',
    label: t('sys.apis.serviceName'),
    component: 'Input',
    defaultValue: '',
    rules: [{ max: 50 }],
    colProps: { lg: 24, md: 24, sm: 24 },
    helpMessage: t('sys.apis.serviceNameHelpMessage'),
  },
  {
    field: 'path',
    label: t('sys.menu.routePath'),
    component: 'Input',
    required: true,
    helpMessage: t('sys.menu.pathHelp'),
    // eslint-disable-next-line no-useless-escape
    rules: [{ pattern: /^(\/(\:)?[0-9A-Za-z_-]+)*$/gm, message: t('common.wrongFormat') }],
    colProps: { lg: 24, md: 24, sm: 24 },
    ifShow: ({ values }) => !isElement(values.menuType),
  },
  {
    field: 'component',
    label: t('sys.menu.componentPath'),
    component: 'Input',
    required: true,
    helpMessage: t('sys.menu.componentHelp'),
    ifShow: ({ values }) => isMenu(values.menuType),
    rules: [{ pattern: /^(\/[0-9A-Za-z_-]+)*$/gm, message: t('common.wrongFormat') }],
    colProps: { lg: 24, md: 24, sm: 24 },
  },
  {
    field: 'redirect',
    label: t('sys.menu.redirectPath'),
    component: 'Input',
    defaultValue: '',
    ifShow: ({ values }) => isMenu(values.menuType),
    rules: [{ max: 300 }],
    colProps: { lg: 24, md: 24, sm: 24 },
  },
  {
    field: 'frameSrc',
    label: t('sys.menu.frameSrc'),
    component: 'Input',
    defaultValue: '',
    ifShow: ({ values }) => isMenu(values.menuType),
    rules: [{ max: 300 }],
    colProps: { lg: 24, md: 24, sm: 24 },
  },
  {
    field: 'realPath',
    label: t('sys.menu.realPath'),
    component: 'Input',
    defaultValue: '',
    ifShow: ({ values }) => isMenu(values.menuType),
    rules: [{ max: 300 }],
    colProps: { lg: 24, md: 24, sm: 24 },
  },
  {
    field: 'sort',
    label: t('sys.menu.order'),
    component: 'InputNumber',
    required: true,
    componentProps: {
      max: 10000,
    },
    colProps: { lg: 11, md: 11, sm: 11 },
  },
  {
    field: 'permission',
    label: t('sys.menu.permission'),
    component: 'Input',
    ifShow: ({ values }) => isElement(values.menuType),
    colProps: { lg: 11, md: 11, sm: 11, offset: 2 },
    helpMessage: t('sys.menu.permissionHelp'),
  },
  {
    field: 'dynamicLevel',
    label: t('sys.menu.dynamicLevel'),
    component: 'InputNumber',
    required: true,
    componentProps: {
      max: 20,
    },
    colProps: { lg: 11, md: 11, sm: 11, offset: 2 },
    ifShow: ({ values }) => !isElement(values.menuType),
  },
  {
    field: 'disabled',
    label: t('common.status'),
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: t('common.on'), value: false },
        { label: t('common.off'), value: true },
      ],
    },
    colProps: { lg: 12, md: 12, sm: 12 },
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
    colProps: { lg: 12, md: 12, sm: 12 },
    ifShow: ({ values }) => isMenu(values.menuType),
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
    colProps: { lg: 12, md: 12, sm: 12 },
    ifShow: ({ values }) => !isElement(values.menuType),
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
    ifShow: ({ values }) => isMenu(values.menuType),
    colProps: { lg: 12, md: 12, sm: 12 },
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
    ifShow: ({ values }) => isMenu(values.menuType),
    colProps: { lg: 12, md: 12, sm: 12 },
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
    ifShow: ({ values }) => isMenu(values.menuType),
    colProps: { lg: 12, md: 12, sm: 12 },
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
    colProps: { lg: 12, md: 12, sm: 12 },
    ifShow: ({ values }) => !isElement(values.menuType),
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
    ifShow: ({ values }) => isMenu(values.menuType),
    colProps: { lg: 12, md: 12, sm: 12 },
  },
];
