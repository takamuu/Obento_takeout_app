import { Restaurants } from 'components/pages/Restaurants';
import { Foods } from 'components/pages/Foods';

export const restaurantsRoutes = [
  {
    path: '/',
    exact: true,
    children: <Restaurants />,
  },
  {
    path: '/:restaurantId/foods',
    exact: false,
    children: <Foods />,
  },
];
