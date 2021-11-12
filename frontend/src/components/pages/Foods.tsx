import { memo, VFC } from 'react';
import { useParams, useLocation } from 'react-router';

type IdType = {
  restaurantId: string;
};

export const Foods: VFC = memo(() => {
  const { restaurantId } = useParams<IdType>();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  console.log(query);
  return (
    <div>
      <h1>Foodsページ</h1>
      <p>restaurantIdは {restaurantId}</p>
      <p>クエリパラメーターは{query.get('name')}です</p>
    </div>
  );
});

Foods.displayName = 'Foods';
