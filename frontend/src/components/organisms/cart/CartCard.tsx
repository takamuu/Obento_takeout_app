/* eslint-disable arrow-body-style */
import { memo, VFC } from 'react';
import { HStack, Text, VStack } from '@chakra-ui/layout';
import { DeleteButton } from 'components/atoms/button/DeleteButton';
import { Select } from '@chakra-ui/react';

type Props = {
  foodId: string;
  foodName: string;
  count: number;
  price: number;
  onClick: (foodId: string) => void;
  onChangeCount?: (newCount: number) => void;
};

export const CartCard: VFC<Props> = memo((props) => {
  const { foodId, foodName, count, price, onClick, onChangeCount } = props;

  // Create a list of selections

  const NUMBER_OF_LIMIT = 20;

  const lists = [...Array(NUMBER_OF_LIMIT).keys()].map((i) => ++i);

  return (
    <HStack
      p={4}
      w={'400px'}
      h="100px"
      shadow="md"
      justify={'space-between'}
      _hover={{ cursor: 'pointer', opacity: 0.8 }}
    >
      <VStack>
        <DeleteButton onClick={() => onClick(foodId)}>削除</DeleteButton>
        <Select
          w={'20'}
          h={'8'}
          fontSize={'md'}
          border={'2px'}
          borderColor={'gray.200'}
          rounded={'full'}
          color={'brand'}
          fontWeight={'bold'}
          value={count}
          id={'count'}
          onChange={(e) =>
            onChangeCount && onChangeCount(Number(e.target.value))
          }
        >
          {lists.map((list, i) => (
            <option key={i} value={list}>
              {list}
            </option>
          ))}
        </Select>
      </VStack>
      <VStack>
        <Text
          w={'64'}
          fontSize={'xl'}
          fontWeight="bold"
          textAlign={'center'}
          isTruncated
        >
          {foodName}
        </Text>
        <Text w={'64'} textAlign={'center'} fontSize={'xl'} fontWeight="bold">
          ¥ {(price * count).toLocaleString()}
        </Text>
      </VStack>
    </HStack>
  );
});
