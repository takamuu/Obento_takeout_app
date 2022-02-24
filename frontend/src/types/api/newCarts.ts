import { Food } from './food';

export type NewCarts = {
  id: number;
  amount: number;
  count: number;
  name: string;
  price: number;
  food: Food;
}[];
