export type Cart = {
  id: number;
  user_id: number | null;
  total_price: number;
  food_id: number;
  created_at: string;
  updated_at: string;
};
