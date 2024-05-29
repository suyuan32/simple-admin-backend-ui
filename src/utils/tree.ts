import { DataNode } from 'ant-design-vue/es/vc-tree/interface';
import { array2tree } from '@axolo/tree-array';
import { forEachObj, map, pick } from 'remeda';

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
    const tmpData = pick(obj as any, [
      options.labelField,
      options.idKeyField,
      options.valueField,
      options.parentKeyField,
    ]);

    forEachObj.indexed(tmpData, (value, key) => {
      if (key === options.labelField) {
        tmpData['title'] = value;
        delete tmpData[key];
      } else if (key === options.valueField) {
        tmpData['key'] = tmpData[key];
        if (key !== options.idKeyField && key !== options.parentKeyField) {
          delete tmpData[key];
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
    const tmpData = pick(obj as any, [
      options.labelField,
      options.idKeyField,
      options.valueField,
      options.parentKeyField,
    ]);

    forEachObj.indexed(tmpData, (value, key) => {
      if (key === options.labelField) {
        tmpData['label'] = value;
        delete tmpData[key];
      } else if (key === options.valueField) {
        tmpData['value'] = tmpData[key];
        if (key !== options.idKeyField && key !== options.parentKeyField) {
          delete tmpData[key];
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
