export interface Order {
  id: number;
  status: 'pending' | 'completed' | 'cancelled';
  product_id: number;
  user_id: number;
  quantity: number;
  total_price: number;
  created_at: Date;
}