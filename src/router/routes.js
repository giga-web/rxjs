import routes from './routesConfig';

// 路由映射
export const routeMap = routes.reduce((result, route) => {
  result[route.url] = route;
  return result;
}, {});

// 路由树 (通过 url 的关系来确定路由的父子关系)
export const routeTree = [];

for (let i = 0; i < routes.length; i++) {
  const route = routes[i];

  // 根节点
  if (['/', '/auth'].includes(route.url)) {
    routeTree.push(route);
    continue; 
  }

  // 分解 url
  const parentUrls = urlToList(route.url);

  // 循环查找父级，并插入，跳出
  for (let p = 0; p < parentUrls.length; p++) {
    const parentUrl = parentUrls[p];
    const parent = routeMap[parentUrl];

    if (parent) {
      if (parent.children) {
        parent.children.push(route);
      } else {
        parent.children = [route];
      }
      break;
    }
  }
}

/**
 * 分解 url
 * /auth/login -> ["/auth", "/"]
 */
function urlToList(url) {
  // 字符串转数组：/dsb/workspace -> ["auth", "login"]
  const arr = url.split("/").filter(i => i);

  // 数组转列表：["auth", "login"] -> ["/auth", "/auth/login"]
  const list = arr.map((item, index) => {
    return `/${arr.slice(0, index + 1).join("/")}`;
  });

  // 末位删除：["/auth", "/auth/login"] -> ["/auth"]
  list.pop();

  // 首位追加：["/auth"] -> ["/", "/auth"]
  list.unshift('/');

  // 反向：["/", "/auth"] -> ["/auth", "/"]
  list.reverse();

  return list;
}
