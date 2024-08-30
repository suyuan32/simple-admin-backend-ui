<template>
  <section
    class="full-loading"
    :class="{ Absolute }"
    :style="[props.background ? `background-color: ${props.background}` : '']"
    v-show="props.loading"
  >
    <Spin v-bind="attrs" :tip="props.tip" :size="props.size" :spinning="props.loading" />
  </section>
</template>
<script lang="ts" setup>
  import { PropType, useAttrs } from 'vue';
  import { Spin } from 'ant-design-vue';
  import { SizeEnum } from '@/enums/sizeEnum';

  const attrs = useAttrs();

  const props = defineProps({
    tip: {
      type: String as PropType<string>,
      default: '',
    },
    size: {
      type: String as PropType<SizeEnum>,
      default: SizeEnum.LARGE,
      validator: (v: SizeEnum): boolean => {
        return [SizeEnum.DEFAULT, SizeEnum.SMALL, SizeEnum.LARGE].includes(v);
      },
    },
    absolute: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    loading: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    background: {
      type: String as PropType<string>,
    },
    theme: {
      type: String as PropType<'dark' | 'light'>,
    },
  });

  const Absolute = props.absolute ? [`${props.theme}`] : !!props.theme;
</script>
<style lang="less" scoped>
  .full-loading {
    display: flex;
    position: fixed;
    z-index: 200;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: rgb(240 242 245 / 40%);

    &.absolute {
      position: absolute;
      z-index: 300;
      top: 0;
      left: 0;
    }
  }

  html[data-theme='dark'] {
    .full-loading:not(.light) {
      background-color: @modal-mask-bg;
    }
  }

  .full-loading.dark {
    background-color: @modal-mask-bg;
  }
</style>
