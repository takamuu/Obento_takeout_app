/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import { memo, useCallback, useEffect, VFC } from 'react';
import { Center, Wrap, WrapItem } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { useHistory } from 'react-router';

import { useRestaurants } from 'hooks/useRestaurants';
import { RestaurantCard } from 'components/organisms/restaurant/RestaurantCard';
import HappyHour from 'images/HappyHour.jpg';

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
        <Wrap p={{ base: 4, md: 10 }} justify="space-around">
          {restaurants.map((restaurant) => (
            <WrapItem key={restaurant.id}>
              <RestaurantCard
                imageUrl={HappyHour}
                restaurantName={restaurant.name}
                onClick={() => onClickRestaurant(restaurant.id)}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
    </>
  );
});
