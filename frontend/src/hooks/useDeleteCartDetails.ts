/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import axios from 'axios';
import Cookies from 'js-cookie';
import { useCallback, useState } from 'react';

import { Cart } from 'types/api/cart';
import { cartDetailsUrl } from '../url';
import { useMessage } from './useMessage';

export const useDeleteCartDetails = () => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [carts, setCarts] = useState<Array<Cart>>();

  const deleteCartDetails = useCallback(async (foodId: string) => {
    setLoading(true);
    try {
      const result = await axios.delete<Array<Cart>>(cartDetailsUrl(foodId), {
        headers: {
          'access-token': Cookies.get('_access_token'),
          client: Cookies.get('_client'),
          uid: Cookies.get('_uid'),
        },
      });
      setCarts(result.data);
    } catch (e) {
      showMessage({
        title: 'フードを削除できませんでした',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, []);
  return { deleteCartDetails, carts, loading };
};
