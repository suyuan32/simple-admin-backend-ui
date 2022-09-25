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
        :model="formdata"
        name="basic"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @submit="handleParamSubmit()"
      >
        <FormItem label="ID" name="id" v-show="false">
          <a-input v-model:value="formdata.id"
        /></FormItem>

        <FormItem :label="t('sys.menu.paramType')" name="dataType" :rules="[{ required: true }]">
          <Select ref="select" v-model:value="formdata.dataType" style="width: 120px">
            <SelectOption value="string">String</SelectOption>
            <SelectOption value="json">JSON</SelectOption>
          </Select>
        </FormItem>

        <FormItem :label="t('sys.menu.paramKey')" name="key" :rules="[{ required: true }]">
          <a-input v-model:value="formdata.key"
        /></FormItem>

        <FormItem :label="t('sys.menu.paramValue')" name="value" :rules="[{ required: true }]">
          <a-input v-model:value="formdata.value"
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
  import { extraParamColumns, formSchema, paramFormData } from './menu.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { TableAction } from '/@/components/Table';
  import { useI18n } from 'vue-i18n';
  import { useMessage } from '/@/hooks/web/useMessage';

  import {
    getAllMenu,
    createOrUpdateMenu,
    deleteMenuParam,
    getMenuParamListByMenuId,
    createOrUpdateMenuParam,
  } from '/@/api/sys/menu';
  import { CreateOrUpdateMenuReq, MenuParamInfo } from '/@/api/sys/model/menuModel';

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
      const { notification } = useMessage();
      const menuId = ref<number>(0);
      const dataSource = ref<MenuParamInfo[]>([]);
      const modalVisible = ref<boolean>(false);
      const paramFormTitle = ref<string>('');
      // form model for menu parameters creating and updating
      const formdata = reactive<paramFormData>({
        id: 0,
        menuId: 0,
        dataType: 'string',
        key: '',
        value: '',
      });
      const paramFormVisible = ref<boolean>(false);

      function handleOpenParamForm() {
        modalVisible.value = false;
        formdata.id = 0;
        formdata.key = '';
        formdata.value = '';
        formdata.dataType = 'string';
        paramFormVisible.value = true;
      }

      async function handleOpenModal() {
        const result = await getMenuParamListByMenuId({ id: menuId.value });
        dataSource.value = result.data;
        paramFormTitle.value = t('sys.menu.addMenuParam');
        formdata.menuId = menuId.value;
        modalVisible.value = true;
      }

      // menu parameters operations
      function handleEdit(record: Recordable) {
        formdata.id = record.id;
        formdata.key = record.key;
        formdata.value = record.value;
        formdata.dataType = record.dataType;
        paramFormTitle.value = t('sys.menu.editMenuParam');
        paramFormVisible.value = true;
      }

      async function handleDelete(record: Recordable) {
        try {
          const result = await deleteMenuParam({ id: record.id }, 'modal');
          notification.success({
            message: t('common.successful'),
            description: t(result.msg),
            duration: 3,
          });
          handleOpenModal();
        } catch (e) {
          console.log(e);
        }
      }

      async function handleParamSubmit() {
        try {
          const result = await createOrUpdateMenuParam({
            id: formdata.id,
            menuId: formdata.menuId,
            dataType: formdata.dataType,
            value: formdata.value,
            key: formdata.key,
          });
          notification.success({
            message: t('common.successful'),
            description: t(result.msg),
            duration: 3,
          });
          paramFormVisible.value = false;
          handleOpenModal();
        } catch (e) {
          console.log(e);
        }
      }

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
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

        // get tree data from data.data
        const treeData = await getAllMenu().then((data) => {
          return data.data;
        });

        treeData.push({
          name: 'root',
          id: 1,
          type: 0,
          parentId: 0,
          path: '',
          redirect: '',
          component: '',
          orderNo: 0,
          disabled: false,
          title: 'sys.menu.rootMenu',
          icon: '',
          hideMenu: false,
          hideBreadcrumb: false,
          currentActiveMenu: '',
          ignoreKeepAlive: false,
          hideTab: false,
          frameSrc: '',
          carryParam: false,
          hideChildrenInMenu: false,
          affix: false,
          dynamicLevel: 0,
          realPath: '',
        });

        for (let i = 0; i < treeData.length; i++) {
          treeData[i].title = t(treeData[i].title);
        }

        updateSchema({
          field: 'parentId',
          componentProps: { treeData },
        });
      });

      const getTitle = computed(() =>
        !unref(isUpdate) ? t('sys.menu.addMenu') : t('sys.menu.editMenu'),
      );

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          // defined the component
          let componentValue: string;
          if (values.isExt === '1') {
            componentValue = 'IFrame';
          } else if (values.type === '0') {
            componentValue = 'LAYOUT';
          } else {
            componentValue = values['component'];
          }
          // defined the parent id
          let parentId: number = values['parentId'] ? Number(values['parentId']) : 0;
          // defined menu id
          let menuId: number = unref(isUpdate) ? Number(values['id']) : 0;
          let params: CreateOrUpdateMenuReq = {
            id: menuId,
            type: values['type'],
            parentId: parentId,
            path: values['path'],
            name: values['name'],
            component: componentValue,
            redirect: values['redirect'],
            orderNo: values['orderNo'],
            disabled: values['disabled'],
            title: values['title'],
            icon: values['icon'],
            currentActiveMenu: values['currentActiveMenu'],
            hideMenu: values['hideMenu'],
            hideBreadcrumb: values['hideBreadcrumb'],
            ignoreKeepAlive: values['ignoreKeepAlive'],
            hideTab: values['hideTab'],
            frameSrc: values['frameSrc'],
            carryParam: values['carryParam'],
            hideChildrenInMenu: values['hideChildrenInMenu'],
            affix: values['affix'],
            dynamicLevel: values['dynamicLevel'],
            realPath: values['realPath'],
          };
          let result = await createOrUpdateMenu(params, 'modal');
          notification.success({
            message: t('common.successful'),
            description: t(result.msg),
            duration: 3,
          });
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
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
        formdata,
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
