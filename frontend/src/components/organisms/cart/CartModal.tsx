/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import { memo, useCallback, useEffect, VFC, useState } from 'react';
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
import { CartModalCard } from './CartModalCard';
import { NewCarts } from 'types/api/newCarts';
import { CartButton } from 'components/atoms/button/CartButton';
import { useDeleteCartDetails } from 'hooks/useDeleteCartDetails';
import { useUpdateCartDetails } from 'hooks/useUpdateCartDetails';
import { Food } from 'types/api/food';

type Props = {
  food?: Food;
  count?: number;
  isOpen: boolean;
  onClose: () => void;
};

export const CartModal: VFC<Props> = memo((props) => {
  const { isOpen, onClose } = props;
  const { carts, loading } = useCartIndex();
  const [newCarts, setNewCarts] = useState<NewCarts>([]);
  const { updateCart } = useUpdateCartDetails();
  const history = useHistory();
  const { deleteCartDetails } = useDeleteCartDetails();
  const totalAmount = newCarts.reduce(
    (total, newCart) => total + newCart.amount,
    0
  );
  const display = (newCarts) => {
    if (newCarts.length) {
      return 'block';
    } else {
      return 'none';
    }
  };

  const onCheckOutButton = useCallback(() => {
    onClose();
    history.push('/cart');
  }, []);

  const onDelete = (foodId: string) => {
    deleteCartDetails(foodId);
    setNewCarts((s) => s.filter((cart) => String(cart.food.id) !== foodId));
  };

  useEffect(() => {
    if (carts.length)
      setNewCarts(
        carts.map((cart) => ({
          id: cart.food.id,
          amount: cart.count * cart.food.price,
          count: cart.count,
          name: cart.food.name,
          price: cart.food.price,
          food: cart.food,
        }))
      );
  }, [carts]);

  return (
    <>
      <Modal
        size={'md'}
        isOpen={isOpen}
        onClose={onClose}
        autoFocus={false}
        isCentered
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
                  {newCarts.length ? (
                    <>
                      {newCarts.map((cart, i) => (
                        <WrapItem key={i}>
                          <CartModalCard
                            foodId={String(cart.food.id)}
                            foodName={cart.food.name}
                            count={cart.count}
                            price={cart.price}
                            onDelete={() => onDelete(String(cart.food.id))}
                            onChangeCount={(newCount) => {
                              setNewCarts((s) =>
                                s.map((newCart) => {
                                  if (newCart.id !== cart.food.id)
                                    return newCart;
                                  return {
                                    ...newCart,
                                    amount: cart.food.price * newCount,
                                    count: newCount,
                                  };
                                })
                              );
                              {
                                updateCart({
                                  food_id: cart.food.id,
                                  count: newCount,
                                });
                              }
                            }}
                          />
                        </WrapItem>
                      ))}
                    </>
                  ) : (
                    <Text fontSize={'xl'} fontWeight={'bold'}>
                      カートの中に商品はありません
                    </Text>
                  )}
                </Wrap>
              )}
            </ModalBody>
            <Spacer />
            <ModalFooter mx={'auto'} mb={4}>
              <CartButton
                display={display(newCarts)}
                onClick={() => onCheckOutButton()}
              >
                <Text m={4}>
                  お会計に進む
                  {`¥${totalAmount.toLocaleString()}`}
                </Text>
              </CartButton>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
});
