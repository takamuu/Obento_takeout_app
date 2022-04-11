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
import { NewCartConfirmModal } from '../cart/NewCartConfirmModal';
import { FoodButton } from 'components/atoms/button/FoodButton';
import { useLoginUser } from 'hooks/useLoginUser';
import { useHistory } from 'react-router-dom';
import { useReplaceCartDetails } from 'hooks/useReplaceCartDetails';

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
  // For NewCartConfirmModal
  const {
    isOpen: isOpenNewCartConfirmModal,
    onOpen: onOpenNewCartConfirmModal,
    onClose: onCloseNewCartConfirmModal,
  } = useDisclosure();

  const [existingRestaurantName, setExistingRestaurantName] = useState('');
  const [newRestaurantName, setNewRestaurantName] = useState('');

  const history = useHistory();
  const { loginUser } = useLoginUser();
  const onCartButton = async ({ food, count }) => {
    if (loginUser) {
      await postCart({ food: food, count: count })
        .then(() => {
          onClose();
          setCount(1);
          onOpenCartModal();
        })
        .catch((e) => {
          if (e.response.status === 406) {
            setExistingRestaurantName(e.response.data.existing_restaurant_name),
              setNewRestaurantName(e.response.data.new_restaurant_name),
              onClose();
            onOpenNewCartConfirmModal();
          } else {
            throw e;
          }
        });
    } else {
      history.push('/login');
    }
  };

  const { replaceCartDetails, loading } = useReplaceCartDetails();
  const onReplace = async ({ food, count }) => {
    if (loginUser) {
      await replaceCartDetails({ food: food, count: count }).then(() => {
        onCloseNewCartConfirmModal();
        onOpenCartModal();
      });
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
        <CartModal
          food={food}
          count={count}
          isOpen={isOpenCartModal}
          onClose={onCloseCartModal}
        />
      )}
      {isOpenNewCartConfirmModal && (
        <NewCartConfirmModal
          loading={loading}
          existingRestaurantName={existingRestaurantName}
          newRestaurantName={newRestaurantName}
          isOpen={isOpenNewCartConfirmModal}
          onClose={onCloseNewCartConfirmModal}
          onReplace={() => onReplace({ food, count })}
        />
      )}
    </>
  );
});
