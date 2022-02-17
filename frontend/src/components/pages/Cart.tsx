/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import { Box, Center, Text, VStack, Wrap, WrapItem } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { CartButton } from 'components/atoms/button/CartButton';
import { CartCard } from 'components/organisms/cart/CartCard';
import { useCartIndex } from 'hooks/useCartIndex';
import { memo, useCallback, useEffect, VFC } from 'react';
import { useHistory } from 'react-router-dom';

export const Cart: VFC = memo(() => {
  const { getCarts, carts, loading } = useCartIndex();

  useEffect(() => {
    getCarts();
  }, []);

  const history = useHistory();
  const onClickOrderButton = useCallback(() => {
    alert('stripe決済ページを飛ばして受取票ページへ遷移');
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
            {carts ? (
              <>
                <VStack>
                  {carts.map((cart) => (
                    <WrapItem key={cart.id}>
                      <CartCard
                        foodName={cart.name}
                        count={cart.count}
                        price={cart.price}
                      />
                    </WrapItem>
                  ))}
                </VStack>
              </>
            ) : (
              <p>カートはありません</p>
            )}
          </Wrap>
          <WrapItem p={10} w={'full'} justifyContent={'center'}>
            <CartButton onClick={() => onClickOrderButton()}>
              <Text p={2}>注文する</Text>
            </CartButton>
          </WrapItem>
        </Wrap>
      )}
    </>
  );
});
