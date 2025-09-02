import { Product, Review } from '@/types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Cotton T-Shirt',
    price: 24.99,
    originalPrice: 29.99,
    description: 'Premium 100% cotton t-shirt with a comfortable regular fit. Perfect for everyday wear with soft, breathable fabric that gets better with every wash.',
    images: [
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg'
    ],
    category: 'basics',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Navy', 'Gray'],
    inStock: true,
    rating: 4.5,
    reviews: 127
  },
  {
    id: '2',
    name: 'Vintage Graphic Tee',
    price: 32.99,
    description: 'Retro-inspired graphic t-shirt with distressed print. Made from soft cotton blend for ultimate comfort and style.',
    images: [
      '/placeholder.svg',
      '/placeholder.svg'
    ],
    category: 'graphic',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Heather Gray'],
    inStock: true,
    rating: 4.7,
    reviews: 89
  },
  {
    id: '3',
    name: 'Premium Polo Shirt',
    price: 45.99,
    originalPrice: 55.99,
    description: 'Elegant polo shirt crafted from premium pique cotton. Features classic collar and button placket for a sophisticated look.',
    images: [
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg'
    ],
    category: 'polo',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy', 'White', 'Black', 'Forest Green'],
    inStock: true,
    rating: 4.8,
    reviews: 203
  },
  {
    id: '4',
    name: 'Sports Performance Tee',
    price: 28.99,
    description: 'High-performance athletic t-shirt with moisture-wicking technology. Perfect for workouts and active lifestyle.',
    images: [
      '/placeholder.svg',
      '/placeholder.svg'
    ],
    category: 'athletic',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Red', 'Blue'],
    inStock: true,
    rating: 4.6,
    reviews: 156
  },
  {
    id: '5',
    name: 'Organic Cotton Basic',
    price: 22.99,
    description: 'Eco-friendly t-shirt made from 100% organic cotton. Sustainable fashion without compromising on comfort.',
    images: [
      '/placeholder.svg',
      '/placeholder.svg'
    ],
    category: 'eco',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Natural', 'Black', 'Navy'],
    inStock: true,
    rating: 4.4,
    reviews: 98
  },
  {
    id: '6',
    name: 'Long Sleeve Henley',
    price: 38.99,
    description: 'Classic henley with long sleeves and button placket. Perfect for layering or wearing alone in cooler weather.',
    images: [
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg'
    ],
    category: 'longsleeve',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Gray', 'Navy', 'Black', 'Burgundy'],
    inStock: true,
    rating: 4.3,
    reviews: 74
  }
];

export const featuredProducts = products.slice(0, 4);

export const reviews: Review[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    rating: 5,
    comment: 'Amazing quality! The fabric is so soft and the fit is perfect. I ordered three more in different colors.',
    date: '2024-01-15',
    avatar: '/placeholder.svg',
    verified:true
  },
  {
    id: '2',
    name: 'Mike Chen',
    rating: 5,
    comment: 'Best t-shirts I\'ve ever bought. Great customer service and fast shipping too!',
    date: '2024-01-10',
    avatar: '/placeholder.svg',
    verified:false
  },
  {
    id: '3',
    name: 'Emily Davis',
    rating: 4,
    comment: 'Love the design and quality. Sizing runs slightly large but overall very happy with my purchase.',
    date: '2024-01-05',
    avatar: '/placeholder.svg',
    verified:true
  }
];