import { defineStore } from 'pinia';
import { GetDictionaryDetailByDictionaryName } from '/@/api/sys/dictionaryDetail';
import { DefaultOptionType } from 'ant-design-vue/lib/select';
import { ref } from 'vue';

interface DictionaryData {
  data: DefaultOptionType[];
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
          const dataConv = ref<DefaultOptionType[]>([]);

          for (let i = 0; i < result.data.total; i++) {
            dataConv.value.push({
              label: result.data.data[i].title,
              value: result.data.data[i].value,
            });
          }

          const dictData: DictionaryData = { data: dataConv.value };
          this.data.set(name, dictData);
          return dictData;
        } else {
          return null;
        }
      }
    },

    // remove the dictionary in storage
    removeDictionary(name: string) {
      if (this.data.has(name)) {
        this.data.delete(name);
      }
    },

    // remove all the dictionary in storage
    clear() {
      this.data.clear();
    },
  },
});
