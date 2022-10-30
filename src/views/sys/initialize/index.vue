<template>
  <PageWrapper :title="t('sys.init.initTitle')">
    <ACard :title="t('sys.init.initCoreDatabase')" :bordered="false" style="width: 50%">
      <!-- <ASpin v-if="showSpin" :indicator="indicator" /> -->
      <a-button type="primary" :loading="coreInitButtonLoading" @click="initCoreDatabase">
        {{ t('common.start') }}
      </a-button>
    </ACard>
    <ACard :title="t('sys.init.initFileDatabase')" :bordered="false" style="width: 50%">
      <p><a href="https://github.com/suyuan32/simple-admin-file">File Manager Github</a></p>
      <a-button type="primary" :loading="fileInitButtonLoading" @click="initFileDatabase">
        {{ t('common.start') }}
      </a-button>
    </ACard>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { Card, message } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { useI18n } from 'vue-i18n';
  import { ref } from 'vue';
  // api
  import { initialzeCoreDatabase } from '/@/api/sys/initialize';
  import { initializeFileDatabase } from '/@/api/file/initialize';

  const { t } = useI18n();
  const ACard = Card;
  const coreInitButtonLoading = ref<boolean>(false);
  const fileInitButtonLoading = ref<boolean>(false);

  async function initCoreDatabase() {
    try {
      coreInitButtonLoading.value = true;
      let result = await initialzeCoreDatabase();
      message.success(t(result.msg), 2);
      coreInitButtonLoading.value = false;
    } catch (e) {
      message.error(t('sys.api.apiRequestFailed'), 2);
      coreInitButtonLoading.value = false;
    }
  }

  async function initFileDatabase() {
    try {
      fileInitButtonLoading.value = true;
      let result = await initializeFileDatabase();
      message.success(t(result.msg), 2);
      fileInitButtonLoading.value = false;
    } catch (e) {
      message.error(t('sys.api.apiRequestFailed'), 2);
      fileInitButtonLoading.value = false;
    }
  }
</script>
