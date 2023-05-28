<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="account" class="enter-x" :rules="[{ required: true, max: 30 }]">
        <Input
          class="fix-auto-fill"
          size="large"
          v-model:value="formData.account"
          :placeholder="t('sys.login.username')"
        />
      </FormItem>
      <FormItem name="email" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.email"
          :placeholder="t('sys.login.email')"
          :rules="[{ required: true, type: 'email' }]"
          class="fix-auto-fill"
        />
      </FormItem>
      <FormItem name="password" class="enter-x" :rules="[{ required: true, min: 6, max: 30 }]">
        <StrengthMeter
          size="large"
          v-model:value="formData.password"
          :placeholder="t('sys.login.password')"
        />
      </FormItem>
      <FormItem name="confirmPassword" class="enter-x">
        <InputPassword
          size="large"
          visibilityToggle
          v-model:value="formData.confirmPassword"
          :placeholder="t('sys.login.confirmPassword')"
        />
      </FormItem>

      <FormItem name="captcha" class="enter-x" :rules="[{ required: true, len: 5 }]">
        <Input size="large" v-model:value="formData.captcha" :placeholder="t('sys.login.captcha')">
          <template #suffix>
            <img
              :src="formData.imgPath"
              class="absolute right-0 h-full cursor-pointer"
              @click="getCaptchaData()"
            />
          </template>
        </Input>
      </FormItem>

      <FormItem name="captchaId" class="enter-x" v-show="false">
        <Input :value="formData.captchaId" />
      </FormItem>

      <FormItem class="enter-x" name="policy">
        <!-- No logic, you need to deal with it yourself -->
        <Checkbox v-model:checked="formData.policy" size="small">
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
  import { Form, Input, Button, Checkbox } from 'ant-design-vue';
  import { StrengthMeter } from '/@/components/StrengthMeter';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin';
  import { getCaptcha, register } from '/@/api/sys/user';

  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();

  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    account: '',
    password: '',
    confirmPassword: '',
    email: '',
    captcha: '',
    captchaId: '',
    imgPath: '',
    policy: false,
  });

  const { getFormRules } = useFormRules(formData);
  const { validForm } = useFormValid(formRef);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER_BY_EMAIL);

  async function handleRegister() {
    const data = await validForm();
    if (!data) return;
    loading.value = true;
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
    } else {
      getCaptchaData();
      loading.value = false;
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
