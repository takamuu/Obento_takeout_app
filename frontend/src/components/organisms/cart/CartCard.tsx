/* eslint-disable arrow-body-style */
import { ChangeEvent, memo, useCallback, useState, VFC } from 'react';
import { HStack, Text, VStack } from '@chakra-ui/layout';
import { Food } from 'types/api/cart';
import { DeleteButton } from 'components/atoms/button/DeleteButton';
import { Select } from '@chakra-ui/react';

type Props = {
  food: Food;
  foodName: string;
  count: number;
  price: number;
};

export const CartCard: VFC<Props> = memo((props) => {
  const { foodName, count, price } = props;

  const [cartCount, setCartCount] = useState(count);

  const onClickDelete = useCallback(
    () => alert('該当するカート詳細を削除します'),
    []
  );

  // Create a list of selections

  const NUMBER_OF_LIMIT = 20;

  const lists = [...Array(NUMBER_OF_LIMIT).keys()].map((i) => ++i);

  const handleChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    setCartCount(Number(ev.target.value));
  };

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
        <DeleteButton onClick={() => onClickDelete()}>削除</DeleteButton>
        <Select
          w={'20'}
          h={'8'}
          fontSize={'md'}
          border={'2px'}
          borderColor={'gray.200'}
          rounded={'full'}
          color={'brand'}
          fontWeight={'bold'}
          value={cartCount}
          id={'count'}
          onChange={handleChange}
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
          ¥ {(price * cartCount).toLocaleString()}
        </Text>
      </VStack>
    </HStack>
  );
});
