/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-constant-condition */
/* eslint-disable arrow-body-style */
import { memo, useCallback, useEffect, useState, VFC } from 'react';
import { Center, Wrap, WrapItem } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { useParams } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/hooks';

import { useFoods } from 'hooks/useFoods';
import { FoodCard } from 'components/organisms/food/FoodCard';
import BeefTongue from 'images/BeefTongue.svg';
import { FoodOrderModal } from 'components/organisms/food/FoodOrderModal';
import { useSelectFood } from 'hooks/useSelectFood';

export const Foods: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { getFoods, foods, loading } = useFoods();

  const { onSelectFood, selectedFood } = useSelectFood();

  const { restaurantId } = useParams<{ restaurantId: string }>();

  useEffect(() => getFoods(restaurantId), []);

  const onClickFood = useCallback(
    (id: number) => {
      onSelectFood({ id, foods, onOpen });
    },
    [foods, onSelectFood, onOpen]
  );

  // モーダルの注文個数用ステート
  const [count, setCount] = useState(1);

  const onClickUpCount = () => setCount(count + 1);

  const onClickDownCount = () => setCount(count - 1);

  const onClickOrder = () => alert();

  const onCloseFoodModal = () => {
    setCount(1);
    onClose();
  };

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
      <FoodOrderModal
        food={selectedFood}
        countNumber={count}
        isOpen={isOpen}
        onClose={onCloseFoodModal}
        onClickUpCount={onClickUpCount}
        onClickDownCount={onClickDownCount}
        onClickOrder={onClickOrder}
      />
    </>
  );
});
