import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Grid, List, ChevronDown, ChevronUp, Crown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ProductCard from '@/components/product/ProductCard';
import { getDataHandler } from '@/config/services';
import ApiConfig from '@/config/apiConfig';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const categoryRes = await getDataHandler('category');
        setCategories(categoryRes || []);

        const response = await getDataHandler('products');
        setProducts(response || []);
        setAllProducts(response || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('name');
  };

  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'price-low', label: 'Price (Low to High)' },
    { value: 'price-high', label: 'Price (High to Low)' },
    { value: 'rating', label: 'Rating' },
    { value: 'newest', label: 'Newest' },
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...allProducts];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category?._id === selectedCategory
      );
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.name?.toLowerCase().includes(searchLower) ||
        product.description?.toLowerCase().includes(searchLower)
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          const nameA = a.name || '';
          const nameB = b.name || '';
          return nameA.localeCompare(nameB);
        
        case 'price-low':
          const priceA = a.discountedPrice || a.originalPrice || 0;
          const priceB = b.discountedPrice || b.originalPrice || 0;
          return priceA - priceB;
        
        case 'price-high':
          const priceAHigh = a.discountedPrice || a.originalPrice || 0;
          const priceBHigh = b.discountedPrice || b.originalPrice || 0;
          return priceBHigh - priceAHigh;
        
        case 'rating':
          const ratingA = a.ratings || 0;
          const ratingB = b.ratings || 0;
          return ratingB - ratingA;
        
        case 'newest':
          try {
            const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
            const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
            return dateB.getTime() - dateA.getTime();
          } catch (error) {
            return 0;
          }
        
        default:
          return 0;
      }
    });

    return filtered;
  }, [allProducts, searchTerm, selectedCategory, sortBy]);

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') return allProducts.length;
    return allProducts.filter(product => product.category?._id === categoryId).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-25 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Crown className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-amber-900 mb-2">Loading Collection</h2>
          <p className="text-amber-700/80">Curating our premium selection for you</p>
        </div>
      </div>
    );
  }

  const staticCategories = [
    { _id: 'all', name: 'All Collections' },
    ...categories
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-25 to-amber-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-800 py-16 text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <Badge className="bg-amber-500/20 text-amber-100 border-amber-400/30 px-4 py-1.5 text-sm font-medium rounded-full mb-4">
            <Sparkles className="h-4 w-4 mr-2" />
            Premium Collection
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Exquisite Collection</h1>
          <p className="text-xl text-amber-100/90 max-w-2xl mx-auto">
            Discover timeless pieces crafted with precision and elegance for the modern connoisseur
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6">
          <Button
            variant="outline"
            className="w-full justify-between border-amber-300 text-amber-700 hover:bg-amber-50"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <span className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filters & Categories
            </span>
            {showMobileFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-80 space-y-6 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="shadow-lg border-amber-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-amber-900 mb-4 text-lg border-b border-amber-100 pb-3">
                  Search & Filter
                </h3>
                
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-amber-500" />
                    <Input
                      placeholder="Search our collection..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-amber-300 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>

                  <Button 
                    variant="outline" 
                    onClick={handleClearFilters} 
                    className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-amber-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-amber-900 mb-4 text-lg border-b border-amber-100 pb-3">
                  Collections
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {staticCategories.map((category) => (
                    <div
                      key={category._id}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedCategory === category._id
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md'
                          : 'hover:bg-amber-100 text-amber-800'
                      }`}
                      onClick={() => {
                        setSelectedCategory(category._id);
                        if (window.innerWidth < 1024) {
                          setShowMobileFilters(false);
                        }
                      }}
                    >
                      <span className="text-sm font-medium">{category.name}</span>
                      <Badge variant={selectedCategory === category._id ? "secondary" : "outline"} className="text-xs">
                        {getCategoryCount(category._id)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div className="flex items-center space-x-4">
                <span className="text-amber-700/90 text-sm">
                  Showing {filteredAndSortedProducts.length} of {allProducts.length} luxury items
                </span>
                {selectedCategory !== 'all' && (
                  <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                    {staticCategories.find(cat => cat._id === selectedCategory)?.name}
                  </Badge>
                )}
                {(searchTerm || selectedCategory !== 'all') && (
                  <Badge 
                    className="bg-amber-600 text-white cursor-pointer hover:bg-amber-700"
                    onClick={handleClearFilters}
                  >
                    Clear filters
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 border-amber-300 focus:ring-amber-500 focus:border-amber-500">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex border border-amber-300 rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={`rounded-r-none border-0 ${
                      viewMode === 'grid' 
                        ? 'bg-amber-600 text-white hover:bg-amber-700' 
                        : 'text-amber-700 hover:bg-amber-50'
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={`rounded-l-none border-0 ${
                      viewMode === 'list' 
                        ? 'bg-amber-600 text-white hover:bg-amber-700' 
                        : 'text-amber-700 hover:bg-amber-50'
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-amber-200">
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold text-amber-900 mb-2">No items found</h3>
                <p className="text-amber-700/80 mb-6">
                  Try adjusting your search criteria or browse our complete collection
                </p>
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="border-amber-300 text-amber-700 hover:bg-amber-50"
                >
                  View All Collections
                </Button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;