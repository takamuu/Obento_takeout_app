/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import { memo, useCallback, useEffect, VFC } from 'react';
import {
  Box,
  Center,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { useHistory } from 'react-router';
import { Image, Skeleton } from '@chakra-ui/react';

import { useRestaurants } from 'hooks/useRestaurants';
import { RestaurantCard } from 'components/organisms/restaurant/RestaurantCard';
import Toppageimage from 'images/Toppageimage.svg';

export const Restaurants: VFC = memo(() => {
  const { getRestaurants, restaurants, loading } = useRestaurants();

  useEffect(() => getRestaurants(), []);

  const history = useHistory();

  const onClickRestaurant = useCallback(
    (restaurantId) => history.push(`/restaurants/${restaurantId}/foods`),
    []
  );

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <div>
          <Wrap paddingTop="20" justify="center">
            <Stack display={{ sm: 'flex', md: 'none' }}>
              <Text
                paddingTop="5"
                w="full"
                fontFamily={'sans-serif'}
                fontSize={['18px', '22px']}
                fontWeight={'bold'}
                color="brand"
              >
                おトクでカンタンお弁当テイクアウト
              </Text>
            </Stack>
            <HStack>
              <VStack display={{ sm: 'none', md: 'flex' }}>
                <Text
                  w="full"
                  fontFamily={'sans-serif'}
                  fontSize={['', '', '24px', '38px']}
                  fontWeight={'bold'}
                  color="brand"
                  paddingLeft={'px'}
                >
                  おトクで
                </Text>
                <Text
                  w="full"
                  fontFamily={'sans-serif'}
                  fontSize={['', '', '24px', '38px']}
                  fontWeight={'bold'}
                  color="brand"
                  paddingLeft={5}
                >
                  カンタン
                </Text>
                <Text
                  w="full"
                  fontFamily={'sans-serif'}
                  fontSize={['', '', '24px', '38px']}
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
          <Wrap spacing="0" justify="space-evenly" paddingTop={6}>
            {restaurants.map((restaurant) => (
              <WrapItem key={restaurant.id}>
                <RestaurantCard
                  imageUrl={`${process.env.PUBLIC_URL}${restaurant.image}`}
                  restaurantName={restaurant.name}
                  restaurantDescription={restaurant.description}
                  onClick={() => onClickRestaurant(restaurant.id)}
                />
              </WrapItem>
            ))}
          </Wrap>
        </div>
      )}
    </>
  );
});
