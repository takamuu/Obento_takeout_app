/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import { memo, useCallback, VFC } from 'react';
import { HStack, Link, Spacer, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import { useDisclosure } from '@chakra-ui/hooks';
import { useHistory } from 'react-router-dom';

import { useLoginUser } from 'hooks/useLoginUser';
import { useAuth } from 'hooks/useAuth';
import { MenuIconButton } from 'components/atoms/button/MenuIconButton';
import { MenuDrawer } from 'components/molecules/MenuDrawer';
import MainLogo from 'images/MainLogo.svg';
import CartIcon from 'images/CartIcon.svg';
import { CartModal } from '../cart/CartModal';

export const Header: VFC = memo(() => {
  const {
    isOpen: isOpenMenuDrawer,
    onOpen: onOpenMenuDrawer,
    onClose: onCloseMenuDrawer,
  } = useDisclosure();

  // For CartModal
  const {
    isOpen: isOpenCartModal,
    onOpen: onOpenCartModal,
    onClose: onCloseCartModal,
  } = useDisclosure();

  const { loginUser } = useLoginUser();
  const { logout } = useAuth();
  const history = useHistory();

  const onClickHome = useCallback(() => history.push('/'), []);
  const onClickLogin = useCallback(() => history.push('/login'), []);
  // const onClickCart = useCallback(() => history.push('/cart'), []);
  const onClickContact = useCallback(() => history.push('/contact'), []);
  const onClickHowToUseBenteku = useCallback(
    () => history.push('/how_to_use_benteku'),
    []
  );
  const onClickMyPage = useCallback(() => history.push('/my_page'), []);

  const onClickLogout = () => logout();

  const onClickCartModal = useCallback(() => onOpenCartModal(), []);

  return (
    <>
      <HStack
        w="100%"
        h="80px"
        bg="white"
        paddingRight={4}
        spacing={4}
        color="brand"
        fontWeight={'bold'}
        align="center"
        top={0}
        position="sticky"
        zIndex={'sticky'}
      >
        <MenuIconButton onOpen={onOpenMenuDrawer} />
        <Image
          boxSize="60px"
          src={MainLogo}
          alt="MainLogo"
          display={{ base: 'none', md: 'flex' }}
          _hover={{ opacity: '0.8', cursor: 'pointer' }}
          onClick={onClickHome}
        />
        <Link
          paddingLeft={2}
          display={{ base: 'none', md: 'flex' }}
          onClick={onClickHowToUseBenteku}
        >
          弁テクの使い方
        </Link>
        <Link display={{ base: 'none', md: 'flex' }} onClick={onClickContact}>
          お問い合わせ
        </Link>
        {loginUser ? (
          <Link display={{ base: 'none', md: 'flex' }} onClick={onClickLogout}>
            ログアウト
          </Link>
        ) : (
          <Link display={{ base: 'none', md: 'flex' }} onClick={onClickLogin}>
            ログイン
          </Link>
        )}
        <Link display={{ base: 'none', md: 'flex' }} onClick={onClickLogin}>
          ゲストログイン
        </Link>
        <Spacer />
        {loginUser && (
          <Text
            _hover={{ opacity: '0.8', cursor: 'pointer' }}
            fontWeight={'bold'}
            onClick={onClickMyPage}
          >
            {loginUser.name + `さん`}
          </Text>
        )}
        <Image
          boxSize="40px"
          src={CartIcon}
          alt="CartIcon"
          _hover={{ opacity: '0.8', cursor: 'pointer' }}
          onClick={onClickCartModal}
        />
      </HStack>
      <MenuDrawer
        onClose={onCloseMenuDrawer}
        isOpen={isOpenMenuDrawer}
        onClickHome={onClickHome}
        onClickLogin={onClickLogin}
      />
      <CartModal onClose={onCloseCartModal} isOpen={isOpenCartModal} />
    </>
  );
});
