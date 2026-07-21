export interface Order {
  id: number;
  status: 'pending' | 'completed' | 'cancelled';
  product_id: string;
  user_id: string;
  quantity: number;
  total_price: number;
  created_at: Date;
}