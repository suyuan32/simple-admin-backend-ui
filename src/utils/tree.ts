import { DataNode } from 'ant-design-vue/es/vc-tree/interface';
import { map, pick } from 'lodash-es';
import { array2tree } from '@axolo/tree-array';

export interface buildNodeOption {
  labelField: string;
  idKeyField: string;
  valueField: string;
  parentKeyField: string;
  defaultValue?: string | object;
  childrenKeyField: string;
}

export function buildDataNode(data: any, options: buildNodeOption): DataNode[] {
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

// buildTreeNode returns treeData for tree select from data
export function buildTreeNode(data: any, options: buildNodeOption): Recordable[] {
  const treeNodeData = map(data, (obj) => {
    const tmpData = pick(obj, [
      options.labelField,
      options.idKeyField,
      options.valueField,
      options.parentKeyField,
    ]);
    Object.keys(tmpData).forEach((e) => {
      if (e === options.labelField) {
        tmpData['label'] = tmpData[e];
        delete tmpData[e];
      } else if (e === options.valueField) {
        tmpData['value'] = tmpData[e];
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
  return treeConv as Recordable[];
}
