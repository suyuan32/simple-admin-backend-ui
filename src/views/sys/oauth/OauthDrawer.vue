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
  import { formSchema } from './oauth.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { useI18n } from 'vue-i18n';

  import { ProviderInfo } from '/@/api/sys/model/oauthModel';
  import { createOrUpdateProvider } from '/@/api/sys/oauth';
  import { message } from 'ant-design-vue';

  export default defineComponent({
    name: 'OauthDrawer',
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

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
      });

      const getTitle = computed(() =>
        !unref(isUpdate) ? t('sys.apis.addApi') : t('sys.apis.editApi'),
      );

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          // defined provider id
          let providerId: number;
          if (unref(isUpdate)) {
            providerId = Number(values['id']);
          } else {
            providerId = 0;
          }
          let params: ProviderInfo = {
            id: providerId,
            name: values['name'],
            clientId: values['clientId'],
            clientSecret: values['clientSecret'],
            redirectURL: values['redirectURL'],
            scopes: values['scopes'],
            authURL: values['authURL'],
            tokenURL: values['tokenURL'],
            infoURL: values['infoURL'],
            authStyle: values['authStyle'],
            createdAt: 0, // do not need to set
          };
          let result = await createOrUpdateProvider(params, 'message');
          message.success(t(result.msg), 2);
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
        handleSubmit,
      };
    },
  });
</script>
