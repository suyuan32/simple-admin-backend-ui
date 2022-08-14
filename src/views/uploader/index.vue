<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <BasicUpload
          :maxSize="1000"
          :maxNumber="10"
          @change="handleChange"
          :api="uploadApi"
          class="my-5"
          :accept="['image/*', 'video/*', 'audio/*']"
        />
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: t('common.deleteConfirm'),
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <ApiDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { BasicUpload } from '/@/components/Upload';

  import { useDrawer } from '/@/components/Drawer';
  import ApiDrawer from './UploadDrawer.vue';
  import { useI18n } from 'vue-i18n';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { columns, searchFormSchema } from './uploader.data';
  import { getApiList, deleteApi } from '/@/api/sys/api';
  import { uploadApi } from '../../api/uploader/upload';

  export default defineComponent({
    name: 'ApiManagement',
    components: { BasicTable, ApiDrawer, TableAction, BasicUpload },
    setup() {
      const { t } = useI18n();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const { notification } = useMessage();
      const [registerTable, { reload }] = useTable({
        title: t('api_desc.fileList'),
        api: getApiList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 80,
          title: t('common.action'),
          dataIndex: 'action',
          fixed: undefined,
        },
      });

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      async function handleDelete(record: Recordable) {
        const result = await deleteApi({ id: record.id }, 'modal');
        notification.success({
          message: t('common.successful'),
          description: t(result.msg),
          duration: 3,
        });
        reload();
      }

      function handleSuccess() {
        reload();
      }

      return {
        t,
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        handleChange: (list: string[]) => {
          // createMessage.info(`已上传文件${JSON.stringify(list)}`);
          console.log(list);
        },
        uploadApi,
      };
    },
  });
</script>
