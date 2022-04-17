/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import { Button } from '@chakra-ui/button';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/modal';
import { useLoginUser } from 'hooks/useLoginUser';
import { memo, VFC } from 'react';
import { useHistory } from 'react-router-dom';

type Props = {
  onClose: () => void;
  isOpen: boolean;
  onHome: () => void;
  onLogin: () => void;
  onLogout: () => void;
};

export const MenuDrawer: VFC<Props> = memo((props) => {
  const { onClose, isOpen, onHome, onLogin, onLogout } = props;
  const history = useHistory();
  const { loginUser } = useLoginUser();

  const onHowToUseBenteku = () => history.push('/how_to_use_benteku');
  const onMyPage = () => history.push('/my_page');

  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody p={0} bg="gray.100">
            <Button w="100%" onClick={onHome}>
              トップページ
            </Button>
            <Button w="100%" onClick={onHowToUseBenteku}>
              弁テクの使い方
            </Button>
            <>
              {loginUser && (
                <Button w="100%" onClick={onMyPage}>
                  マイページ
                </Button>
              )}
              {loginUser ? (
                <Button w="100%" onClick={onLogout}>
                  ログアウト
                </Button>
              ) : (
                <Button w="100%" onClick={onLogin}>
                  ログイン
                </Button>
              )}
              {!loginUser && (
                <Button w="100%" onClick={onLogin}>
                  ゲストログイン
                </Button>
              )}
            </>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});
