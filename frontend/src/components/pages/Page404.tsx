import { memo, VFC } from 'react';
import { Box, Flex, Link, Spacer, Text, VStack } from '@chakra-ui/layout';

export const Page404: VFC = memo(() => {
  return (
    <Flex align="center" justify={'center'} height="70vh">
      <Box w={'md'} h={'lg'}>
        <VStack align={'left'} color="brand" spacing="12px">
          <Text fontSize={'2xl'} fontWeight="bold">
            ページが見つかりませんでした。
          </Text>
          <Spacer />
          <Text fontSize="xl" fontWeight="bold">
            お探しのページはいずれかの理由により見つかりませんでした。
          </Text>
          <Text fontSize={'md'} pl={'5'}>
            1.ページのURLが変更された可能性があります。
          </Text>
          <Text pl={'5'}>2.ページが削除された可能性があります。</Text>
          <Text pl={'5'}>
            3.アドレス（URL）をタイプミスしている可能性があります。
          </Text>
          <Spacer />
          <Text fontSize="xl" fontWeight="bold">
            解決方法
          </Text>
          <Text pl={'5'}>1. URLが正しく入力されているかご確認ください。</Text>
          <Text pl={'5'}>
            2.ご意見・ご質問・不具合報告はお気軽に
            <Link color="teal.500" href="/contact">
              お問い合わせ
            </Link>
            ください。
          </Text>
          <Spacer />
          <Link color="teal.500" to="/">
            トップページへ戻る
          </Link>
        </VStack>
      </Box>
    </Flex>
  );
});
