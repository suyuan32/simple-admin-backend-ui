<template>
  <PageWrapper dense contentFullHeight>
    <Row>
      <Col :span="5">
        <DeptTree @select="handleSelect" />
      </Col>
      <Col :span="19">
        <BasicTable @register="registerTable" :searchInfo="searchInfo">
          <template #tableTitle>
            <Button type="primary" danger v-if="showDeleteButton" @click="handleBatchDelete()">
              <template #icon><DeleteOutlined /></template>
              {{ t('common.delete') }}
            </Button>
          </template>
          <template #toolbar>
            <a-button type="primary" @click="handleCreate"> {{ t('sys.user.addUser') }} </a-button>
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
                    icon: 'bx:log-out-circle',
                    color: 'error',
                    popConfirm: {
                      title: t('sys.user.forceLoggingOut') + '?',
                      placement: 'left',
                      confirm: handleLogout.bind(null, record),
                    },
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
      </Col>
    </Row>
    <UserDrawer @register="registerDrawer" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { createVNode, defineComponent, reactive, ref } from 'vue';
  import { Button, Modal } from 'ant-design-vue';
  import { ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons-vue/lib/icons';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import DeptTree from './DeptTree.vue';

  import { useDrawer } from '/@/components/Drawer';
  import UserDrawer from './UserDrawer.vue';
  import { useI18n } from 'vue-i18n';

  import { columns, searchFormSchema } from './user.data';
  import { getUserList, deleteUser } from '/@/api/sys/user';
  import { useRoleStore } from '/@/store/modules/role';
  import { logout } from '/@/api/sys/token';
  import { useMessage } from '/@/hooks/web/useMessage';
  import Row from 'ant-design-vue/es/grid/Row';
  import Col from 'ant-design-vue/es/grid/Col';
  import { PageWrapper } from '/@/components/Page';

  export default defineComponent({
    name: 'UserManagement',
    components: {
      BasicTable,
      UserDrawer,
      TableAction,
      PageWrapper,
      Button,
      Row,
      Col,
      DeptTree,
      DeleteOutlined,
    },
    setup() {
      const { t } = useI18n();
      const { createMessage } = useMessage();
      const selectedIds = ref<number[] | string[]>();
      const showDeleteButton = ref<boolean>(false);
      const searchInfo = reactive<Recordable>({});

      const [registerDrawer, { openDrawer }] = useDrawer();
      const roleStoreData = useRoleStore();

      // get role data
      roleStoreData.getRoleInfoFromServer();

      const [registerTable, { reload, getSelectRows }] = useTable({
        title: t('sys.user.userList'),
        api: getUserList,
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
            selectedIds.value = selectedRowKeys as string[];
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
        if (record.nickname === 'admin') {
          createMessage.warn(t('common.notAllowDeleteAdminData'));
          return;
        }

        const result = await deleteUser({ ids: [record.id] });
        if (result.code === 0) {
          await reload();
        }
      }

      async function handleBatchDelete() {
        Modal.confirm({
          title: t('common.deleteConfirm'),
          icon: createVNode(ExclamationCircleOutlined),
          async onOk() {
            const ids = selectedIds.value as string[];
            const rowData = getSelectRows();
            if (rowData.filter((row) => row.nickname === 'admin').length > 0) {
              createMessage.warn(t('common.notAllowDeleteAdminData'));
              return;
            }

            const result = await deleteUser({ ids: ids });
            if (result.code === 0) {
              await reload();
            }
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

      function handleSelect(deptId = '') {
        searchInfo.departmentId = deptId;
        reload();
      }

      async function handleLogout(record: Recordable) {
        const result = await logout(record.id);

        if (result.code === 0) await reload();
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
        handleLogout,
        handleDelete,
        handleSuccess,
        handleBatchDelete,
        handleSelect,
        showDeleteButton,
        searchInfo,
      };
    },
  });
</script>
