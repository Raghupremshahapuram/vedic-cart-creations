import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, Leaf, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/contexts/CartContext';
import heroImage from '@/assets/hero-bg.jpg';
import a2GheeImage from '@/assets/a2-ghee.jpg';
import cowDungDiyasImage from '@/assets/cow-dung-diyas.jpg';
import naturalIncenseImage from '@/assets/natural-incense.jpg';

const Index = () => {
  // Sample products for featured section
  const featuredProducts: Product[] = [
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
    }
  ];

  const categories = [
    { name: 'A2 Dairy Products', icon: '🥛', count: '15+ Products', color: 'from-accent to-sacred' },
    { name: 'Home Decor', icon: '🪔', count: '20+ Products', color: 'from-nature to-accent' },
    { name: 'Wellness & Incense', icon: '🌿', count: '12+ Products', color: 'from-primary to-nature' },
    { name: 'Eco-Friendly Items', icon: '♻️', count: '18+ Products', color: 'from-sacred to-primary' }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Mumbai',
      rating: 5,
      text: 'The A2 ghee quality is exceptional! You can taste the purity and traditional methods.',
      avatar: '👩'
    },
    {
      name: 'Rajesh Kumar',
      location: 'Delhi',
      rating: 5,
      text: 'Beautiful cow dung diyas for Diwali. Authentic and eco-friendly products.',
      avatar: '👨'
    },
    {
      name: 'Meera Patel',
      location: 'Bangalore',
      rating: 5,
      text: 'Natural incense sticks create such a peaceful atmosphere. Highly recommended!',
      avatar: '👩'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-[80vh] flex items-center justify-center hero-gradient"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-6 text-center text-white">
          <Badge className="mb-6 bg-sacred/20 text-sacred border-sacred/30">
            🌍 Now Shipping Internationally
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            From the Cow to Your Home
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-slide-up">
            <span className="font-semibold text-sacred">Pure. Sacred. Natural.</span>
            <br />
            Discover authentic Vedic cow products crafted with love and tradition
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <Link to="/products">
              <Button size="lg" className="rounded-2xl px-8 py-6 text-lg bg-gradient-to-r from-sacred to-accent hover:from-sacred/90 hover:to-accent/90 text-sacred-foreground">
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            
            <Link to="/about">
              <Button variant="outline" size="lg" className="rounded-2xl px-8 py-6 text-lg border-white/30 text-white hover:bg-white/10">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="text-center border-0 shadow-soft">
              <CardContent className="p-6">
                <Shield className="w-12 h-12 text-nature mx-auto mb-4" />
                <h3 className="font-semibold mb-2">100% Authentic</h3>
                <p className="text-muted-foreground text-sm">Traditional Vedic methods</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-soft">
              <CardContent className="p-6">
                <Leaf className="w-12 h-12 text-nature mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Eco-Friendly</h3>
                <p className="text-muted-foreground text-sm">Sustainable & natural</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-soft">
              <CardContent className="p-6">
                <Truck className="w-12 h-12 text-nature mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Fast Delivery</h3>
                <p className="text-muted-foreground text-sm">Quick & safe shipping</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 shadow-soft">
              <CardContent className="p-6">
                <Star className="w-12 h-12 text-nature mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Premium Quality</h3>
                <p className="text-muted-foreground text-sm">Handpicked products</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-xl text-muted-foreground">Explore our range of authentic cow products</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link key={index} to="/products">
                <Card className="group hover:scale-105 transition-all duration-300 border-0 shadow-soft hover:shadow-warm cursor-pointer">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 text-2xl group-hover:animate-glow`}>
                      {category.icon}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                    <p className="text-muted-foreground">{category.count}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-xl text-muted-foreground">Handpicked items for you</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/products">
              <Button size="lg" className="rounded-2xl px-8 py-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                View All Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-muted-foreground">Real experiences from real people</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-sacred text-sacred" />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-lg">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
