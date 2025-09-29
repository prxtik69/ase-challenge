// Re-export Product from data layer for consistency
export type { Product } from '@/lib/data/products';

export interface CartItem {
  product: import('@/lib/data/products').Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}
