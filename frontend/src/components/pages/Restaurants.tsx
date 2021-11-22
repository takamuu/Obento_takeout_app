/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import { memo, useEffect, VFC } from 'react';
import { Center, Wrap, WrapItem } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';

import { useRestaurants } from 'hooks/useRestaurants';
import { RestaurantCard } from 'components/organisms/restaurant/RestaurantCard';
import HappyHour from 'images/HappyHour.jpg';
// import { Restaurant } from 'types/api/restaurant';

export const Restaurants: VFC = memo(() => {
  const { getRestaurants, restaurants, loading } = useRestaurants();

  useEffect(() => getRestaurants(), []);
  console.log(restaurants);

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

// import { memo, useEffect, VFC } from 'react';
// import { Link } from 'react-router-dom';

// import { fetchRestaurants } from 'apis/restaurants';

// export const Restaurants: VFC = memo(() => {
//   useEffect(() => {
//     fetchRestaurants().then((data) => {
//       console.log(data);
//     });
//   }, []);
//   return (
//     <div>
//       <p>HOMEページ = レストラン一覧ページ</p>
//       <br />
//       <Link to="/restaurants/100/foods">Foods</Link>
//       <br />
//       <Link to="/restaurants/100/foods?name=hogehoge">Query Parameter</Link>
//     </div>
//   );
// });
