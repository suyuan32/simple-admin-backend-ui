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
    <template v-if="isUpdate" #extra>
      <a-button type="primary" style="margin-right: 8px" @click="handleOpenDetail">
        {{ t('sys.dictionary.addDictionaryDetail') }}</a-button
      >
    </template>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './dictionary.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { useI18n } from 'vue-i18n';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { DictionaryInfo } from '/@/api/sys/model/dictionaryModel';
  import { createOrUpdateDictionary } from '/@/api/sys/dictionary';
  // import { useRouter } from 'vue-router';
  import { useGo } from '/@/hooks/web/usePage';

  export default defineComponent({
    name: 'DictionaryDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const { t } = useI18n();
      const { notification } = useMessage();
      const go = useGo();
      const dictionaryName = ref<string>('');
      const dictionaryId = ref<number>(0);

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

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
          dictionaryName.value = data.record.name;
          dictionaryId.value = data.record.id;
        }
      });

      const getTitle = computed(() =>
        !unref(isUpdate) ? t('sys.dictionary.addDictionary') : t('sys.dictionary.editDictionary'),
      );

      function handleOpenDetail() {
        go('/dictionary/detail?id=' + dictionaryId.value + '&name=' + dictionaryName.value);
      }

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          // defined dict id
          let dictId: number;
          if (unref(isUpdate)) {
            dictId = Number(values['id']);
          } else {
            dictId = 0;
          }
          let params: DictionaryInfo = {
            id: dictId,
            title: values['title'],
            name: values['name'],
            description: values['description'],
            status: values['status'],
          };
          let result = await createOrUpdateDictionary(params);
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
        registerDrawer,
        registerForm,
        getTitle,
        isUpdate,
        handleSubmit,
        t,
        handleOpenDetail,
      };
    },
  });
</script>
