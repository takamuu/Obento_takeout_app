/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import Cookies from 'js-cookie';
import { useCallback, useState } from 'react';

import { Orders } from 'types/api/orders';
import { ordersUrl } from '../url';
import { useMessage } from './useMessage';

export const usePostOrders = () => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);

  const postOrders = useCallback(async (params) => {
    setLoading(true);
    try {
      await axios.post<Orders>(
        ordersUrl,
        {
          user_id: params,
        },
        {
          headers: {
            'access-token': Cookies.get('_access_token'),
            client: Cookies.get('_client'),
            uid: Cookies.get('_uid'),
          },
        }
      );

      showMessage({
        title: '注文を確定しました',
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

  return { postOrders, loading };
};
