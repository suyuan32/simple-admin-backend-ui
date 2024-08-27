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
    <template v-if="isUpdate" #extra>
      <a-button type="primary" style="margin-right: 8px" @click="handleOpenDetail">
        {{ t('sys.dictionary.addDictionaryDetail') }}</a-button
      >
    </template>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { formSchema } from './dictionary.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { useI18n } from 'vue-i18n';
  import { useGo } from '@/hooks/web/usePage';

  import { createDictionary, updateDictionary } from '@/api/sys/dictionary';

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const { t } = useI18n();
  const dictionaryId = ref<number>(0);
  const go = useGo();

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
      dictionaryId.value = data.record.id;
    }
  });

  const getTitle = computed(() =>
    !unref(isUpdate) ? t('sys.dictionary.addDictionary') : t('sys.dictionary.editDictionary'),
  );

  async function handleSubmit() {
    const values = await validate();
    setDrawerProps({ confirmLoading: true });
    values['id'] = unref(isUpdate) ? Number(values['id']) : 0;
    let result = unref(isUpdate) ? await updateDictionary(values) : await createDictionary(values);
    if (result.code === 0) {
      closeDrawer();
      emit('success');
    }
    setDrawerProps({ confirmLoading: false });
  }

  function handleOpenDetail() {
    go('/dictionary/detail/' + dictionaryId.value);
  }
</script>
