<template>
    <DatePicker
    v-model:value="dateVal"
    @change="handleChange"
  ></DatePicker>

  <FormItemRest>
    <TimePicker v-if="showTimePicker" class="ml-4" v-model:value="timeVal"  @change="handleChange"></TimePicker>
  </FormItemRest>
</template>
<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { DatePicker, TimePicker, FormItemRest } from 'ant-design-vue';
  import { useAttrs } from '@vben/hooks';
  import { LoadingOutlined } from '@ant-design/icons-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { propTypes } from '/@/utils/propTypes';
  import { useRuleFormItem } from '/@/hooks/component/useFormItem';
  import dayjs from 'dayjs';

  export default defineComponent({
    name: 'SimpleTimePicker',
    components: {
      DatePicker,
      TimePicker,
      FormItemRest,
      LoadingOutlined,
    },
    inheritAttrs: false,
    props: {
      timeMode: propTypes.string.def('datetime'),
      valueFormat: propTypes.string.def('unixmilli'),
      value: [Number],
    },
    emits: ['options-change', 'change', 'update:value'],
    setup(props, { emit }) {
      const emitData = ref<any[]>([]);
      const attrs = useAttrs();
      const { t } = useI18n();
      const dateVal = ref<dayjs.Dayjs>();
      const timeVal = ref<dayjs.Dayjs>();
      const showTimePicker = ref<boolean>();

      if (props.timeMode === 'datetime') {
        showTimePicker.value = true;
      } else {
        showTimePicker.value = false;
      }
      
      // Embedded in the form, just use the hook binding to perform form verification
      const [state] = useRuleFormItem(props, 'value', 'change', emitData);

      watch(
        () => state.value,
        (v) => {
          if (props.valueFormat === 'unixmilli') {
            dateVal.value = dayjs(v)
            timeVal.value = dayjs(v)
          } else {
            if (v !== undefined) {
              dateVal.value = dayjs.unix(v)
              timeVal.value = dayjs.unix(v)
            }
          }
          emit('update:value', v);
        },
      );

      function handleChange() {
        let dateTime = dayjs();
        if (dateVal.value != undefined) {
          dateTime = dateVal.value?.clone();
        } 
        if (props.timeMode === 'datetime') {
          if (timeVal.value != undefined) {
            dateTime = dateTime.hour(timeVal.value.hour()).minute(timeVal.value.minute()).second(timeVal.value.second()).millisecond(0)
          }
        } else {
          dateTime = dateTime.hour(0).minute(0).second(0).millisecond(0)
        }

        if (props.valueFormat === 'unixmilli') {
          state.value = dateTime.valueOf();
        } else {
          state.value = dateTime.unix();
        }
      }

      return { state, attrs, showTimePicker, t, handleChange, dateVal, timeVal };
    },
  });
</script>
