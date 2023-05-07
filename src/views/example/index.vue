<template>
  <CodeEditor v-model:value="value" />
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { CodeEditor } from '/@/components/CodeEditor';

  export default defineComponent({
    components: { CodeEditor },
    setup() {
      const value = ref<string>();
      return { value };
    },
  });
</script>
