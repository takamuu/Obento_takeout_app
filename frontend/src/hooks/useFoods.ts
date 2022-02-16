/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import axios from 'axios';
import { useCallback, useState } from 'react';

import { Food } from 'types/api/food';
import { foodsIndexUrl } from '../url';
import { useMessage } from './useMessage';

export const useFoods = () => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [foods, setFoods] = useState<Array<Food>>([]);

  const getFoods = useCallback(async (restaurantId: string) => {
    setLoading(true);
    try {
      const result = await axios.get<Array<Food>>(foodsIndexUrl(restaurantId));
      setFoods(result.data);
    } catch (e) {
      showMessage({
        title: 'データの取得に失敗しました',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return { getFoods, loading, foods };
};
