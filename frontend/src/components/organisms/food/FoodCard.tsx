import { Image } from '@chakra-ui/image';
import { Box, Stack, Text } from '@chakra-ui/layout';
import { memo, VFC } from 'react';

type Props = {
  imageUrl: string;
  foodName: string;
  foodDescription: string;
  foodPrice: number;
};

export const FoodCard: VFC<Props> = memo((props) => {
  const { imageUrl, foodName, foodDescription, foodPrice } = props;
  return (
    <Box
      w="260px"
      h="260px"
      bg="white"
      borderRadius="10px"
      shadow="md"
      p={4}
      _hover={{ cursor: 'pointer', opacity: 0.8 }}
    >
      <Stack textAlign="center" />
      <Image src={imageUrl} alt={foodName} />
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
    </Box>
  );
});
