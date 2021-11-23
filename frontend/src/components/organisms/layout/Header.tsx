/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import { memo, useCallback, VFC } from 'react';
import { Box, Flex, Heading, Link } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import { useDisclosure } from '@chakra-ui/hooks';
import { useHistory } from 'react-router-dom';

import { MenuIconButton } from 'components/atoms/button/MenuIconButton';
import { MenuDrawer } from 'components/molecules/MenuDrawer';
import MainLogo from 'images/MainLogo.svg';

export const Header: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  const onClickHome = useCallback(() => history.push('/restaurants'), []);
  const onClickLogin = useCallback(() => history.push('/login'), []);
  // 今回は使用していないが、以降実装予定のコード
  // const onClickUserManagement = useCallback(
  //   () => history.push('/login/user_management'),
  //   []
  // );
  // const onClickSetting = useCallback(() => history.push('/login/setting'), []);

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
        <Flex
          align="center"
          as="a"
          mr={8}
          _hover={{ cursor: 'pointer' }}
          onClick={onClickHome}
        >
          <Heading as="h1" fontSize={{ base: '2xl', md: '3xl' }}>
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
          <Box pr={4}>
            <Link onClick={onClickLogin}>ログイン</Link>
          </Box>
          <Box pr={4}>
            <Link onClick={onClickLogin}>ゲストログイン</Link>
          </Box>
        </Flex>
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer
        onClose={onClose}
        isOpen={isOpen}
        onClickHome={onClickHome}
        onClickLogin={onClickLogin}
      />
    </>
  );
});
