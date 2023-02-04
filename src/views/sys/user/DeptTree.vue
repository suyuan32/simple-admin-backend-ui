<template>
  <div class="m-4 mr-0 overflow-hidden bg-white">
    <BasicTree
      title="部门列表"
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
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { getDepartmentList } from '/@/api/sys/department';

  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { buildDataNode } from '/@/utils/tree';

  export default defineComponent({
    name: 'DeptTree',
    components: { BasicTree },

    emits: ['select'],
    setup(_, { emit }) {
      const treeData = ref<TreeItem[]>([]);

      async function fetch() {
        const deptData = await getDepartmentList({ page: 1, pageSize: 1000 });
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
      return { treeData, handleSelect };
    },
  });
</script>
