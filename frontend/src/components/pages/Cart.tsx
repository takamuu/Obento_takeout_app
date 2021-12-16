/* eslint-disable arrow-body-style */
import { Center, Heading, Wrap, WrapItem } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { CartCard } from 'components/organisms/cart/CartCard';
import { useCarts } from 'hooks/useCarts';
import { memo, useEffect, VFC } from 'react';

export const Cart: VFC = memo(() => {
  const { getCarts, carts, loading } = useCarts();

  useEffect(() => getCarts(), []);

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap>
          <Heading> ユーザー： のカートです</Heading>
          <Wrap p={{ base: 4, md: 10 }} justify="space-around">
            {carts.map((cart) => (
              <WrapItem key={cart.id}>
                <CartCard
                  foodName={cart.name}
                  count={cart.count}
                  price={cart.price}
                />
              </WrapItem>
            ))}
          </Wrap>
        </Wrap>
      )}
    </>
  );
});
