import { Switch } from 'ant-design-vue';
import { h } from 'vue';
import { setFileStatus } from '/@/api/fms/file';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';
import { getTagList } from '/@/api/fms/tag';

const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('fms.file.fileName'),
    dataIndex: 'name',
    width: 100,
  },
  {
    title: t('fms.file.fileType'),
    dataIndex: 'fileType',
    width: 30,
    customRender: ({ record }) => {
      if (record.fileType === 'video') {
        return t('fms.file.video');
      } else if (record.fileType === 'audio') {
        return t('fms.file.audio');
      } else if (record.fileType === 'image') {
        return t('fms.file.image');
      } else {
        return t('fms.file.other');
      }
    },
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
        checkedChildren: t('fms.file.public'),
        unCheckedChildren: t('fms.file.private'),
        loading: record.pendingStatus,
        onChange(checked, _) {
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 0;
          setFileStatus(record.id, newStatus)
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
    title: t('fms.file.filePath'),
    dataIndex: 'path',
    width: 60,
  },
  {
    title: t('fms.file.fileSize'),
    dataIndex: 'size',
    width: 50,
    customRender: ({ record }) => {
      if (record.size > 1073741824) {
        return (record.size / 1073741824).toFixed(2) + 'GB';
      } else if (record.size > 1048576) {
        return (record.size / 1048576).toFixed(2) + 'MB';
      } else {
        return (record.size / 1024).toFixed(2) + 'KB';
      }
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
    field: 'fileType',
    label: t('fms.file.fileType'),
    colProps: { span: 8 },
    component: 'Select',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: t('common.all'), value: 0 },
        { label: t('fms.file.other'), value: 1 },
        { label: t('fms.file.image'), value: 2 },
        { label: t('fms.file.video'), value: 3 },
        { label: t('fms.file.audio'), value: 4 },
      ],
    },
  },
  {
    field: 'fileName',
    label: t('fms.file.fileName'),
    defaultValue: '',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'period',
    label: t('common.createTime'),
    defaultValue: [new Date(new Date().getTime() - 365 * 24 * 60 * 60 * 1000), new Date()],
    component: 'RangePicker',
    colProps: { span: 8 },
  },
  {
    field: 'tagIds',
    label: t('fms.tag.tag'),
    component: 'ApiMultipleSelect',
    componentProps: {
      api: getTagList,
      params: {
        page: 1,
        pageSize: 1000,
        status: 1,
      },
      resultField: 'data.data',
      labelField: 'name',
      valueField: 'id',
    },
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
    label: t('fms.file.fileName'),
    required: true,
    component: 'Input',
  },
  {
    field: 'tagIds',
    label: t('fms.tag.tag'),
    component: 'ApiMultipleSelect',
    componentProps: {
      api: getTagList,
      params: {
        page: 1,
        pageSize: 1000,
        name: '',
      },
      resultField: 'data.data',
      labelField: 'name',
      valueField: 'id',
    },
  },
];
