export interface Product {
  _id: string;
  name: string;
  category: string;
  label?:string;
  originalPrice?: number;
  discountedPrice: number;
  description?: string;
  details?: {
    careInstructions?: string[];
    features?: string[];
    materials?: string;
  };
  images: {
    _id: string;
    public_id: string;
    url: string;
  }[];
  thumbnail: {
    public_id: string;
    url: string;
  };
  sizes: {
    _id: string;
    size: string;
  }[];
  colors: {
    _id: string;
    name: string;
  }[];
  inStock: boolean;
  ratings: number;
  reviews?: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}


export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
  verified?:boolean;
}