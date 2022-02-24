/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import { memo, useCallback, useEffect, useState, VFC } from 'react';
import { Box, Center, Text, VStack, Wrap, WrapItem } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';

import { CartButton } from 'components/atoms/button/CartButton';
import { CartCard } from 'components/organisms/cart/CartCard';
import { useCartIndex } from 'hooks/useCartIndex';
import { NewCarts } from 'types/api/newCarts';

export const Cart: VFC = memo(() => {
  const { carts, loading } = useCartIndex();
  const [newCarts, setNewCarts] = useState<NewCarts>([]);

  useEffect(() => {
    setNewCarts(
      carts.map((cart) => ({
        id: cart.food.id,
        amount: cart.count * cart.food.price,
        count: cart.count,
        name: cart.food.name,
        price: cart.food.price,
        food: cart.food,
      }))
    );
  }, [carts]);

  const onClickOrderButton = useCallback(() => {
    alert('stripe決済ページを飛ばして受取票ページへ遷移');
  }, []);

  // Calculate the total amount

  const totalAmount = newCarts.reduce(
    (total, newCart) => total + newCart.amount,
    0
  );

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap justify={'center'}>
          <Box fontSize={'4xl'} p={4} w={'full'} textAlign={'center'}>
            カートページ
          </Box>
          <Wrap p={{ base: 4, md: 10 }}>
            {newCarts ? (
              <>
                <VStack>
                  {newCarts.map((cart, i) => (
                    <WrapItem key={i}>
                      <CartCard
                        food={cart.food}
                        foodName={cart.food.name}
                        count={cart.count}
                        price={cart.price}
                        onChangeCount={(newCount) => {
                          setNewCarts((s) =>
                            s.map((newCart) => {
                              if (newCart.id !== cart.food.id) return newCart;
                              return {
                                ...newCart,
                                amount: cart.food.price * newCount,
                                count: newCount,
                              };
                            })
                          );
                        }}
                      />
                    </WrapItem>
                  ))}
                </VStack>
              </>
            ) : (
              <p>カートはありません</p>
            )}
          </Wrap>
          <VStack w={'full'} h="30vh">
            <Box
              color={'gray.300'}
              borderTop={'2px'}
              bg="twitter.100"
              w={'400px'}
              verticalAlign={'center'}
            ></Box>
            <Text
              p={4}
              color={'brand'}
              fontSize={'2xl'}
              fontWeight={'bold'}
              verticalAlign={'center'}
            >
              合計 {`¥${totalAmount.toLocaleString()}`}
            </Text>
            <CartButton onClick={() => onClickOrderButton()}>
              <Text p={2}>注文する</Text>
            </CartButton>
          </VStack>
        </Wrap>
      )}
    </>
  );
});
