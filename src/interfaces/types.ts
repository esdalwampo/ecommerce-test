export interface Product {
  id: string;
  productName: string;
  description: string;
  unitPrice: number;
  category: string;
  imageUrl: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  
}

export interface SvgIconProps {
  className?: string;
  size?: number;
}