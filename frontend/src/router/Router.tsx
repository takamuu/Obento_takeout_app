import { memo, VFC } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Foods } from 'components/pages/Foods';
import { Cart } from 'components/pages/Cart';
import { loginRoutes } from './LoginRoutes';
import { Restaurants } from 'components/pages/Restaurants';
import { Page404 } from 'components/pages/Page404';

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
        render={(props) => {
          return (
            <Switch>
              {console.log(props)}
              <Restaurants />
            </Switch>
          );
        }}
      />
      <Route
        path="/foods"
        render={(props) => {
          return (
            <Switch>
              {console.log(props)}
              <Foods />
            </Switch>
          );
        }}
      />
      <Route
        path="/Cart"
        render={(props) => {
          return (
            <Switch>
              {console.log(props)}
              <Cart />
            </Switch>
          );
        }}
      />
      <Route>
        <Page404 />
      </Route>
    </Switch>
  );
});

Router.displayName = 'Router';
