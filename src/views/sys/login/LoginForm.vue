<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <Form
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    v-show="getShow"
    @keypress.enter="handleLogin"
  >
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
      name="account"
      v-if="formData.msgType === 'captcha'"
      class="enter-x"
      :rules="[
        { required: true, message: t('sys.login.accountPlaceholder') },
        { max: 30, message: t('sys.login.accountMaxLength') },
      ]"
    >
      <Input
        size="large"
        v-model:value="formData.account"
        :placeholder="t('sys.login.username')"
        class="fix-auto-fill"
      />
    </FormItem>

    <FormItem
      name="password"
      class="enter-x"
      v-if="formData.msgType === 'captcha'"
      :rules="[
        { required: true, message: t('sys.login.passwordPlaceholder') },
        { min: 6, max: 30, message: t('sys.login.passwordLength') },
      ]"
    >
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        :placeholder="t('sys.login.password')"
        class="fix-auto-fill"
      />
    </FormItem>

    <FormItem
      name="captcha"
      v-if="formData.msgType === 'captcha'"
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

    <FormItem class="enter-x">
      <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
        {{ t('sys.login.loginButton') }}
      </Button>
    </FormItem>
    <ARow class="enter-x" :gutter="5">
      <ACol :md="8" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.QR_CODE)">
          {{ t('sys.login.qrSignInFormTitle') }}
        </Button>
      </ACol>
      <ACol :md="8" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.REGISTER)">
          {{ t('sys.login.registerButton') }}
        </Button>
      </ACol>
      <ACol :md="8" :xs="24">
        <Button block @click="setLoginState(LoginStateEnum.RESET_PASSWORD)">
          {{ t('sys.login.forgetFormTitle') }}
        </Button>
      </ACol>
    </ARow>

    <Divider class="enter-x">{{ t('sys.login.otherSignIn') }}</Divider>

    <div class="flex justify-evenly enter-x" :class="`${prefixCls}-sign-in-way`">
      <GithubFilled @click="oauthLoginHandler('github')" />
      <!-- <WechatFilled @click="oauthLoginHandler('wechat')" />
      <AlipayCircleFilled @click="oauthLoginHandler('alipay')" /> -->
      <GoogleCircleFilled @click="oauthLoginHandler('google')" />
      <!-- <TwitterCircleFilled @click="oauthLoginHandler('twitter')" /> -->
    </div>
  </Form>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue';

  import {
    Form,
    Input,
    Row,
    Col,
    Button,
    Divider,
    RadioGroup,
    RadioButton,
    Image,
  } from 'ant-design-vue';
  import { GithubFilled, GoogleCircleFilled } from '@ant-design/icons-vue';
  import LoginFormTitle from './LoginFormTitle.vue';

  import { useI18n } from '@/hooks/web/useI18n';

  import { useUserStore } from '@/store/modules/user';
  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin';
  import { useDesign } from '@/hooks/web/useDesign';
  import { getCaptcha, getEmailCaptcha, getSmsCaptcha } from '@/api/sys/captcha';
  import { useGo } from '@/hooks/web/usePage';
  import { PageEnum } from '@/enums/pageEnum';
  import { oauthLogin } from '@/api/sys/oauthProvider';
  import { CountdownInput } from '@/components/CountDown';

  const ACol = Col;
  const ARow = Row;
  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const ARadioGroup = RadioGroup;
  const ARadioButton = RadioButton;
  const go = useGo();
  const { t } = useI18n();
  const { prefixCls } = useDesign('login');
  const userStore = useUserStore();

  const { setLoginState, getLoginState } = useLoginState();
  const { getFormRules } = useFormRules();

  const formRef = ref();
  const loading = ref(false);

  const emailOrPhonePlaceholder = computed(() => {
    if (formData.msgType === 'email') {
      return t('sys.login.emailPlaceholder');
    } else {
      return t('sys.login.mobilePlaceholder');
    }
  });

  const formData = reactive({
    msgType: 'captcha',
    account: '',
    password: '',
    captcha: '',
    captchaId: '',
    imgPath: '',
    target: '',
    captchaVerified: '',
  });

  const { validForm } = useFormValid(formRef);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

  async function handleLogin() {
    const data = await validForm();
    if (!data) return;
    loading.value = true;
    if (formData.msgType === 'captcha') {
      userStore
        .login({
          password: data.password,
          username: data.account,
          captcha: data.captcha,
          captchaId: data.captchaId,
          goHome: false,
          mode: 'notice',
        })
        .then(() => {
          loading.value = false;
          go(PageEnum.BASE_HOME);
        })
        .catch(() => {
          getCaptchaData();
          loading.value = false;
        });
    } else if (formData.msgType === 'email') {
      userStore
        .loginByEmail({
          captcha: data.captchaVerified,
          email: data.target,
          goHome: false,
          mode: 'notice',
        })
        .then(() => {
          loading.value = false;
          go(PageEnum.BASE_HOME);
        })
        .catch(() => {
          loading.value = false;
        });
    } else if (formData.msgType === 'sms') {
      userStore
        .loginBySms({
          captcha: data.captchaVerified,
          phoneNumber: data.target,
          goHome: false,
          mode: 'notice',
        })
        .then(() => {
          loading.value = false;
          go(PageEnum.BASE_HOME);
        })
        .catch(() => {
          loading.value = false;
        });
    }
  }

  // get captcha
  async function getCaptchaData() {
    const captcha = await getCaptcha('none');
    if (captcha.code === 0) {
      formData.captchaId = captcha.data.captchaId;
      formData.imgPath = captcha.data.imgPath;
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

  getCaptchaData();

  async function oauthLoginHandler(provider: string) {
    const result = await oauthLogin({
      state: new Date().getMilliseconds() + '-' + provider,
      provider: provider,
    });
    if (result.code === 0) window.open(result.data.URL);
  }
</script>
