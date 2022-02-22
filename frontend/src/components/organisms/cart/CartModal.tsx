/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import { memo, useCallback, useEffect, VFC } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Center,
  Heading,
  Spacer,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from '@chakra-ui/modal';
import { Spinner } from '@chakra-ui/react';

import { useCartIndex } from 'hooks/useCartIndex';
import { CartCard } from './CartCard';
import { CartButton } from 'components/atoms/button/CartButton';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const CartModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose } = props;
  const { getCarts, carts, loading } = useCartIndex();
  useEffect(() => {
    getCarts();
  }, []);

  const history = useHistory();
  const onClickCheckOutButton = useCallback(() => {
    onClose();
    history.push('/cart');
  }, []);

  // Calculate the total amount

  let totalAmount = 0;

  carts.map((cart) => (totalAmount += cart.count * cart.food.price));

  return (
    <>
      <Modal
        size={'md'}
        isOpen={isOpen}
        onClose={onClose}
        autoFocus={false}
        motionPreset="slideInBottom"
      >
        <ModalOverlay>
          <ModalContent bg="white">
            <ModalCloseButton
              bgColor="white"
              rounded="full"
              _hover={{ opacity: 0.8 }}
            />
            <ModalBody>
              <Heading p={4} align={'center'} textColor={'brand'}>
                カート
              </Heading>
              {loading ? (
                <Center h="100vh">
                  <Spinner />
                </Center>
              ) : (
                <Wrap p={{ base: 4, md: 10 }} justify="space-around">
                  {carts ? (
                    <>
                      {carts.map((cart, i) => (
                        <WrapItem key={i}>
                          <CartCard
                            food={cart.food}
                            foodName={cart.food.name}
                            count={cart.count}
                            price={cart.food.price}
                          />
                        </WrapItem>
                      ))}
                    </>
                  ) : (
                    <p>カートはありません</p>
                  )}
                </Wrap>
              )}
            </ModalBody>
            <Spacer />
            <ModalFooter mx={'auto'} mb={4}>
              <CartButton onClick={() => onClickCheckOutButton()}>
                <Text m={4}>
                  お会計に進む {`¥${totalAmount.toLocaleString()}`}
                </Text>
              </CartButton>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
});
