export default {
  // user API description
  userLogin: '用户登录（必须）',
  userRegister: '用户注册（必须）',
  userChangePassword: '用户修改密码',
  userInfo: '获取用户信息（必须）',
  userList: '获取用户列表',
  userModify: '修改用户信息',
  userPermissions: '获取用户授权码（必须）',
  userProfile: '获取用户个人信息（必须）',
  updateProfile: '修改用户个人信息（必须）',
  createOrUpdateUser: '新增或修改用户',
  deleteUser: '删除用户',
  logout: '退出登陆（必须）',
  updateUserStatus: '更新用户状态',

  // role
  createOrUpdateRole: '新建或更新角色信息',
  deleteRole: '删除角色信息',
  roleList: '获取角色列表',
  setRoleStatus: '设置角色状态',

  // menu
  createOrUpdateMenu: '新建或更新菜单',
  menuInfo: '获取菜单信息',
  menuList: '获取菜单列表',
  deleteMenu: '删除菜单',
  roleMenu: '获取角色菜单（必须）',
  createOrUpdateMenuParam: '创建或更新菜单参数',
  deleteMenuParam: '删除菜单额外参数',
  menuParamListByMenuId: '获取某个菜单的额外参数列表',

  // API
  createOrUpdateApi: '创建或修改API信息',
  deleteAPI: '删除API',
  APIInfo: '获取API信息',
  APIList: '获取API列表',
  authorityApiList: '获取授权列表中的API',

  // authority
  createOrUpdateApiAuthority: '创建或修改API授权',
  APIAuthorityOfRole: '获取角色的API授权信息',
  createOrUpdateMenuAuthority: '创建或修改菜单授权',
  menuAuthorityOfRole: '获取角色的菜单授权信息',

  // captcha
  captcha: '获取验证码（必须）',

  // uploader
  uploadFile: '上传文件',
  fileList: '文件列表',
  deleteFile: '删除文件',
  updateFileInfo: '更新文件信息',
  setPublicStatus: '改变文件公开状态',
  downloadFile: '下载文件',

  // dictionary
  createOrUpdateDictionary: '创建或更新字典信息',
  deleteDictionary: '删除字典信息',
  getDictionaryList: '获取字典列表',
  createOrUpdateDictionaryDetail: '创建或更新字典键值信息',
  deleteDictionaryDetail: '删除字典键值信息',
  getDictionaryListDetail: '获取字典键值列表',

  // oauth
  createOrUpdateProvider: '创建或更新登录提供商',
  deleteProvider: '删除登录提供商',
  geProviderList: '获取提供商列表',
  oauthLogin: '第三方登录',

  // token
  createOrUpdateToken: '创建或更新Token',
  deleteToken: '删除Token',
  getTokenList: '获取Token列表',
  setTokenStatus: '设置Token状态',
};
