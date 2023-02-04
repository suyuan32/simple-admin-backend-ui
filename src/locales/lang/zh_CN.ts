import { genMessage } from '../helper';
import antdLocale from 'ant-design-vue/es/locale/zh_CN';

const modules = import.meta.globEager('./zh-CN/**/*.ts');
export default {
  message: {
    ...genMessage(modules as Record<string, Record<string, any>>, 'zh-CN'),
    antdLocale,
  },
};
