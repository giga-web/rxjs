/* 开源-组件 */
import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
/* 自研-工具 */
import { history } from 'dva';
/* 自研-组件 */
import asyncRouter from '@/router/asyncRouter';
import Exception404 from '@/pages/error/http/404';
/* 路由-配置 */
import { routeTree } from '@/router/routes';

// ============================================================
// 递归生成路由
function renderRoutes (tree) {
  // console.log('renderRoutes');
  return tree.map((route, index) => {
    if (route.children) {
      return (
        <Route
          key={index}
          path={route.url}
          render={(props) => {
            const ParentRoute = asyncRouter();
            return (
              <ParentRoute {...props} route={route}>
                <Switch location={props.location}>
                  {route.redirect && <Redirect exact from={route.url} to={route.redirect} />}
                  {renderRoutes(route.children)}
                </Switch>
              </ParentRoute>
            );
          }}
        />
      );
    } else {
      return (
        <Route
          key={index}
          path={route.url}
          render={(props) => {
            const ChildRouter = asyncRouter();
            return (
              <ChildRouter {...props} route={route} />
            );
          }}
          exact
        />
      );
    }
  });
}
// ============================================================


export default function RouterWrapper () {
  // console.log('RouterWrapper');
  return (
    <Router history={history}>
      <Switch>
        {renderRoutes(routeTree)}
        <Route render={Exception404} />
      </Switch>
    </Router>
  )
}
