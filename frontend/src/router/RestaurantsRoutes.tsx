import { Restaurants } from 'components/pages/Restaurants';
import { Foods } from 'components/pages/Foods';
import { Cart } from 'components/pages/Cart';
import { Page404 } from 'components/pages/Page404';
import { Contact } from 'components/pages/Contact';

export const restaurantsRoutes = [
  {
    path: '/',
    exact: true,
    children: <Restaurants />,
  },
  {
    path: ':restaurantId/foods',
    exact: false,
    children: <Foods />,
  },
  {
    path: 'cart',
    exact: false,
    children: <Cart />,
  },
  {
    path: 'contact',
    exact: false,
    children: <Contact />,
  },
  {
    path: '*',
    exact: false,
    children: <Page404 />,
  },
];
