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
  import { detailSchema } from './dictionary.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { useI18n } from 'vue-i18n';

  import { createOrUpdateDictionaryDetail } from '/@/api/sys/dictionary';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    name: 'DictionaryDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const { t } = useI18n();
      const dictionaryName = ref<string>('');
      const { currentRoute } = useRouter();

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        baseColProps: { span: 24 },
        schemas: detailSchema,
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
          dictionaryName.value = data.record.name;
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
        values['parentId'] = Number(currentRoute.value.query.id);
        let result = await createOrUpdateDictionaryDetail(values);
        if (result.code === 0) {
          closeDrawer();
          emit('success', result.msg);
        }
        setDrawerProps({ confirmLoading: false });
      }

      return {
        registerDrawer,
        registerForm,
        getTitle,
        isUpdate,
        handleSubmit,
        t,
      };
    },
  });
</script>
