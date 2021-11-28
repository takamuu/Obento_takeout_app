/* eslint-disable arrow-body-style */
import { useCallback, useState } from 'react';

import { Food } from 'types/api/food';

type Props = {
  id: number;
  foods: Array<Food>;
};

export const useSelectFood = () => {
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  const onSelectFood = useCallback((props: Props) => {
    const { id, foods } = props;
    const targetFood = foods.find((food) => food.id === id);
    setSelectedFood(targetFood);
  }, []);

  return { onSelectFood, selectedFood };
};
