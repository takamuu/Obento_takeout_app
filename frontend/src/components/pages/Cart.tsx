/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import { memo, useCallback, useEffect, useState, VFC } from 'react';
import {
  Center,
  Divider,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/layout';
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
import { useRestaurants } from 'hooks/useRestaurants';
import { RestaurantCard } from 'components/organisms/restaurant/RestaurantCard';
import { useHistory } from 'react-router-dom';

export const Cart: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loginUser } = useLoginUser();
  const { carts, loading } = useCartIndex();
  const { updateCart } = useUpdateCartDetails();
  const { deleteCartDetails } = useDeleteCartDetails();
  const { postOrders, order, loading: orderLoading } = usePostOrders();
  const [newCarts, setNewCarts] = useState<NewCarts>([]);
  const { getRestaurants, restaurants } = useRestaurants();

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
    const confirmOrder = confirm('注文を確定してよろしいですか？');
    if (confirmOrder)
      await postOrders(userId).then(() => {
        onOpen();
      });
  };

  const onClickDelete = (foodId: string) => {
    deleteCartDetails(foodId);
    setNewCarts((s) => s.filter((cart) => String(cart.food.id) !== foodId));
  };

  const history = useHistory();
  const onClickRestaurant = useCallback(
    (restaurant) =>
      history.push({
        pathname: `restaurants/${restaurant.id}/foods`,
        state: { restaurant },
      }),
    []
  );

  useEffect(() => {
    getRestaurants();
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

  useEffect(() => window.scrollTo(0, 0));

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap paddingTop={10} paddingBottom={20} justify={'center'}>
          {newCarts.length ? (
            <>
              <VStack>
                {restaurants.map((restaurant, i) => {
                  if (restaurant.id === newCarts[0].food.restaurant_id)
                    return (
                      <WrapItem paddingBottom={10} key={i}>
                        <RestaurantCard
                          imageUrl={`${process.env.PUBLIC_URL}${restaurant.image}`}
                          restaurantName={restaurant.name}
                          restaurantDescription={restaurant.description}
                          onClick={() => onClickRestaurant(restaurant)}
                        />
                      </WrapItem>
                    );
                })}
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
                <Divider w={400} borderWidth={'initial'} borderColor="brand" />
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
                  <Text p={2}>注文内容を最終確認して、注文する</Text>
                </CartButton>
              </VStack>
            </>
          ) : (
            <Text padding={'20'} h={'50vh'} fontSize={'xl'} fontWeight={'bold'}>
              カートの中に商品はありません
            </Text>
          )}
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
