<template>
  <div>
    <BasicTable @register="registerTable">
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
        <span>{{ t('fms.cloudFile.providerId') }}</span>
        <ApiSelect
          :api="getStorageProviderList"
          :params="{ page: 1, pageSize: 1000 }"
          result-field="data.data"
          label-field="name"
          value-field="name"
          class="w-32"
          v-model:value="providerName"
          @options-change="handleOptionsChange"
        />
        <BasicUpload
          :maxSize="1000"
          :maxNumber="10"
          @change="handleChange"
          :api="uploadApi"
          :upload-params="providerParams"
          class="my-5"
          :accept="['image/*', 'video/*', 'audio/*']"
        />
        <a-button type="primary" @click="handleCreate">
          {{ t('fms.cloudFile.addCloudFile') }}
        </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'ant-design:cloud-download-outlined',
                tooltip: t('fms.file.download'),
                onClick: handleDownload.bind(null, record),
              },
              {
                icon: 'ant-design:copy-outlined',
                tooltip: t('fms.file.copyURL'),
                onClick: handleCopyToClipboard.bind(null, record),
              },
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
    <CloudFileDrawer @register="registerDrawer" @success="handleSuccess" />
    <Modal
      v-model:open="videoVisible"
      :title="videoTitle"
      width="80%"
      wrap-class-name="full-modal"
      @ok="handleDownloadVideo"
    >
      <template #footer>
        <a-button key="back" @click="handleCloseVideo"> {{ t('common.closeText') }} </a-button>
        <a-button key="download" type="primary" @click="handleDownloadVideo">{{
          t('fms.file.download')
        }}</a-button>
      </template>
      <video width="1280" height="720" controls>
        <source :src="videoPath" type="video/mp4" />
      </video>
    </Modal>
    <Modal
      v-model:open="imageVisible"
      :title="imageTitle"
      width="50%"
      wrap-class-name="full-modal"
      @ok="handleDownloadImage"
    >
      <template #footer>
        <a-button key="back" @click="handleCloseImage"> {{ t('common.closeText') }} </a-button>
        <a-button key="download" type="primary" @click="handleDownloadImage">{{
          t('fms.file.download')
        }}</a-button>
      </template>
      <Image
        width="100%"
        style=""
        :preview="{
          visible,
          onVisibleChange: setVisible,
        }"
        :src="imagePath"
      />
    </Modal>
  </div>
</template>
<script lang="ts">
  import { computed, createVNode, defineComponent, ref } from 'vue';
  import { Image, Modal } from 'ant-design-vue';

  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { BasicUpload } from '@/components/Upload';
  import useClipboard from 'vue-clipboard3';
  import { useMessage } from '@/hooks/web/useMessage';

  import { useDrawer } from '@/components/Drawer';
  import CloudFileDrawer from './CloudFileDrawer.vue';
  import { useI18n } from 'vue-i18n';

  import { columns, searchFormSchema } from './cloudFile.data';
  import { deleteCloudFile, getCloudFileList, uploadApi } from '@/api/fms/cloudFile';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue/lib/icons';
  import { Button } from '@/components/Button';
  import { ApiSelect } from '@/components/Form';
  import { getStorageProviderList } from '@/api/fms/storageProvider';

  export default defineComponent({
    name: 'CloudFileManagement',
    components: {
      BasicTable,
      CloudFileDrawer,
      Button,
      TableAction,
      BasicUpload,
      Image,
      Modal,
      ApiSelect,
    },
    setup() {
      const { t } = useI18n();
      const { toClipboard } = useClipboard();
      const { createErrorModal, createMessage } = useMessage();
      const showDeleteButton = ref<boolean>(false);
      const selectedIds = ref<number[] | string[]>();
      const providerName = ref<string>(t('fms.storageProvider.chooseProvider'));

      const providerParams = computed(() => {
        return {
          provider: providerName.value,
        };
      });

      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: t('fms.file.fileList'),
        api: getCloudFileList,
        columns,
        formConfig: {
          labelWidth: 140,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        clickToRowSelect: false,
        showIndexColumn: false,
        actionColumn: {
          width: 50,
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
      // image and video control
      const visible = ref<boolean>(false);
      const videoVisible = ref<boolean>(false);
      const imageVisible = ref<boolean>(false);
      const setVisible = (value): void => {
        visible.value = value;
      };
      const imagePath = ref<string>('');
      const videoPath = ref<string>('');
      const videoTitle = ref<string>('');
      const imageTitle = ref<string>('');
      const currentFileName = ref<string>('');

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleOptionsChange(options: Recordable) {
        for (let i = 0; i < options.length; i++) {
          if (options[i].isDefault) {
            providerName.value = options[i].label;
            break;
          }
        }
      }

      async function handleDownload(record: Recordable) {
        if (record.fileType === 2) {
          imageVisible.value = true;
          imagePath.value = record.url;
        } else if (record.fileType === 3) {
          videoVisible.value = true;
          videoPath.value = record.url;
          videoTitle.value = record.name;
        } else {
          const link = document.createElement('a');
          link.href = record.url;
          link.download = currentFileName.value;
          link.click();
          link.remove();
          URL.revokeObjectURL(link.href);
        }
      }

      function handleDownloadVideo() {
        const link = document.createElement('a');
        link.href = videoPath.value;
        link.download = currentFileName.value;
        link.click();
        link.remove();
        URL.revokeObjectURL(link.href);
        handleCloseVideo();
      }

      function handleDownloadImage() {
        const link = document.createElement('a');
        link.href = imagePath.value;
        link.download = currentFileName.value;
        link.click();
        link.remove();
        URL.revokeObjectURL(link.href);
        handleCloseImage();
      }

      function handleCloseVideo() {
        videoVisible.value = false;
      }

      function handleCloseImage() {
        imageVisible.value = false;
      }

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      async function handleDelete(record: Recordable) {
        await deleteCloudFile({ ids: [record.id] });
        reload();
      }

      async function handleBatchDelete() {
        Modal.confirm({
          title: t('common.deleteConfirm'),
          icon: createVNode(ExclamationCircleOutlined),
          async onOk() {
            const ids = selectedIds.value as string[];
            const result = await deleteCloudFile({ ids: ids });
            if (result.code === 0) {
              await reload();
            }
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

      async function handleCopyToClipboard(record: Recordable) {
        try {
          await toClipboard(record.url);
          createMessage.success(t('fms.file.copyURLSuccess'));
        } catch (e) {
          console.error(e);
          createErrorModal({
            title: t('fms.file.copyURLFailed'),
            content: record.publicPath,
          });
        }
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
        providerName,
        providerParams,
        handleOptionsChange,
        handleDownload,
        handleChange: (list: string[]) => {
          // createMessage.info(`已上传文件${JSON.stringify(list)}`);
          console.log(list);
        },
        uploadApi,
        visible,
        videoVisible,
        imageVisible,
        setVisible,
        imagePath,
        videoPath,
        videoTitle,
        imageTitle,
        handleDownloadVideo,
        handleDownloadImage,
        handleCloseVideo,
        handleCloseImage,
        handleCopyToClipboard,
        handleBatchDelete,
        showDeleteButton,
        getStorageProviderList,
      };
    },
  });
</script>
