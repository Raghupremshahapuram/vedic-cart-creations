import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingCart, Star, Truck, Shield, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart, Product } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import a2GheeImage from '@/assets/a2-ghee.jpg';
import cowDungDiyasImage from '@/assets/cow-dung-diyas.jpg';
import naturalIncenseImage from '@/assets/natural-incense.jpg';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem, state } = useCart();
  const { toast } = useToast();

  // Mock product data - in real app, fetch from API
  const products: Product[] = [
    {
      id: '1',
      name: 'Organic A2 Ghee - 500ml',
      price: 899,
      image: a2GheeImage,
      category: 'Dairy',
      description: 'Pure A2 ghee made from grass-fed cow milk using traditional bilona method. Rich in nutrients and perfect for cooking, this ghee carries the authentic taste of traditional Indian cuisine.',
      badges: ['Organic', 'A2 Quality'],
      inStock: true
    },
    {
      id: '2',
      name: 'Handmade Cow Dung Diyas (Set of 10)',
      price: 299,
      image: cowDungDiyasImage,
      category: 'Home Decor',
      description: 'Traditional handcrafted diyas made from pure cow dung for festivals. Each diya is carefully shaped and dried to perfection, bringing positive energy to your home.',
      badges: ['Handmade', 'Eco-Friendly'],
      inStock: true
    },
    {
      id: '3',
      name: 'Natural Incense Sticks - Sandalwood',
      price: 199,
      image: naturalIncenseImage,
      category: 'Wellness',
      description: 'Premium natural incense sticks made with pure sandalwood and herbs. Perfect for meditation, prayer, and creating a peaceful atmosphere.',
      badges: ['Natural', 'Aromatherapy'],
      inStock: true
    }
  ];

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    const symbols = { INR: '₹', USD: '$', EUR: '€', GBP: '£' };
    const symbol = symbols[state.currency as keyof typeof symbols] || '₹';
    
    const rates = { INR: 1, USD: 0.012, EUR: 0.011, GBP: 0.0095 };
    const convertedPrice = price * (rates[state.currency as keyof typeof rates] || 1);
    
    return `${symbol}${convertedPrice.toFixed(2)}`;
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: `${product.name} has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-2xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex gap-2">
              {product.badges.map((badge, index) => (
                <Badge key={index} variant="secondary">
                  {badge}
                </Badge>
              ))}
            </div>

            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < 4 ? 'fill-sacred text-sacred' : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(4.0 • 127 reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              <Badge variant={product.inStock ? 'default' : 'destructive'}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </Badge>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="text-center border-0 bg-muted/30">
                <CardContent className="p-4">
                  <Shield className="w-6 h-6 text-nature mx-auto mb-2" />
                  <p className="text-sm font-medium">Authentic</p>
                </CardContent>
              </Card>
              <Card className="text-center border-0 bg-muted/30">
                <CardContent className="p-4">
                  <Leaf className="w-6 h-6 text-nature mx-auto mb-2" />
                  <p className="text-sm font-medium">Organic</p>
                </CardContent>
              </Card>
              <Card className="text-center border-0 bg-muted/30">
                <CardContent className="p-4">
                  <Truck className="w-6 h-6 text-nature mx-auto mb-2" />
                  <p className="text-sm font-medium">Fast Delivery</p>
                </CardContent>
              </Card>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1 rounded-2xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-2xl"
                  onClick={handleWishlist}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isWishlisted ? 'fill-red-500 text-red-500' : ''
                    }`}
                  />
                </Button>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="w-4 h-4 text-nature" />
                <span className="font-medium">Delivery Information</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Free delivery on orders above ₹500 • Estimated delivery: 3-5 business days
              </p>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Our products are crafted using traditional Vedic methods that have been passed down through generations. 
                    Each item is made with love and respect for the sacred cow, ensuring the highest quality and purity.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="ingredients" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Ingredients & Composition</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 100% Pure Cow Milk (A2 Quality)</li>
                    <li>• No artificial preservatives</li>
                    <li>• No chemical additives</li>
                    <li>• Traditional bilona method</li>
                    <li>• Grass-fed cow source</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="usage" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">How to Use</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>Perfect for cooking, baking, and traditional preparations.</p>
                    <ul className="space-y-2">
                      <li>• Store in a cool, dry place</li>
                      <li>• Use clean, dry spoon</li>
                      <li>• Ideal for high-temperature cooking</li>
                      <li>• Great for traditional sweets and savory dishes</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="shipping" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>We ensure safe and timely delivery of all our products.</p>
                    <ul className="space-y-2">
                      <li>• Free shipping on orders above ₹500</li>
                      <li>• Delivery within 3-5 business days</li>
                      <li>• Special packaging for fragile items</li>
                      <li>• International shipping available</li>
                      <li>• Track your order in real-time</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;