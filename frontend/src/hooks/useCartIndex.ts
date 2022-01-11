/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import axios from 'axios';
import Cookies from 'js-cookie';
import { useCallback, useState } from 'react';
import { Cart } from 'types/api/cart';

import { cartsIndexUrl } from 'url/index';
import { useMessage } from './useMessage';

export const useCartIndex = () => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [carts, setCarts] = useState<Array<Cart>>([]);

  const getCarts = useCallback(() => {
    setLoading(true);
    axios
      .get<Array<Cart>>(cartsIndexUrl(), {
        headers: {
          'access-token': Cookies.get('_access_token'),
          client: Cookies.get('_client'),
          uid: Cookies.get('_uid'),
        },
      })
      .then((res) => {
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
