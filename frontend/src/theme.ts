import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: 'white',
        color: 'gray.800',
      },
    },
  },
  colors: {
    brand: '#08262E',
  },
});

export default theme;
