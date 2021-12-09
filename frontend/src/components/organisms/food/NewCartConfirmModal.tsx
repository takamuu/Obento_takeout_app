/* eslint-disable arrow-body-style */
import { memo, VFC } from 'react';
import { FormControl } from '@chakra-ui/form-control';
import { Stack, Text } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { CartButton } from 'components/atoms/button/CartButton';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  existingResutaurautName: string;
  newResutaurautName: string;
  onClickSubmit: () => void;
};

export const NewCartConfirmModal: VFC<Props> = memo((props) => {
  const {
    isOpen,
    onClose,
    existingResutaurautName, // 他店舗の名前
    newResutaurautName, // いま選択した店舗の名前
    onClickSubmit, // 仮注文の置き換えAPIを呼ぶ
  } = props;

  return (
    <Modal
      size="lg"
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
          <ModalHeader>新規注文を開始しますか？</ModalHeader>
          <ModalBody mx={2}>
            <Stack spacing={2}>
              <FormControl>
                <Text>
                  {`ご注文に ${existingResutaurautName} の商品が含まれています。
                   新規の注文を開始して ${newResutaurautName} の商品を追加してください。`}
                </Text>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <CartButton onClick={() => onClickSubmit()}>
              <Text>新規注文</Text>
            </CartButton>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
});
