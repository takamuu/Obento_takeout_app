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
  VStack,
  Text,
} from '@chakra-ui/react';

import MainLogo from 'images/MainLogo.svg';
import { PrimaryButton } from 'components/atoms/button/PrimaryButton';
import { GuestButton } from 'components/atoms/button/GuestButton';
import { NewUserRegistrationButton } from 'components/atoms/button/NewUserRegistrationButton';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { SignInParams } from 'types/api/sign';
import { useNewUserRegistration } from 'hooks/useNewUserRegistration';

export const Login: VFC = memo(() => {
  const { login, loading } = useAuth();
  const { newUserRegistrationLoading } = useNewUserRegistration();

  const history = useHistory();

  const onClickHome = useCallback(
    () => history.push('/restaurants'),
    [history]
  );

  // ユーザーID用State
  const [userId, setUserId] = useState('example@example.com');
  const [userPassword, setUserPassword] = useState('password');

  const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) =>
    setUserId(e.target.value);

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setUserPassword(e.target.value);

  const params: SignInParams = {
    email: userId,
    password: userPassword,
  };
  const onClickLogin = () => login(params);

  const onClickNewUserRegistration = useCallback(
    () => history.push('/login/new_user_registration'),
    [history]
  );

  return (
    <Flex align="center" justify="center" height="90vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <VStack
          fontSize="23px"
          fontWeight="bold"
          color="brand"
          spacing={2}
          align="center"
        >
          <Text>お弁当テイクアウトアプリ</Text>
          <Text>ログイン</Text>
        </VStack>
        <Divider borderColor="brand" my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Text h="1">Eメールアドレス</Text>
          <Input
            borderColor="gray.300"
            placeholder="Eメールを入力してください"
            _placeholder={{ color: 'gray.300' }}
            _hover={{ color: 'gray.600' }}
            value={userId}
            onChange={onChangeUserId}
          />
          <Text h="1">パスワード</Text>
          <Input
            borderColor="gray.300"
            placeholder="パスワードを入力してください"
            _placeholder={{ color: 'gray.300' }}
            _hover={{ color: 'gray.600' }}
            type="password"
            value={userPassword}
            onChange={onChangePassword}
          />
          <PrimaryButton
            disabled={!userId || !userPassword}
            loading={loading}
            onClick={onClickLogin}
          >
            ログイン
          </PrimaryButton>
          <GuestButton>ゲストログイン</GuestButton>
          <NewUserRegistrationButton
            loading={newUserRegistrationLoading}
            onClick={onClickNewUserRegistration}
          >
            新規登録
          </NewUserRegistrationButton>
        </Stack>
      </Box>
    </Flex>
  );
});
