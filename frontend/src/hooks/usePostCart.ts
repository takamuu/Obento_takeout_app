/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import axios from 'axios';
import Cookies from 'js-cookie';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router';

import { Cart } from 'types/api/cart';
import { cartsPostUrl } from 'url/index';

export const usePostCart = () => {
  const [loading, setLoading] = useState(false);
  const [carts, setCarts] = useState<Array<Cart>>();
  const history = useHistory();

  const postCart = useCallback((params) => {
    setLoading(true);
    axios
      .post<Array<Cart>>(
        cartsPostUrl,
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
      )
      .then((res) => {
        setCarts(res.data);
        history.push(`/restaurants/cart`);
      })
      .catch((e) => {
        throw e;
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { postCart, loading, carts };
};
