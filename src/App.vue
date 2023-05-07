<template>
  <ConfigProvider :locale="getAntdLocale" :prefix-cls="cssPrefix">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
  import { ConfigProvider } from 'ant-design-vue';
  import { AppProvider } from '/@/components/Application';
  import { useTitle } from '/@/hooks/web/useTitle';
  import { useLocale } from '/@/locales/useLocale';

  import 'dayjs/locale/zh-cn';
  import { ref, watch } from 'vue';
  import { useAppStore } from './store/modules/app';
  import { CssPrefixEnum } from './enums/appEnum';

  // support Multi-language
  const { getAntdLocale } = useLocale();

  const cssPrefix = ref<string>();

  const appStore = useAppStore();

  const changePrefix = function (value: string) {
    if (value === CssPrefixEnum.DARK) {
      cssPrefix.value = CssPrefixEnum.DARK;
    } else {
      cssPrefix.value = CssPrefixEnum.DEFAULT;
    }
  };

  changePrefix(appStore.getDarkMode);

  watch(
    () => appStore.getDarkMode,
    (value, _oldValue) => {
      changePrefix(value);
    },
  );

  ConfigProvider.config({
    prefixCls: cssPrefix.value,
    // theme: {
    //   primaryColor: '#262626',
    // },
  });

  // Listening to page changes and dynamically changing site titles
  useTitle();
</script>
