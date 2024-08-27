<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="35%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { formSchema } from './cloudFile.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { useI18n } from 'vue-i18n';

  import { createCloudFile, updateCloudFile } from '@/api/fms/cloudFile';

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const { t } = useI18n();

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 160,
    baseColProps: { span: 24 },
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
  });

  const getTitle = computed(() =>
    !unref(isUpdate) ? t('fms.cloudFile.addCloudFile') : t('fms.cloudFile.editCloudFile'),
  );

  async function handleSubmit() {
    const values = await validate();
    setDrawerProps({ confirmLoading: true });
    values['id'] = unref(isUpdate) ? values['id'] : '';
    let result = unref(isUpdate) ? await updateCloudFile(values) : await createCloudFile(values);
    if (result.code === 0) {
      closeDrawer();
      emit('success');
    }
    setDrawerProps({ confirmLoading: false });
  }
</script>
