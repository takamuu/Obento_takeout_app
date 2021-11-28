/* eslint-disable no-constant-condition */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import { memo, useCallback, useEffect, VFC } from 'react';
import { Center, Wrap, WrapItem } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { useParams } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/hooks';

import { useFoods } from 'hooks/useFoods';
import { FoodCard } from 'components/organisms/food/FoodCard';
import BeefTongue from 'images/BeefTongue.svg';
import { FoodDetailModal } from 'components/organisms/food/FoodDetailModal';

export const Foods: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { getFoods, foods, loading } = useFoods();

  const { restaurantId } = useParams<{ restaurantId: string }>();

  useEffect(() => getFoods(restaurantId), []);

  const onClickFood = useCallback((id: number) => {
    console.log(id);
    onOpen();
  }, []);

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
                  id={food.id}
                  imageUrl={BeefTongue}
                  foodName={food.name}
                  foodDescription={food.food_description}
                  foodPrice={food.price}
                  onClick={onClickFood}
                />
              </WrapItem>
            ))}
          </Wrap>
        </div>
      )}
      <FoodDetailModal isOpen={isOpen} onClose={onClose} />
    </>
  );
});
