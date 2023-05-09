<template>
  <vue-json-pretty
    :path="'res'"
    :deep="3"
    :showLength="true"
    :data="data"
    style="color: rgb(18 117 247); font-weight: bold"
  />
</template>

<script lang="ts" setup>
  import VueJsonPretty from 'vue-json-pretty';
  import 'vue-json-pretty/lib/styles.css';

  defineProps({
    data: Object,
  });
</script>
