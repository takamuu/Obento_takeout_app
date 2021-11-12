import { memo, VFC } from 'react';
import { Box, Flex, Heading, Link, Stack } from '@chakra-ui/layout';
import { useDisclosure } from '@chakra-ui/hooks';
import { MenuIconButton } from 'components/atoms/button/MenuIconButton';
import { MenuDrawer } from 'components/molecules/MenuDrawer';
import { Image } from '@chakra-ui/image';
import MainLogo from 'images/MainLogo.svg';

export const Header: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <Heading as="h1" fontSize={{ base: '2xl', md: '3xl' }}>
            <Image boxSize="60px" src={MainLogo} alt="Logo" />
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
            <Link>ログイン</Link>
          </Box>
          <Box pr={4}>
            <Link>ゲストログイン</Link>
          </Box>
        </Flex>
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer onClose={onClose} isOpen={isOpen} />
    </>
  );
});

Header.displayName = 'Header';
