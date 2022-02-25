import { Food } from './food';

export type Cart = {
  id: number;
  user_id: number | null;
  total_price: number;
  name: string;
  count: number;
  price: number;
  food?: Food;
  created_at: string;
  updated_at: string;
};
