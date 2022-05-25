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
      w={{ base: '360px', md: '400px' }}
      h={{ base: '162px', md: '180px' }}
      borderWidth="1px"
      shadow="md"
      overflow="hidden"
      _hover={{ cursor: 'pointer', opacity: 0.8 }}
      onClick={() => onClick(id)}
    >
      <HStack>
        <Image
          w={{ base: '216px', md: '240px' }}
          h={{ base: '162px', md: '180px' }}
          src={imageUrl}
          alt={foodName}
          m="auto"
        />
        <VStack>
          <Text
            w={{ base: '135px', md: '150px' }}
            fontSize={{ base: 'md', md: 'lg' }}
            fontWeight="bold"
            color="brand"
            textAlign="center"
          >
            {foodName}
          </Text>
          <Text
            w={{ base: '126px', md: '140px' }}
            fontSize={{ base: 'sm', md: 'lg' }}
            fontWeight={'normal'}
            color="brand"
            isTruncated
          >
            {foodDescription}
          </Text>
          <Text fontWeight={'bold'} color="brand">
            ¥ {foodPrice.toLocaleString()}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
});
