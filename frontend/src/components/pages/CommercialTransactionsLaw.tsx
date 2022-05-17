/* eslint-disable arrow-body-style */
import { memo, useEffect, VFC } from 'react';
import { Divider, Flex, Spacer, Stack, Text } from '@chakra-ui/layout';
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

export const CommercialTransactionsLaw: VFC = memo(() => {
  useEffect(() => window.scrollTo(0, 0));

  return (
    <Flex align="center" justify="center" height={{ sm: '90vh', md: '140vh' }}>
      <Stack w={{ sm: 'md', md: '2xl' }}>
        <Text
          paddingTop="3"
          fontSize="26px"
          fontWeight="bold"
          color="brand"
          spacing="12px"
          textAlign={'center'}
        >
          特定商取引法に基づく表記
        </Text>
        <Divider borderColor="brand" p={4} />
        <Spacer p={2} />
        <TableContainer>
          <Table variant="simple" w={{ sm: 'md', md: '2xl' }}>
            <TableCaption>弁テク〇〇会社</TableCaption>
            <Thead>
              <Tr>
                <Th>Item</Th>
                <Th>Content</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>ウェブサービス提供者</Td>
                <Td>弁テク〇〇会社（以下、「当社」といいます。）</Td>
              </Tr>
              <Tr>
                <Td>サイト代表者名</Td>
                <Td>〇〇 〇〇</Td>
              </Tr>
              <Tr>
                <Td>所在地</Td>
                <Td>〒〇〇 〇〇県〇〇市〇〇町</Td>
              </Tr>
              <Tr>
                <Td>販売価格</Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td>商品価格以外に必要な料金</Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td>支払い方法について</Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td>支払い時期</Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td>商品の提供時期</Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td>返品・交換・キャンセル等</Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td>個人情報の取扱いについて</Td>
                <Td></Td>
              </Tr>
              <Tr>
                <Td></Td>
                <Td></Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>
    </Flex>
  );
});
