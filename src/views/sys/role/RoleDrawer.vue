<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
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
      :closable="false"
      @ok="handleAuthorizationSubmit"
    >
      <ATabs v-model:activeKey="activeKey" centered>
        <ATabPane key="1" :tab="t('sys.authority.menuAuthority')">
          <ATree
            v-model:checkedKeys="checkedMenuKeys"
            checkable
            :height="600"
            :tree-data="treeMenuData"
          />
        </ATabPane>
        <ATabPane key="2" :tab="t('sys.authority.apiAuthority')">
          <ATree
            v-model:checkedKeys="checkedApiKeys"
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
  import { defineComponent, ref, computed, unref, watch } from 'vue';
  import { Tabs, Tree, message } from 'ant-design-vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import {
    formSchema,
    convertMenuTreeData,
    convertApiTreeData,
    convertApiCheckedKeysToReq,
    convertApiToCheckedKeys,
  } from './role.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { useI18n } from 'vue-i18n';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { RoleInfo } from '/@/api/sys/model/roleModel';
  import { ApiListResp } from '/@/api/sys/model/apiModel';
  import { ApiAuthorityInfo } from '/@/api/sys/model/authorityModel';
  import { createOrUpdateRole } from '/@/api/sys/role';
  import { getAllMenu } from '/@/api/sys/menu';
  import {
    createOrUpdateMenuAuthority,
    getMenuAuthority,
    getApiList,
    createOrUpdateApiAuthority,
    getApiAuthority,
  } from '/@/api/sys/authority';
  import { DataNode } from 'ant-design-vue/lib/tree';
  import console from 'console';

  export default defineComponent({
    name: 'RoleDrawer',
    components: { BasicDrawer, BasicForm, ATabs: Tabs, ATabPane: Tabs.TabPane, ATree: Tree },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const { t } = useI18n();
      const { notification } = useMessage();
      const activeKey = ref('1');
      let tempApiList: ApiListResp = { total: 0, data: [] };
      // children drawer
      const childrenDrawer = ref<boolean>(false);
      const showChildrenDrawer = () => {
        childrenDrawer.value = true;
      };
      // defined menu items
      const checkedMenuKeys = ref<number[]>([]);
      const treeMenuData = ref<DataNode[]>([]);
      async function getMenuData() {
        try {
          treeMenuData.value = [];
          const data = await getAllMenu();
          const dataConv = convertMenuTreeData(data.data);
          for (const key in dataConv) {
            treeMenuData.value.push(dataConv[key]);
          }
          const roleId = await validate();
          const checkedData = await getMenuAuthority({ id: Number(roleId['id']) });
          checkedMenuKeys.value = checkedData.menuIds;
          console.log(checkedMenuKeys.value);
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
            path: '',
            group: '',
            method: '',
            description: '',
          });
          tempApiList = apiData;
          const dataConv = convertApiTreeData(apiData.data);
          for (const key in dataConv) {
            treeApiData.value.push(dataConv[key]);
          }
          const roleId = await validate();
          const checkedData = await getApiAuthority({ id: Number(roleId['id']) });
          const checkKeyConv = convertApiToCheckedKeys(checkedData.data, apiData.data);
          checkedApiKeys.value = checkKeyConv;
        } catch (error) {
          console.log(error);
        }
      }
      // watch the change of children drawer
      watch(childrenDrawer, () => {
        if (childrenDrawer.value == true) {
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

      // handler submit action
      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });
          // defined role id
          let roleId: number;
          if (unref(isUpdate)) {
            roleId = Number(values['id']);
          } else {
            roleId = 0;
          }
          let params: RoleInfo = {
            id: roleId,
            name: values['name'],
            value: values['value'],
            defaultRouter: values['defaultRouter'],
            status: values['status'],
            remark: values['remark'],
            orderNo: values['orderNo'],
            createAt: 0, // do not need to set
          };
          let result = await createOrUpdateRole(params);
          notification.success({
            message: t('common.successful'),
            description: t(result.msg),
            duration: 3,
          });
          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      // handle authorization submit
      async function handleAuthorizationSubmit() {
        try {
          if (activeKey.value === '1') {
            const roleData = await validate();
            const result = await createOrUpdateMenuAuthority({
              roleId: Number(roleData['id']),
              menuIds: checkedMenuKeys.value,
            });
            message.success(t(result.msg));
          } else {
            const apiReqData: ApiAuthorityInfo[] = convertApiCheckedKeysToReq(
              checkedApiKeys.value,
              tempApiList.data,
            );
            const roleData = await validate();
            const result = await createOrUpdateApiAuthority({
              roleId: Number(roleData['id']),
              data: apiReqData,
            });
            message.success(t(result.msg));
          }
        } catch (error) {
          console.log(error);
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
        handleAuthorizationSubmit,
        checkedMenuKeys,
        treeMenuData,
        checkedApiKeys,
        treeApiData,
      };
    },
  });
</script>
