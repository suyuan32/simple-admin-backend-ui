import { genMessage } from '../helper';
import antdLocale from 'ant-design-vue/es/locale/en_US';

const modules = import.meta.globEager('./en/**/*.ts');
export default {
  message: {
    ...genMessage(modules as Record<string, Record<string, any>>, 'en'),
    antdLocale,
  },
  dateLocale: null,
  dateLocaleName: 'en',
};
