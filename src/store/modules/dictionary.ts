import { defineStore } from 'pinia';
import { DictionaryDetailInfo } from '/@/api/sys/model/dictionaryDetailModel';
import { GetDictionaryDetailByDictionaryName } from '/@/api/sys/dictionaryDetail';

interface DictionaryData {
  name: string;
  data: DictionaryDetailInfo[];
}

export const useDictionaryStore = defineStore({
  id: 'app-dictionary',
  state: () => {
    return {
      data: new Map<string, DictionaryData>(),
    };
  },
  getters: {
    getDataSize(): number {
      return this.data.size;
    },
  },
  actions: {
    // Get dictionary info
    async getDictionary(name: string) {
      if (this.data.has(name)) {
        return this.data[name];
      } else {
        const result = await GetDictionaryDetailByDictionaryName({ name: name });
        if (result.code === 0) {
          this.data[name] = result.data;
          return result.data;
        } else {
          return null;
        }
      }
    },
  },
});
