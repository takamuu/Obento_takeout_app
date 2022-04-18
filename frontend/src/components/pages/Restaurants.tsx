/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import { memo, useCallback, useEffect, VFC } from 'react';
import {
  Center,
  HStack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { useHistory } from 'react-router';
import { Image } from '@chakra-ui/react';

import { useRestaurants } from 'hooks/useRestaurants';
import { RestaurantCard } from 'components/organisms/restaurant/RestaurantCard';
import Toppageimage from 'images/Toppageimage.svg';

export const Restaurants: VFC = memo(() => {
  const { getRestaurants, restaurants, loading } = useRestaurants();
  useEffect(() => getRestaurants(), []);

  const history = useHistory();

  const onClickRestaurant = useCallback(
    (restaurant) =>
      history.push({
        pathname: `restaurants/${restaurant.id}/foods`,
        state: { restaurant },
      }),
    []
  );

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <>
          <Wrap justify={'center'}>
            <Text
              paddingTop="5"
              paddingBottom="5"
              w="full"
              fontFamily={'sans-serif'}
              fontSize={'22px'}
              textColor={'brand'}
              justifyContent={'center'}
              display={{ sm: 'flex', md: 'none' }}
              fontWeight={'bold'}
            >
              おトクでカンタンお弁当テイクアウト
            </Text>
            <HStack>
              <VStack display={{ sm: 'none', md: 'flex' }}>
                <Text
                  w="full"
                  fontFamily={'sans-serif'}
                  fontSize={{ md: '24px', lg: '38px' }}
                  fontWeight={'bold'}
                  color="brand"
                  paddingLeft={'px'}
                >
                  おトクで
                </Text>
                <Text
                  w="full"
                  fontFamily={'sans-serif'}
                  fontSize={{ md: '24px', lg: '38px' }}
                  fontWeight={'bold'}
                  color="brand"
                  paddingLeft={5}
                >
                  カンタン
                </Text>
                <Text
                  w="full"
                  fontFamily={'sans-serif'}
                  fontSize={{ md: '24px', lg: '38px' }}
                  fontWeight={'bold'}
                  color="brand"
                  paddingLeft={10}
                >
                  お弁当テイクアウト
                </Text>
              </VStack>
              <WrapItem>
                <Image
                  maxW="600px"
                  w={['300px', '400px', '500px', '600px']}
                  src={Toppageimage}
                />
              </WrapItem>
            </HStack>
          </Wrap>
          <Wrap
            spacing="0"
            justify="space-evenly"
            paddingTop={6}
            paddingBottom={32}
          >
            {restaurants.map((restaurant) => (
              <WrapItem key={restaurant.id}>
                <RestaurantCard
                  imageUrl={`${process.env.PUBLIC_URL}${restaurant.image}`}
                  restaurantName={restaurant.name}
                  restaurantDescription={restaurant.description}
                  onClick={() => onClickRestaurant(restaurant)}
                />
              </WrapItem>
            ))}
          </Wrap>
        </>
      )}
    </>
  );
});
