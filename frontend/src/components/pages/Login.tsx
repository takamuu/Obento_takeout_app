import { Image } from '@chakra-ui/image';
import { Box, Divider, Flex, Heading, Stack } from '@chakra-ui/layout';
import { memo, VFC } from 'react';
import { Link } from 'react-router-dom';

import MainLogo from 'images/MainLogo.svg';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';

export const Login: VFC = memo(() => {
  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRaius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          <Image boxSize="60px" src={MainLogo} alt="MainLogo" />
          お弁当テイクアウトアプリ
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Input placeholder="ユーザーID" />
          <Button bg="teal.400" _hover={{ opacity: 0.8 }}>
            ログイン
          </Button>
          <Button>ゲストログイン</Button>
        </Stack>
      </Box>
    </Flex>
  );
});
