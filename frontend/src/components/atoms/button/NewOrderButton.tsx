import { memo, ReactNode, VFC } from 'react';
import { Button } from '@chakra-ui/button';

type Props = {
  children: ReactNode;
  loading?: boolean;
  onClick: () => void;
};

export const NewOrderButton: VFC<Props> = memo((props) => {
  const { children, loading = false, onClick } = props;
  return (
    <Button
      w={'400px'}
      h={'50px'}
      bg={'brand'}
      color={'white'}
      fontSize={'xl'}
      _hover={{ opacity: 0.8 }}
      disabled={loading}
      isLoading={loading}
      onClick={onClick}
    >
      {children}
    </Button>
  );
});
