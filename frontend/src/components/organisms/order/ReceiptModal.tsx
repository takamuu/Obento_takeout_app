/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import { memo, VFC } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Center,
  Spacer,
  Text,
  VStack,
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
import { Orders } from 'types/api/orders';

type Props = {
  order: Orders;
  loading: boolean;
  isOpen: boolean;
  onClose: () => void;
};

export const ReceiptModal: VFC<Props> = memo((props) => {
  const { order, loading, isOpen, onClose } = props;

  // const onDeliveredButton = () => {
  //   confirm('ご注文の商品を受け取りましたか？');
  // };

  const history = useHistory();

  return (
    <>
      <Modal
        size={'sm'}
        isOpen={isOpen}
        onClose={onClose}
        autoFocus={false}
        closeOnOverlayClick={false}
        motionPreset="slideInBottom"
      >
        <ModalOverlay>
          <ModalContent bg="white">
            <ModalCloseButton
              bgColor="white"
              rounded="full"
              _hover={{ opacity: 0.8 }}
              onClick={() => history.push('/order_history')}
            />
            <ModalBody>
              {loading ? (
                <Center h="100vh">
                  <Spinner />
                </Center>
              ) : (
                <Wrap justify={'center'}>
                  <VStack>
                    <Text pt={8} fontSize={'3xl'} color={'brand'}>
                      受取番号
                    </Text>
                    <Text fontSize={'7xl'} fontWeight={'bold'} color={'brand'}>
                      {order.rceipt_number}
                    </Text>
                    <Text
                      pt={2}
                      fontSize={'xl'}
                      fontWeight={'bold'}
                      color={'brand'}
                    >
                      {order.restaurant_name}
                    </Text>
                    {order.order_details.map((detail, i) => (
                      <WrapItem key={i}>
                        <Box
                          fontSize={'xl'}
                          fontWeight={'bold'}
                          color={'brand'}
                          isTruncated
                        >
                          {detail.food_name}
                        </Box>
                      </WrapItem>
                    ))}
                    <Text fontSize={'xl'} fontWeight={'bold'} color={'brand'}>
                      合計 ¥ {order.total_price.toLocaleString()}
                    </Text>
                  </VStack>
                </Wrap>
              )}
            </ModalBody>
            <Spacer />
            <ModalFooter mx={'auto'} m={4}></ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  );
});
