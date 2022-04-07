/* eslint-disable arrow-body-style */
import { memo, VFC } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import {
  Box,
  Divider,
  Flex,
  Spacer,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/layout';

export const MyPage: VFC = memo(() => {
  const history = useHistory();

  const onBackButton = () => history.push('/');

  const onOrderHistoryButton = () => history.push('/order_history');

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
          <Text>マイページ</Text>
        </VStack>
        <Stack spacing={4} py={4} px={10}>
          <Spacer />
          <Button
            bg="brand"
            color="white"
            _hover={{ opacity: 0.8 }}
            onClick={() => onBackButton()}
          >
            トップ画面へ戻る
          </Button>
          <Button
            bg="brand"
            color="white"
            _hover={{ opacity: 0.8 }}
            onClick={() => onOrderHistoryButton()}
          >
            購入履歴
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
});
