import isString from 'lodash-es/isString';
import type { VNode, FunctionalComponent } from 'vue';

import { h } from 'vue';
import Icon from '@/components/Icon/Icon.vue';

export const TreeIcon: FunctionalComponent = (Icon: { icon: VNode | string }) => {
  if (!icon) return null;
  if (isString(icon)) {
    return h(Icon, { icon, class: 'mr-1' });
  }
  return Icon;
};
