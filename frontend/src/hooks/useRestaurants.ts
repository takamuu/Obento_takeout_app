/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import { useCallback, useState } from 'react';
import axios from 'axios';

import { Restaurant } from 'types/api/restaurant';
import { restaurantsIndexUrl } from 'url/index';
import { useMessage } from './useMessage';

export const useRestaurants = () => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState<Array<Restaurant>>();

  const getRestaurants = useCallback(() => {
    setLoading(true);
    axios
      .get<Array<Restaurant>>(restaurantsIndexUrl)
      .then((res) => {
        setRestaurants(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        showMessage({ title: 'ユーザー取得に失敗しました', status: 'error' });
        console.error(e);
      })
      .finally(() => setLoading(false));
  }, []);

  return { getRestaurants };
};
