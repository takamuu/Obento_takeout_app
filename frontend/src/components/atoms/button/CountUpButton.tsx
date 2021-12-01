import { memo, VFC } from 'react';
import { Button } from '@chakra-ui/button';

type Props = {
  onClick: () => void;
  isDisabled: boolean;
};

export const CountUpButton: VFC<Props> = memo((props) => {
  const { onClick, isDisabled } = props;
  return (
    <Button
      fontSize="2xl"
      p={2}
      mr={6}
      bg={'gray.100'}
      shadow="md"
      rounded="full"
      _hover={{ opacity: 0.8 }}
      onClick={onClick}
      disabled={isDisabled}
    >
      +
    </Button>
  );
});
