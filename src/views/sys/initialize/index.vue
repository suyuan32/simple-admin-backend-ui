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
    <ACard :title="t('sys.init.initMMSDatabase')" :bordered="false" style="width: 50%">
      <p><a href="https://github.com/suyuan32/simple-admin-member-api">Member Github</a></p>
      <a-button type="primary" :loading="mmsInitButtonLoading" @click="initMMSDatabase">
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
  import { initializeMMSDatabase } from '/@/api/member/initialize';

  const { t } = useI18n();
  const ACard = Card;
  const coreInitButtonLoading = ref<boolean>(false);
  const fileInitButtonLoading = ref<boolean>(false);
  const mmsInitButtonLoading = ref<boolean>(false);

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
</script>
