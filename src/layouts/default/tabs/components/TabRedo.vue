<template>
  <span :class="`${prefixCls}__extra-redo`" @click="handleRedo" :style="{ color: btnColor }">
    <!-- <RedoOutlined :spin="loading" /> -->
    <Icon icon="ant-design:undo-outlined" :spin="loading"
  /></span>
</template>
<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useTabs } from '/@/hooks/web/useTabs';
  import { useAppStore } from '/@/store/modules/app';
  import { ThemeEnum } from '/@/enums/appEnum';
  import Icon from '@/components/Icon/Icon.vue';

  export default defineComponent({
    name: 'TabRedo',
    components: { Icon },

    setup() {
      const loading = ref(false);
      const btnColor = ref<string>();

      const appStore = useAppStore();

      const changePrefix = function (value: string) {
        if (value === ThemeEnum.DARK) {
          btnColor.value = 'white';
        } else {
          btnColor.value = 'gray';
        }
      };

      changePrefix(appStore.getDarkMode);

      watch(
        () => appStore.getDarkMode,
        (value, _oldValue) => {
          changePrefix(value);
        },
      );

      const { prefixCls } = useDesign('multiple-tabs-content');
      const { refreshPage } = useTabs();

      async function handleRedo() {
        loading.value = true;
        await refreshPage();
        setTimeout(() => {
          loading.value = false;
          // Animation execution time
        }, 1200);
      }
      return { prefixCls, handleRedo, loading, btnColor };
    },
  });
</script>
