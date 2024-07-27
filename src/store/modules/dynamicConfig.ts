import { defineStore } from 'pinia';
import { getPublicSystemConfigurationList } from '/@/api/sys/configuration';
import { LOCALE } from '/@/settings/localeSetting';

interface DynamicConfig {
  systemName: string;
  systemLogo: string;
  showSettingButton: boolean;
  defaultLocale: string;
  showNotice: boolean;
  layoutType: 'sidebar' | 'mix-sidebar' | 'mix' | 'top-menu';
  showBreadCrumb: boolean;
}

export const useDynamicConfigStore = defineStore('app-dynamic-config', {
  state: (): DynamicConfig => ({
    systemName: '',
    systemLogo: '',
    showSettingButton: true,
    defaultLocale: LOCALE.ZH_CN,
    showNotice: false,
    layoutType: 'sidebar',
    showBreadCrumb: true,
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
              case 'sys.ui.header.showNotice':
                this.showNotice = v.value !== undefined && v.value === 'true' ? true : false;
                break;
              case 'sys.ui.layoutType':
                this.layoutType =
                  v.value !== undefined &&
                  (v.value === 'sidebar' ||
                    v.value === 'mix-sidebar' ||
                    v.value === 'mix' ||
                    v.value === 'top-menu')
                    ? (v.value as any)
                    : 'sidebar';
                break;
              case 'sys.ui.showBreadCrumb':
                this.showBreadCrumb = v.value !== undefined && v.value === 'false' ? false : true;
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
