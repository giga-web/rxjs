import { clonedeep } from '@/utilities/lodash';

export function treenodeify(arr, mark='') {
  return arr.map(item => {
    return {
      origin: item,
      // cascader & tree
      key: mark + item.id,
      value: mark + item.id,
      label: item.shortName || item.name || item.title,
      title: item.shortName || item.name || item.title,
      isLeaf: item.isLeaf || false,
      disabled: item.disabled,
      // tree
      parentId: item.parentId || item.categoryId || 0,
      selectable: item.selectable,
      disableCheckbox: item.disableCheckbox,
    };
  });
}

export function mappingify(arr, origin) {
  const mapping = {};
  const sourceMapping = {};
  const mappingArr = []; // 保证顺序

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const key = String(item['treeKey'] || item['value'] || item['id']);
    const pkey = String(item['treeParentKey'] || item['parentId']);

    // 添加 Tree 组件需要的字段
    item['treeKey'] = key;
    item['treeParentKey'] = pkey;
    item['treeTitle'] = item['treeTitle'] || item['shortName'] || item['name'] || item['label'];

    // 树数据映射
    if (origin) {
      if (origin.mapping[key] === undefined) {
        origin.mapping[key] = item;
        mapping[key] = item;
        mappingArr.push(key);
      }
    } else {
      mapping[key] = item;
      mappingArr.push(key);
    }

    // 源数据映射，有才设置
    if (item.origin) {
      // if (item.origin.source === undefined && item.origin.sourceId === undefined) { continue; }
      if (item.origin.url === undefined) { continue; }
    } else {
      if (item.source === undefined && item.sourceId === undefined) { continue; }
    }

    let sourceKey = '';
    if (item.origin) {
      // sourceKey = `${item.origin.level}_${item.origin.sourceId}`;
      sourceKey = `${item.origin.url}`;
    } else {
      sourceKey = `${item.level}_${item.sourceId}`;
    }

    // 源数据映射
    if (origin) {
      if (origin.sourceMapping[sourceKey] === undefined) {
        origin.sourceMapping[sourceKey] = item;
        sourceMapping[sourceKey] = item;
      }
    } else {
      sourceMapping[sourceKey] = item;
    }
  }

  return {
    mapping,
    sourceMapping,
    mappingArr,
  };
}

export function treeify({ mapping, mappingArr }, origin) {
  const tree = [];
  const loadedKeys = [];

  for (let i = 0; i < mappingArr.length; i++) {
    const key = mappingArr[i];
    const item = origin ? origin.mapping[key] : mapping[key];
    const itemParent = origin ? origin.mapping[item['treeParentKey']] : mapping[item['treeParentKey']];

    // 当前项和父项是同一个时，表示是根节点
    // 找不到父项，表示是一级类别
    if (item === itemParent || itemParent === undefined) {
      // 路径
      item.treePath = item.treeKey;

      if (origin) {
        origin.tree.push(item);
      } else {
        tree.push(item);
      }
      continue;
    }

    // 路径
    item.treePath = itemParent.treePath + '|' + item.treeKey;

    // 加入父项
    itemParent.children ? itemParent.children.push(item) : itemParent.children = [item];

    // 加入已加载数组
    if (origin) {
      origin.loadedKeys.includes(itemParent['treeKey']) || origin.loadedKeys.push(itemParent['treeKey']);
    } else {
      loadedKeys.includes(itemParent['treeKey']) || loadedKeys.push(itemParent['treeKey']);
    }
  }

  return {
    tree,
    loadedKeys,
  };
}

export function tree(arr, origin, clean) {
  if (clean) {
    origin.mapping = {};
    origin.sourceMapping = {};
    origin.tree.length = 0;
    origin.loadedKeys.length = 0;
  }

  if (origin) {
    treeify(mappingify(arr, origin), origin);
    return origin;
  }

  const { mapping, sourceMapping, mappingArr } = mappingify(arr);
  const { tree, loadedKeys } = treeify({ mapping, mappingArr });

  return {
    mapping,
    sourceMapping,
    tree,
    loadedKeys,
  };
}


export function insertChildren(parent, children, parentId) {
  // 第一次
  if (parent === undefined) {
    return children;
  }
  
  // 深度复制
  const origin = clonedeep(parent);

  // 递归
  function loop(arr) {
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];

      if (item.key === parentId) {
        if (children.length === 0) {
          item.isLeaf = true;
        } else {
          item.children = children;
        }
        break;
      }

      if (item.children) {
        loop(item.children);
      }
    }
  }

  // 追加
  loop(origin);

  return origin;
}
