/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import Cookies from 'js-cookie';
import { useCallback, useState } from 'react';

import { Cart } from 'types/api/cart';
import { cartsReplaceUrl } from '../url';
import { useMessage } from './useMessage';

export const useReplaceCart = () => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [carts, setCarts] = useState<Array<Cart>>();

  const replaceCart = useCallback(async (params) => {
    setLoading(true);
    try {
      const result = await axios.put<Array<Cart>>(
        cartsReplaceUrl,
        {
          food_id: params.food.id,
          restaurant_id: params.food.restaurant_id,
          count: params.count,
        },
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

  return { replaceCart, loading, carts };
};
