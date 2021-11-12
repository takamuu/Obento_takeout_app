import { memo, useEffect, VFC } from 'react';
import { Link } from 'react-router-dom';

import { fetchRestaurants } from 'apis/restaurants';

export const Restaurants: VFC = memo(() => {
  useEffect(() => {
    fetchRestaurants().then((data) => {
      console.log(data);
    });
  }, []);
  return (
    <div>
      <p>HOMEページ = レストラン一覧ページ</p>
      <br />
      <Link to="/restaurants/100/foods">Foods</Link>
      <br />
      <Link to="/restaurants/100/foods?name=hogehoge">Query Parameter</Link>
    </div>
  );
});

Restaurants.displayName = 'Restaurants';
