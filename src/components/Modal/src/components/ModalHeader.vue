<template>
  <BasicTitle :helpMessage="props.helpMessage">
    {{ props.title }}
  </BasicTitle>
</template>
<script lang="ts" setup>
  import type { PropType } from 'vue';
  import { BasicTitle } from '@/components/Basic';

  const props = defineProps({
    helpMessage: {
      type: [String, Array] as PropType<string | string[]>,
    },
    title: { type: String },
  });
</script>
