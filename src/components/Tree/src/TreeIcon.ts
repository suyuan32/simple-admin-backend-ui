import type { VNode } from 'vue';
import { h } from 'vue';
import Icon from '@/components/Icon/Icon.vue';
import { isString } from 'remeda';

export const TreeIcon = ({ icon }: { icon: VNode | string | undefined }) => {
  if (!icon) return null;
  if (isString(icon)) {
    return h(Icon, { icon, class: 'mr-1' });
  }
  return h(Icon);
};
