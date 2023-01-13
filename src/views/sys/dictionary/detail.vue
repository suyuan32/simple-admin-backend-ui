<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">
          {{ t('sys.dictionary.addDictionaryDetail') }}
        </a-button>
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
    <DictionaryDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';

  import { useDrawer } from '/@/components/Drawer';
  import DictionaryDrawer from './detailDrawer.vue';
  import { useI18n } from 'vue-i18n';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { detailColumns } from './dictionary.data';
  import { deleteDictionaryDetail, getDictionaryDetailList } from '/@/api/sys/dictionary';

  export default defineComponent({
    name: 'DictionaryDetail',
    components: { BasicTable, DictionaryDrawer, TableAction },
    setup() {
      const { t } = useI18n();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const { notification } = useMessage();
      const { currentRoute } = useRouter();

      const [registerTable, { reload }] = useTable({
        title: t('sys.dictionary.dictionaryDetailList'),
        api: getDictionaryDetailList,
        columns: detailColumns,
        formConfig: {
          labelWidth: 120,
          schemas: [
            {
              field: 'name',
              label: t('sys.dictionary.name'),
              defaultValue: currentRoute.value.query.name,
              component: 'Input',
              colProps: { span: 8 },
              rules: [{ max: 10 }],
            },
          ],
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
        const result = await deleteDictionaryDetail({ id: record.id }, 'modal');
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
