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
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="9">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
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
