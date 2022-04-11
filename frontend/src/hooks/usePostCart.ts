/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import Cookies from 'js-cookie';
import { useCallback, useState } from 'react';

import { Cart } from 'types/api/cart';
import { cartsUrl } from '../url';

export const usePostCart = () => {
  const [loading, setLoading] = useState(false);
  const [carts, setCarts] = useState<Array<Cart>>();

  const postCart = useCallback(async (params) => {
    setLoading(true);
    try {
      const result = await axios.post<Array<Cart>>(
        cartsUrl,
        {
          food_id: params.food.id,
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
      console.log(e.data);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { postCart, loading, carts };
};
