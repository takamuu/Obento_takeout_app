import { memo, ReactNode, VFC } from 'react';
import { Button } from '@chakra-ui/button';

type Props = {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
};

export const PrimaryButton: VFC<Props> = memo((props) => {
  const { children, disabled = false, onClick } = props;
  return (
    <Button
      bg="brand"
      color="white"
      _hover={{ opacity: 0.8 }}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
});
