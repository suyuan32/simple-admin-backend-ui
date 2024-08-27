<template>
  <div class="m-4 mr-0 overflow-hidden bg-white rounded-md">
    <BasicTree
      :title="t('sys.memberRank.memberRankList')"
      toolbar
      search
      treeWrapperClassName="h-[calc(100%-35px)] overflow-auto"
      :clickRowToExpand="false"
      :treeData="treeData"
      :fieldNames="{ key: 'key', title: 'title' }"
      @select="handleSelect"
    />
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { getMemberRankList } from '../../../api/member/memberRank';

  import { BasicTree, TreeItem } from '@/components/Tree';
  import { buildDataNode } from '@/utils/tree';

  const emit = defineEmits(['select']);

  const treeData = ref<TreeItem[]>([]);
  const { t } = useI18n();

  async function fetch() {
    const deptData = await getMemberRankList({ page: 1, pageSize: 1000 });
    const data = buildDataNode(deptData.data.data, {
      labelField: 'trans',
      valueField: 'id',
      idKeyField: 'id',
      childrenKeyField: 'children',
      parentKeyField: 'parentId',
    }) as TreeItem[];

    treeData.value = data;
  }

  function handleSelect(keys) {
    emit('select', keys[0]);
  }

  onMounted(() => {
    fetch();
  });
</script>
