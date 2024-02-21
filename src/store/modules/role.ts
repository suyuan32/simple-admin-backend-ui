import { defineStore } from 'pinia';
import { RoleInfo } from '@/api/sys/model/roleModel';
import { getRoleList } from '@/api/sys/role';

interface RoleState {
  roleInfo: RoleInfo[];
}

export const useRoleStore = defineStore('app-role', {
  state: (): RoleState => ({
    roleInfo: [],
  }),
  getters: {
    getRoleInfo(): RoleInfo[] {
      return this.roleInfo;
    },
  },
  actions: {
    async getRoleInfoFromServer() {
      const roleInfo = await getRoleList({
        page: 1,
        pageSize: 1000,
      });
      this.roleInfo = roleInfo.data.data;
    },
  },
});
