<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> {{ t('sys.oauth.addProvider') }} </a-button>
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
    <OauthDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';

  import { useDrawer } from '/@/components/Drawer';
  import OauthDrawer from './OauthDrawer.vue';
  import { useI18n } from 'vue-i18n';

  import { columns } from './oauth.data';
  import { getProviderList, deleteProvider } from '/@/api/sys/oauth';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'OauthManagement',
    components: { BasicTable, OauthDrawer, TableAction },
    setup() {
      const { t } = useI18n();
      const { notification } = useMessage();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: t('sys.oauth.providerList'),
        api: getProviderList,
        columns,
        useSearchForm: false,
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
        const result = await deleteProvider({ id: record.id }, 'modal');
        if (result.code === 0) {
          notification.success({
            message: t('common.successful'),
            description: t(result.msg),
            duration: 3,
          });
          await reload();
        }
      }

      async function handleSuccess(msg) {
        notification.success({
          message: t('common.successful'),
          description: t(msg),
          duration: 3,
        });
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
