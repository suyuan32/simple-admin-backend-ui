<template>
  <Card :title="t('sys.sys.navigation')" v-bind="$attrs">
    <CardGrid v-for="(item, index) in navItems" :key="index">
      <span class="flex flex-col items-center" @click="go(item.redirect)">
        <Icon :icon="item.icon" :color="item.color" size="20" />
        <span class="text-md mt-2">{{ t(item.title) }}</span>
      </span>
    </CardGrid>
  </Card>
</template>
<script lang="ts">
  import { Card, CardGrid } from 'ant-design-vue';
  import { defineComponent } from 'vue';
  import { navItems } from './data';
  import { Icon } from '@/components/Icon';
  import { useGo } from '/@/hooks/web/usePage';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    components: { Card, CardGrid, Icon },
    setup() {
      const { t } = useI18n();
      const go = useGo();
      return { go, t, navItems };
    },
  });
</script>
