import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Stack } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { memo, VFC } from 'react';

import { Food } from 'types/api/food';

type Props = {
  food: Food | null;
  isOpen: boolean;
  onClose: () => void;
};

export const FoodOrderModal: VFC<Props> = memo((props) => {
  const { food, isOpen, onClose } = props;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay>
        <ModalContent bg="white" pb={6}>
          <ModalHeader>注文</ModalHeader>
          <ModalCloseButton />
          <ModalBody mx={4}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>画像</FormLabel>
                <Input value={food?.image} isReadOnly />
              </FormControl>
              <FormControl>
                <FormLabel>商品名</FormLabel>
                <Input value={food?.name} isReadOnly />
              </FormControl>
              <FormControl>
                <FormLabel>商品説明</FormLabel>
                <Input value={food?.food_description} isReadOnly />
              </FormControl>
              <FormControl>
                <FormLabel>金額</FormLabel>
                <Input value={food?.price} isReadOnly />
              </FormControl>
            </Stack>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
});
