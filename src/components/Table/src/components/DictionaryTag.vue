<template>
  {{ options?.find((item) => item.value == value)?.label }}
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { propTypes } from '@/utils/propTypes';
  import { useDictionaryStore } from '@/store/modules/dictionary';
  import { DefaultOptionType } from 'ant-design-vue/lib/select';

  defineOptions({ inheritAttrs: false });

  const props = defineProps({
    dictionaryName: propTypes.string.def(''),
    value: [String, Number],
    cache: propTypes.bool.def(true),
  });

  const options = ref<DefaultOptionType[]>();

  onMounted(() => {
    handleFetch();
  });

  async function handleFetch() {
    const dictStore = useDictionaryStore();
    const dictData = await dictStore.getDictionary(props.dictionaryName, props.cache);
    if (dictData != null) {
      options.value = dictData.data;
    }
  }
</script>
