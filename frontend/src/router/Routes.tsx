import { Restaurants } from 'components/pages/Restaurants';
import { Foods } from 'components/pages/Foods';
import { Cart } from 'components/pages/Cart';
import { Page404 } from 'components/pages/Page404';
import { Contact } from 'components/pages/Contact';
import { HowToUseBenteku } from 'components/pages/HowToUseBenteku';
import { TermsOfUse } from 'components/pages/TermsOfUse';
import { Policy } from 'components/pages/Policy';
import { OrderHistory } from 'components/pages/OrderHistory';
import { MyPage } from 'components/pages/MyPage';
import { NewUserRegistration } from 'components/pages/NewUserRegistration';
import { Login } from 'components/pages/Login';

export const Routes = [
  {
    path: '/',
    exact: true,
    children: <Restaurants />,
  },
  {
    path: 'restaurants/:restaurantId/foods',
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
    path: 'how_to_use_benteku',
    exact: false,
    children: <HowToUseBenteku />,
  },
  {
    path: 'policy',
    exact: false,
    children: <Policy />,
  },
  {
    path: 'terms_of_use',
    exact: false,
    children: <TermsOfUse />,
  },
  {
    path: 'order_history',
    exact: false,
    children: <OrderHistory />,
  },
  {
    path: 'login',
    exact: false,
    children: <Login />,
  },
  {
    path: 'new_user_registration',
    exact: false,
    children: <NewUserRegistration />,
  },
  {
    path: 'my_page',
    exact: false,
    children: <MyPage />,
  },
  {
    path: '*',
    exact: false,
    children: <Page404 />,
  },
];
