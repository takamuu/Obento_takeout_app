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
import { OrderDetail } from 'types/api/orders';
import { Button } from '@chakra-ui/react';

type Props = {
  createdAt: string;
  restaurantName: string;
  totalPrice: number;
  progressStatus: string;
  receiptNumber: string;
  orderDetails: OrderDetail[];
};

export const OrderCard: VFC<Props> = memo((props) => {
  const {
    createdAt,
    restaurantName,
    totalPrice,
    progressStatus,
    receiptNumber,
    orderDetails,
  } = props;

  const dateTime = new Date(createdAt).toLocaleDateString();

  const onRecipt = () => {
    alert(receiptNumber);
  };

  return (
    <Wrap>
      <VStack>
        <HStack align={'start'}>
          <Box
            w={{ sm: '80px', md: '120px' }}
            fontSize={{ sm: 'xs', md: 'lg' }}
            fontWeight={'bold'}
            isTruncated
          >
            {dateTime}
          </Box>
          <Box
            w={{ sm: '80px', md: '140px' }}
            fontSize={{ sm: 'xs', md: 'lg' }}
            fontWeight={'bold'}
            isTruncated
          >
            {restaurantName}
          </Box>
          <VStack>
            {orderDetails.map((detail, j) => (
              <WrapItem key={j}>
                <HStack>
                  <Box
                    w={{ sm: '80px', md: '140px' }}
                    fontSize={{ sm: 'xs', md: 'lg' }}
                    fontWeight={'bold'}
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
            ))}
          </VStack>
          <VStack>
            {orderDetails.map((detail, k) => (
              <WrapItem key={k}>
                <Box
                  w={{ sm: '100px', md: '160px' }}
                  fontSize={{ sm: 'xs', md: 'lg' }}
                  fontWeight={'bold'}
                  textAlign={'right'}
                  isTruncated
                >
                  ¥ {(detail.food_price * detail.count).toLocaleString()}
                </Box>
              </WrapItem>
            ))}
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
          </VStack>
          <VStack>
            <Box
              w={{ sm: '60px', md: '100px' }}
              textAlign={'right'}
              fontSize={{ sm: 'xs', md: 'lg' }}
              fontWeight={'bold'}
            >
              {progressStatus === 'delivered' ? (
                <Text>受取済</Text>
              ) : (
                <Button
                  w={{ sm: '60px', md: '80px' }}
                  h={{ sm: '8', md: '12' }}
                  bg={'brand'}
                  color={'white'}
                  fontSize={{ sm: '11', md: '16' }}
                  _hover={{ opacity: 0.8 }}
                  onClick={() => onRecipt()}
                >
                  {receiptNumber}
                </Button>
              )}
            </Box>
          </VStack>
        </HStack>
        <Divider
          w={{ sm: '460px', md: '730px' }}
          borderColor={'brand'}
          border={'1px'}
          borderRadius={'lg'}
        />
      </VStack>
    </Wrap>
  );
});
