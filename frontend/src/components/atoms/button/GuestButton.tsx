import { memo, ReactNode, VFC } from 'react';
import { Button } from '@chakra-ui/button';

type Props = {
  children: ReactNode;
  loading?: boolean;
  onClick: () => void;
};

export const GuestButton: VFC<Props> = memo((props) => {
  const { children, loading = false, onClick } = props;
  return (
    <Button
      bg="blue.400"
      color="white"
      _hover={{ opacity: 0.8 }}
      isLoading={loading}
      onClick={onClick}
    >
      {children}
    </Button>
  );
});
