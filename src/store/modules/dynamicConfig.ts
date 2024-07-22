import { defineStore } from 'pinia';
import { getPublicSystemConfigurationList } from '/@/api/sys/configuration';

interface DynamicConfig {
  systemName: string;
  systemLogo: string;
  showSettingButton: boolean;
}

export const useDynamicConfigStore = defineStore('app-dynamic-config', {
  state: (): DynamicConfig => ({
    systemName: '',
    systemLogo: '',
    showSettingButton: true,
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
        const name = config.data.data.find((v) => v.key == 'sys.ui.name');
        if (name !== undefined) {
          this.systemName = name.value !== undefined ? name.value : '';
        }

        const logo = config.data.data.find((v) => v.key == 'sys.ui.logo');
        if (logo !== undefined) {
          this.systemLogo = logo.value !== undefined ? logo.value : '';
        }

        const showSettingButton = config.data.data.find((v) => v.key == 'sys.ui.showSettingButton');
        if (showSettingButton !== undefined) {
          this.showSettingButton =
            showSettingButton.value !== undefined && showSettingButton.value === 'true'
              ? true
              : false;
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
