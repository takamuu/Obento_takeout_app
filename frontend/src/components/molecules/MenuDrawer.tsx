/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import { Button } from '@chakra-ui/button';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/modal';
import { memo, VFC } from 'react';
import { useHistory } from 'react-router-dom';

type Props = {
  onClose: () => void;
  isOpen: boolean;
  onHome: () => void;
  onLogin: () => void;
};

export const MenuDrawer: VFC<Props> = memo((props) => {
  const { onClose, isOpen, onHome, onLogin } = props;
  const history = useHistory();

  const onHowToUseBenteku = () => history.push('/how_to_use_benteku');
  const onMyPage = () => history.push('/my_page');
  const onPurchaseHistory = () => history.push('/purchase_history');

  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody p={0} bg="gray.100">
            <Button w="100%" onClick={onHome}>
              TOP
            </Button>
            <Button w="100%" onClick={onHowToUseBenteku}>
              弁テクの使い方
            </Button>
            <Button w="100%" onClick={onLogin}>
              ログイン
            </Button>
            <Button w="100%">ゲストログイン</Button>
            <Button w="100%" onClick={onMyPage}>
              マイページ
            </Button>
            <Button w="100%">受取票を表示する</Button>
            <Button w="100%" onClick={onPurchaseHistory}>
              購入履歴
            </Button>
            <Button w="100%">サインアウト</Button>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});
