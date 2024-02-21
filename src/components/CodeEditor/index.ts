import { withInstall } from '@/utils';
import codeEditor from './src/CodeEditor.vue';
import { MODE } from './src/typing';

export const CodeEditor = withInstall(codeEditor);
export const LangMode = MODE;
