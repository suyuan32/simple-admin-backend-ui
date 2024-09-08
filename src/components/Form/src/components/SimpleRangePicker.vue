<template>
  <RangePicker
    allow-clear
    v-model:value="dateVal"
    @change="handleChange"
    :show-time="showTimePicker"
  />
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { RangePicker } from 'ant-design-vue';
  import { propTypes } from '@/utils/propTypes';
  import { useRuleFormItem } from '@/hooks/component/useFormItem';
  import dayjs from 'dayjs';

  const props = defineProps({
    timeMode: propTypes.string.def('datetime'),
    valueFormat: propTypes.string.def('unixmilli'),
    value: {
      type: Array as unknown as PropType<[number, number]>,
      default: undefined,
    },
  });

  const emit = defineEmits(['options-change', 'change', 'update:value']);

  const emitData = ref<any[]>([]);
  const dateVal = ref<[dayjs.Dayjs, dayjs.Dayjs]>();
  const showTimePicker = ref<boolean>();

  showTimePicker.value = props.timeMode === 'datetime';

  // Embedded in the form, just use the hook binding to perform form verification
  const [state] = useRuleFormItem(props, 'value', 'change', emitData);

  watch(
    () => state.value,
    (v) => {
      if (v !== null && v != undefined) {
        if (props.valueFormat === 'unixmilli') {
          dateVal.value = [dayjs(v[0]), dayjs(v[1])];
        } else {
          dateVal.value = [dayjs.unix(v[0]), dayjs.unix(v[1])];
        }
      }
      emit('update:value', v);
      emit('change', v);
    },
  );

  function handleChange(v) {
    if (v !== null) {
      let dateTime = [dayjs(), dayjs()];
      if (dateVal.value != undefined) {
        dateTime[0] = dateVal.value[0]?.clone();
        dateTime[1] = dateVal.value[1]?.clone();
      }

      if (props.timeMode !== 'datetime') {
        dateTime[0] = dateTime[0].hour(0).minute(0).second(0).millisecond(0);
        dateTime[1] = dateTime[1].hour(0).minute(0).second(0).millisecond(0);
      }

      if (props.valueFormat === 'unixmilli') {
        state.value = [dateTime[0].valueOf(), dateTime[1].valueOf()];
      } else {
        state.value = [dateTime[0].unix(), dateTime[1].unix()];
      }
    } else {
      state.value = [0, 0];
    }
  }
</script>
