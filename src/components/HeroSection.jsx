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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-amber-100 to-amber-200">
      {/* Background image for mobile */}
      {isMobile && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-50/80 via-amber-100/70 to-amber-200/90 z-10"></div>
          <img
            src="/images/hero-banner2.png"
            alt="Luxury fashion collection"
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating circles */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl animate-float-medium animation-delay-2000"></div>
        
        {/* Geometric pattern */}
        <div className="absolute inset-0 bg-repeat pattern-opacity-5 pattern-amber-900 pattern-size-8 pattern-dots"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Text content - on left for desktop */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8">
            <div className="flex justify-center lg:justify-start">
              <Badge className="bg-amber-500/10 text-amber-700 border-amber-400/20 px-5 py-2.5 text-sm font-medium rounded-full backdrop-blur-sm hover:bg-amber-500/15 transition-all duration-300">
                <Sparkles className="h-4 w-4 mr-2 text-amber-500" />
                Exclusive Collection Launch
              </Badge>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                <span className="text-amber-950 block">Embrace</span>
                <span className="text-amber-600 bg-clip-text bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 inline-block bg-300% animate-gradient">
                  Elegant Style
                </span>
                <span className="text-amber-950 block">With AnantAttire</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-amber-800/90 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Discover our exquisite collection of premium clothing, where traditional craftsmanship meets contemporary design, creating timeless pieces for the modern connoisseur.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/products" className="flex">
                <Button
                  className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-6 text-base font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-amber-700/40 hover:scale-105 group"
                >
                  Explore Collection
                  <ArrowRight className="ml-3 h-5 w-5 text-white group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-amber-600/60 text-amber-700 hover:bg-amber-600 hover:text-white hover:border-amber-600 px-8 py-6 text-base font-semibold rounded-xl transition-all duration-300 group"
              >
                <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                Our Story
              </Button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 pt-8 max-w-xl mx-auto lg:mx-0">
              <div className="bg-white/30 backdrop-blur-md p-4 rounded-2xl border border-white/40 text-center group hover:bg-white/40 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                  <Truck className="h-6 w-6 text-amber-700" />
                </div>
                <h3 className="font-bold text-amber-900 text-sm">Free Shipping</h3>
                <p className="text-xs text-amber-700/90">On All Products</p>
              </div>
              
              <div className="bg-white/30 backdrop-blur-md p-4 rounded-2xl border border-white/40 text-center group hover:bg-white/40 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                  <Shield className="h-6 w-6 text-amber-700" />
                </div>
                <h3 className="font-bold text-amber-900 text-sm">Quality</h3>
                <p className="text-xs text-amber-700/90">Guaranteed</p>
              </div>
              
              <div className="bg-white/30 backdrop-blur-md p-4 rounded-2xl border border-white/40 text-center group hover:bg-white/40 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                  <Crown className="h-6 w-6 text-amber-700" />
                </div>
                <h3 className="font-bold text-amber-900 text-sm">Beautifull</h3>
                <p className="text-xs text-amber-700/90">Crafted</p>
              </div>
            </div>
          </div>


          {!isMobile && (
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <div className="relative max-w-md">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-amber-700/20">
                  <img
                    src="/images/hero-banner2.png"
                    alt="Luxury fashion collection"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-900/10 via-transparent to-transparent"></div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-400/20 rounded-full backdrop-blur-sm border border-amber-300/20"></div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-amber-500/25 rounded-full backdrop-blur-sm border border-amber-400/20"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-amber-500/40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-amber-500 to-amber-600 rounded-full mt-2"></div>
          </div>
        </div>
      </div>

      {/* Custom styles */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
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
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .pattern-dots {
          background-image: radial-gradient(currentColor 0.5px, transparent 0.5px);
          background-size: 8px 8px;
        }
        
        .pattern-opacity-5 {
          opacity: 0.05;
        }
        
        .pattern-amber-900 {
          color: #78350f;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;