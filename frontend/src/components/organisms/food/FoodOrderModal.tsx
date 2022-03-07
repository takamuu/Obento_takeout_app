/* eslint-disable react-hooks/exhaustive-deps */
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
import { Image } from '@chakra-ui/image';
import { useDisclosure } from '@chakra-ui/react';

import { CountDownButton } from 'components/atoms/button/CountDownButton';
import { CountUpButton } from 'components/atoms/button/CountUpButton';
import { Food } from 'types/api/food';
import { usePostCart } from 'hooks/usePostCart';
import { CartModal } from '../cart/CartModal';
import { FoodButton } from 'components/atoms/button/FoodButton';
import { useLoginUser } from 'hooks/useLoginUser';
import { useHistory } from 'react-router-dom';

type Props = {
  food: Food;
  isOpen: boolean;
  onClose: () => void;
};

export const FoodOrderModal: VFC<Props> = memo((props) => {
  const { food, isOpen, onClose } = props;

  const [count, setCount] = useState(1);

  const onUpCount = () => setCount(count + 1);

  const onDownCount = () => setCount(count - 1);

  const { postCart } = usePostCart();

  // For CartModal
  const {
    isOpen: isOpenCartModal,
    onOpen: onOpenCartModal,
    onClose: onCloseCartModal,
  } = useDisclosure();

  const history = useHistory();
  const { loginUser } = useLoginUser();
  const onCartButton = ({ food, count }) => {
    if (loginUser) {
      postCart({ food: food, count: count });
      setCount(1);
      onClose();
      onOpenCartModal();
    } else {
      history.push('/login');
    }
  };

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
          <ModalContent bg={'white'}>
            <ModalBody m={2}>
              <Stack spacing={2}>
                <ModalCloseButton
                  m={1}
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
                onClick={() => onDownCount()}
                isDisabled={count <= 1}
              />
              <Text fontSize="xl" fontWeight={'bold'} p={4}>
                {count}
              </Text>
              <CountUpButton
                onClick={() => onUpCount()}
                isDisabled={count >= 9}
              />
              <Spacer />
              <FoodButton onClick={() => onCartButton({ food, count })}>
                <Text m={2}>{`${count}点をカートに追加 `}</Text>
                <Text m={2}>{`¥${(
                  count * food?.price
                ).toLocaleString()}`}</Text>
              </FoodButton>
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
