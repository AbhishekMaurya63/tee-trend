import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Heart, ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw, Crown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { getDataHandler } from '@/config/services';
import ApiConfig from '@/config/apiConfig';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const productHandler = async () => {
      if (!id) return;
      
      try {
        const endpoint = ApiConfig.getproductById(id);
        const response = await getDataHandler(endpoint, null, null, true);
        setProduct(response);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast({
          title: "Error",
          description: "Failed to load product details",
          variant: "destructive",
        });
      }
    };
    productHandler();
  }, [id, toast]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-25 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Crown className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-amber-900 mb-4">Loading Luxury Item...</h1>
          <Button 
            onClick={() => navigate('/products')}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            Back to Collections
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Please select options",
        description: "Please select both size and color before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    addToCart(product, quantity, selectedSize, selectedColor);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
      className: "bg-gradient-to-r from-amber-50 to-white border-l-4 border-amber-500"
    });
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const imageUrls = product.images?.map(img => typeof img === 'object' ? img.url : img) || [];
  const thumbnailUrl = product.thumbnail?.url || (imageUrls.length > 0 ? imageUrls[0] : '');

  const discountPercentage = product.originalPrice && product.discountedPrice 
    ? Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-25 to-amber-50">
      {/* Breadcrumb */}
      <div className="bg-gradient-to-r from-amber-100 to-amber-50 py-6 border-b border-amber-200">
        <div className="container mx-auto px-4 lg:px-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/products')}
            className="text-amber-700 hover:text-amber-900 hover:bg-amber-200/50 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Collections
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-6">
            <div className="aspect-square overflow-hidden rounded-2xl border-2 border-amber-200 shadow-lg relative group">
              <img
                src={selectedImage === 0 ? thumbnailUrl : imageUrls[selectedImage - 1]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {discountPercentage > 0 && (
                <Badge className="absolute top-4 left-4 bg-gradient-to-r from-amber-600 to-amber-800 text-white border-0 shadow-lg">
                  {discountPercentage}% OFF
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {/* Thumbnail button */}
              <button
                key="thumbnail"
                onClick={() => setSelectedImage(0)}
                className={`aspect-square overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                  selectedImage === 0 
                    ? 'border-amber-600 shadow-md' 
                    : 'border-amber-100 hover:border-amber-300'
                }`}
              >
                <img
                  src={thumbnailUrl}
                  alt={`${product.name} thumbnail`}
                  className="w-full h-full object-cover"
                />
              </button>
              
              {/* Other images */}
              {imageUrls.map((image, index) => (
                <button
                  key={index + 1}
                  onClick={() => setSelectedImage(index + 1)}
                  className={`aspect-square overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                    selectedImage === index + 1 
                      ? 'border-amber-600 shadow-md' 
                      : 'border-amber-100 hover:border-amber-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                  {typeof product.category === 'object' ? product.category.name : product.category}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="text-amber-600 hover:text-amber-800 hover:bg-amber-100 rounded-full"
                >
                  <Heart className={`h-6 w-6 ${isFavorite ? 'fill-amber-500 text-amber-500' : ''}`} />
                </Button>
              </div>
              
              <h1 className="text-4xl font-bold text-amber-950 mb-4 leading-tight">{product.name}</h1>
              
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.ratings || 0) 
                            ? 'fill-amber-400 text-amber-400' 
                            : 'text-amber-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-amber-700/90 text-sm">
                    {product.ratings || 0} ({product.reviews || 0} reviews)
                  </span>
                </div>
                {!product.inStock && (
                  <Badge className="bg-amber-200 text-amber-800">Out of Stock</Badge>
                )}
              </div>

              <div className="flex items-center space-x-6 mb-6">
                <span className="text-4xl font-bold text-amber-800">₹{product.discountedPrice || product.originalPrice}</span>
                {product.originalPrice && product.discountedPrice && (
                  <span className="text-2xl text-amber-600/80 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
                {product.originalPrice && product.discountedPrice && (
                  <Badge className="bg-amber-700 text-white">
                    Save ₹{(product.originalPrice - product.discountedPrice).toFixed(2)}
                  </Badge>
                )}
              </div>

              <p className="text-amber-700/90 text-lg leading-relaxed mb-6">{product.description}</p>
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="font-semibold text-amber-900 mb-4 text-lg">Select Size</h3>
                <div className="grid grid-cols-6 gap-3">
                  {product.sizes.map((sizeObj) => (
                    <Button
                      key={sizeObj._id || sizeObj.size}
                      variant={selectedSize === sizeObj.size ? 'default' : 'outline'}
                      className={`aspect-square font-semibold ${
                        selectedSize === sizeObj.size 
                          ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                          : 'border-amber-300 text-amber-700 hover:border-amber-600 hover:text-amber-900'
                      }`}
                      onClick={() => setSelectedSize(sizeObj.size)}
                    >
                      {sizeObj.size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-semibold text-amber-900 mb-4 text-lg">Select Color</h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((colorObj) => (
                    <Button
                      key={colorObj._id || colorObj.name}
                      variant={selectedColor === colorObj.name ? 'default' : 'outline'}
                      className={`font-semibold ${
                        selectedColor === colorObj.name 
                          ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                          : 'border-amber-300 text-amber-700 hover:border-amber-600 hover:text-amber-900'
                      }`}
                      onClick={() => setSelectedColor(colorObj.name)}
                    >
                      {colorObj.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-amber-900 mb-4 text-lg">Quantity</h3>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="border-amber-300 text-amber-700 hover:border-amber-600 hover:text-amber-900"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-semibold text-amber-900 text-lg">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                  disabled={!product.inStock}
                  className="border-amber-300 text-amber-700 hover:border-amber-600 hover:text-amber-900"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-6 text-base font-semibold rounded-xl shadow-lg hover:shadow-amber-700/30 transition-all duration-300"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-5 w-5 mr-3" />
                {product.inStock ? 'Add to Luxury Cart' : 'Out of Stock'}
              </Button>
            </div>

            <Separator className="bg-amber-200" />

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-amber-50 rounded-lg">
                <Truck className="h-6 w-6 text-amber-600" />
                <span className="text-amber-700">Free shipping on orders over ₹5000</span>
              </div>
              <div className="flex items-center space-x-4 p-3 bg-amber-50 rounded-lg">
                <Shield className="h-6 w-6 text-amber-600" />
                <span className="text-amber-700">30-day money-back guarantee</span>
              </div>
              <div className="flex items-center space-x-4 p-3 bg-amber-50 rounded-lg">
                <RotateCcw className="h-6 w-6 text-amber-600" />
                <span className="text-amber-700">Easy returns and exchanges</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-20">
          <Card className="shadow-lg border-amber-200">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Sparkles className="h-6 w-6 text-amber-600 mr-3" />
                <h3 className="text-2xl font-semibold text-amber-900">Product Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h4 className="font-semibold text-amber-800 mb-3 text-lg">Materials</h4>
                  <p className="text-amber-700/90 mb-6">
                    {product.details?.materials || '100% Premium Luxury Fabric'}
                  </p>
                  
                  <h4 className="font-semibold text-amber-800 mb-3 text-lg">Care Instructions</h4>
                  <ul className="text-amber-700/90 space-y-2">
                    {product.details?.careInstructions ? (
                      product.details.careInstructions.map((instruction, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-amber-600 mr-2">•</span>
                          {instruction}
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-start"><span className="text-amber-600 mr-2">•</span>Dry clean recommended</li>
                        <li className="flex items-start"><span className="text-amber-600 mr-2">•</span>Iron on low heat if needed</li>
                        <li className="flex items-start"><span className="text-amber-600 mr-2">•</span>Store in cool, dry place</li>
                        <li className="flex items-start"><span className="text-amber-600 mr-2">•</span>Do not bleach</li>
                      </>
                    )}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-800 mb-3 text-lg">Features</h4>
                  <ul className="text-amber-700/90 space-y-2">
                    {product.details?.features ? (
                      product.details.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-amber-600 mr-2">•</span>
                          {feature}
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-start"><span className="text-amber-600 mr-2">•</span>Premium quality craftsmanship</li>
                        <li className="flex items-start"><span className="text-amber-600 mr-2">•</span>Elegant and comfortable fit</li>
                        <li className="flex items-start"><span className="text-amber-600 mr-2">•</span>Reinforced stitching</li>
                        <li className="flex items-start"><span className="text-amber-600 mr-2">•</span>Luxury finishing touches</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;