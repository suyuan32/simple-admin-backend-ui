<template>
  <Select v-bind="attrs" @change="handleChange" :options="options" v-model:value="state">
    <template #[item]="data" v-for="item in Object.keys($slots)">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
    <template #suffixIcon v-if="loading">
      <LoadingOutlined spin />
    </template>
    <template #notFoundContent v-if="loading">
      <span>
        <LoadingOutlined spin class="mr-1" />
        {{ t('component.form.apiSelectNotFound') }}
      </span>
    </template>
  </Select>
</template>
<script lang="ts" setup>
  import { ref, watch, onMounted } from 'vue';
  import { Select } from 'ant-design-vue';
  import { useAttrs } from '@vben/hooks';
  import { LoadingOutlined } from '@ant-design/icons-vue';
  import { useI18n } from '@/hooks/web/useI18n';
  import { propTypes } from '@/utils/propTypes';
  import { useDictionaryStore } from '@/store/modules/dictionary';
  import { DefaultOptionType } from 'ant-design-vue/lib/select';
  import { useRuleFormItem } from '@/hooks/component/useFormItem';

  const props = defineProps({
    dictionaryName: propTypes.string.def(''),
    value: [String, Number],
    cache: propTypes.bool.def(true),
  });

  const emit = defineEmits(['options-change', 'change', 'update:value']);

  const loading = ref(false);
  const emitData = ref<any[]>([]);
  const attrs = useAttrs();
  const { t } = useI18n();
  const options = ref<DefaultOptionType[]>();

  // Embedded in the form, just use the hook binding to perform form verification
  const [state] = useRuleFormItem(props, 'value', 'change', emitData);

  onMounted(() => {
    handleFetch();
  });

  watch(
    () => state.value,
    (v) => {
      emit('update:value', v);
    },
  );

  async function handleFetch() {
    loading.value = true;
    const dictStore = useDictionaryStore();
    const dictData = await dictStore.getDictionary(props.dictionaryName, props.cache);
    if (dictData != null) {
      options.value = dictData.data.filter((el) => {
        return el.status == 1;
      });
    }
    loading.value = false;
  }

  function handleChange(_, ...args) {
    emitData.value = args;
    emit('change', args);
  }
</script>
