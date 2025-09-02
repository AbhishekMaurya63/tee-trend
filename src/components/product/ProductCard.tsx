import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1, product.sizes[0].size, product.colors[0].name);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
      className: "bg-gradient-to-r from-amber-50 to-white border-l-4 border-amber-500"
    });
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite ? `${product.name} removed from favorites.` : `${product.name} added to favorites.`,
      className: "bg-gradient-to-r from-amber-50 to-white border-l-4 border-amber-500"
    });
  };

  const discountPercentage = product.discountedPrice 
    ? Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className="group overflow-hidden border border-amber-100 bg-gradient-to-br from-white to-amber-50 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative">
      {/* Golden decorative elements */}
      <div className="absolute top-0 left-0 w-16 h-16 -translate-x-8 -translate-y-8 bg-amber-400/10 rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 translate-x-12 translate-y-12 bg-amber-400/5 rounded-full"></div>
      
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link to={`/products/${product._id}`}>
          <div className="aspect-square overflow-hidden relative">
            <img
              src={product.thumbnail.url}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
            />
            {/* Golden overlay on hover */}
            <div className={`absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
          </div>
        </Link>
        
        {/* Overlay actions */}
        <div className={`absolute inset-0 bg-black/10 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute top-3 right-3 space-y-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/95 hover:bg-amber-50 text-amber-700 shadow-md rounded-full h-9 w-9 transition-all duration-300 hover:scale-110 border border-amber-200"
              onClick={handleFavoriteToggle}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-amber-500 text-amber-500' : ''}`} />
            </Button>
            
            <Link to={`/products/${product._id}`}>
              <Button
                variant="ghost"
                size="icon"
                className="bg-white/95 hover:bg-amber-50 text-amber-700 shadow-md rounded-full h-9 w-9 transition-all duration-300 hover:scale-110 border border-amber-200"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="absolute bottom-3 left-3 right-3">
            <Button
              className={`w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-md hover:shadow-lg transition-all duration-300 border-0 ${
                isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              }`}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 space-y-1">
          {product.label && (
            <Badge className="text-xs bg-gradient-to-r from-amber-500 to-amber-600 text-white border-0 shadow-md">
              {product.label}
            </Badge>
          )}
          {discountPercentage > 0 && (
            <Badge className="text-xs bg-gradient-to-r from-amber-700 to-amber-800 text-white border-0 shadow-md">
              {discountPercentage}% OFF
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="secondary" className="text-xs bg-gray-200 text-gray-700">
              Out of Stock
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-5">
        <Link to={`/products/${product._id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-amber-700 transition-colors group-hover:underline">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center space-x-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(product.ratings) 
                    ? 'fill-amber-400 text-amber-400' 
                    : 'text-amber-200'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-amber-600 font-medium">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-baseline space-x-2">
            <span className="font-bold text-lg text-amber-700">₹{product.discountedPrice || product.originalPrice}</span>
            {product.discountedPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          
          <div className="h-8 w-px bg-amber-200 mx-2"></div>
          
          <Link to={`/products/${product._id}`}>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-amber-300 text-amber-700 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-400 transition-all duration-200 shadow-sm"
            >
              Details
            </Button>
          </Link>
        </div>
      </CardContent>
      
      {/* Golden corner accents */}
      <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-12 h-12 bg-amber-500 transform rotate-45 translate-x-6 -translate-y-6"></div>
      </div>
    </Card>
  );
};

export default ProductCard;