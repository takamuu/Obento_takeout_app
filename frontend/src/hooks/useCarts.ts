/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import { useDisclosure } from '@chakra-ui/hooks';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { Cart } from 'types/api/cart';

import { cartsIndexUrl } from 'url/index';
import { useMessage } from './useMessage';

export const useCarts = () => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [carts, setCarts] = useState<Array<Cart>>([]);

  const getCarts = useCallback(() => {
    setLoading(true);
    axios
      .get<Array<Cart>>(cartsIndexUrl())
      .then((res) => {
        console.log(res.data);
        setCarts(res.data);
      })
      .catch(() => {
        showMessage({
          title: 'データの取得に失敗しました',
          status: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { getCarts, loading, carts };
};
