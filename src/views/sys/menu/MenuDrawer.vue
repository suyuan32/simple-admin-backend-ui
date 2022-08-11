<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './menu.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { useI18n } from 'vue-i18n';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { getAllMenu, createOrUpdateMenu } from '/@/api/sys/menu';
  import { CreateOrUpdateMenuReq } from '/@/api/sys/model/menuModel';

  export default defineComponent({
    name: 'MenuDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const { t } = useI18n();
      const { notification } = useMessage();

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
        // get tree data from data.data
        const treeData = await getAllMenu().then((data) => {
          return data.data;
        });
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
          let pathData = values['path'] ? values['path'] : '';
          let redirectData = values['redirect'] ? values['redirect'] : '';
          let keepAlive = values['keepAlive'] ? values['keepAlive'] : true;
          let hideBreadcrumb = values['hideBreadcrumb'] ? values['hideBreadcrumb'] : true;
          let currentActiveMenu = values['currentActiveMenu'] ? values['currentActiveMenu'] : '';
          let closeTab = values['closeTab'] ? values['closeTab'] : true;

          let params: CreateOrUpdateMenuReq = {
            id: menuId,
            type: values['type'],
            parentId: parentId,
            path: pathData,
            name: values['name'],
            component: componentValue,
            redirect: redirectData,
            orderNo: values['orderNo'],
            disabled: values['disabled'],
            keepAlive: keepAlive,
            hideMenu: values['hideMenu'],
            hideBreadcrumb: hideBreadcrumb,
            currentActiveMenu: currentActiveMenu,
            title: values['title'],
            icon: values['icon'],
            closeTab: closeTab,
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

      return { registerDrawer, registerForm, getTitle, handleSubmit };
    },
  });
</script>
