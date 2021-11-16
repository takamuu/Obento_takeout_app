/* eslint-disable arrow-body-style */
import { memo, VFC } from 'react';
import { Route, Switch } from 'react-router-dom';

import { loginRoutes } from './LoginRoutes';
import { Page404 } from 'components/pages/Page404';
import { restaurantsRoutes } from './RestaurantsRoutes';
import { HeaderLayout } from 'components/templates/HeaderLayout';

export const Router: VFC = memo(() => {
  return (
    <Switch>
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
        path="/restaurants"
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
      <Route>
        <Page404 />
      </Route>
    </Switch>
  );
});
