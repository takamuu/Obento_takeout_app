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
  const onClickTermsOfUse = useCallback(
    () => history.push('/terms_of_use'),
    []
  );

  return (
    <>
      <Flex bg="brand" w="100%" h="300px" color="white">
        <Image
          marginTop={20}
          marginLeft={{ base: 10, md: 20 }}
          boxSize="60px"
          src={MainLogoReversed}
          alt="MainLogoReversed"
          _hover={{ opacity: '0.8', cursor: 'pointer' }}
          onClick={onClickHome}
        />
        <Box w={['20%', '30%', '40%', '50%']} align="stretch"></Box>
        <VStack marginTop={20} spacing={6} align="left">
          <Link onClick={onClickContact}>お問い合わせ</Link>
          <Link onClick={onClickPolicy}>プライバシーポリシー</Link>
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
