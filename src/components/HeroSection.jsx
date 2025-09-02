import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Truck, Shield, Crown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-t from-amber-50 via-amber-200 to-amber-100">
      {/* Background image for mobile */}
      {isMobile && (
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="/images/hero-banner2.png"
            alt="Luxury fashion collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-amber-50/80 via-amber-50/50 to-amber-50/90"></div>
        </div>
      )}

      {/* Enhanced decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {/* Sophisticated golden gradient orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-amber-200/30 to-amber-400/20 rounded-full opacity-25 blur-3xl animate-float-slow"></div>
        <div className="absolute top-1/3 -right-24 w-[500px] h-[500px] bg-gradient-to-br from-amber-300/25 to-amber-500/15 rounded-full opacity-20 blur-3xl animate-float-medium animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-br from-amber-400/20 to-amber-600/10 rounded-full opacity-15 blur-3xl animate-float-slow animation-delay-4000"></div>
        
        {/* Subtle geometric pattern */}
        <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cGF0aCBkPSJNMTIgMTJoMzZ2MzZIMTJ6IiBzdHJva2U9IiNBMzc0MTIzIiBzdHJva2Utd2lkdGg9IjAuNSIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==')]"></div>
        
        {/* Golden shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-100/5 to-transparent animate-shimmer"></div>
      </div>

      {/* Content container */}
      <div className="relative container mx-auto px-4 lg:px-8 z-10 py-12 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="flex justify-center lg:justify-start">
              <Badge className="bg-amber-500/10 text-amber-700 border-amber-400/20 px-5 py-2.5 text-sm font-medium rounded-full backdrop-blur-sm hover:bg-amber-500/15 transition-colors duration-300">
                <Sparkles className="h-4 w-4 mr-2 text-amber-500" />
                Exclusive Collection Launch
              </Badge>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                <span className="text-amber-950 block">Embrace</span>
                <span className="text-amber-600 bg-clip-text bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 block bg-300% animate-gradient">
                  Elegant Style
                </span>
                <span className="text-amber-950 block">With AnantAttire</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-amber-800/90 leading-relaxed max-w-lg mx-auto lg:mx-0 font-light">
                Discover our exquisite collection of premium clothing, where traditional craftsmanship meets contemporary design, creating timeless pieces for the modern connoisseur.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <Link to="/products" className="flex">
                <Button
                  className="bg-amber-700 hover:bg-amber-800 text-white px-8 sm:px-10 py-6 sm:py-7 text-base font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-amber-700/40 hover:scale-105 group min-w-[180px] sm:min-w-[200px] justify-center"
                >
                  Explore Collection
                  <ArrowRight className="ml-3 h-5 w-5 text-white group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-amber-600/60 text-amber-700 hover:bg-amber-600 hover:text-white hover:border-amber-600 px-8 sm:px-10 py-6 sm:py-7 text-base font-semibold rounded-xl transition-all duration-300 group min-w-[160px] sm:min-w-[180px]"
              >
                <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                Our Story
              </Button>
            </div>

            {/* Stats Section - Enhanced for large screens */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-xl pt-8 mx-auto lg:mx-0">
              <div className="bg-white/20 backdrop-blur-xl p-4 md:p-6 rounded-2xl shadow-2xl shadow-amber-500/10 border border-white/30 group hover:shadow-amber-500/20 hover:scale-105 transition-all duration-500">
                <div className="flex items-center justify-center mb-3 md:mb-4">
                  <div className="bg-amber-100/80 backdrop-blur-sm p-2 md:p-3 rounded-xl w-12 h-12 md:w-14 md:h-14 flex items-center justify-center group-hover:bg-amber-200/90 group-hover:scale-110 transition-all duration-500 ring-2 ring-amber-200/30">
                    <Truck className="h-5 md:h-7 w-5 md:w-7 text-amber-700" />
                  </div>
                </div>
                <h3 className="font-bold text-amber-900 text-sm md:text-lg mb-1 text-center">Free Shipping</h3>
                <p className="text-xs md:text-sm text-amber-700/90 font-medium text-center">Over ₹5000</p>
              </div>
              
              <div className="bg-white/20 backdrop-blur-xl p-4 md:p-6 rounded-2xl shadow-2xl shadow-amber-500/10 border border-white/30 group hover:shadow-amber-500/20 hover:scale-105 transition-all duration-500">
                <div className="flex items-center justify-center mb-3 md:mb-4">
                  <div className="bg-amber-100/80 backdrop-blur-sm p-2 md:p-3 rounded-xl w-12 h-12 md:w-14 md:h-14 flex items-center justify-center group-hover:bg-amber-200/90 group-hover:scale-110 transition-all duration-500 ring-2 ring-amber-200/30">
                    <Shield className="h-5 md:h-7 w-5 md:w-7 text-amber-700" />
                  </div>
                </div>
                <h3 className="font-bold text-amber-900 text-sm md:text-lg mb-1 text-center">Quality</h3>
                <p className="text-xs md:text-sm text-amber-700/90 font-medium text-center">Guaranteed</p>
              </div>
              
              <div className="bg-white/20 backdrop-blur-xl p-4 md:p-6 rounded-2xl shadow-2xl shadow-amber-500/10 border border-white/30 group hover:shadow-amber-500/20 hover:scale-105 transition-all duration-500">
                <div className="flex items-center justify-center mb-3 md:mb-4">
                  <div className="bg-amber-100/80 backdrop-blur-sm p-2 md:p-3 rounded-xl w-12 h-12 md:w-14 md:h-14 flex items-center justify-center group-hover:bg-amber-200/90 group-hover:scale-110 transition-all duration-500 ring-2 ring-amber-200/30">
                    <Crown className="h-5 md:h-7 w-5 md:w-7 text-amber-700" />
                  </div>
                </div>
                <h3 className="font-bold text-amber-900 text-sm md:text-lg mb-1 text-center">Luxury</h3>
                <p className="text-xs md:text-sm text-amber-700/90 font-medium text-center">Crafted</p>
              </div>
            </div>
          </div>

          {/* Image content - Hidden on mobile */}
          {!isMobile && (
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-amber-700/20 group">
                <img
                  src="/images/hero-banner2.png"
                  alt="Luxury fashion collection"
                  className="w-full h-[600px] object-contain group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/30 via-transparent to-transparent"></div>
                
                {/* Golden frame effect */}
                <div className="absolute inset-0 border-2 border-amber-400/20 rounded-3xl pointer-events-none"></div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-400/10 rounded-full backdrop-blur-sm border border-amber-300/20 animate-float-slow"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-amber-500/15 rounded-full backdrop-blur-sm border border-amber-400/20 animate-float-medium animation-delay-2000"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Scroll indicator */}
      <div className="hidden md:flex absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-7 h-12 border-2 border-amber-500/40 rounded-full flex justify-center">
            <div className="w-1 h-4 bg-gradient-to-b from-amber-500 to-amber-600 rounded-full mt-3"></div>
          </div>
        </div>
      </div>

      {/* Custom animation styles */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-2deg); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;