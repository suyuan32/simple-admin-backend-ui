<template>
  <PageWrapper :title="t('sys.init.initTitle')" :content-full-height="true" class="bg">
    <ARow :gutter="[16, 16]">
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
      <ACol :span="6">
        <ACard :title="t('sys.init.initMcmsDatabase')" :hoverable="true">
          <p><a href="https://github.com/suyuan32/simple-admin-message-center">Mcms Github</a></p>
          <a-button type="primary" :loading="mcmsInitButtonLoading" @click="initMcmsDatabase">
            {{ t('common.start') }}
          </a-button>
        </ACard>
      </ACol>
    </ARow>
    <Divider />
    <ARow>
      <ACol :span="12">
        <ACard :title="t('sys.init.initCustom')" :hoverable="true">
          <p>{{ t('sys.init.initUrl') }}</p>
          <p>
            <Input v-model:value="customInitUrl" />
          </p>
          <p>{{ t('sys.init.initPort') }}</p>
          <p>
            <Input v-model:value="customInitPort" />
          </p>
          <p>{{ t('sys.init.initService') }}</p>
          <p>
            <Input v-model:value="customInitService" :placeholder="t('sys.init.initOptional')" />
          </p>
          <p>{{ t('sys.init.initRedirect') }}</p>
          <p
            ><a-button
              type="primary"
              :loading="customInitButtonLoading"
              @click="initCustomDatabase"
            >
              {{ t('common.start') }}
            </a-button></p
          >
        </ACard>
      </ACol>
    </ARow>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { Col, Row, Card, message, Input, Divider } from 'ant-design-vue';
  import { PageWrapper } from '@/components/Page';
  import { useI18n } from 'vue-i18n';
  import { ref } from 'vue';
  // api
  import {
    initializeJobDatabase,
    initializeMcmsDatabase,
    initialzeCoreDatabase,
  } from '@/api/sys/initialize';
  import { initializeFileDatabase } from '@/api/fms/initialize';
  import { initializeMMSDatabase } from '@/api/member/initialize';

  const { t } = useI18n();
  const ACard = Card;
  const ACol = Col;
  const ARow = Row;
  const coreInitButtonLoading = ref<boolean>(false);
  const fileInitButtonLoading = ref<boolean>(false);
  const mmsInitButtonLoading = ref<boolean>(false);
  const jobInitButtonLoading = ref<boolean>(false);
  const mcmsInitButtonLoading = ref<boolean>(false);
  const customInitButtonLoading = ref<boolean>(false);
  const customInitUrl = ref<string>('http://localhost');
  const customInitPort = ref<string>('9100');
  const customInitService = ref<string>('');

  async function initCustomDatabase() {
    const serviceName: string = customInitService.value == '' ? '' : '/' + customInitService.value;
    customInitButtonLoading.value = true;
    window.open(
      customInitUrl.value + ':' + customInitPort.value + serviceName + '/init/database',
      '_blank',
    );
    customInitButtonLoading.value = false;
  }

  async function initCoreDatabase() {
    coreInitButtonLoading.value = true;
    const result = await initialzeCoreDatabase().finally(() => {
      coreInitButtonLoading.value = false;
    });
    if (result.code === 0) {
      message.success(result.msg, 3);
    }
  }

  async function initFileDatabase() {
    fileInitButtonLoading.value = true;
    const result = await initializeFileDatabase().finally(() => {
      fileInitButtonLoading.value = false;
    });
    if (result.code === 0) {
      message.success(result.msg, 3);
    }
  }

  async function initMMSDatabase() {
    mmsInitButtonLoading.value = true;
    const result = await initializeMMSDatabase().finally(() => {
      mmsInitButtonLoading.value = false;
    });
    if (result.code === 0) {
      message.success(result.msg, 3);
    }
  }

  async function initJobDatabase() {
    jobInitButtonLoading.value = true;
    const result = await initializeJobDatabase().finally(() => {
      jobInitButtonLoading.value = false;
    });
    if (result.code === 0) {
      message.success(result.msg, 3);
    }
  }

  async function initMcmsDatabase() {
    mcmsInitButtonLoading.value = true;
    const result = await initializeMcmsDatabase().finally(() => {
      mcmsInitButtonLoading.value = false;
    });
    if (result.code === 0) {
      message.success(result.msg, 3);
    }
  }
</script>

<style lang="less" scoped>
  [data-theme='dark'] {
    .bg {
      background-color: #262626;
    }
  }

  .bg {
    background-color: white;
  }
</style>
