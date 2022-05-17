/* eslint-disable arrow-body-style */
import {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useState,
  VFC,
} from 'react';
import { useHistory } from 'react-router-dom';
import { Input } from '@chakra-ui/react';
import { Box, Flex, Spacer, Stack, Text, VStack } from '@chakra-ui/layout';
import { User } from 'types/api/user';
import { useLoginUser } from 'hooks/useLoginUser';
import { useMyPage } from 'hooks/useMyPage';
import { PrimaryButton } from 'components/atoms/button/PrimaryButton';

export const MyPage: VFC = memo(() => {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userKana, setUserKana] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [isEdit, setEdit] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [orderHistoryLoading, setOrderHistoryLoading] = useState(false);
  const history = useHistory();
  const { updateMyPage, deleteMyPage, updateLoading, deleteLoading } =
    useMyPage();

  const onEditButton = () => {
    setEditLoading(true);
    !isEdit ? setEdit(true) : setEdit(false);
  };

  const pageReload = () => window.location.reload();
  const onUpdateButton = async (params: User) => {
    if (!isEdit) setEdit(true);
    else {
      if (confirm('変更を保存してよろしいですか？') === false) return;
      else {
        await updateMyPage(params).then(() => {
          setEdit(false);
          setTimeout(pageReload, 500);
        });
      }
    }
  };

  const onOrderHistoryButton = () => {
    setOrderHistoryLoading(true);
    history.push('/order_history');
  };

  const onUnsubscribeButton = useCallback(async () => {
    if (userName === 'ゲストユーザー')
      alert(
        'ゲストユーザーは退会できません。退会は、新規登録した一般ユーザーで動作確認して下さい。'
      );
    else {
      if (confirm('本当に退会してよろしいですか？') === false) return;
      else {
        await deleteMyPage().then(() => {
          history.push('/');
          setTimeout(pageReload, 800);
        });
      }
    }
  }, [deleteMyPage, history, userName]);

  const { loginUser } = useLoginUser();

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) =>
    setUserName(e.target.value);
  const onChangeKana = (e: ChangeEvent<HTMLInputElement>) =>
    setUserKana(e.target.value);
  const onChangePhoneNumber = (e: ChangeEvent<HTMLInputElement>) =>
    setUserPhoneNumber(e.target.value);

  const params: User = {
    id: userId,
    name: userName,
    kana: userKana,
    email: userEmail,
    phone_number: userPhoneNumber,
  };

  useEffect(() => {
    loginUser &&
      (setUserId(String(loginUser?.id ?? '')),
      setUserName(loginUser?.name ?? ''),
      setUserKana(loginUser?.kana ?? ''),
      setUserEmail(loginUser?.email ?? ''),
      setUserPhoneNumber(loginUser?.phone_number ?? ''));
  }, [loginUser]);

  return (
    <>
      <Flex align="top" justify="center">
        <Box bg="white" w={'md'} h={'3xl'} p={2}>
          <VStack
            paddingTop="8"
            paddingBottom="6"
            fontSize="23px"
            fontWeight="bold"
            color="brand"
            spacing="12px"
          >
            <Text>基本情報</Text>
          </VStack>
          <Stack spacing={2} py={2} px={10}>
            <Text pt={2} color={'gray.600'}>
              名前
            </Text>
            {isEdit ? (
              <Input
                borderColor="gray.300"
                placeholder="名前を入力してください"
                _placeholder={{ color: 'gray.300' }}
                _hover={{ color: 'gray.600' }}
                value={userName}
                onChange={onChangeName}
                isReadOnly={!isEdit}
              />
            ) : (
              <Box
                pb={2}
                pl={4}
                fontSize={'xl'}
                borderBottom={'1px'}
                borderColor={'gray.400'}
              >
                {userName}
              </Box>
            )}

            <Text pt={2} color={'gray.600'}>
              フリガナ
            </Text>

            {isEdit ? (
              <Input
                borderColor="gray.300"
                placeholder="フリガナを入力してください"
                _placeholder={{ color: 'gray.300' }}
                _hover={{ color: 'gray.600' }}
                value={userKana}
                onChange={onChangeKana}
                isReadOnly={!isEdit}
              />
            ) : (
              <Box
                pb={2}
                pl={4}
                fontSize={'xl'}
                borderBottom={'1px'}
                borderColor={'gray.400'}
              >
                {userKana}
              </Box>
            )}
            <Text pt={2} color={'gray.600'}>
              電話番号（数字のみ入力）
            </Text>
            {isEdit ? (
              <Input
                borderColor="gray.300"
                placeholder="電話番号を入力してください"
                _placeholder={{ color: 'gray.300' }}
                _hover={{ color: 'gray.600' }}
                value={userPhoneNumber}
                onChange={onChangePhoneNumber}
                isReadOnly={!isEdit}
              />
            ) : (
              <Box
                pb={2}
                pl={4}
                fontSize={'xl'}
                borderBottom={'1px'}
                borderColor={'gray.400'}
              >
                {userPhoneNumber}
              </Box>
            )}
            <Spacer p={4}></Spacer>
            {!isEdit && (
              <PrimaryButton
                disabled={editLoading || orderHistoryLoading || deleteLoading}
                loading={editLoading}
                onClick={() => onEditButton()}
              >
                編集する
              </PrimaryButton>
            )}
            {isEdit && (
              <PrimaryButton
                disabled={updateLoading || orderHistoryLoading || deleteLoading}
                loading={updateLoading}
                onClick={() => onUpdateButton(params)}
              >
                変更を保存する
              </PrimaryButton>
            )}
            <Spacer p={4} />
            <PrimaryButton
              disabled={
                editLoading ||
                updateLoading ||
                orderHistoryLoading ||
                deleteLoading
              }
              loading={orderHistoryLoading}
              onClick={() => onOrderHistoryButton()}
            >
              購入履歴
            </PrimaryButton>
            <Spacer p={4} />
            <PrimaryButton
              disabled={
                editLoading ||
                updateLoading ||
                orderHistoryLoading ||
                deleteLoading
              }
              loading={deleteLoading}
              onClick={() => onUnsubscribeButton()}
            >
              退会する
            </PrimaryButton>
          </Stack>
        </Box>
      </Flex>
    </>
  );
});
