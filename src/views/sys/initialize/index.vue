<template>
  <PageWrapper :title="t('sys.init.initTitle')">
    <ACard :title="t('sys.init.initProgressTitle')" :bordered="false" style="width: 100%">
      <ASpin v-if="showSpin" :indicator="indicator" />
      <p v-if="showResult">
        {{ resultMsg }}
      </p>
    </ACard>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { Card, Spin } from 'ant-design-vue';
  import { LoadingOutlined } from '@ant-design/icons-vue';
  import { initialzeDatabase } from '/@/api/sys/initialize';
  import { PageWrapper } from '/@/components/Page';
  import { useI18n } from 'vue-i18n';
  import { h, ref } from 'vue';

  const { t } = useI18n();
  const ACard = Card;
  const ASpin = Spin;
  const showSpin = ref<boolean>(true);
  const showResult = ref<boolean>(false);
  const resultMsg = ref<string>('');

  const indicator = h(LoadingOutlined, {
    style: {
      fontSize: '24px',
    },
    spin: true,
  });

  async function initDatabase() {
    try {
      let result = await initialzeDatabase();
      console.log(result);
      resultMsg.value = t(result.msg);
      showSpin.value = false;
      showResult.value = true;
    } catch (e) {
      resultMsg.value = t('sys.api.apiRequestFailed');
      showSpin.value = false;
      showResult.value = true;
    }
  }

  initDatabase();
</script>
