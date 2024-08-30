<template>
  <div :class="prefixCls">
    <a-button type="primary" block @click="handleCopyToken" class="mb-3">
      <CopyOutlined class="mr-2" />
      {{ t('layout.setting.copyToken') }}
    </a-button>

    <a-button color="error" block @click="handleClearDictionaryCache" class="mb-3">
      <RedoOutlined class="mr-2" />
      {{ t('layout.setting.clearDictionaryCache') }}
    </a-button>

    <a-button color="error" block @click="handleClearAndRedo">
      <RedoOutlined class="mr-2" />
      {{ t('layout.setting.clearBtn') }}
    </a-button>
  </div>
</template>
<script lang="ts" setup>
  import { CopyOutlined, RedoOutlined } from '@ant-design/icons-vue';

  import { useAppStore } from '@/store/modules/app';
  import { usePermissionStore } from '@/store/modules/permission';
  import { useMultipleTabStore } from '@/store/modules/multipleTab';
  import { useUserStore } from '@/store/modules/user';

  import { useDesign } from '@/hooks/web/useDesign';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useMessage } from '@/hooks/web/useMessage';
  import { copyText } from '@/utils/copyTextToClipboard';

  import { useDictionaryStore } from '@/store/modules/dictionary';

  const permissionStore = usePermissionStore();
  const { prefixCls } = useDesign('setting-footer');
  const { t } = useI18n();
  const { createMessage } = useMessage();
  const tabStore = useMultipleTabStore();
  const userStore = useUserStore();
  const appStore = useAppStore();

  function handleCopyToken() {
    copyText(userStore.token);
  }

  function handleClearAndRedo() {
    localStorage.clear();
    appStore.resetAllState();
    permissionStore.resetState();
    tabStore.resetState();
    userStore.resetState();
    location.reload();
  }

  function handleClearDictionaryCache() {
    const dictStore = useDictionaryStore();
    dictStore.clear();

    createMessage.success(t('layout.setting.operatingTitle'));
    location.reload();
  }
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-setting-footer';

  .@{prefix-cls} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
