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
        <AFormItem :label="t('sys.user.avatar')">
          <CropperAvatar
            :uploadApi="uploadApi"
            :value="avatar"
            btnText="更换头像"
            :btnProps="{ preIcon: 'ant-design:cloud-upload-outlined' }"
            @change="updateAvatar"
            width="150"
          />
        </AFormItem>

        <AFormItem v-show="false" name="avatar">
          <a-input v-model:value="formdata.avatar" v-show="false" />
        </AFormItem>

        <AFormItem :label="t('sys.user.nickname')" name="nickname" :rules="[{ required: true }]">
          <a-input v-model:value="formdata.nickname"
        /></AFormItem>

        <AFormItem :label="t('sys.login.mobile')" name="mobile">
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
  import { computed, reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { changePassword, getUserProfile, updateProfile } from '/@/api/sys/user';
  import headerImg from '/@/assets/images/header.jpg';
  import { useUserStore } from '/@/store/modules/user';
  import { uploadApi } from '/@/api/fms/file';
  import { CropperAvatar } from '/@/components/Cropper';

  const ACard = Card;
  const AForm = Form;
  const AFormItem = FormItem;
  const { t } = useI18n();
  const userStore = useUserStore();

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
    if (result.code === 0) {
      formdata.nickname = result.data.nickname;
      formdata.email = result.data.email;
      formdata.mobile = result.data.mobile;
      formdata.avatar = result.data.avatar;
    }
  }

  getProfile();

  async function handleSubmit() {
    const result = await updateProfile({
      avatar: formdata.avatar,
      nickname: formdata.nickname,
      email: formdata.email,
      mobile: formdata.mobile,
    });
    if (result.code === 0) message.success(result.msg, 3);
  }

  async function handleChangePasswordSubmit() {
    const result = await changePassword({
      oldPassword: changePasswordReq.oldPassword,
      newPassword: changePasswordReq.newPassword,
    });
    if (result.code === 0) message.success(result.msg, 3);
  }

  function updateAvatar({ _src, data }) {
    const userinfo = userStore.getUserInfo;
    userinfo.avatar = data;
    formdata.avatar = data;
    userStore.setUserInfo(userinfo);
  }

  const avatar = computed(() => {
    const { avatar } = userStore.getUserInfo;
    return avatar || headerImg;
  });
</script>
