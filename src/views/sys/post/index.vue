<template>
  <div>
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <Button type="primary" danger v-if="showDeleteButton" @click="handleBatchDelete()">
          <template #icon><DeleteOutlined /></template>
          {{ t('common.delete') }}
        </Button>
      </template>
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">
          {{ t('sys.post.addPost') }}
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
    <PostDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { createVNode, defineComponent, ref } from 'vue';
  import { Button, Modal } from 'ant-design-vue';
  import { ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons-vue/lib/icons';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';

  import { useDrawer } from '/@/components/Drawer';
  import PostDrawer from './PostDrawer.vue';
  import { useI18n } from 'vue-i18n';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { columns, searchFormSchema } from './post.data';
  import { getPostList, deletePost, batchDeletePost } from '/@/api/sys/post';

  export default defineComponent({
    name: 'PostManagement',
    components: { BasicTable, PostDrawer, TableAction, Button, DeleteOutlined },
    setup() {
      const { t } = useI18n();
      const selectedIds = ref<number[] | string[]>();
      const showDeleteButton = ref<boolean>(false);

      const [registerDrawer, { openDrawer }] = useDrawer();
      const { notification } = useMessage();
      const [registerTable, { reload }] = useTable({
        title: t('sys.post.postList'),
        api: getPostList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        clickToRowSelect: false,
        actionColumn: {
          width: 30,
          title: t('common.action'),
          dataIndex: 'action',
          fixed: undefined,
        },
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
          onChange: (selectedRowKeys, _selectedRows) => {
            selectedIds.value = selectedRowKeys as number[];
            showDeleteButton.value = selectedRowKeys.length > 0;
          },
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
        const result = await deletePost({ id: record.id }, 'modal');
        if (result.code === 0) {
          notification.success({
            message: t('common.successful'),
            description: t(result.msg),
            duration: 3,
          });
          await reload();
        }
      }

      async function handleBatchDelete() {
        Modal.confirm({
          title: t('common.deleteConfirm'),
          icon: createVNode(ExclamationCircleOutlined),
          async onOk() {
            const result = await batchDeletePost({ ids: selectedIds.value as number[] }, 'modal');
            if (result.code === 0) {
              showDeleteButton.value = false;
              await reload();
            }
          },
          onCancel() {
            console.log('Cancel');
          },
        });
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
        handleBatchDelete,
        showDeleteButton,
      };
    },
  });
</script>
