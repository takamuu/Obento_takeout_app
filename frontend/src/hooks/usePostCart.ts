/* eslint-disable arrow-body-style */
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useHistory } from 'react-router';

import { Cart } from 'types/api/cart';
import { cartsPostUrl } from 'url/index';

export const usePostCart = () => {
  const [loading, setLoading] = useState(false);
  const [carts, setCarts] = useState<Array<Cart>>();
  // const useHistory()

  const postCart = useCallback((params) => {
    console.log(params);
    setLoading(true);
    axios
      .post<Array<Cart>>(cartsPostUrl, {
        food_id: params.food.id,
        restaurant_id: params.food.restaurant_id,
        count: params.count,
      })
      .then((res) => {
        setCarts(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        throw e;
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { postCart, loading, carts };
};
