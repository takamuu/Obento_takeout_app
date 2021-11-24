/* eslint-disable no-constant-condition */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import { memo, useEffect, VFC } from 'react';
import { Center, Wrap, WrapItem } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';

import { useFoods } from 'hooks/useFoods';
import { FoodCard } from 'components/organisms/food/FoodCard';
import 牛タン弁当 from 'images/牛タン弁当.svg';
import { useParams } from 'react-router-dom';

type IdType = {
  restaurantId: string;
};

export const Foods: VFC = memo(() => {
  const { getFoods, foods, loading } = useFoods();
  const { restaurantId } = useParams<IdType>();

  useEffect(() => getFoods(restaurantId), []);

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }} justify="space-around">
          {foods.map((food) => (
            <WrapItem key={food.id}>
              <FoodCard
                imageUrl={牛タン弁当}
                foodName={food.name}
                foodDescription={food.food_description}
                foodPrice={food.price}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
    </>
  );
});

// Foodsページ実装時にコメントアウト解除予定（エラーが出るので一時的にコメントアウト）

// import { fetchRestaurants } from 'apis/restaurants';
// import { memo, useEffect, VFC } from 'react';
// import { useParams, useLocation } from 'react-router';

// type IdType = {
//   restaurantId: string;
// };

// export const Foods: VFC = memo(() => {
//   useEffect(() => {
//     fetchRestaurants().then((data) => {
//       console.log(data);
//     });
//   }, []);
//   const { restaurantId } = useParams<IdType>();
//   const { search } = useLocation();
//   const query = new URLSearchParams(search);
//   console.log(query);
//   return (
//     <div>
//       <h1>Foodsページ</h1>
//       <p>restaurantIdは {restaurantId}</p>
//       <p>クエリパラメーターは{query.get('name')}です</p>
//       {/* <p>{data}</p> */}
//     </div>
//   );
// });
