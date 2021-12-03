/* eslint-disable arrow-body-style */
import { useCallback, useState } from 'react';

import { Food } from 'types/api/food';

type Props = {
  selectFoodId: number;
  foods: Array<Food>;
  onOpen: () => void;
};

// 選択したフード情報を特定しモーダルを表示するカスタムフック
export const useSelectFood = () => {
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  const onSelectFood = useCallback((props: Props) => {
    const { selectFoodId, foods, onOpen } = props;
    const getSelectFood = foods.find((food) => food.id === selectFoodId);
    setSelectedFood(getSelectFood);
    onOpen();
  }, []);

  return { onSelectFood, selectedFood };
};
