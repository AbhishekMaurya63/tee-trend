import React from 'react';
import { Link } from 'react-router-dom';
import { Star,Play, Truck, Shield, Headphones, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/product/ProductCard';
import { featuredProducts, reviews } from '@/data/products';
import heroImage from '@/assets/hero-banner.png';
import productShowcase from '@/assets/product-showcase.jpg';
const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110 md:scale-100"
          style={{ 
            backgroundImage: `url(https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80)`,
            animation: 'zoomInOut 20s ease-in-out infinite'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-purple-900/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        </div>
        
        {/* Animated elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 text-center z-10 pt-20 pb-32">
        <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-md px-4 py-1.5 text-sm font-medium animate-fade-in">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          New Collection Available
        </Badge>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="text-white block animate-slide-up">Elevate Your Style</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 block mt-2 animate-slide-up animation-delay-200">
            With AnantAttire
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed animate-fade-in animation-delay-400">
          Discover our exclusive collection of premium clothing crafted with attention to detail, perfect for those who appreciate quality and elegance in every stitch.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in animation-delay-600">
          <Link to="/products">
            <Button 
              size="lg" 
              className="min-w-[180px] bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 transition-all duration-300 transform hover:-translate-y-1"
            >
              Shop Collection
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="min-w-[180px] border-white/30 text-white bg-white/10 backdrop-blur-md hover:bg-white hover:text-gray-900 group"
          >
            <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            Watch Story
          </Button>
        </div>
        
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto animate-fade-in animation-delay-800">
          <div className="flex flex-col items-center text-white/80 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
            <div className="bg-purple-500/10 p-3 rounded-full mb-3">
              <Truck className="h-6 w-6 text-purple-300" />
            </div>
            <h3 className="font-semibold text-white">Free Shipping</h3>
            <p className="text-sm mt-1">On orders over ₹5000</p>
          </div>
          
          <div className="flex flex-col items-center text-white/80 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
            <div className="bg-pink-500/10 p-3 rounded-full mb-3">
              <Shield className="h-6 w-6 text-pink-300" />
            </div>
            <h3 className="font-semibold text-white">Quality Assurance</h3>
            <p className="text-sm mt-1">Premium materials</p>
          </div>
          
          <div className="flex flex-col items-center text-white/80 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
            <div className="bg-indigo-500/10 p-3 rounded-full mb-3">
              <Star className="h-6 w-6 text-indigo-300" />
            </div>
            <h3 className="font-semibold text-white">5-Star Reviews</h3>
            <p className="text-sm mt-1">Rated by thousands</p>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>

      {/* Custom animation styles */}
      <style>{`
        @keyframes zoomInOut {
          0% { transform: scale(1.1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1.1); }
        }
        
        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
          opacity: 0;
          transform: translateY(30px);
        }
        
        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes fadeIn {
          to {
            opacity: 1;
          transform: translateY(0);
          }
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>

      {/* Features Section */}
      {/* <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-muted-foreground">Free shipping on orders over $50. Fast and reliable delivery nationwide.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-muted-foreground">Premium materials and craftsmanship. 30-day money-back guarantee.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">Our customer service team is here to help you anytime, anywhere.</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover our most popular t-shirts, loved by customers worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/products">
              <Button variant="outline" size="lg">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Our T-Shirts?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Premium Cotton</h3>
                    <p className="text-muted-foreground">Made from 100% premium cotton for ultimate comfort and breathability.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Perfect Fit</h3>
                    <p className="text-muted-foreground">Carefully designed cuts that fit perfectly and maintain shape after washing.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Sustainable</h3>
                    <p className="text-muted-foreground">Eco-friendly production process with sustainable materials.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src={productShowcase} 
                alt="Premium T-Shirt Collection" 
                className="w-full h-auto rounded-lg shadow-product"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of satisfied customers who love our products
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <Card key={review.id} className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{review.comment}"</p>
                  <div className="flex items-center space-x-3">
                    <img 
                      src={review.avatar || '/placeholder.svg'} 
                      alt={review.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-sm">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Upgrade Your Wardrobe?</h2>
          <p className="text-xl mb-8 text-white/90">
            Discover the perfect t-shirt for every occasion
          </p>
          <Link to="/products">
            <Button variant="hero" size="lg" className="bg-white text-brand-primary hover:bg-white/90">
              Start Shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;