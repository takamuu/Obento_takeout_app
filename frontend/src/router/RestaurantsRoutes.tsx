import { Restaurants } from 'components/pages/Restaurants';
import { Foods } from 'components/pages/Foods';
import { Cart } from 'components/pages/Cart';
import { Page404 } from 'components/pages/Page404';
import { Contact } from 'components/pages/Contact';
import { HowToUseBenteku } from 'components/pages/HowToUseBenteku';
import { MyPage } from 'components/pages/MyPage';
import { TermsOfUse } from 'components/pages/TermsOfUse';
import { Policy } from 'components/pages/Policy';
import { CommercialTransactionsLaw } from 'components/pages/CommercialTransactionsLaw';
import { PurchaseHistory } from 'components/pages/PurchaseHistory';

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
    path: 'how_to_use_benteku',
    exact: false,
    children: <HowToUseBenteku />,
  },
  {
    path: 'my_page',
    exact: false,
    children: <MyPage />,
  },
  {
    path: 'policy',
    exact: false,
    children: <Policy />,
  },
  {
    path: 'commercial_transactions_law',
    exact: false,
    children: <CommercialTransactionsLaw />,
  },
  {
    path: 'terms_of_use',
    exact: false,
    children: <TermsOfUse />,
  },
  {
    path: 'purchase_history',
    exact: false,
    children: <PurchaseHistory />,
  },
  {
    path: '*',
    exact: false,
    children: <Page404 />,
  },
];
