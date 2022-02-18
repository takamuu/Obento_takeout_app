/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import { useCallback, useState } from 'react';
import axios from 'axios';

import { Restaurant } from 'types/api/restaurant';
import { restaurantsIndexUrl } from '../url';
import { useMessage } from './useMessage';

export const useRestaurants = () => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState<Array<Restaurant>>([]);

  const getRestaurants = useCallback(() => {
    setLoading(true);
    axios
      .get<Array<Restaurant>>(restaurantsIndexUrl)
      .then((res) => setRestaurants(res.data))
      .catch(() => {
        showMessage({
          title: 'レストランデータの取得に失敗しました',
          status: 'error',
        });
      })
      .finally(() => setLoading(false));
  }, []);

  return { getRestaurants, loading, restaurants };
};
