<template>
  <Dropdown placement="bottomLeft" :overlayClassName="`${prefixCls}-dropdown-overlay`">
    <span :class="[prefixCls, `${prefixCls}--${theme}`]" class="flex">
      <img alt="avatar" :class="`${prefixCls}__header`" :src="getUserInfo.avatar" />
      <span :class="`${prefixCls}__info hidden md:block`">
        <span :class="`${prefixCls}__name`" class="truncate">
          {{ getUserInfo.nickname }}
        </span>
        <span class="ml-4"
          ><Tag v-for="role in roleTag" :key="role" color="blue">{{ role }}</Tag></span
        >
      </span>
    </span>

    <template #overlay>
      <Menu @click="handleMenuClick">
        <MenuItem
          key="departmentName"
          :text="
            userStore.userInfo.departmentName
              ? userStore.userInfo.departmentName
              : t('sys.department.departmentUndefined')
          "
          icon="fluent:data-treemap-24-regular"
          className="font-bold"
        />
        <MenuItem
          key="profile"
          :text="t('layout.header.profile')"
          icon="ion:document-text-outline"
        />
        <MenuItem
          key="doc"
          :text="t('layout.header.dropdownItemDoc')"
          icon="ion:document-text-outline"
          v-if="getShowDoc"
        />
        <MenuDivider v-if="getShowDoc" />
        <MenuItem
          v-if="getUseLockPage"
          key="lock"
          :text="t('layout.header.tooltipLock')"
          icon="ion:lock-closed-outline"
        />
        <MenuItem
          key="logout"
          :text="t('layout.header.dropdownItemLoginOut')"
          icon="ion:power-outline"
        />
      </Menu>
    </template>
  </Dropdown>
  <LockAction @register="register" />
</template>
<script lang="ts" setup>
  // components
  import { Dropdown, Menu, Tag } from 'ant-design-vue';
  import type { MenuInfo } from 'ant-design-vue/lib/menu/src/interface';

  import { computed } from 'vue';

  import { DOC_URL } from '@/settings/siteSetting';

  import { useUserStore } from '@/store/modules/user';
  import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useDesign } from '@/hooks/web/useDesign';
  import { useModal } from '@/components/Modal';

  import headerImg from '@/assets/images/header.jpg';
  import { propTypes } from '@/utils/propTypes';
  import { openWindow } from '@/utils';

  import { createAsyncComponent } from '@/utils/factory/createAsyncComponent';
  import { useGo } from '@/hooks/web/usePage';
  import { useMessage } from '/@/hooks/web/useMessage';

  type MenuEvent = 'logout' | 'doc' | 'lock' | 'profile' | 'departmentName';

  const MenuItem = createAsyncComponent(() => import('./DropMenuItem.vue'));
  const MenuDivider = Menu.Divider;
  const LockAction = createAsyncComponent(() => import('../lock/LockModal.vue'));

  const props = defineProps({
    theme: propTypes.oneOf(['dark', 'light']),
  });

  const { prefixCls } = useDesign('header-user-dropdown');
  const { t } = useI18n();
  const { getShowDoc, getUseLockPage } = useHeaderSetting();
  const userStore = useUserStore();
  const go = useGo();
  const { createMessage } = useMessage();

  const getUserInfo = computed(() => {
    const { nickname = '', avatar, desc } = userStore.getUserInfo || {};
    return { nickname, avatar: avatar || headerImg, desc };
  });

  const roleTag = computed(() => {
    let roleData = userStore.getRoleName;
    return roleData.length > 3 ? roleData.slice(0, 3) : roleData;
  });

  const [register, { openModal }] = useModal();

  function handleLock() {
    openModal(true);
  }

  //  login out
  function handleLoginOut() {
    userStore.confirmLoginOut();
  }

  // open doc
  function openDoc() {
    openWindow(DOC_URL);
  }

  // open modal for change self information
  function handleProfile() {
    go('/profile');
  }

  // show department tip
  function handleDepartmentName() {
    createMessage.info(
      userStore.userInfo.departmentName
        ? t('sys.department.userDepartment') + ' : ' + userStore.userInfo.departmentName
        : t('sys.department.departmentUndefined'),
    );
  }

  function handleMenuClick(e: MenuInfo) {
    switch (e.key as MenuEvent) {
      case 'logout':
        handleLoginOut();
        break;
      case 'doc':
        openDoc();
        break;
      case 'lock':
        handleLock();
        break;
      case 'profile':
        handleProfile();
        break;
      case 'departmentName':
        handleDepartmentName();
        break;
    }
  }
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-header-user-dropdown';

  .@{prefix-cls} {
    align-items: center;
    height: @header-height;
    padding: 0 10px;
    overflow: hidden;
    font-size: 12px;
    cursor: pointer;

    img {
      width: 24px;
      height: 24px;
      margin-right: 12px;
    }

    &__header {
      border-radius: 50%;
    }

    &__name {
      font-size: 14px;
    }

    &--dark {
      &:hover {
        background-color: @header-dark-bg-hover-color;
      }
    }

    &--light {
      &:hover {
        background-color: @header-light-bg-hover-color;
      }

      .@{prefix-cls}__name {
        color: @text-color-base;
      }

      .@{prefix-cls}__desc {
        color: @header-light-desc-color;
      }
    }

    &-dropdown-overlay {
      .ant-dropdown-menu-item {
        min-width: 160px;
      }
    }
  }
</style>
