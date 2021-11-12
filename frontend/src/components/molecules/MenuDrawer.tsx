import { Button } from '@chakra-ui/button';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/modal';
import { memo, VFC } from 'react';

type Props = {
  onClose: () => void;
  isOpen: boolean;
};
export const MenuDrawer: VFC<Props> = memo((props) => {
  const { onClose, isOpen } = props;
  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody p={0} bg="gray.100">
            <Button w="100%">TOP</Button>
            <Button w="100%">弁テクの使い方</Button>
            <Button w="100%">ログイン</Button>
            <Button w="100%">ゲストログイン</Button>
            <Button w="100%">マイページ</Button>
            <Button w="100%">受取票を表示する</Button>
            <Button w="100%">購入履歴</Button>
            <Button w="100%">サインアウト</Button>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});

MenuDrawer.displayName = 'MenuDrawer';
