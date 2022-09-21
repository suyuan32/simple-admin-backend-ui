interface NavItem {
  title: string;
  icon: string;
  color: string;
  redirect?: string;
}

export const navItems: NavItem[] = [
  {
    title: 'routes.system.userManagementTitle',
    icon: 'ant-design:user-outlined',
    color: '#bf0c2c',
    redirect: '/user_management',
  },
  {
    title: 'routes.system.roleManagementTitle',
    icon: 'eos-icons:role-binding-outlined',
    color: '#e18525',
    redirect: '/role_management',
  },
  {
    title: 'routes.system.menuManagementTitle',
    icon: 'ep:menu',
    color: '#3fb27f',
    redirect: '/menu_management',
  },
  {
    title: 'routes.system.apiManagementTitle',
    icon: 'ant-design:api-outlined',
    color: '#4daf1bc9',
    redirect: '/api_management',
  },
  {
    title: 'routes.system.fileManagementTitle',
    icon: 'akar-icons:folder',
    color: '#00d8ff',
    redirect: '/file_management',
  },
];

export const systemInfoData = [
  ['sys.sys.Name', 'Simple Admin'],
  ['sys.sys.version', 'V 0.0.3'],
];
