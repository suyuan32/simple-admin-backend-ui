<!--
 * @Description:It is troublesome to implement radio button group in the form. So it is extracted independently as a separate component
-->
<template>
  <RadioGroup v-bind="attrs" v-model:value="state" button-style="solid">
    <template v-for="item in getOptions" :key="`${item.value}`">
      <RadioButton
        v-if="props.isBtn"
        :value="item.value"
        :disabled="item.disabled"
        @click="handleClick(item)"
      >
        {{ item.label }}
      </RadioButton>
      <Radio v-else :value="item.value" :disabled="item.disabled" @click="handleClick(item)">
        {{ item.label }}
      </Radio>
    </template>
  </RadioGroup>
</template>
<script lang="ts" setup>
  import { type PropType, ref, watchEffect, computed, unref, watch } from 'vue';
  import { Radio } from 'ant-design-vue';
  import { useRuleFormItem } from '@/hooks/component/useFormItem';
  import { useAttrs } from '@vben/hooks';
  import { propTypes } from '@/utils/propTypes';
  import { isFunction, omit } from 'remeda';
  import { get } from '/@/utils/object';

  type OptionsItem = { label: string; value: string | number | boolean; disabled?: boolean };

  const props = defineProps({
    api: {
      type: Function as PropType<(arg?: any) => Promise<any>>,
      default: null,
    },
    params: {
      type: [Object, String] as PropType<any | string>,
      default: () => ({}),
    },
    value: {
      type: [String, Number, Boolean] as PropType<string | number | boolean>,
    },
    isBtn: {
      type: [Boolean] as PropType<boolean>,
      default: false,
    },
    numberToString: propTypes.bool,
    resultField: propTypes.string.def(''),
    labelField: propTypes.string.def('label'),
    valueField: propTypes.string.def('value'),
    immediate: propTypes.bool.def(true),
  });

  const emit = defineEmits(['options-change', 'change']);

  const options = ref<OptionsItem[]>([]);
  const loading = ref(false);
  const isFirstLoad = ref(true);
  const emitData = ref<any[]>([]);
  const attrs = useAttrs();

  // Embedded in the form, just use the hook binding to perform form verification
  const [state] = useRuleFormItem(props, 'value', 'change', emitData);

  // Processing options value
  const getOptions = computed(() => {
    const { labelField, valueField, numberToString } = props;

    return unref(options).reduce((prev, next: any) => {
      if (next) {
        const value = next[valueField];
        prev.push({
          label: next[labelField],
          value: numberToString ? `${value}` : value,
          ...omit(next, [labelField, valueField]),
        });
      }
      return prev;
    }, [] as OptionsItem[]);
  });

  watchEffect(() => {
    props.immediate && fetch();
  });

  watch(
    () => props.params,
    () => {
      !unref(isFirstLoad) && fetch();
    },
    { deep: true },
  );

  async function fetch() {
    const api = props.api;
    if (!api || !isFunction(api)) return;
    options.value = [];
    try {
      loading.value = true;
      const res = await api(props.params);
      if (Array.isArray(res)) {
        options.value = res;
        emitChange();
        return;
      }
      if (props.resultField) {
        options.value = get(res, props.resultField) || [];
      }
      emitChange();
    } catch (error) {
      console.warn(error);
    } finally {
      loading.value = false;
    }
  }

  function emitChange() {
    emit('options-change', unref(getOptions));
  }

  function handleClick(...args) {
    emitData.value = args;
  }
</script>
