/* eslint-disable arrow-body-style */
import { ChangeEvent, memo, useState, VFC } from 'react';
import { Input, Textarea } from '@chakra-ui/react';
import { Divider, Spacer, Stack, Text, VStack } from '@chakra-ui/layout';
import { usePostContact } from 'hooks/usePostContact';
import { PrimaryButton } from 'components/atoms/button/PrimaryButton';
import { ContactParams } from 'types/api/contact';

export const Contact: VFC = memo(() => {
  const { postContact, loading } = usePostContact();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);

  const params: ContactParams = {
    title: title,
    content: content,
  };

  const onContact = () => postContact(params);

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
          <Text>件名（必須）</Text>
          <Input
            borderColor="gray.300"
            placeholder="件名を入力してください"
            _placeholder={{ color: 'gray.300' }}
            value={title}
            onChange={onChangeTitle}
          />
          <Spacer />
          <Text>お問い合わせ内容（必須）</Text>
          <Textarea
            h={'36'}
            borderColor="gray.300"
            placeholder="お問い合わせ内容を入力してください"
            _placeholder={{ color: 'gray.300' }}
            _hover={{ color: 'gray.600' }}
            value={content}
            onChange={onChangeContent}
          />
          <Spacer p={2} />
          <PrimaryButton
            disabled={!title || !content}
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
