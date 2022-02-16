/* eslint-disable arrow-body-style */
import { memo, useState, VFC } from 'react';
import { FormControl } from '@chakra-ui/form-control';
import { Stack, Text } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/modal';

import { Cart } from 'types/api/cart';

type Props = {
  // cart: Cart;
  isOpen: boolean;
  onClose: () => void;
  // onClickCart: () => void;
};

export const CartModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose } = props;
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [carts, setCarts] = useState<Array<Cart>>([]);
  // const [count, setCount] = useState(1);

  // const onClickUpCount = () => setCount(count + 1);

  // const onClickDownCount = () => setCount(count - 1);

  // const onCloseModal = () => {
  //   onCloseCartModal();
  // };

  // const { postCart } = usePostCart();
  // const onClickCart = useCallback(
  // () =>
  //     postCart({ food: food, count: count })
  // onOpen(),
  //   []
  // );

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
