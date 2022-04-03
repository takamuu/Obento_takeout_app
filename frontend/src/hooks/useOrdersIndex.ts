/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Orders } from 'types/api/orders';

import { ordersUrl } from '../url';
import { useMessage } from './useMessage';

export const useOrdersIndex = () => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Array<Orders>>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const result = await axios.get<Array<Orders>>(ordersUrl, {
          headers: {
            'access-token': Cookies.get('_access_token'),
            client: Cookies.get('_client'),
            uid: Cookies.get('_uid'),
          },
        });
        setOrders(result.data);
      } catch (e) {
        showMessage({
          title: 'データの取得に失敗しました',
          status: 'error',
        });
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);
  return { orders, loading };
};
