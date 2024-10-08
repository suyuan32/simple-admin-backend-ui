<template>
  <BasicModal
    v-bind="$attrs"
    :title="t('mcms.smsLog.smsLogList')"
    @register="registerModal"
    :wrapperFooterOffset="50"
    :cancelText="t('common.closeText')"
    :showOkBtn="false"
  >
    <BasicTable @register="registerTable" :searchInfo="searchInfo" class="tableHeight">
      <template #tableTitle>
        <Button type="primary" danger v-if="showDeleteButton" @click="handleBatchDelete">
          <template #icon><DeleteOutlined /></template>
          {{ t('common.delete') }}
        </Button>
      </template>
    </BasicTable>
  </BasicModal>
</template>
<script lang="ts" setup>
  import DeleteOutlined from '@ant-design/icons-vue/lib/icons/DeleteOutlined';
  import ExclamationCircleOutlined from '@ant-design/icons-vue/lib/icons/ExclamationCircleOutlined';
  import { Modal } from 'ant-design-vue';
  import { createVNode, reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { columns, searchFormSchema } from './smsLog.data';
  import { Button } from '@/components/Button';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { useMessage } from '@/hooks/web/useMessage';
  import { deleteSmsLog, getSmsLogList } from '@/api/mcms/smsLog';

  const { t } = useI18n();
  const selectedIds = ref<number[] | string[]>();
  const showDeleteButton = ref<boolean>(false);
  const { notification } = useMessage();
  const searchInfo = reactive<Recordable>({});

  const [registerTable, { reload }] = useTable({
    title: t('sys.task.taskList'),
    api: getSmsLogList,
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

  const [registerModal] = useModalInner(async (data) => {
    searchInfo.taskId = data.record.id;
  });

  async function handleBatchDelete() {
    Modal.confirm({
      title: t('common.deleteConfirm'),
      icon: createVNode(ExclamationCircleOutlined),
      async onOk() {
        const result = await deleteSmsLog({ ids: selectedIds.value as string[] });
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
</script>
