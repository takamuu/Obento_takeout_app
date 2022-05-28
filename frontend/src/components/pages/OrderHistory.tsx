/* eslint-disable arrow-body-style */
import { memo, useCallback, useEffect, VFC } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Spinner } from '@chakra-ui/react';
import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/layout';

import { useOrdersIndex } from 'hooks/useOrdersIndex';
import { OrderCard } from 'components/organisms/order/OrderCard';

export const OrderHistory: VFC = memo(() => {
  const { orders, loading } = useOrdersIndex();

  useEffect(() => {
    orders;
  });

  useEffect(() => window.scrollTo(0, 0));

  const history = useHistory();

  const onBackButton = () => history.push('/my_page');

  const onRestaurant = useCallback(
    (order) => {
      const restaurant = order.restaurant;
      history.push({
        pathname: `restaurants/${order.restaurant.id}/foods`,
        state: { restaurant },
      });
    },
    [history]
  );

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap justify={'center'}>
          <Text
            p={{ base: '3', md: '10' }}
            h={{ base: '50px', md: '100px' }}
            w={'100%'}
            fontSize={{ base: 'md', md: '2xl' }}
            fontWeight={'bold'}
            color={'brand'}
            textAlign={'center'}
          >
            購入履歴
          </Text>
          <HStack>
            <Box
              h={{ base: '20px', md: '30px' }}
              w={{ base: '52px', md: '80px' }}
              fontSize={{ base: 'xs', md: 'lg' }}
              fontWeight={'bold'}
              color={'brand'}
              textAlign={'left'}
            >
              購入日時
            </Box>
            <Box
              h={{ base: '20px', md: '30px' }}
              w={{ base: '60px', md: '180px' }}
              fontSize={{ base: 'xs', md: 'lg' }}
              fontWeight={'bold'}
              color={'brand'}
              textAlign={'center'}
            >
              店名
            </Box>
            <Box
              h={{ base: '20px', md: '30px' }}
              w={{ base: '80px', md: '180px' }}
              fontSize={{ base: 'xs', md: 'lg' }}
              fontWeight={'bold'}
              color={'brand'}
              textAlign={'center'}
            >
              商品
            </Box>
            <Box
              h={{ base: '20pxs', md: '30px' }}
              w={{ base: '80px', md: '180px' }}
              fontSize={{ base: 'xs', md: 'lg' }}
              fontWeight={'bold'}
              color={'brand'}
              textAlign={'center'}
            >
              金額
            </Box>
            <Box
              h={{ base: '20px', md: '30px' }}
              w={{ base: '68px', md: '80px' }}
              fontSize={{ base: 'xs', md: 'lg' }}
              fontWeight={'bold'}
              color={'brand'}
              textAlign={'right'}
            >
              受取番号
            </Box>
          </HStack>
          <VStack>
            <Divider
              w={{ base: '380px', md: '730px' }}
              borderColor={'brand'}
              border={'1px'}
            />
            <Wrap>
              {orders.length ? (
                <>
                  <VStack>
                    {orders.map((order, i) => (
                      <WrapItem key={i}>
                        <OrderCard
                          createdAt={order.created_at}
                          restaurantName={order.restaurant_name}
                          totalPrice={order.total_price}
                          orderDetails={order.order_details}
                          progressStatus={order.progress_status}
                          receiptNumber={order.rceipt_number}
                          onClick={() => onRestaurant(order)}
                        />
                      </WrapItem>
                    ))}
                  </VStack>
                </>
              ) : (
                <Box p={10} fontSize={'xl'} fontWeight={'bold'}>
                  購入履歴はありません
                </Box>
              )}
            </Wrap>
          </VStack>
          <Flex w={'100%'} pt={20} pb={28} justify="center" align="center">
            <Button
              w={200}
              bg={'brand'}
              color={'white'}
              _hover={{ opacity: 0.8 }}
              onClick={() => onBackButton()}
            >
              マイページへ戻る
            </Button>
          </Flex>
        </Wrap>
      )}
    </>
  );
});
