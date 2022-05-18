/* eslint-disable arrow-body-style */
import { ChangeEvent, memo, useEffect, useState, VFC } from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { Badge, Divider, Spacer, Stack, Text, VStack } from '@chakra-ui/layout';
import { usePostContact } from 'hooks/usePostContact';
import { PrimaryButton } from 'components/atoms/button/PrimaryButton';
import { ContactParams } from 'types/api/contact';
import { useHistory } from 'react-router-dom';
import { useLoginUser } from 'hooks/useLoginUser';

const TITLE_MAX_LENGTH = 50;
const CONTENT_MAX_LENGTH = 2000;

export const Contact: VFC = memo(() => {
  const { postContact, loading } = usePostContact();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const history = useHistory();
  const { loginUser } = useLoginUser();

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const params: ContactParams = {
    title: title,
    content: content,
  };

  const onContact = async () => {
    await postContact(params), history.push('/');
  };

  const isLoginError = loginUser === undefined;
  const isTitleError = title.length > TITLE_MAX_LENGTH;
  const isContentError = content.length > CONTENT_MAX_LENGTH;

  useEffect(() => window.scrollTo(0, 0));

  return (
    <>
      <VStack align="center">
        <Stack spacing={4} w={500}>
          <Text
            pt={10}
            fontSize="24px"
            fontWeight="bold"
            color="brand"
            align={'center'}
          >
            お問い合わせ
          </Text>
          <Divider p={2} w={'97.5%'} borderColor="brand" />
          <FormControl isInvalid={isLoginError}>
            {isLoginError && (
              <FormErrorMessage fontWeight={'bold'}>
                ログインまたはアカウントを作成してください
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={isTitleError}>
            <FormLabel fontWeight={'bold'}>
              件 名
              <Badge colorScheme={'red'} variant="outline" ml="2">
                必須
              </Badge>
              <Badge colorScheme={'red'} variant="outline" ml="1">
                50文字まで
              </Badge>
            </FormLabel>
            <Input
              borderColor="gray.300"
              placeholder="件名を入力してください"
              _placeholder={{ color: 'gray.300' }}
              value={title}
              onChange={onChangeTitle}
            />
            {isTitleError && (
              <FormErrorMessage>50文字を超えています</FormErrorMessage>
            )}
          </FormControl>
          <Spacer />
          <FormControl isInvalid={isContentError}>
            <FormLabel fontWeight={'bold'}>
              お問い合わせ内容
              <Badge colorScheme={'red'} variant="outline" ml="2">
                必須
              </Badge>
              <Badge colorScheme={'red'} variant="outline" ml="1">
                2000文字まで
              </Badge>
            </FormLabel>
            <Textarea
              h={'36'}
              borderColor="gray.300"
              placeholder="お問い合わせ内容を入力してください"
              _placeholder={{ color: 'gray.300' }}
              _hover={{ color: 'gray.600' }}
              value={content}
              onChange={onChangeContent}
            />
            {isContentError && (
              <FormErrorMessage>2000文字を超えています</FormErrorMessage>
            )}
          </FormControl>
          <Spacer p={2} />
          <PrimaryButton
            disabled={
              !title ||
              !content ||
              isTitleError ||
              isContentError ||
              isLoginError
            }
            loading={loading}
            onClick={onContact}
          >
            送信する
          </PrimaryButton>
          <Spacer p={10} />
        </Stack>
      </VStack>
    </>
  );
});
