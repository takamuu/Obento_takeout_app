import { memo, VFC } from 'react';
import { Button } from '@chakra-ui/button';

type Props = {
  onClick: () => void;
  isDisabled: boolean;
};

export const CountDownButton: VFC<Props> = memo((props) => {
  const { onClick, isDisabled } = props;
  return (
    <Button
      bg={'gray.100'}
      w={'48px'}
      h={'48px'}
      fontSize="2xl"
      fontWeight={'bold'}
      shadow="md"
      rounded="full"
      _hover={{ opacity: 0.8 }}
      onClick={onClick}
      disabled={isDisabled}
    >
      -
    </Button>
  );
});
