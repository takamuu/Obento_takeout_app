export type Orders = {
  id?: number;
  user_id?: number;
  rceipt_number?: string;
  total_price?: number;
  consumption_tax?: number;
  progress_status?: string;
  restaurant_name?: string;
  created_at?: string;
  order_details?: OrderDetail;
};

export type OrderDetail = [
  {
    food_name: string | null;
    food_price: string;
    count: number;
  }
];
