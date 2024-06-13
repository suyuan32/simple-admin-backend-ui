<template>
  <AIcon
    :icon="iconName"
    :mode="iconMode"
    :color="iconColor"
    :width="iconWidth"
    :height="iconHeight"
    :rotate="iconRotate"
    :inline="iconInline"
  />
</template>
<script lang="ts">
  import type { PropType } from 'vue';
  import { defineComponent, ref, onMounted, nextTick, watch } from 'vue';
  import { propTypes } from '@/utils/propTypes';
  import { Icon, IconifyRenderMode } from '@iconify/vue';

  export default defineComponent({
    name: 'Icon',
    components: { AIcon: Icon },
    props: {
      // icon name
      icon: propTypes.string,
      // icon color
      color: propTypes.string,
      // icon size
      size: {
        type: [String, Number] as PropType<string | number>,
        default: 16,
      },
      spin: propTypes.bool.def(false),
      mode: propTypes.string.def('style'),
      prefix: propTypes.string.def(''),
      width: propTypes.number.def(16),
      height: propTypes.number.def(16),
      rotate: propTypes.number.def(0),
      inline: propTypes.bool.def(true),
    },
    setup(props) {
      const iconName = ref('');
      const iconColor = ref('');
      const iconSize = ref();
      const iconMode = ref<IconifyRenderMode>('style');
      const iconWidth = ref();
      const iconHeight = ref();
      const iconRotate = ref();
      const iconInline = ref(true);

      const update = async () => {
        await nextTick();

        iconName.value = props.icon;
        iconColor.value = props.color;
        iconSize.value = props.size;
        iconMode.value = props.mode as IconifyRenderMode;
        iconHeight.value = props.height;
        iconWidth.value = props.width;
        iconRotate.value = props.rotate;
        iconInline.value = props.inline;
      };

      watch(() => props.icon, update, { flush: 'post' });

      onMounted(update);

      return {
        iconName,
        iconColor,
        iconSize,
        iconMode,
        iconWidth,
        iconHeight,
        iconRotate,
        iconInline,
      };
    },
  });
</script>
<style lang="less">
  .app-iconify {
    display: inline-block;
    // vertical-align: middle;

    &-spin {
      svg {
        animation: loadingCircle 1s infinite linear;
      }
    }
  }

  span.iconify {
    display: block;
    min-width: 1em;
    min-height: 1em;
    border-radius: 100%;
    background-color: @iconify-bg-color;
  }
</style>
