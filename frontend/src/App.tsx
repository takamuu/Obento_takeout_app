import { BrowserRouter, Link } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import theme from './theme/theme';
import { Router } from './router/Router';

export default function App(): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <Link to="/login">Login</Link>
          <br />
          <Link to="/login/user_management">UserManagement</Link>
          <br />
          <Link to="/login/setting">Setting</Link>
          <br />
          <Link to="/restaurants">Restarants</Link>
          <br />
          <Link to="/foods">Foods</Link>
          <br />
          <Link to="/cart">Cart</Link>
        </div>
        <Router />
      </BrowserRouter>
    </ChakraProvider>
  );
}
