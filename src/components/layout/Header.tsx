import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, User, X, Search, Crown, Loader, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { getDataHandler, postDataHandler } from '@/config/services';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getItemCount } = useCart();
  const itemCount = getItemCount();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [mockProducts, setproducts] = useState([]);
  const [visitorData, setVisitorData] = useState(null);
  
  // Track session start time
  const [sessionStart] = useState(new Date().toISOString());

  useEffect(() => {
    const producthandler = async () => {
      const response = await getDataHandler('products');
      setproducts(response);
    };
    producthandler();
  }, []);

  // Generate or retrieve a unique visitor ID
  const getVisitorId = () => {
    let visitorId = localStorage.getItem('visitorId');
    if (!visitorId) {
      visitorId = 'vis_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('visitorId', visitorId);
    }
    return visitorId;
  };

  // Generate a session ID
  const getSessionId = () => {
    return 'sess_' + Math.random().toString(36).substr(2, 9);
  };

  // Function to collect comprehensive visitor data
  const collectVisitorData = () => {
    const visitorId = getVisitorId();
    const sessionId = getSessionId();
    
    const data = {
      // Visitor identification
      visitorId: visitorId,
      sessionId: sessionId,
      isNewVisitor: !localStorage.getItem('hasVisitedBefore'),
      
      // Timestamps
      timestamp: new Date().toISOString(),
      sessionStart: sessionStart,
      localTime: new Date().toLocaleString(),
      
      // Navigation data
      url: window.location.href,
      path: location.pathname,
      query: location.search,
      hash: location.hash,
      referrer: document.referrer || 'direct',
      
      // Device and browser info
      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages ? navigator.languages.join(',') : null,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      colorDepth: window.screen.colorDepth,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      deviceMemory: navigator.deviceMemory || 'unknown',
      hardwareConcurrency: navigator.hardwareConcurrency || 'unknown',
      
      // Device classification
      deviceType: /Mobile/.test(navigator.userAgent) ? 'mobile' : 'desktop',
      browser: getBrowserInfo(),
      browserVersion: getBrowserVersion(),
      os: getOSInfo(),
      
      // Connection info
      connection: getConnectionInfo(),
      
      // Cookie enabled
      cookiesEnabled: navigator.cookieEnabled,
      
      // Do Not Track
      doNotTrack: navigator.doNotTrack || 'unspecified',
      
      // Performance data (if available)
      performance: getPerformanceData(),
      
      // Geolocation data (to be filled later)
      geolocation: null
    };

    // Mark as returning visitor for future visits
    if (!localStorage.getItem('hasVisitedBefore')) {
      localStorage.setItem('hasVisitedBefore', 'true');
    }

    return data;
  };

  // Helper function to get browser info
  const getBrowserInfo = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
    if (userAgent.includes('Edg')) return 'Edge';
    if (userAgent.includes('Opera') || userAgent.includes('OPR/')) return 'Opera';
    return 'Unknown';
  };

  // Helper function to get browser version
  const getBrowserVersion = () => {
    const userAgent = navigator.userAgent;
    const browser = getBrowserInfo();
    
    let version = 'unknown';
    if (browser === 'Chrome') {
      const match = userAgent.match(/Chrome\/([0-9.]+)/);
      version = match ? match[1] : 'unknown';
    } else if (browser === 'Firefox') {
      const match = userAgent.match(/Firefox\/([0-9.]+)/);
      version = match ? match[1] : 'unknown';
    } else if (browser === 'Safari') {
      const match = userAgent.match(/Version\/([0-9.]+)/);
      version = match ? match[1] : 'unknown';
    } else if (browser === 'Edge') {
      const match = userAgent.match(/Edg\/([0-9.]+)/);
      version = match ? match[1] : 'unknown';
    }
    
    return version;
  };

  // Helper function to get OS info
  const getOSInfo = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Windows NT 10.0')) return 'Windows 10';
    if (userAgent.includes('Windows NT 6.3')) return 'Windows 8.1';
    if (userAgent.includes('Windows NT 6.2')) return 'Windows 8';
    if (userAgent.includes('Windows NT 6.1')) return 'Windows 7';
    if (userAgent.includes('Windows NT 6.0')) return 'Windows Vista';
    if (userAgent.includes('Windows NT 5.1')) return 'Windows XP';
    if (userAgent.includes('Mac')) return 'MacOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iOS') || userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
    return 'Unknown';
  };

  // Get connection information if available
  const getConnectionInfo = () => {
    if (navigator.connection) {
      return {
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink,
        rtt: navigator.connection.rtt,
        saveData: navigator.connection.saveData
      };
    }
    return null;
  };

  // Get performance metrics if available
  const getPerformanceData = () => {
    if (window.performance && window.performance.timing) {
      const perf = window.performance.timing;
      return {
        loadTime: perf.loadEventEnd - perf.navigationStart,
        domReady: perf.domContentLoadedEventEnd - perf.navigationStart,
        redirectCount: window.performance.navigation.redirectCount
      };
    }
    return null;
  };

  // Function to get geolocation data (with user permission)
  const getGeolocationData = () => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date(position.timestamp).toISOString()
          });
        },
        (error) => {
          resolve({ error: error.code, message: error.message });
        },
        { timeout: 5000, enableHighAccuracy: false }
      );
    });
  };

  // Function to get IP-based location (will be resolved on backend)
  const getIPBasedLocation = () => {
    // This will be handled by the backend using the user's IP address
    return {
      method: 'ip_based',
      timestamp: new Date().toISOString()
    };
  };

  // Function to send visitor data to backend
  const trackVisitor = async (type = 'pageview') => {
    const data = collectVisitorData();
    try {
      data.type = type;
      
      // Add geolocation data if available
      if (type === 'pageview') {
        try {
          const geoData = await getGeolocationData();
          data.geolocation = geoData;
        } catch (error) {
          data.geolocation = { error: 'Geolocation failed' };
        }
      } else {
        // For non-pageview events, use IP-based location
        data.geolocation = getIPBasedLocation();
      }
            // Send data to backend
      const response = await postDataHandler('analytics', data);    
      setVisitorData(data);
      
      return response;
    } catch (error) {
      console.error('Error tracking visitor:', error);
      // Fallback: Store in localStorage to send later
      storePendingVisit(data);
    }
  };

  // Store pending visits when offline
  const storePendingVisit = (data) => {
    try {
      const pendingVisits = JSON.parse(localStorage.getItem('pendingVisits') || '[]');
      pendingVisits.push({
        ...data,
        failedAt: new Date().toISOString()
      });
      localStorage.setItem('pendingVisits', JSON.stringify(pendingVisits));
    } catch (error) {
      console.error('Error storing pending visit:', error);
    }
  };

  // Retry sending pending visits
  const retryPendingVisits = async () => {
    try {
      const pendingVisits = JSON.parse(localStorage.getItem('pendingVisits') || '[]');
      if (pendingVisits.length === 0) return;
      
      for (const visit of pendingVisits) {
        await postDataHandler('analytics', visit);
      }
      
      // Clear pending visits after successful send
      localStorage.removeItem('pendingVisits');
    } catch (error) {
      console.error('Error retrying pending visits:', error);
    }
  };

  // Track visitor on component mount and route changes
  useEffect(() => {
    trackVisitor('pageview');
    
    // Set up beforeunload to track session end
    const handleBeforeUnload = () => {
      const endTime = new Date().toISOString();
      const sessionData = {
        type: 'session_end',
        visitorId: getVisitorId(),
        sessionId: sessionId,
        sessionStart: sessionStart,
        sessionEnd: endTime,
        duration: new Date(endTime) - new Date(sessionStart),
        page: window.location.href
      };
      
      // Use sendBeacon for reliable delivery on page unload
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(sessionData)], { type: 'application/json' });
        navigator.sendBeacon('/api/visits', blob);
      } else {
        // Fallback to fetch with keepalive
        fetch('/api/visits', {
          method: 'POST',
          body: JSON.stringify(sessionData),
          headers: { 'Content-Type': 'application/json' },
          keepalive: true
        });
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [location.pathname]);

  // Track user engagement (time on page, clicks, etc.)
  useEffect(() => {
    let engagementTimer;
    let clickCount = 0;
    
    const handleEngagement = () => {
      clearTimeout(engagementTimer);
      engagementTimer = setTimeout(() => {
        trackVisitor('engagement');
      }, 30000); // Send engagement ping every 30 seconds of activity
    };
    
    const handleClick = () => {
      clickCount++;
      if (clickCount % 5 === 0) {
        trackVisitor('click_event');
      }
    };
    
    window.addEventListener('mousemove', handleEngagement);
    window.addEventListener('keypress', handleEngagement);
    window.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('mousemove', handleEngagement);
      window.removeEventListener('keypress', handleEngagement);
      window.removeEventListener('click', handleClick);
      clearTimeout(engagementTimer);
    };
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
  ];

  // Debounced search function
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    setShowResults(true);

    const timer = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const performSearch = (query) => {
    const results = mockProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(results);
    setIsSearching(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Track search event
      trackVisitor('search', { query: searchQuery });
      
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
      setShowResults(false);
    }
  };

  const handleProductClick = (productId) => {
    // Track product click event
    trackVisitor('product_click', { productId });
    
    navigate(`/products/${productId}`);
    setSearchOpen(false);
    setSearchQuery('');
    setShowResults(false);
    setMobileMenuOpen(false);
  };

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setTimeout(() => {
        document.getElementById('search-input')?.focus();
      }, 100);
    } else {
      setSearchQuery('');
      setShowResults(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-b from-amber-50 to-white backdrop-blur-sm border-b border-amber-200 shadow-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group" onClick={() => setMobileMenuOpen(false)}>
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-amber-500/25 group-hover:scale-105 transition-all duration-300 relative overflow-hidden">
            <img src="/images/logo.png" alt="AnantAttire Logo"/>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
            AnantAttire
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative text-sm font-medium transition-all duration-300 py-2 px-1 ${
                isActive(item.path) 
                  ? 'text-amber-700 font-semibold' 
                  : 'text-gray-700 hover:text-amber-600'
              }`}
            >
              {item.label}
              {isActive(item.path) && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
              )}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center space-x-3">
          {/* Search Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-600 hover:text-amber-700 hover:bg-amber-50/50"
            onClick={handleSearchToggle}
          >
            <Search className="h-4 w-4" />
          </Button>
          
          {/* Shopping Cart */}
          <Link to="/cart">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative text-gray-600 hover:text-amber-700 hover:bg-amber-50/50 transition-all duration-300"
            >
              <ShoppingCart className="h-4 w-4" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 bg-gradient-to-br from-amber-500 to-amber-700 text-white text-xs rounded-full flex items-center justify-center shadow-md border border-amber-300">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-gray-600 hover:text-amber-700 hover:bg-amber-50/50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Search Bar with Results */}
      {searchOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-amber-200 shadow-md py-3 px-4 z-50">
          <div className="container mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="flex items-center">
                <input 
                  id="search-input"
                  type="text" 
                  placeholder="Search for best T-shirt" 
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-3 border border-amber-200 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                />
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 rounded-l-none px-6"
                >
                  Search
                </Button>
              </div>
              
              {/* Search Results Dropdown */}
              {showResults && (
                <div className="absolute top-full left-0 right-0 bg-white border border-amber-200 rounded-b-md shadow-lg mt-1 max-h-80 overflow-y-auto">
                  {isSearching ? (
                    <div className="flex justify-center items-center py-8">
                      <Loader className="h-6 w-6 text-amber-500 animate-spin" />
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="py-2">
                      {searchResults.map((product) => (
                        <div
                          key={product._id}
                          onClick={() => handleProductClick(product._id)}
                          className="flex items-center p-3 hover:bg-amber-50 cursor-pointer transition-colors duration-200 border-b border-amber-100 last:border-b-0"
                        >
                          <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden mr-3">
                            <img 
                              src={product.thumbnail.url} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 text-sm">{product.name}</h4>
                            <p className="text-amber-600 font-semibold text-sm">₹{product.discountedPrice}</p>
                            <p className="text-gray-500 text-xs">{product.category.name}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : searchQuery && (
                    <div className="py-6 text-center text-gray-500">
                      No products found for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-amber-50/95 to-white/95 backdrop-blur-md border-t border-amber-200 shadow-xl">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`py-3 px-4 text-base font-medium rounded-lg transition-all duration-300 ${
                    isActive(item.path) 
                      ? 'bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 border-l-4 border-amber-500 shadow-sm' 
                      : 'text-gray-700 hover:bg-amber-50/50 hover:text-amber-600'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="pt-4 mt-2 border-t border-amber-200">
                <div className="py-3 px-4">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="text" 
                        placeholder="Search..." 
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="flex-1 px-3 py-2 border border-amber-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      />
                      <Button 
                        type="submit"
                        size="icon" 
                        className="bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Mobile Search Results */}
                    {showResults && searchResults.length > 0 && (
                      <div className="absolute top-full left-0 right-0 bg-white border border-amber-200 rounded-b-md shadow-lg mt-1 z-10">
                        <div className="py-2">
                          {searchResults.slice(0, 3).map((product) => (
                            <div
                              key={product._id}
                              onClick={() => handleProductClick(product._id)}
                              className="flex items-center p-3 hover:bg-amber-50 cursor-pointer transition-colors duration-200 border-b border-amber-100 last:border-b-0"
                            >
                              <div className="w-10 h-10 bg-gray-200 rounded-md overflow-hidden mr-3">
                                <img 
                                  src={product.thumbnail.url} 
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 text-sm">{product.name}</h4>
                                <p className="text-amber-600 font-semibold text-xs">₹{product.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;