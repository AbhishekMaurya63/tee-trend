import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star,Play, Truck, Shield, Headphones, ArrowRight, Crown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/product/ProductCard';
import { featuredProducts, reviews } from '@/data/products';
import heroImage from '@/assets/hero-banner.png';
import productShowcase from '@/assets/product-showcase.jpg';
import {getDataHandler} from '@/config/services'
import HeroSection from '@/components/HeroSection'
const Home = () => {
  const [featuredProducts, setfeaturedProducts] = useState([])
  useEffect(()=>{
  const producthandler = async () =>{
    const response = await getDataHandler('products')
    setfeaturedProducts(response)
    console.log(response)
  }
  producthandler()
  },[])
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
    <HeroSection/>

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
            {featuredProducts
            .filter(product=>product.featured)
            .map((product) => (
              <ProductCard key={product._id} product={product} />
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
      <section className="py-20 bg-gradient-to-b from-amber-25 to-amber-50">
  <div className="container mx-auto px-4 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
      {/* Content */}
      <div className="space-y-10">
        <div className="space-y-2">
          <Badge className="bg-amber-500/10 text-amber-700 border-amber-400/20 px-4 py-1.5 text-sm font-medium rounded-full">
            Premium Quality
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-amber-950 leading-tight">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800">AnantAttire</span>?
          </h2>
        </div>
        
        <div className="space-y-8">
          <div className="flex items-start space-x-6 group">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-amber-500/20">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <span className="text-amber-600 text-sm font-bold">✓</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-amber-900 text-lg mb-3">Premium Materials</h3>
              <p className="text-amber-700/90 leading-relaxed">
                Made from 100% premium fabrics for ultimate comfort, breathability, and lasting quality that stands the test of time.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-6 group">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-amber-500/20">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <span className="text-amber-600 text-sm font-bold">✓</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-amber-900 text-lg mb-3">Perfect Fit Guarantee</h3>
              <p className="text-amber-700/90 leading-relaxed">
                Carefully designed cuts that fit perfectly and maintain their shape wash after wash, ensuring you always look your best.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-6 group">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-amber-500/20">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <span className="text-amber-600 text-sm font-bold">✓</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-amber-900 text-lg mb-3">Sustainable Excellence</h3>
              <p className="text-amber-700/90 leading-relaxed">
                Eco-friendly production process with sustainable materials, because luxury shouldn't come at the expense of our planet.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="relative">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-amber-700/20 group">
          <img 
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
            alt="Premium Fashion Collection" 
            className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 via-transparent to-transparent"></div>
          
          {/* Golden frame effect */}
          <div className="absolute inset-0 border-2 border-amber-400/20 rounded-3xl pointer-events-none"></div>
        </div>
        
        {/* Decorative element */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-amber-600/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-amber-300/15 to-amber-500/10 rounded-full blur-xl"></div>
      </div>
    </div>

    {/* Additional feature cards at bottom */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 pt-12 border-t border-amber-200/50">
      <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="w-16 h-16 bg-amber-100 rounded-2xl mx-auto mb-5 flex items-center justify-center">
          <Truck className="h-8 w-8 text-amber-700" />
        </div>
        <h3 className="font-semibold text-amber-900 text-lg mb-3">Fast Delivery</h3>
        <p className="text-amber-700/80 text-sm">Quick shipping across India with reliable delivery partners</p>
      </div>
      
      <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="w-16 h-16 bg-amber-100 rounded-2xl mx-auto mb-5 flex items-center justify-center">
          <Shield className="h-8 w-8 text-amber-700" />
        </div>
        <h3 className="font-semibold text-amber-900 text-lg mb-3">Quality Assurance</h3>
        <p className="text-amber-700/80 text-sm">Rigorous quality checks to ensure perfection in every piece</p>
      </div>
      
      <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="w-16 h-16 bg-amber-100 rounded-2xl mx-auto mb-5 flex items-center justify-center">
          <Crown className="h-8 w-8 text-amber-700" />
        </div>
        <h3 className="font-semibold text-amber-900 text-lg mb-3">Comfort Experience</h3>
        <p className="text-amber-700/80 text-sm">From packaging to product, experience comfort at every touchpoint</p>
      </div>
    </div>
  </div>
</section>

      {/* Customer Reviews */}
{/* <section className="py-20 bg-gradient-to-b from-amber-25 to-amber-50">
  <div className="container mx-auto px-4 lg:px-8">
    <div className="text-center mb-16">
      <Badge className="bg-amber-500/10 text-amber-700 border-amber-400/20 px-4 py-1.5 text-sm font-medium rounded-full mb-4">
        Customer Love
      </Badge>
      <h2 className="text-4xl md:text-5xl font-bold text-amber-950 mb-5">
        What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800">Customers Say</span>
      </h2>
      <p className="text-xl text-amber-700/80 max-w-2xl mx-auto leading-relaxed">
        Join thousands of satisfied customers who experience the luxury and quality of AnantAttire
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {reviews.map((review) => (
        <div key={review.id} className="group">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-100 hover:shadow-xl hover:border-amber-200 transition-all duration-300 h-full flex flex-col">
            <div className="flex items-center space-x-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < review.rating 
                      ? 'fill-amber-400 text-amber-400' 
                      : 'text-amber-200'
                  }`}
                />
              ))}
              <span className="text-amber-600 font-medium text-sm ml-2">
                {review.rating}.0
              </span>
            </div>
            

            <div className="flex-1 mb-8">
              <p className="text-amber-800/90 leading-relaxed text-lg italic relative">
                <span className="absolute -left-3 -top-2 text-amber-400 text-3xl">"</span>
                {review.comment}
                <span className="absolute -right-3 -bottom-2 text-amber-400 text-3xl">"</span>
              </p>
            </div>
            

            <div className="flex items-center space-x-4 pt-6 border-t border-amber-100">
              <div className="relative">
                <img 
                  src={review.avatar || '/placeholder.svg'} 
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-200 shadow-sm"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="font-semibold text-amber-900">{review.name}</p>
                <p className="text-sm text-amber-600/80">{review.date}</p>
                {review.verified && (
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-amber-500 bg-amber-100 px-2 py-0.5 rounded-full">
                      Verified Purchase
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

  
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-amber-200/50">
      <div className="text-center">
        <div className="text-4xl md:text-5xl font-bold text-amber-700 mb-2">4.9/5</div>
        <p className="text-amber-600/80">Average Rating</p>
      </div>
      <div className="text-center">
        <div className="text-4xl md:text-5xl font-bold text-amber-700 mb-2">10K+</div>
        <p className="text-amber-600/80">Happy Customers</p>
      </div>
      <div className="text-center">
        <div className="text-4xl md:text-5xl font-bold text-amber-700 mb-2">98%</div>
        <p className="text-amber-600/80">Would Recommend</p>
      </div>
      <div className="text-center">
        <div className="text-4xl md:text-5xl font-bold text-amber-700 mb-2">5★</div>
        <p className="text-amber-600/80">Rated Excellent</p>
      </div>
    </div>


    <div className="text-center mt-12">
      <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-base font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-amber-600/30">
        Read More Reviews
        <ArrowRight className="ml-3 h-5 w-5" />
      </Button>
    </div>
  </div>
</section> */}

      {/* CTA Section */}
   <section className="py-20 relative overflow-hidden">
  {/* Background with golden gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 z-0"></div>
  
  {/* Decorative elements */}
  <div className="absolute inset-0 z-0 opacity-20">
    <div className="absolute top-0 left-0 w-72 h-72 bg-amber-400/30 rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"></div>
    
    {/* Subtle pattern overlay */}
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cGF0aCBkPSJNMzAgMTVoMTV2MzBIMzB6TTE1IDMwaDE1VjE1SDE1eiIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==')] opacity-10"></div>
  </div>

  <div className="container mx-auto px-4 lg:px-8 relative z-10">
    <div className="max-w-3xl mx-auto text-center">
      {/* Badge */}
      <Badge className="bg-amber-500/20 text-amber-100 border-amber-400/30 px-5 py-2 text-sm font-medium rounded-full mb-8 backdrop-blur-sm">
        <Sparkles className="h-4 w-4 mr-2 text-amber-300" />
        Exclusive Collection
      </Badge>
      
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
        Ready to Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-400">Style</span>?
      </h2>
      
      {/* Description */}
      <p className="text-xl md:text-2xl mb-10 text-amber-100/90 leading-relaxed max-w-2xl mx-auto">
        Discover our exquisite collection of premium clothing designed for those who appreciate timeless elegance and exceptional quality.
      </p>
      
      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-12">
        <Link to="/products" className="flex">
          <Button 
            size="lg" 
            className="bg-white text-amber-800 hover:bg-amber-50 hover:text-amber-900 px-10 py-7 text-base font-semibold rounded-xl transition-all duration-300 shadow-2xl hover:shadow-amber-900/30 hover:scale-105 group min-w-[200px] justify-center"
          >
            Start Shopping
            <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
        
        <Link to="/about">
          <Button 
            variant="outline" 
            size="lg" 
            className="border-amber-300/50 text-black hover:bg-amber-500 hover:text-white hover:border-amber-500 px-10 py-7 text-base font-semibold rounded-xl transition-all duration-300 group min-w-[180px] backdrop-blur-sm"
          >
            <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
            Our Story
          </Button>
        </Link>
      </div>
      
      {/* Features */}
      {/* <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8 border-t border-amber-500/30">
        <div className="text-center">
          <div className="w-12 h-12 bg-amber-500/20 rounded-2xl mx-auto mb-3 flex items-center justify-center backdrop-blur-sm">
            <Truck className="h-6 w-6 text-amber-300" />
          </div>
          <p className="text-amber-200/90 text-sm font-medium">Free Shipping</p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-amber-500/20 rounded-2xl mx-auto mb-3 flex items-center justify-center backdrop-blur-sm">
            <Shield className="h-6 w-6 text-amber-300" />
          </div>
          <p className="text-amber-200/90 text-sm font-medium">Quality Guarantee</p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-amber-500/20 rounded-2xl mx-auto mb-3 flex items-center justify-center backdrop-blur-sm">
            <Crown className="h-6 w-6 text-amber-300" />
          </div>
          <p className="text-amber-200/90 text-sm font-medium">Luxury Crafted</p>
        </div>
      </div> */}
    </div>
  </div>

  {/* Floating elements */}
  <div className="absolute top-10 left-10 w-8 h-8 bg-amber-400/20 rounded-full animate-float-slow"></div>
  <div className="absolute top-20 right-20 w-12 h-12 bg-amber-300/15 rounded-full animate-float-medium animation-delay-2000"></div>
  <div className="absolute bottom-20 left-20 w-6 h-6 bg-amber-500/25 rounded-full animate-float-slow animation-delay-4000"></div>
  <div className="absolute bottom-10 right-10 w-10 h-10 bg-amber-400/20 rounded-full animate-float-medium animation-delay-3000"></div>

  {/* Custom animations */}
  <style>{`
    @keyframes float-slow {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-15px) rotate(2deg); }
    }
    
    @keyframes float-medium {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(-2deg); }
    }
    
    .animate-float-slow {
      animation: float-slow 6s ease-in-out infinite;
    }
    
    .animate-float-medium {
      animation: float-medium 5s ease-in-out infinite;
    }
    
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    
    .animation-delay-3000 {
      animation-delay: 3s;
    }
    
    .animation-delay-4000 {
      animation-delay: 4s;
    }
  `}</style>
</section>
    </div>
  );
};

export default Home;