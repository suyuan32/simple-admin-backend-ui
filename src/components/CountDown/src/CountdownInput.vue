<template>
  <a-input v-bind="attrs" :class="prefixCls" :size="props.size" :value="state">
    <template #addonAfter>
      <CountButton
        :size="props.size"
        :count="props.count"
        :value="state"
        :beforeStartFunc="props.sendCodeApi"
      />
    </template>
    <template #[item]="data" v-for="item in Object.keys($slots).filter((k) => k !== 'addonAfter')">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </a-input>
</template>
<script lang="ts" setup>
  import { PropType, useAttrs } from 'vue';
  import CountButton from './CountButton.vue';
  import { useDesign } from '@/hooks/web/useDesign';
  import { useRuleFormItem } from '@/hooks/component/useFormItem';

  const props = defineProps({
    value: { type: String },
    size: { type: String, validator: (v) => ['default', 'large', 'small'].includes(v) },
    count: { type: Number, default: 60 },
    sendCodeApi: {
      type: Function as PropType<() => Promise<boolean>>,
      default: null,
    },
  });

  const attrs = useAttrs();

  defineOptions({ inheritAttrs: false });
  const { prefixCls } = useDesign('countdown-input');
  const [state] = useRuleFormItem(props);
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-countdown-input';

  .@{prefix-cls} {
    .ant-input-group-addon {
      padding-right: 0;
      border: none;
      background-color: transparent;

      button {
        font-size: 14px;
      }
    }
  }
</style>
