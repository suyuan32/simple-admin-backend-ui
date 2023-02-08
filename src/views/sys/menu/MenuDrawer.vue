<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <template v-if="isUpdate" #extra>
      <a-button type="primary" style="margin-right: 8px" @click="handleOpenModal">
        {{ t('sys.menu.menuParamManagement') }}</a-button
      >
    </template>
    <BasicForm @register="registerForm" />
  </BasicDrawer>
  <Modal
    v-model:visible="modalVisible"
    :title="t('sys.menu.paramList')"
    width="50%"
    wrap-class-name="full-modal"
  >
    <template #footer>
      <Button type="primary" @click="handleOpenParamForm">{{ t('sys.menu.addMenuParam') }}</Button>
    </template>
    <Table
      :columns="extraParamColumns"
      :row-key="(record) => record.id"
      :pagination="false"
      :data-source="dataSource"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'action'">
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
    </Table>
  </Modal>
  <Modal
    v-model:visible="paramFormVisible"
    :title="paramFormTitle"
    width="50%"
    wrap-class-name="full-modal"
    :footer="null"
  >
    <div class="paramForm">
      <Form
        :model="formData"
        name="basic"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @submit="handleParamSubmit()"
      >
        <FormItem label="ID" name="id" v-show="false">
          <a-input v-model:value="formData.id"
        /></FormItem>

        <FormItem :label="t('sys.menu.paramType')" name="dataType" :rules="[{ required: true }]">
          <Select ref="select" v-model:value="formData.type" style="width: 120px">
            <SelectOption value="string">String</SelectOption>
            <SelectOption value="json">JSON</SelectOption>
          </Select>
        </FormItem>

        <FormItem :label="t('sys.menu.paramKey')" name="key" :rules="[{ required: true }]">
          <a-input v-model:value="formData.key"
        /></FormItem>

        <FormItem :label="t('sys.menu.paramValue')" name="value" :rules="[{ required: true }]">
          <a-input v-model:value="formData.value"
        /></FormItem>

        <FormItem :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">{{ t('common.saveText') }}</a-button>
        </FormItem>
      </Form>
    </div>
  </Modal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref, reactive } from 'vue';
  import { Modal, Table, Button, Form, FormItem, Select, SelectOption } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { extraParamColumns, formSchema } from './menu.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { TableAction } from '/@/components/Table';
  import { useI18n } from 'vue-i18n';
  import { createMenu, updateMenu } from '/@/api/sys/menu';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { MenuParamInfo } from '/@/api/sys/model/menuParamModel';
  import { createMenuParam, deleteMenuParam, getMenuParamList } from '/@/api/sys/menuParam';

  export default defineComponent({
    name: 'MenuDrawer',
    components: {
      BasicDrawer,
      BasicForm,
      Modal,
      Table,
      Button,
      TableAction,
      Form,
      FormItem,
      Select,
      SelectOption,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const { t } = useI18n();
      const menuId = ref<number>(0);
      const dataSource = ref<MenuParamInfo[]>([]);
      const modalVisible = ref<boolean>(false);
      const paramFormTitle = ref<string>('');
      const { createMessage } = useMessage();
      // form model for menu parameters creating and updating
      const formData = reactive<MenuParamInfo>({ id: 0 });
      const paramFormVisible = ref<boolean>(false);

      function handleOpenParamForm() {
        modalVisible.value = false;
        formData.id = 0;
        formData.key = '';
        formData.value = '';
        formData.type = 'string';
        paramFormVisible.value = true;
      }

      async function handleOpenModal() {
        const result = await getMenuParamList({ menuId: menuId.value });
        dataSource.value = result.data.data;
        paramFormTitle.value = t('sys.menu.addMenuParam');
        formData.menuId = menuId.value;
        modalVisible.value = true;
      }

      // menu parameters operations
      function handleEdit(record: Recordable) {
        formData.id = record.id;
        formData.key = record.key;
        formData.value = record.value;
        formData.type = record.dataType;
        paramFormTitle.value = t('sys.menu.editMenuParam');
        paramFormVisible.value = true;
      }

      async function handleDelete(record: Recordable) {
        const result = await deleteMenuParam({ ids: [record.id] }, 'modal');
        if (result.code === 0) handleOpenModal();
      }

      async function handleParamSubmit() {
        const result = await createMenuParam({
          id: formData.id,
          menuId: formData.menuId,
          type: formData.type,
          value: formData.value,
          key: formData.key,
        });
        if (result.code === 0) {
          paramFormVisible.value = false;
          handleOpenModal();
        }
      }

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: { lg: 12, md: 24 },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }

        if ('record' in data) {
          menuId.value = data.record.id;
        }
      });

      const getTitle = computed(() =>
        !unref(isUpdate) ? t('sys.menu.addMenu') : t('sys.menu.editMenu'),
      );

      async function handleSubmit() {
        const values = await validate();
        setDrawerProps({ confirmLoading: true });
        // defined the component
        if (values.isExt === '1') {
          values['component'] = 'IFrame';
        } else if (values.type === 0) {
          values['component'] = 'LAYOUT';
        }

        values['parentId'] = values['parentId'] ? Number(values['parentId']) : 0;

        values['id'] = unref(isUpdate) ? Number(values['id']) : 0;

        if (values['parentId'] === values['id'] && unref(isUpdate)) {
          createMessage.error(t('common.notAllowSameAsParentId'));
          setDrawerProps({ confirmLoading: false });
          return;
        }

        const result = unref(isUpdate) ? await updateMenu(values) : await createMenu(values);
        if (result.code === 0) {
          closeDrawer();
          emit('success', result.msg);
        }
        setDrawerProps({ confirmLoading: false });
      }

      return {
        t,
        isUpdate,
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
        extraParamColumns,
        handleEdit,
        handleDelete,
        handleOpenModal,
        modalVisible,
        dataSource,
        formData,
        paramFormVisible,
        handleOpenParamForm,
        paramFormTitle,
        handleParamSubmit,
      };
    },
  });
</script>
<style scoped>
  .paramForm {
    padding: 1em;
  }
</style>
