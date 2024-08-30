<template>
  <Icon
    :icon="iconName"
    :mode="iconMode"
    :color="iconColor"
    :width="iconWidth"
    :height="iconHeight"
    :rotate="iconRotate"
    :inline="iconInline"
    :flip="iconFlip"
  />
</template>
<script lang="ts" setup>
  import type { PropType } from 'vue';
  import { ref, onMounted, nextTick, watch } from 'vue';
  import { propTypes } from '@/utils/propTypes';
  import { Icon, IconifyRenderMode } from '@iconify/vue';

  const props = defineProps({
    // icon name
    icon: propTypes.string,
    // icon color
    color: propTypes.string,
    // icon size
    size: {
      type: [String, Number] as PropType<string | number>,
      default: 16,
    },
    mode: propTypes.string.def('style'),
    prefix: propTypes.string.def(''),
    width: propTypes.number.def(16),
    height: propTypes.number.def(16),
    rotate: propTypes.number.def(0),
    inline: propTypes.bool.def(true),
    flip: propTypes.string,
  });

  const iconName = ref('');
  const iconColor = ref('');
  const iconSize = ref();
  const iconMode = ref<IconifyRenderMode>('style');
  const iconWidth = ref();
  const iconHeight = ref();
  const iconRotate = ref();
  const iconInline = ref(true);
  const iconFlip = ref();

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
    iconFlip.value = props.flip;
  };

  watch(() => props.icon, update, { flush: 'post' });

  onMounted(update);
</script>
