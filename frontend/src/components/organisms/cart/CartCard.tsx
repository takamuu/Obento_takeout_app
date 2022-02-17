/* eslint-disable arrow-body-style */
import { Box, HStack, Text } from '@chakra-ui/layout';
import { memo, VFC } from 'react';

type Props = {
  foodName: string;
  count: number;
  price: number;
};

export const CartCard: VFC<Props> = memo((props) => {
  const { foodName, count, price } = props;

  return (
    <Box
      w={{ base: '350px', md: '400px' }}
      h="100px"
      bg="white"
      shadow="md"
      p={4}
      _hover={{ cursor: 'pointer', opacity: 0.8 }}
    >
      <HStack justify="space-between" textAlign="center" padding="15px">
        <Text fontSize="2xl" fontWeight="bold">
          {foodName}
        </Text>
        <Text fontSize="2xl" fontWeight="bold">
          {count} 個
        </Text>
        <Text fontSize="2xl" fontWeight="bold">
          ¥ {(price * count).toLocaleString()}
        </Text>
      </HStack>
    </Box>
  );
});
