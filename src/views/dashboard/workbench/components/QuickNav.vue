<template>
  <Card :title="t('sys.sys.navigation')" v-bind="$attrs">
    <CardGrid v-for="item in navItems" :key="item">
      <span class="flex flex-col items-center" @click="go(item.redirect)">
        <Icon :icon="item.icon" :color="item.color" size="20" />
        <span class="text-md mt-2">{{ t(item.title) }}</span>
      </span>
    </CardGrid>
  </Card>
</template>
<script lang="ts" setup>
  import { Card } from 'ant-design-vue';
  import { navItems } from './data';
  import { Icon } from '/@/components/Icon';
  import { useGo } from '/@/hooks/web/usePage';
  import { useI18n } from '/@/hooks/web/useI18n';

  const { t } = useI18n();
  const CardGrid = Card.Grid;
  const go = useGo();
</script>
