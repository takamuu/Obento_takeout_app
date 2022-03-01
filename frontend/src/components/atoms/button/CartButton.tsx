import { memo, ReactNode, VFC } from 'react';
import { Button } from '@chakra-ui/button';

type Props = {
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  display?: string;
  onClick: () => void;
};

export const CartButton: VFC<Props> = memo((props) => {
  const {
    children,
    disabled = false,
    loading = false,
    display = 'block',
    onClick,
  } = props;
  return (
    <Button
      size="lg"
      bg="brand"
      color="white"
      display={display}
      _hover={{ opacity: 0.8 }}
      disabled={disabled || loading}
      isLoading={loading}
      onClick={onClick}
    >
      {children}
    </Button>
  );
});
