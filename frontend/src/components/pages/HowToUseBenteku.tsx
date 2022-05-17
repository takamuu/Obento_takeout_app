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
    <VStack h={{ sm: '140vh', md: '72vh' }}>
      <Text
        paddingTop={{ sm: '12', md: '20' }}
        paddingBottom={{ sm: '16' }}
        fontSize="28px"
        fontWeight="bold"
        color="brand"
      >
        弁テクの使い方
      </Text>
      <HStack
        display={{ sm: 'none', md: 'flex' }}
        spacing={{ md: '10', lg: '20' }}
      >
        <Image w={{ md: '220px' }} src={SelectADish} />
        <Image w={{ md: '220px' }} src={PlaceOrder} />
        <Image w={{ md: '220px' }} src={PickUp} />
      </HStack>
      <VStack display={{ sm: 'flex', md: 'none' }} spacing={10}>
        <Image w={{ sm: '250px' }} src={SelectADish} />
        <Image w={{ sm: '250px' }} src={PlaceOrder} />
        <Image w={{ sm: '250px' }} src={PickUp} />
      </VStack>
      <Spacer p={20} />
    </VStack>
  );
});
