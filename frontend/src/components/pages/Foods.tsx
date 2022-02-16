/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-constant-condition */
/* eslint-disable arrow-body-style */
import { memo, useCallback, useEffect, VFC } from 'react';
import {
  Center,
  HStack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { useHistory, useParams } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/hooks';

import { useFoods } from 'hooks/useFoods';
import { FoodCard } from 'components/organisms/food/FoodCard';
import { FoodOrderModal } from 'components/organisms/food/FoodOrderModal';
import { useSelectFood } from 'hooks/useSelectFood';
import { Image } from '@chakra-ui/react';
import { CartModal } from 'components/organisms/cart/CartModal';

export const Foods: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();

  const { getFoods, foods, loading } = useFoods();

  const { onSelectFood, selectedFood } = useSelectFood();

  const { restaurantId } = useParams<{ restaurantId: string }>();

  const history = useHistory();

  // レストランページから店舗情報を受取る
  const resultState = history.location.state;

  const restaurant = resultState['restaurant'];

  useEffect(() => {
    getFoods(restaurantId);
  }, []);

  const onClickFood = useCallback(
    (selectFoodId: number) => {
      onSelectFood({ selectFoodId, foods, onOpen });
    },
    [foods, onSelectFood, onOpen]
  );

  const onClickHome = useCallback(() => history.push(`/`), []);

  const onCloseFoodModal = () => {
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
          <VStack
            paddingTop={10}
            w="full"
            justify={'center'}
            display={{ sm: 'flex', md: 'none' }}
          >
            <Image
              w="200px"
              _hover={{ cursor: 'pointer', opacity: 0.8 }}
              onClick={onClickHome}
              src={`${process.env.PUBLIC_URL}${restaurant.image}`}
            />
            <Text fontFamily={'sans-serif'} fontWeight={'bold'} color="brand">
              {restaurant.name}
            </Text>
          </VStack>
          <HStack
            paddingTop={{ sm: 'none', md: '10' }}
            w="full"
            justify={'center'}
          >
            <VStack display={{ sm: 'none', md: 'flex' }}>
              <Image
                w="200px"
                _hover={{ cursor: 'pointer', opacity: 0.8 }}
                onClick={onClickHome}
                src={`${process.env.PUBLIC_URL}${restaurant.image}`}
              />
              <Text
                fontFamily={'sans-serif'}
                fontWeight={'bold'}
                color="brand"
                textAlign={'center'}
              >
                {restaurant.name}
              </Text>
            </VStack>
            <VStack paddingBottom={{ sm: '10', md: '0' }}>
              <Center
                w={{ sm: '400px', md: '500px' }}
                h={{ sm: '200px', md: '270px' }}
                bg="gray.200"
              >
                Google Map
              </Center>
              <Text
                fontFamily={'sans-serif'}
                fontWeight={'bold'}
                color="brand"
                textAlign={'center'}
              >
                {restaurant.city}
                {restaurant.block_building}／ TEL {restaurant.phone_number}
              </Text>
            </VStack>
          </HStack>
          <Wrap p={{ base: 4, md: 10 }} justify={'center'}>
            {foods.map((food) => (
              <WrapItem key={food.id}>
                <FoodCard
                  id={food.id}
                  imageUrl={`${process.env.PUBLIC_URL}${food.image}`}
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
        isOpen={isOpen}
        onClose={onCloseFoodModal}
        // onClickCart={onClickCart}
      />
      {/* <CartModal
      isOpen={isOpenCart}
      onClose={onCloseCartModal} */}
    </>
  );
});
