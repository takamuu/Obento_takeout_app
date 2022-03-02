/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import { memo, useCallback, useEffect, useState, VFC } from 'react';
import { Box, Center, Text, VStack, Wrap, WrapItem } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';

import { CartButton } from 'components/atoms/button/CartButton';
import { CartCard } from 'components/organisms/cart/CartCard';
import { useCartIndex } from 'hooks/useCartIndex';
import { NewCarts } from 'types/api/newCarts';
import { useDeleteCartDetails } from 'hooks/useDeleteCartDetails';
import { useReplaceCart } from 'hooks/useReplaceCart';

export const Cart: VFC = memo(() => {
  const { carts, loading } = useCartIndex();
  const [newCarts, setNewCarts] = useState<NewCarts>([]);
  const { replaceCart } = useReplaceCart();

  useEffect(() => {
    if (carts.length)
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

  const { deleteCartDetails } = useDeleteCartDetails();

  const onClickDelete = useCallback((foodId: string) => {
    deleteCartDetails(foodId);
    if (carts.length)
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
  }, []);

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
            {newCarts.length ? (
              <>
                <VStack>
                  {newCarts.map((cart, i) => (
                    <WrapItem key={i}>
                      <CartCard
                        foodId={String(cart.food.id)}
                        foodName={cart.food.name}
                        count={cart.count}
                        price={cart.price}
                        onClick={() => {
                          onClickDelete(String(cart.food.id));
                        }}
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
                          {
                            replaceCart({
                              food: cart.food,
                              count: newCount,
                            });
                          }
                        }}
                      />
                    </WrapItem>
                  ))}
                </VStack>
              </>
            ) : (
              <p>カートの中に商品はありません</p>
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
