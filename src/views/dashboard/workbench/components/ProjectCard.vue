<template>
  <Card :title="t('sys.sys.info')" v-bind="$attrs">
    <List bordered :data-source="systemInfoData">
      <template #renderItem="{ item }">
        <ListItem>{{ t(item[0]) }} : {{ item[1] }}</ListItem>
      </template>
    </List>
  </Card>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Card, List, ListItem } from 'ant-design-vue';
  import { systemInfoData } from './data';
  import { useI18n } from '@/hooks/web/useI18n';

  export default defineComponent({
    components: { Card, List, ListItem },
    setup() {
      const { t } = useI18n();
      return { systemInfoData: systemInfoData, t };
    },
  });
</script>
