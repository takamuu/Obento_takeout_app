/* eslint-disable arrow-body-style */
import { Image } from '@chakra-ui/image';
import { Box, HStack, Text, VStack } from '@chakra-ui/layout';
import { memo, VFC } from 'react';

type Props = {
  id: number;
  imageUrl: string;
  foodName: string;
  foodDescription: string;
  foodPrice: number;
  onClick: (id: number) => void;
};

export const FoodCard: VFC<Props> = memo((props) => {
  const { id, imageUrl, foodName, foodDescription, foodPrice, onClick } = props;
  return (
    <Box
      w="400px"
      h="200px"
      bg="white"
      borderRadius="10px"
      shadow="md"
      p={4}
      _hover={{ cursor: 'pointer', opacity: 0.8 }}
      onClick={() => onClick(id)}
    >
      <HStack>
        <Image w="210px" h="140px" src={imageUrl} alt={foodName} m="auto" />
        <VStack textAlign="center">
          <Text fontSize="lg" fontWeight="bold">
            {foodName}
          </Text>
          <Text fontSize="sm" fontWeight="glay">
            {foodName}
          </Text>
          <Text fontSize="sm" fontWeight="glay">
            {foodDescription}
          </Text>
          <Text fontSize="sm" fontWeight="glay">
            {foodPrice}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
});
