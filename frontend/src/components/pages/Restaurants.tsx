import { memo, VFC } from 'react';
import { Wrap, WrapItem } from '@chakra-ui/layout';

import HappyHour from 'images/HappyHour.jpg';
import { RestaurantCard } from 'components/organisms/restaurant/RestaurantCard';
export const Restaurants: VFC = memo(() => {
  return (
    <Wrap p={{ base: 4, md: 10 }}>
      <WrapItem>
        <RestaurantCard imageUrl={HappyHour} restaurantName="HappyHour" />
      </WrapItem>
    </Wrap>
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
