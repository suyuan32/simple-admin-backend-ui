import { defineStore } from 'pinia';
import { getPublicSystemConfigurationList } from '/@/api/sys/configuration';
import { LOCALE } from '/@/settings/localeSetting';

interface DynamicConfig {
  systemName: string;
  systemLogo: string;
  showSettingButton: boolean;
  defaultLocale: string;
}

export const useDynamicConfigStore = defineStore('app-dynamic-config', {
  state: (): DynamicConfig => ({
    systemName: '',
    systemLogo: '',
    showSettingButton: true,
    defaultLocale: LOCALE.ZH_CN,
  }),
  getters: {
    getSystemName(): string {
      return this.systemName;
    },
    getSystemLogo(): string {
      return this.systemLogo;
    },
  },
  actions: {
    async getDynamicConfigFromServer() {
      const config = await getPublicSystemConfigurationList();

      if (config.code === 0 && config.data.total !== 0) {
        for (const v of config.data.data) {
          if (v.key != undefined) {
            switch (v.key) {
              case 'sys.ui.name':
                this.systemName = v.value !== undefined ? v.value : '';
                break;
              case 'sys.ui.logo':
                this.systemLogo = v.value !== undefined ? v.value : '';
                break;
              case 'sys.ui.showSettingButton':
                this.showSettingButton = v.value !== undefined && v.value === 'true' ? true : false;
                break;
              case 'sys.ui.defaultLocale':
                this.defaultLocale = v.value !== undefined ? v.value : LOCALE.ZH_CN;
                break;
            }
          }
        }
      } else if (config.code === 0 && config.data.total === 0) {
        this.systemName = '';
        this.systemLogo = '';
        this.showSettingButton = true;
      }
    },
  },
  persist: true,
});
