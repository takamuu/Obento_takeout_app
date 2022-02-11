/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import { Button } from '@chakra-ui/button';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/modal';
import { memo, useCallback, VFC } from 'react';
import { useHistory } from 'react-router-dom';

type Props = {
  onClose: () => void;
  isOpen: boolean;
  onClickHome: () => void;
  onClickLogin: () => void;
};

export const MenuDrawer: VFC<Props> = memo((props) => {
  const { onClose, isOpen, onClickHome, onClickLogin } = props;
  const history = useHistory();

  const onClickHowToUseBenteku = useCallback(
    () => history.push('/how_to_use_benteku'),
    []
  );
  const onClickMyPage = useCallback(() => history.push('/my_page'), []);
  const onClickPurchaseHistory = useCallback(
    () => history.push('/purchase_history'),
    []
  );
  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody p={0} bg="gray.100">
            <Button w="100%" onClick={onClickHome}>
              TOP
            </Button>
            <Button w="100%" onClick={onClickHowToUseBenteku}>
              弁テクの使い方
            </Button>
            <Button w="100%" onClick={onClickLogin}>
              ログイン
            </Button>
            <Button w="100%">ゲストログイン</Button>
            <Button w="100%" onClick={onClickMyPage}>
              マイページ
            </Button>
            <Button w="100%">受取票を表示する</Button>
            <Button w="100%" onClick={onClickPurchaseHistory}>
              購入履歴
            </Button>
            <Button w="100%">サインアウト</Button>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});
