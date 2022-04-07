/* eslint-disable arrow-body-style */
import { memo, useEffect, VFC } from 'react';
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

  const history = useHistory();

  const onBackButton = () => history.push('/my_page');

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap justify={'center'}>
          <Text
            p={{ sm: '3', md: '10' }}
            h={{ sm: '50px', md: '100px' }}
            w={'100%'}
            fontSize={{ sm: 'md', md: '2xl' }}
            fontWeight={'bold'}
            color={'brand'}
            textAlign={'center'}
          >
            購入履歴
          </Text>
          <HStack>
            <Box
              h={{ sm: '20px', md: '30px' }}
              w={{ sm: '70px', md: '80px' }}
              fontSize={{ sm: 'xs', md: 'lg' }}
              fontWeight={'bold'}
              color={'brand'}
              textAlign={'left'}
            >
              購入日時
            </Box>
            <Box
              h={{ sm: '20px', md: '30px' }}
              w={{ sm: '80px', md: '180px' }}
              fontSize={{ sm: 'xs', md: 'lg' }}
              fontWeight={'bold'}
              color={'brand'}
              textAlign={'center'}
            >
              店名
            </Box>
            <Box
              h={{ sm: '20px', md: '30px' }}
              w={{ sm: '110px', md: '180px' }}
              fontSize={{ sm: 'xs', md: 'lg' }}
              fontWeight={'bold'}
              color={'brand'}
              textAlign={'center'}
            >
              商品
            </Box>
            <Box
              h={{ sm: '20pxs', md: '30px' }}
              w={{ sm: '110px', md: '180px' }}
              fontSize={{ sm: 'xs', md: 'lg' }}
              fontWeight={'bold'}
              color={'brand'}
              textAlign={'center'}
            >
              金額
            </Box>
            <Box
              h={{ sm: '20px', md: '30px' }}
              w={{ sm: '70px', md: '80px' }}
              fontSize={{ sm: 'xs', md: 'lg' }}
              fontWeight={'bold'}
              color={'brand'}
              textAlign={'right'}
            >
              受取番号
            </Box>
          </HStack>
          <Divider w={'740px'} borderColor={'brand'} border={'1px'} />
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
                      />
                    </WrapItem>
                  ))}
                </VStack>
              </>
            ) : (
              <Text fontSize={'xl'} fontWeight={'bold'}>
                購入履歴はありません
              </Text>
            )}
          </Wrap>
          <Flex w={'100%'} pt={20} pb={40} justify="center" align="center">
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
