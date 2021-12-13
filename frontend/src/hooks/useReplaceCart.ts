import axios from 'axios';
import { useCallback, useState } from 'react';

import { Cart } from 'types/api/cart';
import { cartsReplaceUrl } from 'url/index';

export const useReplaceCart = () => {
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState<Array<Cart>>();

  const replaceCart = useCallback((params) => {
    setLoading(true);
    axios
      .put(cartsReplaceUrl, {
        food_id: params.food.id,
        restaurant_id: params.food.restaurant_id,
        count: params.count,
      })
      .then((res) => {
        res.data;
      })
      .catch((e) => {
        throw e;
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { replaceCart, loading, cart };
};
