<template>
  <div>
    <slot name="insertFooter"></slot>
    <a-button v-bind="props.cancelButtonProps" @click="handleCancel" v-if="props.showCancelBtn">
      {{ props.cancelText }}
    </a-button>
    <slot name="centerFooter"></slot>
    <a-button
      :type="props.okType"
      @click="handleOk"
      :loading="props.confirmLoading"
      v-bind="props.okButtonProps"
      v-if="props.showOkBtn"
    >
      {{ props.okText }}
    </a-button>
    <slot name="appendFooter"></slot>
  </div>
</template>
<script lang="ts" setup>
  import { basicProps } from '../props';

  const props = defineProps(basicProps);
  const emit = defineEmits(['ok', 'cancel']);

  function handleOk(e: Event) {
    emit('ok', e);
  }

  function handleCancel(e: Event) {
    emit('cancel', e);
  }
</script>
