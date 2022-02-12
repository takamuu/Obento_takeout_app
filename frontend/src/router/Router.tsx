/* eslint-disable arrow-body-style */
import { memo, VFC } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Page404 } from 'components/pages/Page404';
import { Routes } from './Routes';
import { HeaderFooterLayout } from 'components/templates/HeaderFooterLayout';
import { LoginUserProvider } from 'providers/LoginUserProvider';

export const Router: VFC = memo(() => {
  return (
    <Switch>
      <LoginUserProvider>
        <Route
          path="/"
          render={({ match: { url } }) => (
            <Switch>
              {Routes.map((route) => (
                <Route
                  key={route.path}
                  exact={route.exact}
                  path={`${url}${route.path}`}
                >
                  <HeaderFooterLayout>{route.children}</HeaderFooterLayout>
                </Route>
              ))}
            </Switch>
          )}
        />
      </LoginUserProvider>
      <Route>
        <Page404 />
      </Route>
    </Switch>
  );
});
