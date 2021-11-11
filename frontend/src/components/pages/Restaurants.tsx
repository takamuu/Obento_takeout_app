import { memo, useEffect, VFC } from 'react';

import { fetchRestaurants } from 'apis/restaurants';

export const Restaurants: VFC = memo(() => {
  useEffect(() => {
    fetchRestaurants().then((data) => {
      console.log(data);
    });
  }, []);
  return <p>HOMEページ = レストラン一覧ページ</p>;
});

Restaurants.displayName = 'Restaurants';
