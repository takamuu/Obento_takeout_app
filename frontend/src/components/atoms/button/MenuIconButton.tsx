import { memo, VFC } from 'react';
import { IconButton } from '@chakra-ui/button';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/layout';

type Props = {
  onOpen: () => void;
};

export const MenuIconButton: VFC<Props> = memo((props) => {
  const { onOpen } = props;
  return (
    <Box w={'84px'} align={'center'} display={{ base: 'block', md: 'none' }}>
      <IconButton
        aria-label="メニューボタン"
        icon={<HamburgerIcon />}
        size={'lg'}
        variant="unstyled"
        display={{ base: 'block', md: 'none' }}
        onClick={onOpen}
      />
    </Box>
  );
});
