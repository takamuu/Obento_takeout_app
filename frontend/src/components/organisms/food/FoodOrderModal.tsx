/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import { memo, useCallback, useState, VFC } from 'react';
import { FormControl } from '@chakra-ui/form-control';
import { Box, Spacer, Stack, Text } from '@chakra-ui/layout';
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
import { CartButton } from 'components/atoms/button/CartButton';

import { Food } from 'types/api/food';
import { Image } from '@chakra-ui/image';
import { usePostCart } from 'hooks/usePostCart';
import { CartModal } from '../cart/CartModal';
import { useDisclosure } from '@chakra-ui/react';

type Props = {
  food: Food;
  isOpen: boolean;
  onClose: () => void;
};

export const FoodOrderModal: VFC<Props> = memo((props) => {
  const { food, isOpen, onClose } = props;

  const [count, setCount] = useState(1);

  const onClickUpCount = () => setCount(count + 1);

  const onClickDownCount = () => setCount(count - 1);

  const { postCart } = usePostCart();

  // For CartModal
  const {
    isOpen: isOpenCartModal,
    onOpen: onOpenCartModal,
    onClose: onCloseCartModal,
  } = useDisclosure();

  const onClickCartButton = useCallback(({ food, count }) => {
    postCart({ food: food, count: count });
    setCount(1);
    onClose();
    onOpenCartModal();
  }, []);

  return (
    <>
      <Modal
        size="lg"
        isOpen={isOpen}
        onClose={onClose}
        autoFocus={false}
        motionPreset="slideInBottom"
      >
        <ModalOverlay>
          <ModalContent>
            <ModalBody m={2}>
              <Stack spacing={2}>
                <ModalCloseButton
                  m={2}
                  zIndex={'sticky'}
                  bgColor={'white'}
                  rounded="full"
                  _hover={{ opacity: 0.8 }}
                />
                <FormControl>
                  <Image src={food?.image} />
                </FormControl>
                <Spacer />
                <FormControl>
                  <Text fontSize="3xl" fontWeight={'bold'}>
                    {food?.name}
                  </Text>
                </FormControl>
                <FormControl>
                  <Text fontSize="xl" fontWeight={'bold'}>
                    {food?.food_description}
                  </Text>
                </FormControl>
                <FormControl>
                  <Text fontSize="xl" fontWeight={'bold'}>
                    金額 ¥ {food?.price.toLocaleString()}
                  </Text>
                </FormControl>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <CountDownButton
                onClick={() => onClickDownCount()}
                isDisabled={count <= 1}
              />
              <Text fontSize="xl" fontWeight={'bold'} p={4}>
                {count}
              </Text>
              <CountUpButton
                onClick={() => onClickUpCount()}
                isDisabled={count >= 9}
              />
              <Spacer />
              <CartButton onClick={() => onClickCartButton({ food, count })}>
                <Text m={2}>{`${count}点をカートに追加 `}</Text>
                <Text m={2}>{`¥${(
                  count * food?.price
                ).toLocaleString()}`}</Text>
              </CartButton>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
      {isOpenCartModal && (
        <CartModal isOpen={isOpenCartModal} onClose={onCloseCartModal} />
      )}
    </>
  );
});
