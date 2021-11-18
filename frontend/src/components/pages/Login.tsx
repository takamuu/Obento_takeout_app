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

export const Login: VFC = memo(() => {
  const history = useHistory();
  const onClickHome = useCallback(
    () => history.push('/restaurants'),
    [history]
  );

  // ユーザーID用State
  const [userId, setUserId] = useState('');
  const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) =>
    setUserId(e.target.value);

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRaius="md" shadow="md">
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
          />
          <PrimaryButton>ログイン</PrimaryButton>
          <GuestButton>ゲストログイン</GuestButton>
          <NewRegistrationButton>新規登録</NewRegistrationButton>
        </Stack>
      </Box>
    </Flex>
  );
});
