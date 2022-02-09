/* eslint-disable arrow-body-style */
import { memo, VFC } from 'react';
import { Route, Switch } from 'react-router-dom';

import { loginRoutes } from './LoginRoutes';
import { Page404 } from 'components/pages/Page404';
import { restaurantsRoutes } from './RestaurantsRoutes';
import { HeaderLayout } from 'components/templates/HeaderLayout';
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
                  {route.children}
                </Route>
              ))}
            </Switch>
          )}
        />
        <Route
          path="/"
          render={({ match: { url } }) => (
            <Switch>
              {restaurantsRoutes.map((route) => (
                <Route
                  key={route.path}
                  exact={route.exact}
                  path={`${url}${route.path}`}
                >
                  <HeaderLayout>{route.children}</HeaderLayout>
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
