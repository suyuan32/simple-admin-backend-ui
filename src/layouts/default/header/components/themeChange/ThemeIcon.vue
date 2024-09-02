<script setup lang="ts">
  import { ref, watch } from 'vue';
  import Icon from '@/components/Icon/Icon.vue';
  import { useRootSetting } from '@/hooks/setting/useRootSetting';
  import { ThemeEnum } from '@/enums/appEnum';
  import { updateDarkTheme } from '@/logics/theme/dark';
  import { updateHeaderBgColor, updateSidebarBgColor } from '@/logics/theme/updateBackground';

  const iconName = ref('line-md:moon-loop');

  const { getDarkMode, setDarkMode } = useRootSetting();

  watch(
    () => getDarkMode.value,
    () => {
      if (getDarkMode.value === 'dark') {
        iconName.value = 'line-md:sunny';
      } else {
        iconName.value = 'line-md:moon-loop';
      }
    },
  );

  function toggleDarkMode() {
    const darkMode = getDarkMode.value === ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK;
    setDarkMode(darkMode);
    updateDarkTheme(darkMode);
    updateHeaderBgColor();
    updateSidebarBgColor();
  }
</script>

<template>
  <Icon :icon="iconName" :width="32" @click="toggleDarkMode()" />
</template>

<style scoped lang="less"></style>
