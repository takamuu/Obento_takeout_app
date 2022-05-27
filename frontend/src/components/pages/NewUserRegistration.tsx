/* eslint-disable no-irregular-whitespace */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable arrow-body-style */
import { ChangeEvent, memo, useEffect, useState, VFC } from 'react';
import {
  Input,
  Box,
  Flex,
  Checkbox,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react';
import { Badge, Divider, Spacer, Stack, Text, VStack } from '@chakra-ui/layout';

import { SignUpParams } from 'types/api/sign';
import { useNewUserRegistration } from 'hooks/useNewUserRegistration';
import { PrimaryButton } from 'components/atoms/button/PrimaryButton';
import { useHistory } from 'react-router-dom';

const NAME_MAX_LENGTH = 30;

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

  const isNameError = userName.length > NAME_MAX_LENGTH;

  const regExpKana = /^[ァ-ヶー　]+$/;
  const isKanaError = !regExpKana.test(userKana) && userKana !== '';

  const regExpEmail =
    /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
  const isEmailError = !regExpEmail.test(userId) && userId !== '';

  const isPasswordNumberError =
    userPassword !== '' &&
    (userPassword.length < 6 || 24 < userPassword.length);

  const regExpPassword = /^[a-zA-Z0-9.?/-]+$/;
  const isPasswordCharacterError =
    !regExpPassword.test(userPassword) && userPassword !== '';

  const isPasswordConfirmationError =
    userPasswordConfirmation !== '' &&
    userPassword !== userPasswordConfirmation;

  const regExpPhone = /[0-9]{10,11}/;
  const isPhoneNumberError =
    !regExpPhone.test(userPhoneNumber) && userPhoneNumber !== '';

  return (
    <Flex bg="gray.200" align="center" justify="center">
      <Box m={10} bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <VStack
          fontSize={{ base: '20px', md: '23px' }}
          fontWeight="bold"
          color="brand"
          spacing="12px"
        >
          <Text>お弁当テイクアウトアプリ</Text>
          <Text>アカウントを作成</Text>
        </VStack>
        <Divider borderColor="brand" my={4} />
        <Stack spacing={4}>
          <FormControl isInvalid={isNameError}>
            <FormLabel>
              名前
              <Badge colorScheme="red" variant="outline" ml="2">
                30文字
              </Badge>
            </FormLabel>
            <Input
              borderColor="gray.300"
              placeholder="名前を入力してください"
              _placeholder={{ color: 'gray.300' }}
              _hover={{ color: 'gray.600' }}
              value={userName}
              onChange={onChangeName}
            />
            {isNameError && (
              <FormErrorMessage>30文字を超えています</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={isKanaError}>
            <FormLabel>
              フリガナ
              <Badge colorScheme="red" variant="outline" ml="2">
                全角カタカナ
              </Badge>
            </FormLabel>
            <Input
              borderColor="gray.300"
              placeholder="フリガナを入力してください"
              _placeholder={{ color: 'gray.300' }}
              _hover={{ color: 'gray.600' }}
              value={userKana}
              onChange={onChangeKana}
            />
            {isKanaError && (
              <FormErrorMessage>
                全角カナではない文字が含まれています
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={isEmailError}>
            <FormLabel>
              Eメールアドレス
              <Badge colorScheme="red" variant="outline" ml="2">
                半角英数字
              </Badge>
            </FormLabel>
            <Input
              borderColor="gray.300"
              placeholder="Eメールを入力してください"
              _placeholder={{ color: 'gray.300' }}
              _hover={{ color: 'gray.600' }}
              value={userId}
              onChange={onChangeId}
            />
            {isEmailError && (
              <FormErrorMessage>Eメールアドレスが不正です</FormErrorMessage>
            )}
          </FormControl>
          <FormControl
            isInvalid={isPasswordNumberError || isPasswordCharacterError}
          >
            <FormLabel>
              パスワード
              <Badge colorScheme="red" variant="outline" ml="1">
                6~24文字
              </Badge>
            </FormLabel>
            <Input
              borderColor="gray.300"
              placeholder="パスワードを入力してください"
              _placeholder={{ color: 'gray.300' }}
              _hover={{ color: 'gray.600' }}
              type="password"
              value={userPassword}
              onChange={onChangePassword}
            />
            {isPasswordNumberError && (
              <FormErrorMessage>文字数が不正です</FormErrorMessage>
            )}
            {isPasswordCharacterError && (
              <FormErrorMessage>
                認証できない文字が含まれています
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={isPasswordConfirmationError}>
            <FormLabel>確認用パスワード</FormLabel>
            <Input
              borderColor="gray.300"
              placeholder="パスワードを入力してください"
              _placeholder={{ color: 'gray.300' }}
              _hover={{ color: 'gray.600' }}
              type="password"
              value={userPasswordConfirmation}
              onChange={onChangePasswordConfirmation}
            />
            {isPasswordConfirmationError && (
              <FormErrorMessage>パスワードが一致していません</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={isPhoneNumberError}>
            <FormLabel>
              電話番号
              <Badge colorScheme="red" variant="outline" ml="2">
                半角数字
              </Badge>
            </FormLabel>
            <Input
              borderColor="gray.300"
              placeholder="電話番号を入力してください"
              _placeholder={{ color: 'gray.300' }}
              _hover={{ color: 'gray.600' }}
              value={userPhoneNumber}
              onChange={onChangePhoneNumber}
            />
            {isPhoneNumberError && (
              <FormErrorMessage>電話番号が不正です</FormErrorMessage>
            )}
          </FormControl>
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
              !isChecked ||
              isNameError ||
              isKanaError ||
              isEmailError ||
              isPasswordNumberError ||
              isPasswordCharacterError ||
              isPasswordConfirmationError ||
              isPhoneNumberError
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
