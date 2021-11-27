/* eslint-disable no-constant-condition */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import { memo, useEffect, VFC } from 'react';
import { Center, Wrap, WrapItem } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { useParams } from 'react-router-dom';

import { useFoods } from 'hooks/useFoods';
import { FoodCard } from 'components/organisms/food/FoodCard';
import BeefTongue from 'images/BeefTongue.svg';

export const Foods: VFC = memo(() => {
  const { getFoods, foods, loading } = useFoods();

  const { restaurantId } = useParams<{ restaurantId: string }>();

  useEffect(() => getFoods(restaurantId), []);

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        // 挙動確認用のdivタグを追加（Foodモーダル実装時にdivタグとレストランIDは削除）
        <div>
          レストラン：{restaurantId}
          <Wrap p={{ base: 4, md: 10 }} justify="space-around">
            {foods.map((food) => (
              <WrapItem key={food.id}>
                <FoodCard
                  imageUrl={BeefTongue}
                  foodName={food.name}
                  foodDescription={food.food_description}
                  foodPrice={food.price}
                />
              </WrapItem>
            ))}
          </Wrap>
        </div>
      )}
    </>
  );
});
