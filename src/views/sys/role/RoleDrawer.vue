<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
    @close="handleCancel"
  >
    <template v-if="isUpdate" #extra>
      <a-button type="primary" style="margin-right: 8px" @click="showChildrenDrawer">
        {{ t('sys.authority.authorityManagement') }}</a-button
      >
    </template>
    <BasicForm @register="registerForm" />
    <BasicDrawer
      v-model:visible="childrenDrawer"
      :title="t('sys.authority.authorityManagement')"
      width="320"
      showFooter
      :closable="true"
      @ok="handleAuthorizationSubmit"
      @close="handleCancel"
    >
      <ATabs v-model:activeKey="activeKey" centered>
        <ATabPane key="1" :tab="t('sys.authority.menuAuthority')">
          <BasicTree
            checkable
            :height="600"
            :treeData="treeMenuData"
            :checkStrictly="true"
            ref="treeMenuRef"
          />
        </ATabPane>
        <ATabPane key="2" :tab="t('sys.authority.apiAuthority')">
          <ATree
            v-model:checked-keys="checkedApiKeys"
            checkable
            :height="600"
            :tree-data="treeApiData"
          />
        </ATabPane>
      </ATabs>
    </BasicDrawer>
  </BasicDrawer>
</template>
<script lang="ts">
  import { computed, defineComponent, ref, unref, watch } from 'vue';
  import { Tabs, Tree } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import {
    convertApiCheckedKeysToReq,
    convertApiToCheckedKeys,
    convertApiTreeData,
    formSchema,
  } from './role.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { useI18n } from 'vue-i18n';

  import { ApiAuthorityInfo } from '/@/api/sys/model/authorityModel';
  import { createRole, updateRole } from '/@/api/sys/role';
  import { getMenuList } from '/@/api/sys/menu';
  import {
    createOrUpdateApiAuthority,
    createOrUpdateMenuAuthority,
    getApiAuthority,
    getApiList,
    getMenuAuthority,
  } from '/@/api/sys/authority';
  import { DataNode } from 'ant-design-vue/lib/tree';
  import { BaseDataResp } from '/@/api/model/baseModel';
  import { ApiListResp } from '/@/api/sys/model/apiModel';
  import { buildDataNode } from '/@/utils/tree';
  import { BasicTree, TreeActionType } from '/@/components/Tree';

  export default defineComponent({
    name: 'RoleDrawer',
    components: {
      BasicDrawer,
      BasicForm,
      ATabs: Tabs,
      ATabPane: Tabs.TabPane,
      ATree: Tree,
      BasicTree,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const { t } = useI18n();
      const activeKey = ref('1');
      let tempApiList: BaseDataResp<ApiListResp> = {
        code: 0,
        msg: '',
        data: { total: 0, data: [] },
      };
      // children drawer
      const childrenDrawer = ref<boolean>(false);
      const showChildrenDrawer = () => {
        childrenDrawer.value = true;
      };
      // defined menu items
      const treeMenuRef = ref<Nullable<TreeActionType>>(null);
      const treeMenuData = ref<DataNode[]>([]);

      function getMenuTree() {
        const tree = unref(treeMenuRef);
        if (!tree) {
          throw new Error('menu tree is null!');
        }
        return tree;
      }

      async function getMenuData() {
        try {
          treeMenuData.value = [];
          const data = await getMenuList();
          treeMenuData.value = buildDataNode(data.data.data, {
            idKeyField: 'id',
            parentKeyField: 'parentId',
            childrenKeyField: 'children',
            valueField: 'id',
            labelField: 'trans',
          });

          const roleId = await validate();
          const checkedData = await getMenuAuthority({ id: Number(roleId['id']) });
          getMenuTree().setCheckedKeys(checkedData.data.menuIds);
          getMenuTree().expandAll(true);
        } catch (error) {
          console.log(error);
        }
      }
      // defined api items
      const checkedApiKeys = ref<number[]>([]);
      const treeApiData = ref<DataNode[]>([]);
      async function getApiData() {
        try {
          treeApiData.value = [];
          const apiData = await getApiList({
            page: 1,
            pageSize: 10000,
          });
          tempApiList = apiData;
          const dataConv = convertApiTreeData(apiData.data.data);
          for (const key in dataConv) {
            treeApiData.value.push(dataConv[key]);
          }
          const roleId = await validate();
          const checkedData = await getApiAuthority({ id: Number(roleId['id']) });
          if (checkedData.data.data === null) {
            checkedApiKeys.value = [];
          } else {
            checkedApiKeys.value = convertApiToCheckedKeys(
              checkedData.data.data,
              apiData.data.data,
            );
          }
        } catch (error) {
          console.log(error);
        }
      }
      // watch the change of children drawer
      watch(childrenDrawer, () => {
        if (childrenDrawer.value === true) {
          getMenuData();
          getApiData();
        }
      });

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        baseColProps: { span: 24 },
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });

        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
      });

      const getTitle = computed(() =>
        !unref(isUpdate) ? t('sys.role.addRole') : t('sys.role.editRole'),
      );

      // handler cancel
      function handleCancel() {
        childrenDrawer.value = false;
        closeDrawer();
      }

      // handler submit action
      async function handleSubmit() {
        const values = await validate();
        setDrawerProps({ confirmLoading: true });
        values['id'] = unref(isUpdate) ? Number(values['id']) : 0;
        let result = unref(isUpdate) ? await updateRole(values) : await createRole(values);
        if (result.code === 0) {
          childrenDrawer.value = false;
          closeDrawer();
          emit('success');
        }
        setDrawerProps({ confirmLoading: false });
      }

      // handle authorization submit
      async function handleAuthorizationSubmit() {
        if (activeKey.value === '1') {
          const roleData = await validate();
          const result = await createOrUpdateMenuAuthority({
            roleId: Number(roleData['id']),
            menuIds: getMenuTree().getCheckedKeys()['checked'] as number[],
          });
          if (result.code === 0) {
            childrenDrawer.value = false;
            closeDrawer();
          }
        } else {
          const apiReqData: ApiAuthorityInfo[] = convertApiCheckedKeysToReq(
            checkedApiKeys.value,
            tempApiList.data.data,
          );
          const roleData = await validate();
          const result = await createOrUpdateApiAuthority({
            roleId: Number(roleData['id']),
            data: apiReqData,
          });
          if (result.code === 0) {
            childrenDrawer.value = false;
            closeDrawer();
          }
        }
      }

      return {
        t,
        isUpdate,
        activeKey,
        showChildrenDrawer,
        childrenDrawer,
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
        handleCancel,
        handleAuthorizationSubmit,
        treeMenuData,
        treeApiData,
        treeMenuRef,
        checkedApiKeys,
      };
    },
  });
</script>
