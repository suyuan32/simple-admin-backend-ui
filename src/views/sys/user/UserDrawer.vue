<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema, roleOptionData } from './user.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { useI18n } from 'vue-i18n';
  import { createOrUpdateUser } from '/@/api/sys/user';
  import { getRoleList } from '/@/api/sys/role';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'UserDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const { t } = useI18n();
      const { createMessage } = useMessage();

      const [registerForm, { resetFields, setFieldsValue, validate, updateSchema }] = useForm({
        labelWidth: 90,
        baseColProps: { span: 24 },
        schemas: formSchema,
        showActionButtonGroup: false,
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

        const roleData = await getRoleList({
          page: 1,
          pageSize: 1000,
        });

        // update role schema of drawer
        updateSchema({
          field: 'roleId',
          componentProps: {
            options: roleOptionData(roleData.data.data, 0),
          },
        });
      });

      const getTitle = computed(() =>
        !unref(isUpdate) ? t('sys.user.addUser') : t('sys.user.editUser'),
      );

      async function handleSubmit() {
        const values = await validate();
        setDrawerProps({ confirmLoading: true });
        if (unref(isUpdate)) {
          if (values['password'] === undefined) {
            values['password'] = '';
          }
        } else {
          if (values['password'] === undefined) {
            createMessage.warning(t('sys.login.passwordPlaceholder'));
            setDrawerProps({ confirmLoading: false });
            return;
          }
        }
        values['id'] = unref(isUpdate) ? values['id'] : '';
        const result = await createOrUpdateUser(values, 'message');
        if (result.code === 0) {
          closeDrawer();
          emit('success');
        }
        setDrawerProps({ confirmLoading: false });
      }

      return {
        registerDrawer,
        registerForm,
        handleSubmit,
        getTitle,
      };
    },
  });
</script>
