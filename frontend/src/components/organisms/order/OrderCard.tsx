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

type Props = {
  createdAt: string;
  restaurantName: string;
  totalPrice: number;
  progressStatus: string;
  receiptNumber: string;
  orderDetails: OrderDetail[];
  onClick: () => void;
};

export const OrderCard: VFC<Props> = memo((props) => {
  const {
    createdAt,
    restaurantName,
    totalPrice,
    progressStatus,
    receiptNumber,
    orderDetails,
    onClick,
  } = props;

  const dateTime = new Date(createdAt).toLocaleDateString();

  const today = new Date();
  const dateOfPurchase = new Date(createdAt);
  const dayAfterPurchase = new Date();
  dayAfterPurchase.setDate(dateOfPurchase.getDate() + 1);
  dayAfterPurchase.setHours(0);
  dayAfterPurchase.setMinutes(0);
  dayAfterPurchase.setSeconds(0);

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
            _hover={{ cursor: 'pointer', opacity: 0.6 }}
            onClick={onClick}
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
              {progressStatus === 'delivered' || dayAfterPurchase < today ? (
                <Text>受取済</Text>
              ) : (
                <Text color={'brand'} fontSize={{ sm: 'xs', md: 'lg' }}>
                  {receiptNumber}
                </Text>
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
