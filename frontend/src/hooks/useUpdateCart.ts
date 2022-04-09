/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import Cookies from 'js-cookie';
import { useCallback, useState } from 'react';

import { CartDetail } from 'types/api/cart';
import { cartsUpdateUrl } from '../url';
import { useMessage } from './useMessage';

export const useUpdateCart = () => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [carts, setCarts] = useState<Array<CartDetail>>();

  const updateCart = useCallback(async (params) => {
    setLoading(true);
    console.log(params);
    try {
      const result = await axios.put<Array<CartDetail>>(
        cartsUpdateUrl(params.food_id),
        { cart_detail: params },
        {
          headers: {
            'access-token': Cookies.get('_access_token'),
            client: Cookies.get('_client'),
            uid: Cookies.get('_uid'),
          },
        }
      );
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

  return { updateCart, loading, carts };
};
