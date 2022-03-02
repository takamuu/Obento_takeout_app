/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import { memo, useCallback, VFC } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, Flex, Link, Text, VStack } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';

import MainLogoReversed from 'images/MainLogoReversed.svg';

export const Footer: VFC = memo(() => {
  const history = useHistory();

  const onClickHome = useCallback(() => history.push('/'), []);
  const onClickContact = useCallback(() => history.push('/contact'), []);
  const onClickPolicy = useCallback(() => history.push('/policy'), []);
  const onClickCommercialTransactionsLaw = useCallback(
    () => history.push('/commercial_transactions_law'),
    []
  );
  const onClickTermsOfUse = useCallback(
    () => history.push('/terms_of_use'),
    []
  );

  return (
    <>
      <Flex bg="brand" w="100%" h="340px" padding={20} color="white">
        <Image
          boxSize="60px"
          src={MainLogoReversed}
          alt="MainLogoReversed"
          _hover={{ opacity: '0.8', cursor: 'pointer' }}
          onClick={onClickHome}
        />
        <Box w="40%" align="stretch"></Box>
        <VStack w="300px" spacing={6} align="left">
          <Link onClick={onClickContact}>お問い合わせ</Link>
          <Link onClick={onClickPolicy}>個人情報保護方針</Link>
          <Link onClick={onClickCommercialTransactionsLaw}>
            特定商取引法に基づく表記
          </Link>
          <Link onClick={onClickTermsOfUse}>利用規約</Link>
        </VStack>
      </Flex>
      <Text
        bg="brand"
        paddingBottom="12px"
        color="white"
        fontSize="sm"
        align="center"
      >
        Copyright © 2022 Takashi Yoshizaki All Rights Reserved
      </Text>
    </>
  );
});
