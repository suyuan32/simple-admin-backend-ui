<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> {{ t('sys.apis.addApi') }} </a-button>
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

  import { useDrawer } from '/@/components/Drawer';
  import ApiDrawer from './ApiDrawer.vue';
  import { useI18n } from 'vue-i18n';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { columns, searchFormSchema } from './api.data';
  import { getApiList, deleteApi } from '/@/api/sys/api';

  export default defineComponent({
    name: 'ApiManagement',
    components: { BasicTable, ApiDrawer, TableAction },
    setup() {
      const { t } = useI18n();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const { notification } = useMessage();
      const [registerTable, { reload }] = useTable({
        title: t('sys.apis.apiList'),
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
          width: 30,
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
        await reload();
      }

      async function handleSuccess() {
        await reload();
      }

      return {
        t,
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
