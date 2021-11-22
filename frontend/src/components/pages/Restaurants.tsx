/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import { memo, useEffect, VFC } from 'react';
import { Center, Wrap, WrapItem } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';

import { useRestaurants } from 'hooks/useRestaurants';
import { RestaurantCard } from 'components/organisms/restaurant/RestaurantCard';
import HappyHour from 'images/HappyHour.jpg';

export const Restaurants: VFC = memo(() => {
  const { getRestaurants, restaurants, loading } = useRestaurants();

  useEffect(() => getRestaurants(), []);

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }} justify="space-around">
          {restaurants.map((restaurant) => (
            <WrapItem key={restaurant.id}>
              <RestaurantCard
                imageUrl={HappyHour}
                restaurantName={restaurant.name}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
    </>
  );
});
