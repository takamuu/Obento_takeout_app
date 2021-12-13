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

import BeefTongue from 'images/BeefTongue.svg';
import { Image } from '@chakra-ui/image';
import { Cart } from 'types/api/cart';
import { useDisclosure } from '@chakra-ui/hooks';
import { usePostCart } from 'hooks/usePostCart';
import CartIcon from 'images/CartIcon.svg';

type Props = {
  // cart: Cart;
  // isOpen: boolean;
  // onClose: () => void;
};

export const CartModal: VFC<Props> = memo(() => {
  // const { onClickCart } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [carts, setCarts] = useState<Array<Cart>>([]);
  // const [count, setCount] = useState(1);

  // const onClickUpCount = () => setCount(count + 1);

  // const onClickDownCount = () => setCount(count - 1);

  const onCloseModal = () => {
    onClose();
  };

  // const { postCart } = usePostCart();
  const onClickCart = useCallback(
    () =>
      //     postCart({ food: food, count: count })
      onOpen(),
    []
  );

  return (
    <>
      <Box onClick={onOpen}>
        <Image boxSize="40px" src={CartIcon} alt="CartIcon" />
      </Box>
      <Modal
        size="lg"
        isOpen={isOpen}
        onClose={onCloseModal}
        autoFocus={false}
        motionPreset="slideInBottom"
      >
        <ModalOverlay>
          <ModalContent bg="white">
            {/* <Image src={BeefTongue} /> */}
            <ModalCloseButton
              bgColor="white"
              rounded="full"
              _hover={{ opacity: 0.8 }}
            />
            <ModalBody mx={2}>
              <Stack spacing={2}>
                <FormControl>
                  <Text fontSize="xl">test Cart Modal</Text>
                </FormControl>
                {/* <FormControl>
                <Text fontSize="xl">{food?.food_description}</Text>
              </FormControl>
              <FormControl>
                <Text fontSize="xl">金額 ¥ {food?.price.toLocaleString()}</Text>
              </FormControl> */}
              </Stack>
            </ModalBody>
            {/* <ModalFooter>
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
                onClickCart();
                onCloseModal();
              }}
            >
              <Text p={2}>{`${count}点をカートに追加 `}</Text>
              <Text p={2}>{`¥${(count * food?.price).toLocaleString()}`}</Text>
            </CartButton>
          </ModalFooter> */}
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
});
