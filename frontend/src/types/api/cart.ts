export type Food = {
  id: number;
  restaurant_id: number;
  name: string;
  food_description: string;
  price: number;
  sales_limit?: number;
  sales_status?: string;
  image?: string;
  created_at: string;
  updated_at: string;
};

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
