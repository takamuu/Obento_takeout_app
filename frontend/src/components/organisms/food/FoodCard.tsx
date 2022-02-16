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
      h="180px"
      borderWidth="1px"
      shadow="md"
      overflow="hidden"
      _hover={{ cursor: 'pointer', opacity: 0.8 }}
      onClick={() => onClick(id)}
    >
      <HStack>
        <Image w="240px" h="180px" src={imageUrl} alt={foodName} m="auto" />
        <VStack>
          <Text
            fontFamily={'sans-serif'}
            w="150px"
            fontSize="lg"
            fontWeight="bold"
            color="brand"
            textAlign="center"
          >
            {foodName}
          </Text>
          <Text
            fontFamily={'sans-serif'}
            fontWeight={'normal'}
            w="140px"
            color="brand"
            isTruncated
          >
            {foodDescription}
          </Text>
          <Text fontFamily={'sans-serif'} fontWeight={'bold'} color="brand">
            ¥ {foodPrice.toLocaleString()}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
});
