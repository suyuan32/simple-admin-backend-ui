import { DataNode } from 'ant-design-vue/es/vc-tree/interface';
import { map, pick } from 'lodash-es';
import { array2tree } from '@axolo/tree-array';

export interface buildDataNodeOption {
  labelField: string;
  idKeyField: string;
  valueField: string;
  parentKeyField: string;
  defaultValue?: string;
  childrenKeyField: string;
}

export function buildDataNode(data: any, options: buildDataNodeOption): DataNode[] {
  const treeNodeData = map(data, (obj) => {
    const tmpData = pick(obj, [
      options.labelField,
      options.idKeyField,
      options.valueField,
      options.parentKeyField,
    ]);
    Object.keys(tmpData).forEach((e) => {
      if (e === options.labelField) {
        tmpData['title'] = tmpData[e];
        delete tmpData[e];
      } else if (e === options.valueField) {
        tmpData['key'] = tmpData[e];
        if (e !== options.idKeyField && e !== options.parentKeyField) {
          delete tmpData[e];
        }
      }
    });
    return tmpData;
  });

  const treeConv = array2tree(treeNodeData, {
    idKey: options.idKeyField,
    parentKey: options.parentKeyField,
    childrenKey: options.childrenKeyField,
  });

  // add default label
  if (options.defaultValue) {
    treeConv.push(options.defaultValue);
  }
  return treeConv as DataNode[];
}
