<template>
  <div>
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
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
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';

  import { useI18n } from 'vue-i18n';

  import { columns, searchFormSchema } from './token.data';
  import { deleteToken, getTokenList } from '/@/api/sys/token';

  export default defineComponent({
    name: 'TokenManagement',
    components: { BasicTable, TableAction },
    setup() {
      const { t } = useI18n();
      const [registerTable, { reload }] = useTable({
        title: t('sys.token.tokenList'),
        api: getTokenList,
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

      async function handleDelete(record: Recordable) {
        const result = await deleteToken({ id: record.id }, 'modal');
        if (result.code === 0) reload();
      }

      function handleSuccess() {
        reload();
      }

      return {
        t,
        registerTable,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>
