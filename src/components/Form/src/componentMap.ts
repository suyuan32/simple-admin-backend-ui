import type { Component } from 'vue';
import type { ComponentType } from './types';

/**
 * Component list, register here to setting it in the form
 */
import {
  AutoComplete,
  Cascader,
  Checkbox,
  DatePicker,
  Divider,
  Input,
  InputNumber,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TimePicker,
  TreeSelect,
  Transfer,
} from 'ant-design-vue';
import ApiRadioGroup from './components/ApiRadioGroup.vue';
import RadioButtonGroup from './components/RadioButtonGroup.vue';
import ApiSelect from './components/ApiSelect.vue';
import ApiTree from './components/ApiTree.vue';
import ApiTreeSelect from './components/ApiTreeSelect.vue';
import ApiCascader from './components/ApiCascader.vue';
import ApiTransfer from './components/ApiTransfer.vue';
import SimpleTimePicker from './components/SimpleTimePicker.vue';
import SimpleRangePicker from './components/SimpleRangePicker.vue';
import ApiMultipleSelect from './components/ApiMultipleSelect.vue';
import DictionarySelect from './components/DictionarySelect.vue';
import { BasicUpload, ImageUpload } from '@/components/Upload';
import { StrengthMeter } from '@/components/StrengthMeter';
import { IconPicker } from '@/components/Icon';
import { CountdownInput } from '@/components/CountDown';
import { BasicTitle } from '@/components/Basic';
import { CropperAvatar } from '@/components/Cropper';
import { CodeEditor } from '../../CodeEditor';
import { Tinymce } from '../../Tinymce';
import { BasicTree } from '../../Tree';

const componentMap = new Map<ComponentType | string, Component>();

componentMap.set('Input', Input);
componentMap.set('InputGroup', Input.Group);
componentMap.set('InputPassword', Input.Password);
componentMap.set('InputSearch', Input.Search);
componentMap.set('InputTextArea', Input.TextArea);
componentMap.set('InputNumber', InputNumber);
componentMap.set('AutoComplete', AutoComplete);
componentMap.set('ImageUpload', ImageUpload);
componentMap.set('Select', Select);
componentMap.set('ApiSelect', ApiSelect);
componentMap.set('ApiTree', ApiTree);
componentMap.set('TreeSelect', TreeSelect);
componentMap.set('ApiTreeSelect', ApiTreeSelect);
componentMap.set('ApiRadioGroup', ApiRadioGroup);
componentMap.set('Switch', Switch);
componentMap.set('RadioButtonGroup', RadioButtonGroup);
componentMap.set('RadioGroup', Radio.Group);
componentMap.set('Checkbox', Checkbox);
componentMap.set('CheckboxGroup', Checkbox.Group);
componentMap.set('ApiCascader', ApiCascader);
componentMap.set('Cascader', Cascader);
componentMap.set('Slider', Slider);
componentMap.set('Rate', Rate);
componentMap.set('Transfer', Transfer);
componentMap.set('ApiTransfer', ApiTransfer);

componentMap.set('DatePicker', DatePicker);
componentMap.set('MonthPicker', DatePicker.MonthPicker);
componentMap.set('RangePicker', DatePicker.RangePicker);
componentMap.set('WeekPicker', DatePicker.WeekPicker);
componentMap.set('TimePicker', TimePicker);
componentMap.set('TimeRangePicker', TimePicker.TimeRangePicker);
componentMap.set('StrengthMeter', StrengthMeter);
componentMap.set('IconPicker', IconPicker);
componentMap.set('InputCountDown', CountdownInput);

componentMap.set('Upload', BasicUpload);
componentMap.set('Divider', Divider);
componentMap.set('CropperAvatar', CropperAvatar);

componentMap.set('BasicTitle', BasicTitle);
componentMap.set('BasicTree', BasicTree);

// simple components
componentMap.set('ApiMultipleSelect', ApiMultipleSelect);
componentMap.set('DictionarySelect', DictionarySelect);
componentMap.set('CodeEditor', CodeEditor);
componentMap.set('Tinymce', Tinymce);
componentMap.set('SimpleTimePicker', SimpleTimePicker);
componentMap.set('SimpleRangePicker', SimpleRangePicker);

export function add<T extends string, R extends Component>(
  compName: ComponentType | T,
  component: R,
) {
  componentMap.set(compName, component);
}

export function del<T extends string>(compName: ComponentType | T) {
  componentMap.delete(compName);
}

export { componentMap };
