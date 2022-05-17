/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable arrow-body-style */
import { ChangeEvent, memo, useEffect, useState, VFC } from 'react';
import {
  Input,
  Box,
  Divider,
  Flex,
  Stack,
  VStack,
  Text,
  Checkbox,
  Spacer,
  Button,
} from '@chakra-ui/react';

import { SignUpParams } from 'types/api/sign';
import { useNewUserRegistration } from 'hooks/useNewUserRegistration';
import { PrimaryButton } from 'components/atoms/button/PrimaryButton';
import { useHistory } from 'react-router-dom';

export const NewUserRegistration: VFC = memo(() => {
  const { newUserRegistration, newUserRegistrationLoading } =
    useNewUserRegistration();
  const history = useHistory();

  const [userName, setUserName] = useState('');
  const [userKana, setUserKana] = useState('');
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPasswordConfirmation, setUserPasswordConfirmation] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [isChecked, setisChecked] = useState(false);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setUserName(e.target.value);

  const onChangeKana = (e: ChangeEvent<HTMLInputElement>) =>
    setUserKana(e.target.value);

  const onChangeId = (e: ChangeEvent<HTMLInputElement>) =>
    setUserId(e.target.value);

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setUserPassword(e.target.value);

  const onChangePasswordConfirmation = (e: ChangeEvent<HTMLInputElement>) =>
    setUserPasswordConfirmation(e.target.value);

  const onChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>) =>
    setUserPhoneNumber(e.target.value);

  const params: SignUpParams = {
    name: userName,
    kana: userKana,
    email: userId,
    password: userPassword,
    password_confirmation: userPasswordConfirmation,
    phone_number: userPhoneNumber,
  };

  const onClickNewRegistration = () => newUserRegistration(params);
  const onClickPolicy = () => history.push('/policy');
  const onClickTermsOfUse = () => history.push('/terms_of_use');

  useEffect(() => window.scrollTo(0, 0));

  return (
    <Flex bg="gray.200" align="center" justify="center">
      <Box m={'10'} bg="white" p={2} borderRadius="md" shadow="md">
        <VStack fontSize="23px" fontWeight="bold" color="brand" spacing="12px">
          <Text>お弁当テイクアウトアプリ</Text>
          <Text>アカウントを作成</Text>
        </VStack>
        <Divider borderColor="brand" my={4} />
        <Stack spacing={4} py={4} px={10}>
          <Text h="2">名前</Text>
          <Input
            borderColor="gray.300"
            placeholder="名前を入力してください"
            _placeholder={{ color: 'gray.300' }}
            _hover={{ color: 'gray.600' }}
            value={userName}
            onChange={onChangeName}
          />
          <Text h="2">フリガナ</Text>
          <Input
            borderColor="gray.300"
            placeholder="フリガナを入力してください"
            _placeholder={{ color: 'gray.300' }}
            _hover={{ color: 'gray.600' }}
            value={userKana}
            onChange={onChangeKana}
          />
          <Text h="2">Eメールアドレス</Text>
          <Input
            borderColor="gray.300"
            placeholder="Eメールを入力してください"
            _placeholder={{ color: 'gray.300' }}
            _hover={{ color: 'gray.600' }}
            value={userId}
            onChange={onChangeId}
          />
          <Text h="2">パスワード</Text>
          <Input
            borderColor="gray.300"
            placeholder="パスワードを入力してください"
            _placeholder={{ color: 'gray.300' }}
            _hover={{ color: 'gray.600' }}
            type="password"
            value={userPassword}
            onChange={onChangePassword}
          />
          <Text h="2">確認用パスワード</Text>
          <Input
            borderColor="gray.300"
            placeholder="パスワードを入力してください"
            _placeholder={{ color: 'gray.300' }}
            _hover={{ color: 'gray.600' }}
            type="password"
            value={userPasswordConfirmation}
            onChange={onChangePasswordConfirmation}
          />
          <Text h="2">電話番号（数字のみ入力）</Text>
          <Input
            borderColor="gray.300"
            placeholder="電話番号を入力してください"
            _placeholder={{ color: 'gray.300' }}
            _hover={{ color: 'gray.600' }}
            value={userPhoneNumber}
            onChange={onChangePhoneNumber}
          />
          <Divider borderColor="brand" my={4} />
          <VStack spacing={2} align="center">
            <Button color="brand" variant="link" onClick={onClickPolicy}>
              プライバシーポリシー
            </Button>
            <Button color="brand" variant="link" onClick={onClickTermsOfUse}>
              利用規約
            </Button>
          </VStack>
          <Checkbox
            size="sm"
            defaultIsChecked={false}
            borderColor="gray.300"
            onChange={(e) => {
              isChecked ? setisChecked(false) : setisChecked(true);
            }}
          >
            利用規約とプライバシーポリシーに同意する
          </Checkbox>
          <Spacer />
          <PrimaryButton
            disabled={
              !userName ||
              !userKana ||
              !userId ||
              !userPassword ||
              !userPasswordConfirmation ||
              !userPhoneNumber ||
              !isChecked
            }
            loading={newUserRegistrationLoading}
            onClick={onClickNewRegistration}
          >
            同意して登録
          </PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  );
});
