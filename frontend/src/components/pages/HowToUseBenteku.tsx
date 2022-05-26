/* eslint-disable arrow-body-style */
import { memo, useEffect, VFC } from 'react';
import { HStack, Spacer, Text, VStack } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import SelectADish from 'images/SelectADish.svg';
import PlaceOrder from 'images/PlaceOrder.svg';
import PickUp from 'images/PickUp.svg';

export const HowToUseBenteku: VFC = memo(() => {
  useEffect(() => window.scrollTo(0, 0));
  return (
    <VStack>
      <Text
        paddingTop={{ base: '12', md: '20' }}
        paddingBottom={{ base: '16' }}
        fontSize="28px"
        fontWeight="bold"
        color="brand"
      >
        弁テクの使い方
      </Text>
      <HStack
        display={{ base: 'none', md: 'flex' }}
        spacing={{ md: '10', lg: '20' }}
      >
        <Image w={{ md: '220px' }} src={SelectADish} />
        <Image w={{ md: '220px' }} src={PlaceOrder} />
        <Image w={{ md: '220px' }} src={PickUp} />
      </HStack>
      <VStack display={{ base: 'flex', md: 'none' }} spacing={10}>
        <Image w={{ base: '250px' }} src={SelectADish} />
        <Image w={{ base: '250px' }} src={PlaceOrder} />
        <Image w={{ base: '250px' }} src={PickUp} />
      </VStack>
      <Spacer p={20} />
    </VStack>
  );
});
