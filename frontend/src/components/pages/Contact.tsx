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
import { Button, Checkbox, Input, Textarea } from '@chakra-ui/react';
import { memo, VFC } from 'react';

export const Contact: VFC = memo(() => {
  return (
    <Flex bg="gray.200" align="center" justify="center" height="130vh">
      <Box bg="white" p={2} borderRadius="md" shadow="md">
        <VStack
          paddingTop="3"
          fontSize="23px"
          fontWeight="bold"
          color="brand"
          spacing="12px"
        >
          <Text>お問い合わせ</Text>
        </VStack>
        <Divider borderColor="brand" my={4} />
        <Stack spacing={4} py={4} px={10}>
          <Text h="2">件名（必須）</Text>
          <Input
            borderColor="gray.300"
            placeholder="件名を入力してください"
            _placeholder={{ color: 'gray.300' }}
            _hover={{ color: 'gray.600' }}
            // value={userName}
            // onChange={onChangeName}
          />
          <Text h="2">お問い合わせ内容（必須）</Text>
          <Textarea
            borderColor="gray.300"
            placeholder="お問い合わせ内容を入力してください"
            _placeholder={{ color: 'gray.300' }}
            _hover={{ color: 'gray.600' }}
            // value={userKana}
            // onChange={onChangeKana}
          />
          <Text h="2">氏名（必須）</Text>
          <HStack>
            <Box>
              <Text h="2" w="32px" textAlign={'center'}>
                姓
              </Text>
            </Box>
            <Input
              borderColor="gray.300"
              placeholder="姓を入力してください"
              _placeholder={{ color: 'gray.300' }}
              _hover={{ color: 'gray.600' }}
              // value={userId}
              // onChange={onChangeId}
            />
            <Box>
              <Text h="2" w="32px" textAlign={'center'}>
                名
              </Text>
            </Box>
            <Input
              borderColor="gray.300"
              placeholder="名を入力してください"
              _placeholder={{ color: 'gray.300' }}
              _hover={{ color: 'gray.600' }}
              // value={userId}
              // onChange={onChangeId}
            />
          </HStack>
          <Text h="2">フリガナ（必須）</Text>
          <HStack>
            <Box>
              <Text h="2" w="32px" textAlign={'center'} fontSize={'sm'}>
                セイ
              </Text>
            </Box>
            <Input
              // w="auto"
              borderColor="gray.300"
              placeholder="セイを入力してください"
              _placeholder={{ color: 'gray.300' }}
              _hover={{ color: 'gray.600' }}
              // value={userId}
              // onChange={onChangeId}
            />
            <Box>
              <Text h="2" w="32px" textAlign={'center'} fontSize={'sm'}>
                メイ
              </Text>
            </Box>
            <Input
              borderColor="gray.300"
              placeholder="メイを入力してください"
              _placeholder={{ color: 'gray.300' }}
              _hover={{ color: 'gray.600' }}
              // value={userId}
              // onChange={onChangeId}
            />
          </HStack>
          <Text h="2">Eメールアドレス（必須）</Text>
          <Input
            borderColor="gray.300"
            placeholder="Eメールを入力してください"
            _placeholder={{ color: 'gray.300' }}
            _hover={{ color: 'gray.600' }}
            // value={userId}
            // onChange={onChangeId}
          />
          <Text h="2">Eメールアドレス確認用（必須）</Text>
          <Input
            borderColor="gray.300"
            placeholder="確認用のEメールアドレスを入力してください"
            _placeholder={{ color: 'gray.300' }}
            _hover={{ color: 'gray.600' }}
            type="password"
            // value={userPassword}
            // onChange={onChangePassword}
          />
          <Text h="2">住所（任意）</Text>
          <Input
            borderColor="gray.300"
            placeholder="住所を入力してください"
            _placeholder={{ color: 'gray.300' }}
            _hover={{ color: 'gray.600' }}
            // value={userPhoneNumber}
            // onChange={onChangePhoneNumber}
          />
          <Text h="2">電話番号（任意）</Text>
          <Input
            borderColor="gray.300"
            placeholder="電話番号を入力してください"
            _placeholder={{ color: 'gray.300' }}
            _hover={{ color: 'gray.600' }}
            type="password"
            //   value={userPasswordConfirmation}
            //   onChange={onChangePasswordConfirmation}
          />
          <Divider borderColor="brand" my={4} />
          <VStack spacing={2} align="center">
            <Button color="brand" variant="link">
              プライバシーポリシー
            </Button>
            <Checkbox
              size="sm"
              alignContent={'center'}
              defaultIsChecked={false}
              borderColor="gray.300"
              // onChange={(e) => {
              // isChecked ? setisChecked(false) : setisChecked(true);
              // }}
            >
              プライバシーポリシーに同意する
            </Checkbox>
          </VStack>
          <Spacer />
          <Button>送信する</Button>
        </Stack>
      </Box>
    </Flex>
  );
});
