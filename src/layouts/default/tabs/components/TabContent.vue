<template>
  <Dropdown
    :dropMenuList="getDropMenuList"
    :trigger="getTrigger"
    placement="bottom"
    overlayClassName="multiple-tabs__dropdown"
    @menu-event="handleMenuEvent"
  >
    <div :class="`${prefixCls}__info`" @contextmenu="handleContext" v-if="getIsTabs">
      <span class="ml-1">{{ getTitle }}</span>
    </div>
    <span :class="`${prefixCls}__extra-quick`" v-else @click="handleContext">
      <Icon icon="ion:chevron-down" :color="btnColor" />
    </span>
  </Dropdown>
</template>
<script lang="ts">
  import { PropType, ref, defineComponent, computed, unref, watch } from 'vue';
  import type { RouteLocationNormalized } from 'vue-router';

  import { Dropdown } from '/@/components/Dropdown/index';
  import { Icon } from '@/components/Icon';

  import { TabContentProps } from '../types';

  import { useDesign } from '/@/hooks/web/useDesign';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useTabDropdown } from '../useTabDropdown';
  import { useAppStore } from '/@/store/modules/app';
  import { ThemeEnum } from '/@/enums/appEnum';

  export default defineComponent({
    name: 'TabContent',
    components: { Dropdown, Icon },
    props: {
      tabItem: {
        type: Object as PropType<RouteLocationNormalized>,
        default: null,
      },
      isExtra: Boolean,
    },
    setup(props) {
      const { prefixCls } = useDesign('multiple-tabs-content');
      const { t } = useI18n();

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

      const getTitle = computed(() => {
        const { tabItem: { meta } = {} } = props;
        return meta && t(meta.title as string);
      });

      const getIsTabs = computed(() => !props.isExtra);

      const getTrigger = computed((): ('contextmenu' | 'click' | 'hover')[] =>
        unref(getIsTabs) ? ['contextmenu'] : ['click'],
      );

      const { getDropMenuList, handleMenuEvent, handleContextMenu } = useTabDropdown(
        props as TabContentProps,
        getIsTabs,
      );

      function handleContext(e) {
        props.tabItem && handleContextMenu(props.tabItem)(e);
      }

      return {
        prefixCls,
        getDropMenuList,
        handleMenuEvent,
        handleContext,
        getTrigger,
        getIsTabs,
        getTitle,
        btnColor,
      };
    },
  });
</script>
