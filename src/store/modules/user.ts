import type { ErrorMessageMode } from '/#/axios';
import { defineStore } from 'pinia';
import { store } from '@/store';
import { RoleEnum } from '@/enums/roleEnum';
import { PageEnum } from '@/enums/pageEnum';
import { USER_INFO_KEY } from '@/enums/cacheEnum';
import {
  GetUserInfoModel,
  LoginByEmailReq,
  LoginBySmsReq,
  LoginReq,
} from '@/api/sys/model/userModel';
import { doLogout, getUserInfo, login, loginByEmail, loginBySms } from '@/api/sys/user';
import { useI18n } from '@/hooks/web/useI18n';
import { useMessage } from '@/hooks/web/useMessage';
import { router } from '@/router';
import { usePermissionStore } from '@/store/modules/permission';
import { RouteRecordRaw } from 'vue-router';
import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic';
import { isArray } from '@/utils/is';
import { h } from 'vue';

interface UserState {
  userInfo: GetUserInfoModel;
  token: string;
  roleList: RoleEnum[];
  roleName: string[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: {
      userId: '',
      username: '',
      nickname: '',
      avatar: '',
      homePath: '',
      roleName: [],
    },
    // token
    token: '',
    // roleList
    roleList: [],
    // role name
    roleName: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): GetUserInfoModel {
      return this.userInfo;
    },
    getToken(): string {
      return this.token;
    },
    getRoleList(): RoleEnum[] {
      return this.roleList;
    },
    getRoleName(): string[] {
      return this.roleName;
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : '';
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList;
    },
    setRoleName(roleName: string[]) {
      this.roleName = roleName;
    },
    setUserInfo(info: GetUserInfoModel) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    resetState() {
      this.userInfo = {
        userId: '',
        username: '',
        nickname: '',
        avatar: '',
        homePath: '',
        roleName: [],
      };
      this.token = '';
      this.roleList = [];
      this.roleName = [];
      this.sessionTimeout = false;
    },
    /**
     * @description: login
     */
    async login(
      params: LoginReq & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params;
        const data = await login(loginParams, mode);
        if (data.code !== 0) {
          return Promise.reject(null);
        }
        const { token } = data.data;

        // save token
        this.setToken(token);
        return this.afterLoginAction(goHome);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * @description: login by email
     */
    async loginByEmail(
      params: LoginByEmailReq & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params;
        const data = await loginByEmail(loginParams, mode);
        if (data.code !== 0) {
          return Promise.reject(null);
        }
        const { token } = data.data;

        // save token
        this.setToken(token);
        return this.afterLoginAction(goHome);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * @description: login by sms
     */
    async loginBySms(
      params: LoginBySmsReq & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params;
        const data = await loginBySms(loginParams, mode);
        if (data.code !== 0) {
          return Promise.reject(null);
        }
        const { token } = data.data;

        // save token
        this.setToken(token);
        return this.afterLoginAction(goHome);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null;
      // get user info
      const userInfo = await this.getUserInfoAction();

      const sessionTimeout = this.sessionTimeout;
      if (sessionTimeout) {
        this.setSessionTimeout(false);
      } else {
        const permissionStore = usePermissionStore();
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.buildRoutesAction();
          routes.forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw);
          });
          router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
          permissionStore.setDynamicAddedRoute(true);
        }
        goHome && (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME));
      }
      return userInfo;
    },
    async getUserInfoAction(): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null;
      const userInfo = await getUserInfo();
      const { roles = [], roleName = [] } = userInfo.data;
      if (isArray(roles)) {
        const roleList = roles.map((item) => item.valueOf) as unknown as RoleEnum[];
        this.setRoleList(roleList);
      } else {
        userInfo.data.roles = [];
        this.setRoleList([]);
      }
      this.setRoleName(roleName);
      this.setUserInfo(userInfo.data);
      return userInfo.data;
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          // in the future the server may need to log out, and we can uncomment this
          await doLogout();
          console.log('logout successful');
        } catch {
          console.log('注销Token失败');
        }
      }
      this.setToken(undefined);
      this.setSessionTimeout(false);
      this.setUserInfo({
        userId: '',
        username: '',
        nickname: '',
        avatar: '',
        homePath: '',
        roleName: [],
      });
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      const { t } = useI18n();
      createConfirm({
        iconType: 'warning',
        title: () => h('span', t('sys.app.logoutTip')),
        content: () => h('span', t('sys.app.logoutMessage')),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },
  },
  persist: {
    key: USER_INFO_KEY,
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
