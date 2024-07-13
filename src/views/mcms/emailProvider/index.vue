<template>
  <div>
    <BasicTable @register="registerTable" @edit-end="reload">
      <template #tableTitle>
        <Button
          type="primary"
          danger
          preIcon="ant-design:delete-outlined"
          v-if="showDeleteButton"
          @click="handleBatchDelete"
        >
          {{ t('common.delete') }}
        </Button>
      </template>
      <template #toolbar>
        <a-button type="success" @click="handleOpenSenderModal">
          {{ t('mcms.email.sendEmail') }}
        </a-button>
        <a-button type="primary" @click="handleCreate">
          {{ t('mcms.emailProvider.addEmailProvider') }}
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
                icon: 'ic:round-library-books',
                tooltip: t('common.viewLog'),
                onClick: handleOpenLogModal.bind(null, record),
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
    <EmailProviderDrawer @register="registerDrawer" @success="handleSuccess" />
    <LogModal @register="registerModal" :defaultFullscreen="true" />
    <BasicModal
      v-model:open="showSenderModal"
      :title="t('mcms.email.sendEmail')"
      @ok="handleSendEmail"
    >
      <BasicForm @register="registerForm" />
    </BasicModal>
  </div>
</template>
<script lang="ts">
  import { createVNode, defineComponent, ref } from 'vue';
  import { Modal } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue/lib/icons';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { Button } from '@/components/Button';

  import { useDrawer } from '@/components/Drawer';
  import EmailProviderDrawer from './EmailProviderDrawer.vue';
  import { useI18n } from 'vue-i18n';

  import { columns, searchFormSchema } from './emailProvider.data';
  import { getEmailProviderList, deleteEmailProvider } from '@/api/mcms/emailProvider';
  import { useModal } from '@/components/Modal/src/hooks/useModal';
  import LogModal from './LogModal.vue';
  import { BasicModal } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './email.data';
  import { sendEmail } from '@/api/mcms/messageSender';
  import { SendEmailReq } from '@/api/mcms/model/messageModel';

  export default defineComponent({
    name: 'EmailProviderManagement',
    components: {
      BasicTable,
      EmailProviderDrawer,
      TableAction,
      Button,
      LogModal,
      BasicModal,
      BasicForm,
    },
    setup() {
      const { t } = useI18n();
      const selectedIds = ref<number[] | string[]>();
      const showDeleteButton = ref<boolean>(false);
      const showSenderModal = ref<boolean>(false);

      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: t('mcms.emailProvider.emailProviderList'),
        api: getEmailProviderList,
        columns,
        formConfig: {
          labelWidth: 160,
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
          columnWidth: 20,
          onChange: (selectedRowKeys, _selectedRows) => {
            selectedIds.value = selectedRowKeys as number[];
            showDeleteButton.value = selectedRowKeys.length > 0;
          },
        },
      });

      const [registerModal, { openModal }] = useModal();

      const [registerForm, { validate }] = useForm({
        labelWidth: 160,
        baseColProps: { span: 18 },
        schemas: formSchema,
        showActionButtonGroup: false,
        labelAlign: 'right',
      });

      function handleOpenLogModal(record: Recordable) {
        openModal(true, { record });
      }

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
        const result = await deleteEmailProvider({ ids: [record.id] });
        if (result.code === 0) {
          await reload();
        }
      }

      async function handleBatchDelete() {
        Modal.confirm({
          title: t('common.deleteConfirm'),
          icon: createVNode(ExclamationCircleOutlined),
          async onOk() {
            const result = await deleteEmailProvider({ ids: selectedIds.value as number[] });
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

      function handleOpenSenderModal() {
        showSenderModal.value = true;
      }

      async function handleSendEmail() {
        const values = await validate();
        await sendEmail(values as SendEmailReq);
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
        reload,
        registerModal,
        handleOpenLogModal,
        showSenderModal,
        handleOpenSenderModal,
        registerForm,
        handleSendEmail,
      };
    },
  });
</script>
