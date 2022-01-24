/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import { memo, useCallback, VFC } from 'react';
import { Box, Flex, Heading, Link } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import { useDisclosure } from '@chakra-ui/hooks';
import { useHistory } from 'react-router-dom';

import { useLoginUser } from 'hooks/useLoginUser';
import { useAuth } from 'hooks/useAuth';
import { MenuIconButton } from 'components/atoms/button/MenuIconButton';
import { MenuDrawer } from 'components/molecules/MenuDrawer';
import MainLogo from 'images/MainLogo.svg';
import CartIcon from 'images/CartIcon.svg';

export const Header: VFC = memo(() => {
  const {
    isOpen: isOpenMenuDrawer,
    onOpen: onOpenMenuDrawer,
    onClose: onCloseMenuDrawer,
  } = useDisclosure();

  // todo: cartModal実装時に使用
  // const {
  //   isOpen: isOpenCartModal,
  //   onOpen: onOpenCartModal,
  //   onClose: onCloseCartModal,
  // } = useDisclosure();

  const { loginUser } = useLoginUser();
  const { logout } = useAuth();
  const history = useHistory();

  const onClickHome = useCallback(() => history.push('/restaurants'), []);
  const onClickLogin = useCallback(() => history.push('/login'), []);
  const onClickCart = useCallback(() => history.push('/restaurants/cart'), []);

  const onClickLogout = () => logout();

  return (
    <>
      <Flex
        as="nav"
        bg={{ color: 'white', opacity: '25%' }}
        color="green.900"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
      >
        <Flex align="center" as="a" mr={8} _hover={{ cursor: 'pointer' }}>
          <MenuIconButton onOpen={onOpenMenuDrawer} />
          <Heading
            paddingLeft={4}
            as="h1"
            fontSize={{ base: '2xl', md: '3xl' }}
            onClick={onClickHome}
          >
            <Image boxSize="60px" src={MainLogo} alt="MainLogo" />
          </Heading>
        </Flex>
        <Flex
          align="center"
          fontSize="md"
          flexGrow={2}
          display={{ base: 'none', md: 'flex' }}
        >
          <Box pr={4}>
            <Link>弁テクの使い方</Link>
          </Box>
          <Box pr={4}>
            <Link>お問い合わせ</Link>
          </Box>
          {loginUser ? (
            <Box pr={4}>
              <Link onClick={onClickLogout}>ログアウト</Link>
            </Box>
          ) : (
            <Box pr={4}>
              <Link onClick={onClickLogin}>ログイン</Link>
            </Box>
          )}
          <Box pr={4}>
            <Link onClick={onClickLogin}>ゲストログイン</Link>
          </Box>
        </Flex>
        <Box _hover={{ opacity: '0.8', cursor: 'pointer' }}>
          <Image
            boxSize="40px"
            src={CartIcon}
            alt="CartIcon"
            onClick={onClickCart}
          />
        </Box>
      </Flex>
      <MenuDrawer
        onClose={onCloseMenuDrawer}
        isOpen={isOpenMenuDrawer}
        onClickHome={onClickHome}
        onClickLogin={onClickLogin}
      />
      {/* <CartModal
        onCloseCartModal={onCloseCartModal}
        isOpenCartModal={isOpenCartModal}
        onOpen={onOpenCartModal}
      /> */}
    </>
  );
});
