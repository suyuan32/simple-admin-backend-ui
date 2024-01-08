<template>
  {{ options?.find((item) => item.value == value)?.label }}
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useAttrs } from '@vben/hooks';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { propTypes } from '/@/utils/propTypes';
  import { useDictionaryStore } from '/@/store/modules/dictionary';
  import { DefaultOptionType } from 'ant-design-vue/lib/select';
  import { GetDictionaryDetailByDictionaryName } from '/@/api/sys/dictionaryDetail';
  import { useRequest } from 'vue-request';

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
        if (props.cache) {
          const dictStore = useDictionaryStore();
          const dictData = await dictStore.getDictionary(props.dictionaryName);
          if (dictData != null) {
            options.value = dictData.data;
          }
        } else {
          useRequest(
            async () => {
              return GetDictionaryDetailByDictionaryName({
                name: props.dictionaryName,
              });
            },
            {
              cacheKey: '1',
              cacheTime: 1000, // 1 second
              onSuccess: (data) => {
                console.log(1);
                const result = data;
                if (result.code === 0) {
                  const dataConv = ref<DefaultOptionType[]>([]);
                  for (let i = 0; i < result.data.total; i++) {
                    dataConv.value.push({
                      label: result.data.data[i].title,
                      value: result.data.data[i].value,
                    });
                  }
                  options.value = dataConv.value;
                } else {
                  options.value = undefined;
                }
              },
            },
          );
        }
      }

      return { attrs, t, options, handleFetch };
    },
  });
</script>
