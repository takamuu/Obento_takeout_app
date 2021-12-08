/* eslint-disable arrow-body-style */
import { memo, useState, VFC } from 'react';
import { FormControl } from '@chakra-ui/form-control';
import { Spacer, Stack, Text } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from '@chakra-ui/modal';
import { CountDownButton } from 'components/atoms/button/CountDownButton';
import { CountUpButton } from 'components/atoms/button/CountUpButton';
import { CartButton } from 'components/atoms/button/OrderButton';

import { Food } from 'types/api/food';
import BeefTongue from 'images/BeefTongue.svg';
import { Image } from '@chakra-ui/image';

type Props = {
  food: Food;
  isOpen: boolean;
  onClose: () => void;
  onClickCart: (countNumber: number) => void;
};

export const FoodOrderModal: VFC<Props> = memo((props) => {
  const { food, isOpen, onClose, onClickCart } = props;

  const [count, setCount] = useState(1);

  const onClickUpCount = () => setCount(count + 1);

  const onClickDownCount = () => setCount(count - 1);

  const onCloseModal = () => {
    setCount(1);
    onClose();
  };

  return (
    <Modal
      size="lg"
      isOpen={isOpen}
      onClose={onCloseModal}
      autoFocus={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay>
        <ModalContent bg="white">
          <Image src={BeefTongue} />
          <ModalCloseButton
            bgColor="white"
            rounded="full"
            _hover={{ opacity: 0.8 }}
          />
          <ModalBody mx={2}>
            <Stack spacing={2}>
              <FormControl>
                <Image src={food?.image} />
              </FormControl>
              <FormControl>
                <Text fontSize="xl">{food?.name}</Text>
              </FormControl>
              <FormControl>
                <Text fontSize="xl">{food?.food_description}</Text>
              </FormControl>
              <FormControl>
                <Text fontSize="xl">金額 ¥ {food?.price.toLocaleString()}</Text>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <CountDownButton
              onClick={() => onClickDownCount()}
              isDisabled={count <= 1}
            />
            <Text fontSize="xl" p={4}>
              {count}
            </Text>
            <CountUpButton
              onClick={() => onClickUpCount()}
              isDisabled={count >= 9}
            />
            <Spacer />
            <CartButton
              onClick={() => {
                onClickCart(count);
                onCloseModal();
              }}
            >
              <Text p={2}>{`${count}点をカートに追加 `}</Text>
              <Text p={2}>{`¥${(count * food?.price).toLocaleString()}`}</Text>
            </CartButton>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
});
