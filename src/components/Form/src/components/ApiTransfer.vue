<template>
  <Transfer
    :data-source="getdataSource"
    :filter-option="filterOption"
    :render="(item) => item.title"
    :showSelectAll="showSelectAll"
    :selectedKeys="selectedKeys"
    :targetKeys="getTargetKeys"
    :showSearch="showSearch"
    :disabled="disabled"
    @change="handleChange"
    v-bind="getAttrs"
  />
</template>

<script lang="ts" setup>
  import { computed, watch, ref, unref, PropType, onMounted } from 'vue';
  import { Transfer } from 'ant-design-vue';
  import { propTypes } from '@/utils/propTypes';
  import { TransferDirection, TransferItem } from 'ant-design-vue/lib/transfer';
  import { isFunction, omit } from 'remeda';
  import { get } from '/@/utils/object';
  import { useAttrs } from '@vben/hooks';

  const props = defineProps({
    value: { type: Array as PropType<Array<string>> },
    api: {
      type: Function as PropType<(arg) => Promise<any>>,
      default: null,
    },
    params: { type: Object },
    dataSource: { type: Array as PropType<Array<TransferItem>> },
    immediate: propTypes.bool.def(true),
    afterFetch: { type: Function },
    resultField: propTypes.string.def(''),
    labelField: propTypes.string.def('title'),
    valueField: propTypes.string.def('key'),
    showSearch: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    filterOption: {
      type: Function as PropType<(inputValue: string, item: TransferItem) => boolean>,
    },
    selectedKeys: { type: Array as PropType<Array<string>> },
    showSelectAll: { type: Boolean, default: false },
    targetKeys: { type: Array as PropType<Array<string>> },
  });

  const emit = defineEmits(['options-change', 'change']);

  const attrs = useAttrs();

  const _dataSource = ref<TransferItem[]>([]);
  const _targetKeys = ref<string[]>([]);

  const getAttrs = computed(() => {
    return {
      ...(!props.api ? { dataSource: unref(_dataSource) } : {}),
      ...attrs,
    };
  });

  const getdataSource = computed(() => {
    const { labelField, valueField } = props;

    return unref(_dataSource).reduce((prev, next) => {
      if (next) {
        prev.push({
          ...omit(next, [labelField, valueField]),
          title: next[labelField],
          key: next[valueField],
        });
      }
      return prev;
    }, [] as TransferItem[]);
  });
  const getTargetKeys = computed<string[]>(() => {
    if (Array.isArray(props.value)) {
      return props.value;
    }
    if (Array.isArray(props.targetKeys)) {
      return props.targetKeys;
    }
    return [];
  });

  function handleChange(keys: string[], direction: TransferDirection, moveKeys: string[]) {
    _targetKeys.value = keys;
    console.log(direction);
    console.log(moveKeys);
    emit('change', keys);
  }

  onMounted(() => {
    props.immediate && fetch();
  });

  watch(
    () => props.params,
    () => {
      fetch();
    },
    { deep: true },
  );

  async function fetch() {
    const api = props.api;
    if (!api || !isFunction(api)) {
      if (Array.isArray(props.dataSource)) {
        _dataSource.value = props.dataSource;
      }
      return;
    }
    _dataSource.value = [];
    try {
      const res = await api(props.params);
      if (Array.isArray(res)) {
        _dataSource.value = res;
        emitChange();
        return;
      }
      if (props.resultField) {
        _dataSource.value = get(res, props.resultField) || [];
      }
      emitChange();
    } catch (error) {
      console.warn(error);
    }
  }

  function emitChange() {
    emit('options-change', unref(getdataSource));
  }
</script>
