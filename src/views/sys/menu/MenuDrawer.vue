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
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { extraParamColumns, formSchema } from './menu.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { useI18n } from 'vue-i18n';
  import { createMenu, updateMenu } from '@/api/sys/menu';
  import { useMessage } from '@/hooks/web/useMessage';

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const { t } = useI18n();
  const menuId = ref<number>(0);
  const { createMessage } = useMessage();

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 160,
    layout: 'vertical',
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    await resetFields();
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      await setFieldsValue({
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
      emit('success');
    }
    setDrawerProps({ confirmLoading: false });
  }
</script>
<style scoped>
  .paramForm {
    padding: 1em;
  }
</style>
