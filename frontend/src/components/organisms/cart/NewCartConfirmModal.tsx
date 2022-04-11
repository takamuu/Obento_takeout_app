/* eslint-disable arrow-body-style */
import { memo, VFC } from 'react';
import { Center, Stack, Text } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from '@chakra-ui/modal';
import { Spinner } from '@chakra-ui/spinner';
import { NewOrderButton } from 'components/atoms/button/NewOrderButton';

type Props = {
  loading?: boolean;
  isOpen: boolean;
  onClose: () => void;
  existingRestaurantName: string;
  newRestaurantName: string;
  onReplace: () => void;
};

export const NewCartConfirmModal: VFC<Props> = memo((props) => {
  const {
    loading,
    isOpen,
    onClose,
    existingRestaurantName, // 他店舗の名前
    newRestaurantName, // いま選択した店舗の名前
    onReplace, // 仮注文の置き換えAPIを呼ぶ
  } = props;

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Modal
          size={'sm'}
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
                <Stack>
                  <Text
                    pt={4}
                    pb={4}
                    fontSize={'3xl'}
                    fontWeight={'bold'}
                    color={'brand'}
                  >
                    新規注文を開始しますか？
                  </Text>
                  <Text pt={2} fontSize={'xl'} color={'brand'}>
                    ご注文に 【 {`${existingRestaurantName}`} 】
                    の商品が含まれています。
                  </Text>
                  <Text fontSize={'xl'} color={'brand'}>
                    新規の注文を開始して 【 {`${newRestaurantName}`} 】
                    の商品を追加してください。
                  </Text>
                </Stack>
              </ModalBody>
              <ModalFooter pt={10} pb={6} justifyContent={'center'}>
                <NewOrderButton loading={loading} onClick={() => onReplace()}>
                  <Text>新規注文</Text>
                </NewOrderButton>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        </Modal>
      )}
    </>
  );
});
