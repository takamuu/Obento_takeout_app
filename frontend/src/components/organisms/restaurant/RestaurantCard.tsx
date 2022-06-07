import { Image } from '@chakra-ui/image';
import { Box, Stack, Text } from '@chakra-ui/layout';
import { memo, VFC } from 'react';

type Props = {
  imageUrl: string;
  restaurantName: string;
  restaurantDescription: string;
  onClick: () => void;
};

export const RestaurantCard: VFC<Props> = memo((props) => {
  const { imageUrl, restaurantName, restaurantDescription, onClick } = props;
  return (
    <Box _hover={{ cursor: 'pointer', opacity: 0.8 }} onClick={onClick}>
      <Stack margin={1} marginTop={4} textAlign="center">
        <Image
          minW={{ base: '270px' }}
          maxH={'360px'}
          src={imageUrl}
          alt={restaurantName}
        />
        <Text fontSize="lg" fontWeight="bold">
          {restaurantName}
        </Text>
        <Text fontSize="lg" fontWeight="bold">
          {restaurantDescription}
        </Text>
      </Stack>
    </Box>
  );
});
