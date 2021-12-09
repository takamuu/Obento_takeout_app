/* eslint-disable arrow-body-style */
import axios from 'axios';
import { useCallback, useState } from 'react';
import { useParams } from 'react-router';

import { Cart } from 'types/api/cart';
import { Food } from 'types/api/food';
import { cartsPostUrl, cartsReplaceUrl } from 'url/index';

export const useCart = () => {
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState<Array<Cart>>([]);

  const postCart = useCallback((params) => {
    console.log(params);
    console.log(params.food.restaurant_id);
    setLoading(true);
    axios
      .post<Array<Cart>>(cartsPostUrl, {
        food_id: params.food.id,
        restaurant_id: params.food.restaurant_id,
        count: params.count,
      })
      .then((res) => {
        setCart(res.data);
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

  return { postCart, loading, cart };
};
// const replaceCart = useCallback((params) => {
//   setLoading(true);
//   axios
//     .put(cartReplaceUrl, {
//       food_id: params.foodId,
//       countNumber: params.count,
//     })
//     .then((res) => {
//       res.data;
//     })
//     .catch((e) => {
//       throw e;
//     })
//     .finally(() => {
//       setLoading(false);
//     });
// }, []);
