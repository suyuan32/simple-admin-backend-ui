<template>
  <CountButton />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { CountButton } from '/@/components/CountDown';

  export default defineComponent({
    components: { CountButton },
  });
</script>
