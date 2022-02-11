/* eslint-disable arrow-body-style */
import { ChangeEvent, memo, useState, VFC } from 'react';
import { Button, Checkbox, Input, Textarea } from '@chakra-ui/react';
import {
  Box,
  Divider,
  Flex,
  HStack,
  Spacer,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/layout';

export const PurchaseHistory: VFC = memo(() => {
  const [contactTitle, setContactTitle] = useState('');
  const [isChecked, setisChecked] = useState(false);

  const onChangeContactTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setContactTitle(e.target.value);

  return (
    <Flex bg="gray.200" align="center" justify="center" height="70vh">
      <Box bg="white" w={'md'} h={'lg'} p={2} borderRadius="md" shadow="md">
        <VStack
          paddingTop="3"
          fontSize="23px"
          fontWeight="bold"
          color="brand"
          spacing="12px"
        >
          <Text>購入履歴</Text>
        </VStack>
        <Divider borderColor="brand" my={4} />
        <Stack spacing={4} py={4} px={10}>
          <Divider borderColor="brand" my={4} />
          <Spacer />
          <Button bg="brand" color="white" _hover={{ opacity: 0.8 }}>
            戻る
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
});
