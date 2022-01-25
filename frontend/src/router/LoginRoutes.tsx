import { Login } from 'components/pages/Login';
import { UserManagement } from 'components/pages/UserManagement';
import { Setting } from 'components/pages/Setting';
import { Page404 } from 'components/pages/Page404';
import { NewRegistration } from 'components/pages/NewRegistration';

export const loginRoutes = [
  {
    path: '/',
    exact: true,
    children: <Login />,
  },
  {
    path: '/new_registration',
    exact: false,
    children: <NewRegistration />,
  },
  {
    path: '/user_management',
    exact: false,
    children: <UserManagement />,
  },
  {
    path: '/setting',
    exact: false,
    children: <Setting />,
  },
  {
    path: '*',
    exact: false,
    children: <Page404 />,
  },
];
