import { isArray, isFunction, isEmpty, isString, isNullish, clone, omit, pick, set } from 'remeda';
import { dateUtil } from '@/utils/dateUtil';
import { unref } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import type { FormProps, FormSchemaInner as FormSchema } from '../types/form';
import { isObject } from '/@/utils/is';
import dayjs from 'dayjs';

interface UseFormValuesContext {
  defaultValueRef: Ref<any>;
  getSchema: ComputedRef<FormSchema[]>;
  getProps: ComputedRef<FormProps>;
  formModel: Recordable;
}

/**
 * @description deconstruct array-link key. This method will mutate the target.
 */
function tryDeconstructArray(key: string, value: any, target: Recordable) {
  const pattern = /^\[(.+)\]$/;
  if (pattern.test(key)) {
    const match = key.match(pattern);
    if (match && match[1]) {
      const keys = match[1].split(',');
      value = Array.isArray(value) ? value : [value];
      keys.forEach((k, index) => {
        target = set(target, k.trim(), value[index]);
      });
      return true;
    }
  }
}

/**
 * @description deconstruct object-link key. This method will mutate the target.
 */
function tryDeconstructObject(key: string, value: any, target: Recordable) {
  const pattern = /^\{(.+)\}$/;
  if (pattern.test(key)) {
    const match = key.match(pattern);
    if (match && match[1]) {
      const keys = match[1].split(',');
      value = isObject(value) ? value : {};
      keys.forEach((k) => {
        target = set(target, k.trim(), value[k.trim()]);
      });
      return true;
    }
  }
}

export function useFormValues({
  defaultValueRef,
  getSchema,
  formModel,
  getProps,
}: UseFormValuesContext) {
  // Processing form values
  function handleFormValues(values: Recordable) {
    if (!isObject(values)) {
      return {};
    }
    const res: Recordable = {};
    for (const item of Object.entries(values)) {
      let [, value] = item;
      const [key] = item;
      if (!key || (isArray(value) && value.length === 0) || isFunction(value)) {
        continue;
      }
      const transformDateFunc = unref(getProps).transformDateFunc;
      if (isObject(value)) {
        value = transformDateFunc?.(value);
      }

      if (isArray(value)) {
        if (value.length === 2) {
          if (dayjs.isDayjs(value[0]) && dayjs.isDayjs(value[1])) {
            value = value.map((item) => transformDateFunc?.(item));
          }
        }
      }
      // Remove spaces
      if (isString(value)) {
        value = value.trim();
      }
      if (!tryDeconstructArray(key, value, res) && !tryDeconstructObject(key, value, res)) {
        // 没有解构成功的，按原样赋值
        res[key] = value;
      }
    }

    return handleRangeTimeValue(res);
  }

  /**
   * @description: Processing time interval parameters
   */
  function handleRangeTimeValue(values: Recordable) {
    const fieldMapToTime = unref(getProps).fieldMapToTime;

    if (!fieldMapToTime || !Array.isArray(fieldMapToTime)) {
      return values;
    }

    for (const [field, [startTimeKey, endTimeKey], format = 'YYYY-MM-DD'] of fieldMapToTime) {
      if (!field || !startTimeKey || !endTimeKey) {
        continue;
      }
      // If the value to be converted is empty, remove the field
      if (isEmpty(pick(values, [field]))) {
        values = omit(values, [field]);
        continue;
      }

      const [startTime, endTime]: string[] = pick(values, [field]).map((item) => item);

      const [startTimeFormat, endTimeFormat] = Array.isArray(format) ? format : [format, format];

      if (!isNullish(startTime) && !isEmpty(startTime)) {
        values = set(values, startTimeKey, formatTime(startTime, startTimeFormat));
      }
      if (!isNullish(endTime) && !isEmpty(endTime)) {
        values = set(values, endTimeKey, formatTime(endTime, endTimeFormat));
      }
      values = omit(values, [field]);
    }

    return values;
  }

  function formatTime(time: string, format: string) {
    if (format === 'timestamp') {
      return dateUtil(time).unix();
    } else if (format === 'timestampStartDay') {
      return dateUtil(time).startOf('day').unix();
    }
    return dateUtil(time).format(format);
  }

  function initDefault() {
    const schemas = unref(getSchema);
    const obj: Recordable = {};
    schemas.forEach((item) => {
      const { defaultValue, defaultValueObj, componentProps = {} } = item;
      const fieldKeys = Object.keys(defaultValueObj || {});
      if (fieldKeys.length) {
        fieldKeys.forEach((field) => {
          obj[field] = defaultValueObj![field];
          if (formModel[field] === undefined) {
            formModel[field] = defaultValueObj![field];
          }
        });
      }
      if (!isNullish(defaultValue)) {
        obj[item.field] = defaultValue;

        if (formModel[item.field] === undefined) {
          formModel[item.field] = defaultValue;
        }
      }
      if (!isNullish(componentProps?.defaultValue)) {
        obj[item.field] = componentProps?.defaultValue;
        if (formModel[item.field] === undefined) {
          formModel[item.field] = componentProps?.defaultValue;
        }
      }
    });
    defaultValueRef.value = clone(obj);
  }

  return { handleFormValues, initDefault };
}
