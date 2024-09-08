<template>
  <MenuItem :key="item.path">
    <MenuItemContent v-bind="props" :item="item" />
  </MenuItem>
</template>
<script lang="ts" setup>
  import { Menu } from 'ant-design-vue';
  import { itemProps } from '../props';

  import MenuItemContent from './MenuItemContent.vue';

  const MenuItem = Menu.Item;

  const props = defineProps(itemProps);
</script>
