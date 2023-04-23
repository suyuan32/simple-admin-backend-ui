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
  import { formSchema } from './dictionaryDetail.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { useI18n } from 'vue-i18n';

  import { createDictionaryDetail, updateDictionaryDetail } from '/@/api/sys/dictionaryDetail';

  export default defineComponent({
    name: 'DictionaryDetailDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const { t } = useI18n();

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        baseColProps: { span: 24 },
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });

        isUpdate.value = !!data?.isUpdate;
        const dictionaryId = data?.dictionaryId;
        console.log(dictionaryId);

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        } else {
          setFieldsValue({
            dictionaryId: dictionaryId,
          });
        }
      });

      const getTitle = computed(() =>
        !unref(isUpdate)
          ? t('sys.dictionary.addDictionaryDetail')
          : t('sys.dictionary.editDictionaryDetail'),
      );

      async function handleSubmit() {
        const values = await validate();
        setDrawerProps({ confirmLoading: true });
        values['id'] = unref(isUpdate) ? Number(values['id']) : 0;
        let result = unref(isUpdate)
          ? await updateDictionaryDetail(values)
          : await createDictionaryDetail(values);
        if (result.code === 0) {
          closeDrawer();
          emit('success');
        }
        setDrawerProps({ confirmLoading: false });
      }

      return {
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
      };
    },
  });
</script>
