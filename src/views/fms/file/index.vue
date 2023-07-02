<template>
  <div>
    <BasicTable @register="registerTable">
      <template #tableTitle>
        <Button
          type="primary"
          danger
          preIcon="ant-design:delete-outlined"
          v-if="showDeleteButton"
          @click="handleBatchDelete()"
        >
          {{ t('common.delete') }}
        </Button>
      </template>
      <template #toolbar>
        <BasicUpload
          :maxSize="1000"
          :maxNumber="10"
          @change="handleChange"
          :api="uploadApi"
          class="my-5"
          :accept="['image/*', 'video/*', 'audio/*']"
        />
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'ant-design:cloud-download-outlined',
                onClick: handleDownload.bind(null, record),
              },
              {
                icon: 'ant-design:copy-outlined',
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
    <FileDrawer @register="registerDrawer" @success="handleSuccess" />
    <Modal
      v-model:visible="videoVisible"
      :title="videoTitle"
      width="80%"
      wrap-class-name="full-modal"
      @ok="handleDownloadVideo"
    >
      <template #footer>
        <a-button key="back" @click="handleCloseVideo"> {{ t('common.closeText') }} </a-button>
        <a-button key="download" type="primary" @click="handleDownloadVideo">{{
          t('fileManager.download')
        }}</a-button>
      </template>
      <video width="1280" height="720" controls>
        <source :src="videoPath" type="video/mp4" />
      </video>
    </Modal>
    <Modal
      v-model:visible="imageVisible"
      :title="imageTitle"
      width="50%"
      wrap-class-name="full-modal"
      @ok="handleDownloadImage"
    >
      <template #footer>
        <a-button key="back" @click="handleCloseImage"> {{ t('common.closeText') }} </a-button>
        <a-button key="download" type="primary" @click="handleDownloadImage">{{
          t('fileManager.download')
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
  import { createVNode, defineComponent, ref } from 'vue';
  import { Image, Modal } from 'ant-design-vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { BasicUpload } from '/@/components/Upload';
  import useClipboard from 'vue-clipboard3';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { useDrawer } from '/@/components/Drawer';
  import FileDrawer from './FileDrawer.vue';
  import { useI18n } from 'vue-i18n';

  import { columns, searchFormSchema } from './file.data';
  import { deleteFile, downloadFile, getFileList, uploadApi } from '../../api/file/file';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue/lib/icons';
  import { Button } from '/@/components/Button';

  export default defineComponent({
    name: 'FileManagement',
    components: {
      BasicTable,
      FileDrawer,
      Button,
      TableAction,
      BasicUpload,
      Image,
      Modal,
    },
    setup() {
      const { t } = useI18n();
      const { toClipboard } = useClipboard();
      const { createErrorModal, createMessage } = useMessage();
      const showDeleteButton = ref<boolean>(false);
      const selectedIds = ref<number[] | string[]>();

      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: t('fileManager.fileList'),
        api: getFileList,
        columns,
        formConfig: {
          labelWidth: 120,
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

      async function handleDownload(record: Recordable) {
        let file = await downloadFile(record.id, 'none');
        let fileType = file.type.split('/')[0];
        currentFileName.value = record.name + '.' + record.path.split('.')[1];
        if (fileType === 'image') {
          imageVisible.value = true;
          imagePath.value = URL.createObjectURL(file);
        } else if (fileType === 'video') {
          videoVisible.value = true;
          videoPath.value = URL.createObjectURL(file);
          videoTitle.value = record.name;
        } else {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(file);
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
        await deleteFile({ ids: [record.id] });
        reload();
      }

      async function handleBatchDelete() {
        Modal.confirm({
          title: t('common.deleteConfirm'),
          icon: createVNode(ExclamationCircleOutlined),
          async onOk() {
            const ids = selectedIds.value as string[];
            const result = await deleteFile({ ids: ids });
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
          await toClipboard(record.publicPath);
          createMessage.success(t('fileManager.copyURLSuccess'));
        } catch (e) {
          console.error(e);
          createErrorModal({
            title: t('fileManager.copyURLFailed'),
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
      };
    },
  });
</script>
