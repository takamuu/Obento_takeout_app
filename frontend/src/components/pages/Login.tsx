/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable arrow-body-style */
import {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useState,
  VFC,
} from 'react';
import {
  Input,
  Box,
  Divider,
  Flex,
  Stack,
  VStack,
  Text,
} from '@chakra-ui/react';

import { PrimaryButton } from 'components/atoms/button/PrimaryButton';
import { GuestButton } from 'components/atoms/button/GuestButton';
import { NewUserRegistrationButton } from 'components/atoms/button/NewUserRegistrationButton';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { SignInParams } from 'types/api/sign';
import { useNewUserRegistration } from 'hooks/useNewUserRegistration';
import { useGuestAuth } from 'hooks/useGuestAuth';

export const Login: VFC = memo(() => {
  const { login, loading } = useAuth();
  const [newUserRegistrationLoading, setNewUserRegistrationLoading] =
    useState(false);
  const { guestLogin, loading: guestLoading } = useGuestAuth();

  const history = useHistory();

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
  const onLogin = () => login(params);

  const onNewUserRegistration = useCallback(() => {
    setNewUserRegistrationLoading(true);
    history.push('/new_user_registration');
  }, [history]);

  const onGuestLogin = () => guestLogin();

  useEffect(() => window.scrollTo(0, 0));

  return (
    <Flex bg="gray.200" align="center" justify="center">
      <Box m={10} bg="white" w="sm" p={4} borderRadius="md" shadow="md">
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
            disabled={
              !userId ||
              !userPassword ||
              loading ||
              guestLoading ||
              newUserRegistrationLoading
            }
            loading={loading}
            onClick={onLogin}
          >
            ログイン
          </PrimaryButton>
          <GuestButton
            disabled={loading || guestLoading || newUserRegistrationLoading}
            loading={guestLoading}
            onClick={onGuestLogin}
          >
            ゲストログイン
          </GuestButton>
          <NewUserRegistrationButton
            disabled={loading || guestLoading || newUserRegistrationLoading}
            loading={newUserRegistrationLoading}
            onClick={onNewUserRegistration}
          >
            新規登録
          </NewUserRegistrationButton>
        </Stack>
      </Box>
    </Flex>
  );
});
