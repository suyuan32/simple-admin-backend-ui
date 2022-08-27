<template>
  <PageWrapper>
    <ACard :title="t('layout.header.profile')" style="width: 100%">
      <AForm
        :model="formdata"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @submit="handleSubmit()"
      >
        <AFormItem :label="t('sys.user.nickname')" name="nickname" :rules="[{ required: true }]">
          <a-input v-model:value="formdata.nickname"
        /></AFormItem>

        <AFormItem :label="t('sys.login.mobile')" name="mobile" :rules="[{ required: true }]">
          <a-input v-model:value="formdata.mobile"
        /></AFormItem>

        <AFormItem :label="t('sys.login.email')" name="email" :rules="[{ required: true }]">
          <a-input v-model:value="formdata.email"
        /></AFormItem>

        <AFormItem :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">{{ t('common.saveText') }}</a-button>
        </AFormItem>
      </AForm>
    </ACard>
    <ACard :title="t('sys.user.changePassword')" style="width: 100%">
      <AForm
        :model="changePasswordReq"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @submit="handleChangePasswordSubmit()"
      >
        <AFormItem
          :label="t('sys.user.oldPassword')"
          name="oldPassword"
          :rules="[{ required: true }]"
        >
          <a-input type="password" v-model:value="changePasswordReq.oldPassword"
        /></AFormItem>

        <AFormItem
          :label="t('sys.user.newPassword')"
          name="newPassword"
          :rules="[{ required: true }]"
        >
          <a-input type="password" v-model:value="changePasswordReq.newPassword"
        /></AFormItem>

        <AFormItem :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">{{ t('common.saveText') }}</a-button>
        </AFormItem>
      </AForm>
    </ACard>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { ChangePasswordReq, FormData } from './data';
  import { Card, Form, FormItem, message } from 'ant-design-vue';
  import { reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { changePassword, getUserProfile, updateProfile } from '/@/api/sys/user';

  const ACard = Card;
  const AForm = Form;
  const AFormItem = FormItem;
  const { t } = useI18n();
  const formdata = reactive<FormData>({
    avatar: '',
    nickname: '',
    email: '',
    mobile: '',
  });
  const changePasswordReq = reactive<ChangePasswordReq>({
    oldPassword: '',
    newPassword: '',
  });

  async function getProfile() {
    const result = await getUserProfile();
    formdata.nickname = result.nickname;
    formdata.email = result.email;
    formdata.mobile = result.mobile;
    formdata.avatar = result.avatar;
  }

  getProfile();

  async function handleSubmit() {
    try {
      const result = await updateProfile({
        avatar: formdata.avatar,
        nickname: formdata.nickname,
        email: formdata.email,
        mobile: formdata.mobile,
      });
      message.success(t(result.msg));
    } catch (e) {
      console.log(e);
    }
  }

  async function handleChangePasswordSubmit() {
    try {
      const result = await changePassword({
        oldPassword: changePasswordReq.oldPassword,
        newPassword: changePasswordReq.newPassword,
      });
      message.success(t(result.msg));
    } catch (e) {
      console.log(e);
    }
  }
</script>
