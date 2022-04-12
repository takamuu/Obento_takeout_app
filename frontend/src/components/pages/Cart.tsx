/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import { memo, useEffect, useState, VFC } from 'react';
import { Box, Center, Text, VStack, Wrap, WrapItem } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';

import { CartButton } from 'components/atoms/button/CartButton';
import { CartCard } from 'components/organisms/cart/CartCard';
import { useCartIndex } from 'hooks/useCartIndex';
import { NewCarts } from 'types/api/newCarts';
import { useDeleteCartDetails } from 'hooks/useDeleteCartDetails';
import { useUpdateCartDetails } from 'hooks/useUpdateCartDetails';
import { usePostOrders } from 'hooks/usePostOrders';
import { useLoginUser } from 'hooks/useLoginUser';
import { useDisclosure } from '@chakra-ui/react';
import { ReceiptModal } from 'components/organisms/order/ReceiptModal';

export const Cart: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loginUser } = useLoginUser();
  const { carts, loading } = useCartIndex();
  const { updateCart } = useUpdateCartDetails();
  const { deleteCartDetails } = useDeleteCartDetails();
  const { postOrders, order, loading: orderLoading } = usePostOrders();
  const [newCarts, setNewCarts] = useState<NewCarts>([]);

  const totalAmount = newCarts.reduce(
    (total, newCart) => total + newCart.amount,
    0
  );
  const display = (newCarts) => {
    if (newCarts.length) {
      return 'block';
    } else {
      return 'none';
    }
  };

  const onOrderButton = async (userId: string) => {
    await postOrders(userId).then(() => {
      onOpen();
    });
  };

  const onClickDelete = (foodId: string) => {
    deleteCartDetails(foodId);
    setNewCarts((s) => s.filter((cart) => String(cart.food.id) !== foodId));
  };

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
                        onDelete={() => {
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
                            updateCart({
                              food_id: cart.food.id,
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
              <Text fontSize={'xl'} fontWeight={'bold'}>
                カートの中に商品はありません
              </Text>
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
            <CartButton
              display={display(newCarts)}
              onClick={() => onOrderButton(String(loginUser.id))}
            >
              <Text p={2}>注文する</Text>
            </CartButton>
          </VStack>
        </Wrap>
      )}
      {isOpen && (
        <ReceiptModal
          order={order}
          loading={orderLoading}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </>
  );
});
