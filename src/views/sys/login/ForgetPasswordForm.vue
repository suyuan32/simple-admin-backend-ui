<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <div class="pt-4 pb-4">
        <ARadioGroup v-model:value="formData.msgType" button-style="solid" size="large">
          <ARadioButton class="bg-transparent" value="email">
            {{ t('sys.login.email') }}
          </ARadioButton>
          <ARadioButton class="bg-transparent" value="sms">
            {{ t('sys.login.mobile') }}
          </ARadioButton>
        </ARadioGroup>
      </div>

      <FormItem name="target" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.target"
          v-model:placeholder="emailOrPhonePlaceholder"
        />
      </FormItem>
      <FormItem name="captcha" class="enter-x">
        <CountdownInput
          size="large"
          v-model:value="formData.captcha"
          :count="60"
          :placeholder="t('sys.login.captcha')"
          :send-code-api="handleSendCaptcha"
        />
      </FormItem>

      <FormItem name="password" class="enter-x">
        <Input
          type="password"
          size="large"
          v-model:value="formData.password"
          :placeholder="t('sys.login.password')"
        />
      </FormItem>

      <FormItem name="confirmPassword" class="enter-x">
        <Input
          type="password"
          size="large"
          v-model:value="formData.confirmPassword"
          :placeholder="t('sys.login.confirmPassword')"
        />
      </FormItem>

      <FormItem class="enter-x">
        <Button type="primary" size="large" block @click="handleReset" :loading="loading">
          {{ t('common.resetText') }}
        </Button>
        <Button size="large" block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </Button>
      </FormItem>
    </Form>
  </template>
</template>
<script lang="ts" setup>
  import { reactive, ref, computed, unref } from 'vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { Form, Input, Button, RadioGroup, RadioButton } from 'ant-design-vue';
  import { CountdownInput } from '@/components/CountDown';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useLoginState, useFormRules, LoginStateEnum } from './useLogin';
  import { getEmailCaptcha, getSmsCaptcha } from '@/api/sys/captcha';
  import { resetPasswordByEmail, resetPasswordBySms } from '@/api/sys/user';
  import { useMessage } from '@/hooks/web/useMessage';

  const FormItem = Form.Item;
  const ARadioGroup = RadioGroup;
  const ARadioButton = RadioButton;
  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();
  const { createErrorModal } = useMessage();

  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    msgType: 'email',
    target: '',
    captcha: '',
    password: '',
    confirmPassword: '',
  });

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD);

  const emailOrPhonePlaceholder = computed(() => {
    if (formData.msgType === 'email') {
      return t('sys.login.emailPlaceholder');
    } else {
      return t('sys.login.mobilePlaceholder');
    }
  });

  async function handleSendCaptcha(): Promise<boolean> {
    if (formData.msgType == 'email') {
      const result = await getEmailCaptcha({ email: formData.target });
      return result.code == 0;
    } else {
      const result = await getSmsCaptcha({ phoneNumber: formData.target });
      return result.code == 0;
    }
  }

  async function handleReset() {
    const form = unref(formRef);
    if (!form) return;

    if (formData.password != formData.confirmPassword) {
      createErrorModal({ title: t('sys.login.diffPwd') });
      return;
    }

    loading.value = true;

    if (formData.msgType == 'email') {
      const result = await resetPasswordByEmail({
        email: formData.target,
        captcha: formData.captcha,
        password: formData.password,
      });

      if (result.code == 0) {
        loading.value = false;
        handleBackLogin();
      }
    } else {
      const result = await resetPasswordBySms({
        phoneNumber: formData.target,
        captcha: formData.captcha,
        password: formData.password,
      });

      if (result.code == 0) {
        loading.value = false;
        handleBackLogin();
      }
    }
  }
</script>
