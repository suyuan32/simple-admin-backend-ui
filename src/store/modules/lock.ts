import type { LockInfo } from '/#/store';

import { defineStore } from 'pinia';
import { LOCK_INFO_KEY } from '@/enums/cacheEnum';

interface LockState {
  lockInfo: Nullable<LockInfo>;
}

export const useLockStore = defineStore({
  id: 'app-lock',
  state: (): LockState => {
    return {
      lockInfo: null,
    };
  },
  getters: {
    getLockInfo(state): Nullable<LockInfo> {
      return state.lockInfo;
    },
  },
  actions: {
    setLockInfo(info: LockInfo) {
      this.lockInfo = Object.assign({}, this.lockInfo, info);
    },
    resetLockInfo() {
      this.lockInfo = null;
    },
    // Unlock
    async unLock(password?: string) {
      if (this.lockInfo?.pwd === password) {
        this.resetLockInfo();
        return true;
      }
      return false;
    },
  },
  persist: {
    key: LOCK_INFO_KEY,
  },
});
