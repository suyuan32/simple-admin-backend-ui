<template>
  {{ options?.find((item) => item.value == value)?.label }}
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useAttrs } from '@vben/hooks';
  import { useI18n } from '@/hooks/web/useI18n';
  import { propTypes } from '@/utils/propTypes';
  import { useDictionaryStore } from '@/store/modules/dictionary';
  import { DefaultOptionType } from 'ant-design-vue/lib/select';

  export default defineComponent({
    name: 'DictionaryTag',
    inheritAttrs: false,
    props: {
      dictionaryName: propTypes.string.def(''),
      value: [String, Number],
      cache: propTypes.bool.def(true),
    },
    setup(props) {
      const attrs = useAttrs();
      const { t } = useI18n();
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

      return { attrs, t, options, handleFetch };
    },
  });
</script>
