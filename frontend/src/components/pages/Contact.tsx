/* eslint-disable arrow-body-style */
import { memo, useState, VFC } from 'react';
import { Button, Input, Textarea } from '@chakra-ui/react';
import { Divider, Spacer, Stack, Text, VStack } from '@chakra-ui/layout';

export const Contact: VFC = memo(() => {
  const [value, setValue] = useState('');

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };

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
          />
          <Spacer />
          <Text>お問い合わせ内容（必須）</Text>
          <Textarea
            h={'36'}
            borderColor="gray.300"
            placeholder="お問い合わせ内容を入力してください"
            _placeholder={{ color: 'gray.300' }}
            _hover={{ color: 'gray.600' }}
            onChange={handleInputChange}
          />
          <Spacer p={2} />
          <Button bg="brand" color="white" _hover={{ opacity: 0.8 }}>
            送信する
          </Button>
          <Spacer p={10} />
        </Stack>
      </VStack>
    </>
  );
});
