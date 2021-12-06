/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-constant-condition */
/* eslint-disable arrow-body-style */
import { memo, useCallback, useEffect, useState, VFC } from 'react';
import { Center, Heading, Wrap, WrapItem } from '@chakra-ui/layout';
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
    (selectFoodId: number) => {
      onSelectFood({ selectFoodId, foods, onOpen });
    },
    [foods, onSelectFood, onOpen]
  );

  // モーダルの注文個数用ステート
  const INITIAL_COUNT = 1;

  const [count, setCount] = useState(INITIAL_COUNT);

  const onClickUpCount = () => setCount(count + 1);

  const onClickDownCount = () => setCount(count - 1);

  const onClickCart = () => alert();

  const onCloseFoodModal = () => {
    setCount(INITIAL_COUNT);
    onClose();
  };

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap>
          <Heading> レストラン：{restaurantId}</Heading>
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
        </Wrap>
      )}
      <FoodOrderModal
        food={selectedFood}
        countNumber={count}
        isOpen={isOpen}
        onClose={onCloseFoodModal}
        onClickUpCount={onClickUpCount}
        onClickDownCount={onClickDownCount}
        onClickCart={onClickCart}
      />
    </>
  );
});
