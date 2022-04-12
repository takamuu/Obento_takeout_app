/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import Cookies from 'js-cookie';
import { useCallback, useState } from 'react';

import { CartDetail } from 'types/api/cart';
import { cartDetailsReplaceUrl } from '../url';
import { useMessage } from './useMessage';

export const useReplaceCartDetails = () => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [carts, setCarts] = useState<Array<CartDetail>>();

  const replaceCartDetails = useCallback(async (params) => {
    setLoading(true);
    try {
      const result = await axios.put<Array<CartDetail>>(
        cartDetailsReplaceUrl(params.food.id),
        { cart_detail: { food_id: params.food.id, count: params.count } },
        {
          headers: {
            'access-token': Cookies.get('_access_token'),
            client: Cookies.get('_client'),
            uid: Cookies.get('_uid'),
          },
        }
      );
      setCarts(result.data);
      showMessage({
        title: 'フードを更新しました',
        status: 'success',
      });
    } catch (e) {
      showMessage({
        title: 'データの取得に失敗しました',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return { replaceCartDetails, loading, carts };
};
