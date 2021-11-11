import { memo, VFC } from 'react';

// type MatchType = {
//   restaurantId: string;
// };

export const Foods: VFC = memo(() => {
  return <p>Foodsページ restaurantsIdは です</p>;
});

Foods.displayName = 'Foods';
