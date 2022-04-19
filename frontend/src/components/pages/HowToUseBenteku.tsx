/* eslint-disable arrow-body-style */
import { memo, VFC } from 'react';
import {
  Box,
  Divider,
  Flex,
  HStack,
  Spacer,
  Stack,
  Text,
  VStack,
  Wrap,
} from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import SelectADish from 'images/SelectADish.jpg';
import PlaceOrder from 'images/PlaceOrder.jpg';
import PickUp from 'images/PickUp.jpg';

export const HowToUseBenteku: VFC = memo(() => {
  return (
    <VStack h={{ sm: '118vh', md: '60vh' }}>
      <Text
        paddingTop={{ sm: '12', md: '20' }}
        paddingBottom={{ sm: '16' }}
        fontSize="28px"
        fontWeight="bold"
        color="brand"
      >
        弁テクの使い方
      </Text>
      <HStack display={{ sm: 'none', md: 'flex' }}>
        <Image w={{ md: '250px' }} src={SelectADish} />
        <Spacer p={2} />
        <Image w={{ md: '250px' }} src={PlaceOrder} />
        <Image w={{ md: '250px' }} src={PickUp} />
      </HStack>
      <VStack display={{ sm: 'flex', md: 'none' }} spacing={10}>
        <Image w={{ sm: '250px' }} src={SelectADish} />
        <Image w={{ sm: '250px' }} src={PlaceOrder} />
        <Image w={{ sm: '250px' }} src={PickUp} />
      </VStack>
      <Spacer p={6} />
    </VStack>
  );
});
