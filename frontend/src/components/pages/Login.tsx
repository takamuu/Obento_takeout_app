import { memo, useCallback, VFC } from 'react';
import {
  Image,
  Button,
  Input,
  Box,
  Divider,
  Flex,
  Heading,
  Stack,
} from '@chakra-ui/react';

import MainLogo from 'images/MainLogo.svg';
import { PrimaryButton } from 'components/atoms/button/PrimaryButton';
import { GuestButton } from 'components/atoms/button/GuestButton';
import { useHistory } from 'react-router-dom';

export const Login: VFC = memo(() => {
  const history = useHistory();
  const onClickHome = useCallback(() => history.push('/restaurants'), []);

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRaius="md" shadow="md">
        <Heading as="h1" size="md" textAlign="center">
          <Image
            boxSize="60px"
            src={MainLogo}
            alt="MainLogo"
            _hover={{ cursor: 'pointer' }}
            onClick={onClickHome}
          />
          お弁当テイクアウトアプリ
        </Heading>
        <Divider borderColor="gray.300" my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Input
            borderColor="gray.300"
            placeholder="ユーザーID"
            _placeholder={{ color: 'gray.300' }}
            _hover={{ color: 'gray.600' }}
          />
          <Input
            borderColor="gray.300"
            placeholder="Password"
            _placeholder={{ color: 'gray.300' }}
            _hover={{ color: 'gray.600' }}
          />
          <PrimaryButton>ログイン</PrimaryButton>
          <GuestButton>ゲストログイン</GuestButton>
        </Stack>
      </Box>
    </Flex>
  );
});
