<template>
  <span :class="`${prefixCls}__extra-fold`" @click="handleFold">
    <Icon :icon="getIcon" :color="btnColor" />
  </span>
</template>
<script lang="ts">
  import { defineComponent, unref, computed, ref, watch } from 'vue';
  import Icon from '@/components/Icon/Icon.vue';

  import { useDesign } from '/@/hooks/web/useDesign';
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
  import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
  import { triggerWindowResize } from '/@/utils/event';
  import { ThemeEnum } from '/@/enums/appEnum';
  import { useAppStore } from '/@/store/modules/app';

  export default defineComponent({
    name: 'FoldButton',
    components: { Icon },
    setup() {
      const { prefixCls } = useDesign('multiple-tabs-content');
      const { getShowMenu, setMenuSetting } = useMenuSetting();
      const { getShowHeader, setHeaderSetting } = useHeaderSetting();
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

      const getIsUnFold = computed(() => !unref(getShowMenu) && !unref(getShowHeader));

      const getIcon = computed(() =>
        unref(getIsUnFold) ? 'codicon:screen-normal' : 'codicon:screen-full',
      );

      function handleFold() {
        const isUnFold = unref(getIsUnFold);
        setMenuSetting({
          show: isUnFold,
          hidden: !isUnFold,
        });
        setHeaderSetting({ show: isUnFold });
        triggerWindowResize();
      }

      return { prefixCls, getIcon, handleFold, btnColor };
    },
  });
</script>
