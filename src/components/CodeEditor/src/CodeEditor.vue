<template>
  <div class="h-full">
    <Codemirror
      v-model:model-value="inputValue"
      @change="handleValueChange"
      :extensions="extensions"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
    />
  </div>
</template>
<script lang="ts" setup>
  import { PropType, ref, onBeforeUpdate } from 'vue';
  import { Codemirror } from 'vue-codemirror';
  import { MODE } from './typing';
  import { useAppStore } from '@/store/modules/app';
  import { githubLight, githubDark } from '@uiw/codemirror-theme-github';
  import { StreamLanguage } from '@codemirror/language';
  import { yaml } from '@codemirror/legacy-modes/mode/yaml';
  import { json } from '@codemirror/lang-json';

  const props = defineProps({
    value: { type: [Object, String] as PropType<Record<string, any> | string> },
    mode: {
      type: String as PropType<MODE>,
      default: MODE.JSON,
      validator(value: any) {
        // 这个值必须匹配下列字符串中的一个
        return Object.values(MODE).includes(value);
      },
    },
    autoFormat: { type: Boolean, default: true },
  });

  const inputValue = ref<string>('');

  onBeforeUpdate(() => {
    inputValue.value = props.value as string;
  });

  const emit = defineEmits(['change', 'update:value', 'format-error']);

  const appStore = useAppStore();

  const darkMode = appStore.getDarkMode;
  let extensions: any = [];

  if (darkMode === 'dark') {
    extensions.push(githubDark);
  } else {
    extensions.push(githubLight);
  }

  switch (props.mode) {
    case MODE.YAML: {
      extensions.push(StreamLanguage.define(yaml));
      break;
    }
    case MODE.JSON: {
      extensions.push(json());
    }
  }

  function handleValueChange(v: string) {
    // if (props.mode == MODE.JSON) {
    //   v = v.replace(/(\r\n|\n|\r)/gm, '');
    // }
    emit('update:value', v);
    emit('change', v);
  }
</script>
