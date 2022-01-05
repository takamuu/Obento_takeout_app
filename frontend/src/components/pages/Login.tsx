/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable arrow-body-style */
import { ChangeEvent, memo, useCallback, useState, VFC } from 'react';
import {
  Image,
  Input,
  Box,
  Divider,
  Flex,
  Stack,
  HStack,
  Text,
} from '@chakra-ui/react';

import MainLogo from 'images/MainLogo.svg';
import { PrimaryButton } from 'components/atoms/button/PrimaryButton';
import { GuestButton } from 'components/atoms/button/GuestButton';
import { NewRegistrationButton } from 'components/atoms/button/NewRegistrationButton';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { SignInParams } from 'types/api/sign';

export const Login: VFC = memo(() => {
  const { login, loading } = useAuth();

  const history = useHistory();

  const onClickHome = useCallback(
    () => history.push('/restaurants'),
    [history]
  );

  // ユーザーID用State
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) =>
    setUserId(e.target.value);

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setUserPassword(e.target.value);

  const params: SignInParams = {
    email: userId,
    password: userPassword,
  };
  const onClickLogin = () => login(params);

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <HStack spacing="12px">
          <Image
            boxSize="60px"
            src={MainLogo}
            alt="MainLogo"
            _hover={{ cursor: 'pointer' }}
            onClick={onClickHome}
          />
          <Text fontSize="23px" fontWeight="bold" color="brand">
            お弁当テイクアウトアプリ
          </Text>
        </HStack>
        <Divider borderColor="brand" my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Input
            borderColor="gray.300"
            placeholder="ユーザーID"
            _placeholder={{ color: 'gray.300' }}
            _hover={{ color: 'gray.600' }}
            value={userId}
            onChange={onChangeUserId}
          />
          <Input
            borderColor="gray.300"
            placeholder="Password"
            _placeholder={{ color: 'gray.300' }}
            _hover={{ color: 'gray.600' }}
            value={userPassword}
            onChange={onChangePassword}
          />
          <PrimaryButton
            disabled={!userId || !userPassword ? true : false}
            loading={loading}
            onClick={onClickLogin}
          >
            ログイン
          </PrimaryButton>
          <GuestButton>ゲストログイン</GuestButton>
          <NewRegistrationButton>新規登録</NewRegistrationButton>
        </Stack>
      </Box>
    </Flex>
  );
});
