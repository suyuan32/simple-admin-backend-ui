<template>
  <DatePicker allow-clear v-model:value="dateVal" @change="handleChange" />

  <FormItemRest>
    <TimePicker
      v-if="showTimePicker"
      class="ml-4"
      v-model:value="timeVal"
      @change="handleChange"
      allow-clear
    />
  </FormItemRest>
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { DatePicker, TimePicker, FormItemRest } from 'ant-design-vue';
  import { propTypes } from '@/utils/propTypes';
  import { useRuleFormItem } from '@/hooks/component/useFormItem';
  import dayjs from 'dayjs';

  const props = defineProps({
    timeMode: propTypes.string.def('datetime'),
    valueFormat: propTypes.string.def('unixmilli'),
    value: [Number],
  });

  const emit = defineEmits(['options-change', 'change', 'update:value']);

  const emitData = ref<any[]>([]);
  const dateVal = ref<dayjs.Dayjs>();
  const timeVal = ref<dayjs.Dayjs>();
  const showTimePicker = ref<boolean>();

  showTimePicker.value = props.timeMode === 'datetime';

  // Embedded in the form, just use the hook binding to perform form verification
  const [state] = useRuleFormItem(props, 'value', 'change', emitData);

  watch(
    () => state.value,
    (v) => {
      if (v !== null && v != undefined) {
        if (props.valueFormat === 'unixmilli') {
          dateVal.value = dayjs(v);
          timeVal.value = dayjs(v);
        } else {
          dateVal.value = dayjs.unix(v);
          timeVal.value = dayjs.unix(v);
        }
      }
      emit('update:value', v);
      emit('change', v);
    },
  );

  function handleChange(v) {
    if (v !== null) {
      let dateTime = dayjs();
      if (dateVal.value != undefined) {
        dateTime = dateVal.value?.clone();
      }
      if (props.timeMode === 'datetime') {
        if (timeVal.value != undefined) {
          dateTime = dateTime
            .hour(timeVal.value.hour())
            .minute(timeVal.value.minute())
            .second(timeVal.value.second())
            .millisecond(0);
        }
      } else {
        dateTime = dateTime.hour(0).minute(0).second(0).millisecond(0);
      }

      if (props.valueFormat === 'unixmilli') {
        state.value = dateTime.valueOf();
      } else {
        state.value = dateTime.unix();
      }
    } else {
      state.value = undefined;
    }
  }
</script>
