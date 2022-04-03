/* eslint-disable arrow-body-style */
import { memo, VFC } from 'react';
import {
  Box,
  Divider,
  HStack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/layout';

type Props = {
  createdAt: string;
  restaurantName: string;
  totalPrice: number;
  orderDetails: any;
};

export const OrderCard: VFC<Props> = memo((props) => {
  const { createdAt, restaurantName, totalPrice, orderDetails } = props;

  const dateTime = new Date(createdAt).toLocaleString();

  return (
    <Wrap justify={'center'}>
      <VStack>
        <HStack>
          <Box
            w={{ sm: '122px', md: '180px' }}
            fontSize={{ sm: 'xs', md: 'lg' }}
            fontWeight={'bold'}
            textAlign={'center'}
            isTruncated
          >
            {dateTime}
          </Box>
          <Box
            w={{ sm: '122px', md: '180px' }}
            fontSize={{ sm: 'xs', md: 'lg' }}
            fontWeight={'bold'}
            textAlign={'center'}
            isTruncated
          >
            {restaurantName}
          </Box>
          <VStack>
            {orderDetails.map(
              (
                detail: {
                  food_name: string;
                  count: number;
                  food_price: number;
                },
                j: any
              ) => (
                <WrapItem key={j}>
                  <HStack>
                    <Box
                      w={{ sm: '94px', md: '140px' }}
                      fontSize={{ sm: 'xs', md: 'lg' }}
                      fontWeight={'bold'}
                      textAlign={'left'}
                      isTruncated
                    >
                      {detail.food_name}
                    </Box>
                    <Box
                      w={{ sm: '20px', md: '30px' }}
                      fontSize={{ sm: 'xs', md: 'lg' }}
                      fontWeight={'bold'}
                      textAlign={'right'}
                      isTruncated
                    >
                      {detail.count}
                    </Box>
                  </HStack>
                </WrapItem>
              )
            )}
          </VStack>
          <VStack>
            {orderDetails.map(
              (
                detail: {
                  food_name: string;
                  count: number;
                  food_price: number;
                },
                k: any
              ) => (
                <WrapItem key={k}>
                  <Box
                    w={{ sm: '122px', md: '180px' }}
                    fontSize={{ sm: 'xs', md: 'lg' }}
                    fontWeight={'bold'}
                    textAlign={'right'}
                    isTruncated
                  >
                    ¥ {(detail.food_price * detail.count).toLocaleString()}
                  </Box>
                </WrapItem>
              )
            )}
          </VStack>
        </HStack>
        <Box
          w={'100%'}
          display={'flex'}
          justifyContent={'right'}
          alignItems="end"
          fontSize={{ sm: 'xs', md: 'lg' }}
          fontWeight={'bold'}
        >
          <Text>合計 ¥ {totalPrice.toLocaleString()}</Text>
        </Box>
        <Divider borderColor={'brand'} border={'1px'} borderRadius={'lg'} />
      </VStack>
    </Wrap>
  );
});
