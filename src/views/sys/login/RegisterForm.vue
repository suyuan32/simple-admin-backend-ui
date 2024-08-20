<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <div class="pt-4 pb-4">
        <ARadioGroup v-model:value="formData.msgType" button-style="solid" size="large">
          <ARadioButton class="bg-transparent" value="captcha">
            {{ t('sys.login.captcha') }}
          </ARadioButton>
          <ARadioButton class="bg-transparent" value="email">
            {{ t('sys.login.email') }}
          </ARadioButton>
          <ARadioButton class="bg-transparent" value="sms">
            {{ t('sys.login.mobile') }}
          </ARadioButton>
        </ARadioGroup>
      </div>

      <FormItem
        name="account"
        class="enter-x"
        :rules="[
          { required: true, message: t('sys.login.accountPlaceholder') },
          { max: 30, message: t('sys.login.accountMaxLength') },
        ]"
      >
        <Input
          class="fix-auto-fill"
          size="large"
          v-model:value="formData.account"
          :placeholder="t('sys.login.username')"
        />
      </FormItem>

      <FormItem v-if="formData.msgType === 'captcha'" name="email" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.email"
          :placeholder="t('sys.login.email')"
          :rules="[{ required: true, type: 'email' }]"
          class="fix-auto-fill"
        />
      </FormItem>

      <FormItem
        name="password"
        class="enter-x"
        :rules="[
          { required: true, message: t('sys.login.passwordPlaceholder') },
          { min: 6, max: 30, message: t('sys.login.passwordLength') },
        ]"
      >
        <StrengthMeter
          size="large"
          v-model:value="formData.password"
          :placeholder="t('sys.login.password')"
        />
      </FormItem>

      <FormItem
        name="confirmPassword"
        class="enter-x"
        :rules="[
          { required: true, message: t('sys.login.passwordPlaceholder') },
          { min: 6, max: 30, message: t('sys.login.passwordLength') },
        ]"
      >
        <InputPassword
          size="large"
          visibilityToggle
          v-model:value="formData.confirmPassword"
          :placeholder="t('sys.login.confirmPassword')"
        />
      </FormItem>

      <FormItem v-if="formData.msgType !== 'captcha'" name="target" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.target"
          v-model:placeholder="emailOrPhonePlaceholder"
        />
      </FormItem>

      <FormItem v-if="formData.msgType !== 'captcha'" name="captchaVerified" class="enter-x">
        <CountdownInput
          size="large"
          v-model:value="formData.captchaVerified"
          :count="60"
          :placeholder="t('sys.login.captcha')"
          :send-code-api="handleSendCaptcha"
        />
      </FormItem>

      <FormItem
        v-if="formData.msgType === 'captcha'"
        name="captcha"
        class="enter-x"
        :rules="[{ required: true, len: 5, message: t('sys.login.captchaRequired') }]"
      >
        <Input
          size="large"
          v-model:value="formData.captcha"
          :placeholder="t('sys.login.captcha')"
          class="fix-auto-fill bg-transparent"
        >
          <template #suffix>
            <Image
              :src="formData.imgPath"
              :width="120"
              :height="40"
              :preview="false"
              @click="getCaptchaData"
              class="rounded"
            />
          </template>
        </Input>
      </FormItem>

      <FormItem name="captchaId" class="enter-x" v-show="false">
        <Input :value="formData.captchaId" />
      </FormItem>

      <FormItem class="enter-x" name="policy">
        <!-- No logic, you need to deal with it yourself -->
        <Checkbox v-model:checked="formData.policy" class="bg-transparent" size="small">
          {{ t('sys.login.policy') }}
        </Checkbox>
      </FormItem>

      <Button
        type="primary"
        class="enter-x"
        size="large"
        block
        @click="handleRegister"
        :loading="loading"
      >
        {{ t('sys.login.registerButton') }}
      </Button>
      <Button size="large" block class="mt-4 enter-x" @click="handleBackLogin">
        {{ t('sys.login.backSignIn') }}
      </Button>
    </Form>
  </template>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { Form, Input, Button, Checkbox, RadioGroup, RadioButton, Image } from 'ant-design-vue';
  import { StrengthMeter } from '@/components/StrengthMeter';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin';
  import { register, registerByEmail, registerBySms } from '@/api/sys/user';
  import { getCaptcha, getEmailCaptcha, getSmsCaptcha } from '@/api/sys/captcha';
  import { CountdownInput } from '@/components/CountDown';

  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const ARadioGroup = RadioGroup;
  const ARadioButton = RadioButton;
  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();

  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    msgType: 'captcha',
    target: '',
    account: '',
    password: '',
    confirmPassword: '',
    email: '',
    captcha: '',
    captchaId: '',
    captchaVerified: '',
    imgPath: '',
    policy: false,
  });

  const { getFormRules } = useFormRules(formData);
  const { validForm } = useFormValid(formRef);

  const emailOrPhonePlaceholder = computed(() => {
    if (formData.msgType === 'email') {
      return t('sys.login.emailPlaceholder');
    } else {
      return t('sys.login.mobilePlaceholder');
    }
  });

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER);

  async function handleRegister() {
    const data = await validForm();
    if (!data) return;
    loading.value = true;

    if (formData.msgType === 'captcha') {
      const result = await register({
        password: data.password,
        username: data.account,
        captcha: data.captcha,
        captchaId: data.captchaId,
        email: data.email,
      });

      if (result.code === 0) {
        setTimeout(() => {
          handleBackLogin();
        }, 2000);
        loading.value = false;
      } else {
        await getCaptchaData();
        loading.value = false;
      }
    } else if (formData.msgType === 'email') {
      const result = await registerByEmail({
        password: data.password,
        username: data.account,
        captcha: data.captchaVerified,
        email: data.target,
      });

      if (result.code === 0) {
        setTimeout(() => {
          handleBackLogin();
        }, 2000);
        loading.value = false;
      } else {
        loading.value = false;
      }
    } else {
      const result = await registerBySms({
        password: data.password,
        username: data.account,
        captcha: data.captchaVerified,
        phoneNumber: data.target,
      });

      if (result.code === 0) {
        setTimeout(() => {
          handleBackLogin();
        }, 2000);
        loading.value = false;
      } else {
        loading.value = false;
      }
    }
  }

  async function handleSendCaptcha(): Promise<boolean> {
    if (formData.msgType == 'email') {
      const result = await getEmailCaptcha({ email: formData.target });
      return result.code == 0;
    } else {
      const result = await getSmsCaptcha({ phoneNumber: formData.target });
      return result.code == 0;
    }
  }

  async function getCaptchaData() {
    const captcha = await getCaptcha('none').then();
    if (captcha.code === 0) {
      formData.captchaId = captcha.data.captchaId;
      formData.imgPath = captcha.data.imgPath;
    }
  }

  getCaptchaData();
</script>
