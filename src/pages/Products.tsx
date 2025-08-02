import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid3X3, List, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/contexts/CartContext';
import a2GheeImage from '@/assets/a2-ghee.jpg';
import cowDungDiyasImage from '@/assets/cow-dung-diyas.jpg';
import naturalIncenseImage from '@/assets/natural-incense.jpg';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');

  // Sample products data
  const allProducts: Product[] = [
    {
      id: '1',
      name: 'Organic A2 Ghee - 500ml',
      price: 899,
      image: a2GheeImage,
      category: 'Dairy',
      description: 'Pure A2 ghee made from grass-fed cow milk using traditional bilona method.',
      badges: ['Organic', 'A2 Quality'],
      inStock: true
    },
    {
      id: '2',
      name: 'Handmade Cow Dung Diyas (Set of 10)',
      price: 299,
      image: cowDungDiyasImage,
      category: 'Home Decor',
      description: 'Traditional handcrafted diyas made from pure cow dung for festivals.',
      badges: ['Handmade', 'Eco-Friendly'],
      inStock: true
    },
    {
      id: '3',
      name: 'Natural Incense Sticks - Sandalwood',
      price: 199,
      image: naturalIncenseImage,
      category: 'Wellness',
      description: 'Premium natural incense sticks made with pure sandalwood and herbs.',
      badges: ['Natural', 'Aromatherapy'],
      inStock: true
    },
    {
      id: '4',
      name: 'Organic A2 Ghee - 1kg',
      price: 1699,
      image: a2GheeImage,
      category: 'Dairy',
      description: 'Large pack of pure A2 ghee for families.',
      badges: ['Organic', 'A2 Quality', 'Family Pack'],
      inStock: true
    },
    {
      id: '5',
      name: 'Cow Dung Cakes (Set of 20)',
      price: 199,
      image: cowDungDiyasImage,
      category: 'Eco-Friendly',
      description: 'Natural cow dung cakes for traditional cooking and ceremonies.',
      badges: ['Natural', 'Eco-Friendly'],
      inStock: false
    },
    {
      id: '6',
      name: 'Lavender Incense Sticks',
      price: 249,
      image: naturalIncenseImage,
      category: 'Wellness',
      description: 'Calming lavender incense for relaxation and meditation.',
      badges: ['Natural', 'Aromatherapy', 'Relaxation'],
      inStock: true
    }
  ];

  const categories = ['Dairy', 'Home Decor', 'Wellness', 'Eco-Friendly'];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const searchQuery = searchParams.get('search') || '';
    
    let filtered = allProducts.filter(product => {
      // Search filter
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = selectedCategories.length === 0 || 
                             selectedCategories.includes(product.category);
      
      // Price filter
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // featured
        break;
    }

    return filtered;
  }, [allProducts, searchParams, selectedCategories, priceRange, sortBy]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-xl text-muted-foreground">
            Discover our collection of authentic Vedic cow products
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-72 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="font-semibold mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => 
                            handleCategoryChange(category, checked as boolean)
                          }
                        />
                        <label htmlFor={category} className="text-sm">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <div className="space-y-3">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={2000}
                      min={0}
                      step={50}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Clear Filters */}
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange([0, 2000]);
                  }}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                
                <Badge variant="secondary">
                  {filteredProducts.length} products found
                </Badge>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                    className={viewMode === 'list' ? 'flex-row' : ''}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button 
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange([0, 2000]);
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;