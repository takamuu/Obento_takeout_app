import { BrowserRouter, Link } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import theme from './theme/theme';
import { Router } from './router/Router';

export default function App(): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ChakraProvider>
  );
}
