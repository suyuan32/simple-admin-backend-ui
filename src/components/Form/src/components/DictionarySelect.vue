<template>
  <Select
    @dropdown-visible-change="handleFetch"
    v-bind="$attrs"
    @change="handleChange"
    :options="options"
    v-model:value="state"
  >
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
<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { Select } from 'ant-design-vue';
  import { useAttrs } from '/@/hooks/core/useAttrs';
  import { LoadingOutlined } from '@ant-design/icons-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { propTypes } from '/@/utils/propTypes';
  import { useDictionaryStore } from '/@/store/modules/dictionary';
  import { DefaultOptionType } from 'ant-design-vue/lib/select';
  import { useRuleFormItem } from '/@/hooks/component/useFormItem';

  export default defineComponent({
    name: 'DictionarySelect',
    components: {
      Select,
      LoadingOutlined,
    },
    inheritAttrs: false,
    props: {
      dictionaryName: propTypes.string.def(''),
      value: [String, Number],
    },
    emits: ['options-change', 'change', 'update:value'],
    setup(props, { emit }) {
      const loading = ref(false);
      const emitData = ref<any[]>([]);
      const attrs = useAttrs();
      const { t } = useI18n();
      const options = ref<DefaultOptionType[]>();

      // Embedded in the form, just use the hook binding to perform form verification
      const [state] = useRuleFormItem(props, 'value', 'change', emitData);

      watch(
        () => state.value,
        (v) => {
          emit('update:value', v);
        },
      );

      async function handleFetch() {
        const dictStore = useDictionaryStore();
        const dictData = await dictStore.getDictionary(props.dictionaryName);
        if (dictData != null) {
          options.value = dictData.data;
        }
      }

      function handleChange(_, ...args) {
        emitData.value = args;
      }

      return { state, attrs, loading, t, options, handleFetch, handleChange };
    },
  });
</script>
