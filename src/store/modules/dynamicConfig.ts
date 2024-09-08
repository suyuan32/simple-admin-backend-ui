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
                if (v.state === false) {
                  this.systemName = '';
                  break;
                }
                this.systemName = v.value !== undefined ? v.value : '';
                break;
              case 'sys.ui.logo':
                if (v.state === false) {
                  this.systemLogo = '';
                  break;
                }
                this.systemLogo = v.value !== undefined ? v.value : '';
                break;
              case 'sys.ui.showSettingButton':
                if (v.state === false) {
                  this.showSettingButton = true;
                  break;
                }
                this.showSettingButton = v.value !== undefined && v.value === 'true';
                break;
              case 'sys.ui.defaultLocale':
                if (v.state === false) {
                  this.defaultLocale = LOCALE.ZH_CN;
                  break;
                }
                let localeValue: string = LOCALE.ZH_CN;
                if (v.value !== undefined) {
                  if (v.value === LOCALE.ZH_CN || v.value === LOCALE.EN_US) {
                    localeValue = v.value;
                  }
                }

                this.defaultLocale = localeValue;
                break;
              case 'sys.ui.header.showNotice':
                if (v.state === false) {
                  this.showNotice = false;
                  break;
                }
                this.showNotice = v.value !== undefined && v.value === 'true';
                break;
              case 'sys.ui.layoutType':
                if (v.state === false) {
                  this.layoutType = 'sidebar';
                  break;
                }
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
                if (v.state === false) {
                  this.showBreadCrumb = true;
                  break;
                }
                this.showBreadCrumb = !(v.value !== undefined && v.value === 'false');
                break;
            }
          }
        }
      } else if (config.code === 0 && config.data.total === 0) {
        this.systemName = '';
        this.systemLogo = '';
        this.showSettingButton = true;
        this.showNotice = false;
        this.layoutType = 'sidebar';
        this.showBreadCrumb = true;
      }
    },
  },
  persist: true,
});