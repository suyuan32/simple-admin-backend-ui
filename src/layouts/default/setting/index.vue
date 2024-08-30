<template>
  <div @click="openDrawer(true)">
    <Icon icon="ion:settings-outline" :width="32" />
    <SettingDrawer @register="register" />
  </div>
</template>
<script lang="ts" setup>
  import SettingDrawer from './SettingDrawer';
  import Icon from '@/components/Icon/Icon.vue';

  import { useDrawer } from '@/components/Drawer';

  const [register, { openDrawer }] = useDrawer();
</script>
