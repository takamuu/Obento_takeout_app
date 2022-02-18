/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import axios from 'axios';
import Cookies from 'js-cookie';
import { useCallback, useState } from 'react';
import { Cart } from 'types/api/cart';

import { cartsUrl } from '../url';
import { useMessage } from './useMessage';

export const useCartIndex = () => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [carts, setCarts] = useState<Array<Cart>>([]);

  const getCarts = useCallback(async () => {
    setLoading(true);
    try {
      const result = await axios.get<Array<Cart>>(cartsUrl, {
        headers: {
          'access-token': Cookies.get('_access_token'),
          client: Cookies.get('_client'),
          uid: Cookies.get('_uid'),
        },
      });
      setCarts(result.data);
    } catch (e) {
      showMessage({
        title: 'データの取得に失敗しました',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return { getCarts, loading, carts };
};
