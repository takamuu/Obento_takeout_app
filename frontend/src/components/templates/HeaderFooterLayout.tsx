import { memo, ReactNode, VFC } from 'react';

import { Header } from 'components/organisms/layout/Header';
import { Footer } from 'components/organisms/layout/Footer';

type Props = {
  children: ReactNode;
};

export const HeaderFooterLayout: VFC<Props> = memo((props) => {
  const { children } = props;
  return (
    <>
      <Header />

      {children}

      <Footer />
    </>
  );
});
