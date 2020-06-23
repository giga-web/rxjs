import { get, clonedeep } from '@/utilities/lodash';

/**
 * origin 一定是一个一维数组，但是可能不都是同一级别的
 * originFomat 是一个映射
 * exist 是一个树形结构
 * parentId 原始数据的父级
 */
export function formatCascader({ exist, origin, originFomat, parentId }) {
  // 格式化
  const formatData = origin.map(item => ({
    value: item[get(originFomat, 'value')] || item.id,
    label: item[get(originFomat, 'label')] || item.name,
    isLeaf: item[get(originFomat, 'isLeaf')] || item.isLeaf || false,
    // 附加属性
    id: item[get(originFomat, 'id')] || item.id,
    parentId: item[get(originFomat, 'parentId')] || item.parentId,
  }));

  // 无存在的数据，返回格式化数据
  if (exist === undefined) {
    // 原始数据自成树结构
    
    // 递归的将树展开为字典格式
    const map = mapifyCascader(formatData, {});

    // 根数组
    const result = [];

    for (let i = 0; i < formatData.length; i++) {
      const item = formatData[i];
      const parent = map[item.parentId];

      if (parent === undefined || parent === item) {
        // 附加属性-path
        item.path = String(item.id);

        result.push(item);
        continue;
      }

      // 找到父级，插入
      if (parent) {
        // 附加属性-path
        item.path = parent.path + '|' + item.id;

        if (parent.children) {
          parent.children.push(item);
        } else {
          parent.children = [item];
        }
      }
    }

    return result;
  }

  // 递归的将树展开为字典格式
  const map = mapifyCascader(exist, {});
  
  // 原始数据是空数组，表示父级是叶子节点
  if (origin.length === 0) {
    map[parentId]['isLeaf'] = true;
    return clonedeep(exist);
  }
  
  // 将格式化后的数据插入到存在的数据子级
  for (let i = 0; i < formatData.length; i++) {
    const item = formatData[i];
    const parent = map[item.parentId];
    
    // 已存在，跳过
    if (map[item.id]) {
      continue;
    }

    // 找到父级，插入
    if (parent) {
      // 附加属性-path
      item.path = parent.path + '|' + item.id;

      if (parent.children) {
        parent.children.push(item);
      } else {
        parent.children = [item];
      }
    }
  }

  return clonedeep(exist);
}

// 递归的将树展开为字典格式
export function mapifyCascader(tree, map) {
  for (let i = 0; i < tree.length; i++) {
    const item = tree[i];

    map[item.id] = item;

    if (item.children) {
      mapifyCascader(item.children, map);
    }
  }

  return map;
}
