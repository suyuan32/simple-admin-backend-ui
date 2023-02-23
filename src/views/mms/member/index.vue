<template>
  <PageWrapper dense contentFullHeight>
    <Row>
      <Col :span="5">
        <RankTree @select="handleSelect" />
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
            <a-button type="primary" @click="handleCreate">
              {{ t('sys.member.addMember') }}
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
      </Col>
    </Row>
    <MemberDrawer @register="registerDrawer" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
  import { createVNode, defineComponent, reactive, ref } from 'vue';
  import { Button, Modal } from 'ant-design-vue';
  import { ExclamationCircleOutlined, DeleteOutlined } from '@ant-design/icons-vue/lib/icons';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import RankTree from './RankTree.vue';

  import { useDrawer } from '/@/components/Drawer';
  import MemberDrawer from './MemberDrawer.vue';
  import { useI18n } from 'vue-i18n';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { columns, searchFormSchema } from './member.data';
  import { getMemberList, deleteMember } from '../../../api/member/member';
  import { PageWrapper } from '/@/components/Page';
  import Row from 'ant-design-vue/es/grid/Row';
  import Col from 'ant-design-vue/es/grid/Col';

  export default defineComponent({
    name: 'MemberManagement',
    components: {
      BasicTable,
      MemberDrawer,
      TableAction,
      Button,
      PageWrapper,
      Row,
      Col,
      RankTree,
      DeleteOutlined,
    },
    setup() {
      const { t } = useI18n();
      const selectedIds = ref<number[] | string[]>();
      const searchInfo = reactive<Recordable>({});
      const showDeleteButton = ref<boolean>(false);

      const [registerDrawer, { openDrawer }] = useDrawer();
      const { notification } = useMessage();
      const [registerTable, { reload }] = useTable({
        title: t('sys.member.memberList'),
        api: getMemberList,
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
        const result = await deleteMember({ ids: [record.id] }, 'modal');
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
            const result = await deleteMember({ ids: selectedIds.value as string[] }, 'modal');
            if (result.code === 0) {
              showDeleteButton.value = false;
              notification.success({
                message: t('common.successful'),
                description: t(result.msg),
                duration: 3,
              });
              await reload();
            }
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

      async function handleSuccess(msg) {
        notification.success({
          message: t('common.successful'),
          description: t(msg),
          duration: 3,
        });
        await reload();
      }

      function handleSelect(rankId = '') {
        searchInfo.rankId = rankId;
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
        handleBatchDelete,
        handleSelect,
        showDeleteButton,
        searchInfo,
      };
    },
  });
</script>
