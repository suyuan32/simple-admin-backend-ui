import { addProp, clone, keys } from 'remeda';
import type { LocaleType } from '/#/config';

export const loadLocalePool: LocaleType[] = [];

export function setHtmlPageLang(locale: LocaleType) {
  document.querySelector('html')?.setAttribute('lang', locale);
}

export function setLoadLocalePool(cb: (loadLocalePool: LocaleType[]) => void) {
  cb(loadLocalePool);
}

export function genMessage(
  langs: Record<string, Record<string, any>>,
  prefix = 'lang',
): Recordable<any> {
  const result: Recordable = {};

  keys(langs).forEach((key) => {
    const langFileModule = langs[key].default;
    let fileName = key.replace(`./${prefix}/`, '').replace(/^\.\//, '');
    const lastIndex = fileName.lastIndexOf('.');
    fileName = fileName.substring(0, lastIndex);
    const keyList = fileName.split('/');
    const moduleName = keyList.shift();
    const objKey = keyList.join('.');

    if (moduleName) {
      if (objKey) {
        result[moduleName] = addProp(result[moduleName] || {}, objKey, langFileModule);
      } else {
        result[moduleName] = langFileModule || {};
      }
    }
  });

  return result;
}
