/* eslint-disable arrow-body-style */
import { memo, VFC } from 'react';
import { Route, Switch } from 'react-router-dom';

import { loginRoutes } from './LoginRoutes';
import { Page404 } from 'components/pages/Page404';
import { restaurantsRoutes } from './RestaurantsRoutes';
import { HeaderFooterLayout } from 'components/templates/HeaderFooterLayout';
import { LoginUserProvider } from 'providers/LoginUserProvider';

export const Router: VFC = memo(() => {
  return (
    <Switch>
      <LoginUserProvider>
        <Route
          path="/login"
          render={({ match: { url } }) => (
            <Switch>
              {loginRoutes.map((route) => (
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
        <Route
          path="/restaurants"
          render={({ match: { url } }) => (
            <Switch>
              {restaurantsRoutes.map((route) => (
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
