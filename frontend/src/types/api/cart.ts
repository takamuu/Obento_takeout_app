export type Cart = {
  id: number;
  user_id: number | null;
  total_price: number;
  name: string;
  count: number;
  price: number;
  created_at: string;
  updated_at: string;
};
