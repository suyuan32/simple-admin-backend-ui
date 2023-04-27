<template>
  <PageWrapper :title="t('sys.init.initTitle')" :content-full-height="true">
    <ARow :gutter="16">
      <ACol :span="6">
        <ACard :title="t('sys.init.initCoreDatabase')" :hoverable="true">
          <p><a href="https://github.com/suyuan32/simple-admin-core">Core Github</a></p>
          <a-button type="primary" :loading="coreInitButtonLoading" @click="initCoreDatabase">
            {{ t('common.start') }}
          </a-button>
        </ACard>
      </ACol>
      <ACol :span="6">
        <ACard :title="t('sys.init.initFileDatabase')" :hoverable="true">
          <p><a href="https://github.com/suyuan32/simple-admin-file">File Manager Github</a></p>
          <a-button type="primary" :loading="fileInitButtonLoading" @click="initFileDatabase">
            {{ t('common.start') }}
          </a-button>
        </ACard>
      </ACol>
      <ACol :span="6">
        <ACard :title="t('sys.init.initMMSDatabase')" :hoverable="true">
          <p><a href="https://github.com/suyuan32/simple-admin-member-api">Member Github</a></p>
          <a-button type="primary" :loading="mmsInitButtonLoading" @click="initMMSDatabase">
            {{ t('common.start') }}
          </a-button>
        </ACard>
      </ACol>
      <ACol :span="6">
        <ACard :title="t('sys.init.initJobDatabase')" :hoverable="true">
          <p><a href="https://github.com/suyuan32/simple-admin-job">Job Github</a></p>
          <a-button type="primary" :loading="jobInitButtonLoading" @click="initJobDatabase">
            {{ t('common.start') }}
          </a-button>
        </ACard>
      </ACol>
    </ARow>
    <ARow>
      <ATinymce v-model="value" @change="handleChange" width="100%" />
    </ARow>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { Col, Row, Card, message } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { useI18n } from 'vue-i18n';
  import { ref } from 'vue';
  // api
  import { initializeJobDatabase, initialzeCoreDatabase } from '/@/api/sys/initialize';
  import { initializeFileDatabase } from '/@/api/file/initialize';
  import { initializeMMSDatabase } from '/@/api/member/initialize';
  import { Tinymce } from '/@/components/Tinymce/index';

  const { t } = useI18n();
  const ACard = Card;
  const ACol = Col;
  const ARow = Row;
  const ATinymce = Tinymce;
  const coreInitButtonLoading = ref<boolean>(false);
  const fileInitButtonLoading = ref<boolean>(false);
  const mmsInitButtonLoading = ref<boolean>(false);
  const jobInitButtonLoading = ref<boolean>(false);

  const value = ref('hello world!');

  function handleChange(value: string) {
    console.log(value);
  }

  async function initCoreDatabase() {
    coreInitButtonLoading.value = true;
    const result = await initialzeCoreDatabase();
    if (result.code === 0) {
      message.success(result.msg, 3);
    }
    coreInitButtonLoading.value = false;
  }

  async function initFileDatabase() {
    fileInitButtonLoading.value = true;
    const result = await initializeFileDatabase();
    if (result.code === 0) {
      message.success(result.msg, 3);
    }
    fileInitButtonLoading.value = false;
  }

  async function initMMSDatabase() {
    mmsInitButtonLoading.value = true;
    const result = await initializeMMSDatabase();
    if (result.code === 0) {
      message.success(result.msg, 3);
    }
    mmsInitButtonLoading.value = false;
  }

  async function initJobDatabase() {
    jobInitButtonLoading.value = true;
    const result = await initializeJobDatabase();
    if (result.code === 0) {
      message.success(result.msg, 3);
    }
    jobInitButtonLoading.value = false;
  }
</script>
