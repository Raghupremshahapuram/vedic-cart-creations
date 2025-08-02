import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useCart, Product } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addItem, state } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: `${product.name} has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`,
    });
  };

  const formatPrice = (price: number) => {
    const symbols = { INR: '₹', USD: '$', EUR: '€', GBP: '£' };
    const symbol = symbols[state.currency as keyof typeof symbols] || '₹';
    
    // Simple conversion rates (in real app, use actual exchange rates)
    const rates = { INR: 1, USD: 0.012, EUR: 0.011, GBP: 0.0095 };
    const convertedPrice = price * (rates[state.currency as keyof typeof rates] || 1);
    
    return `${symbol}${convertedPrice.toFixed(2)}`;
  };

  return (
    <Card className={`product-card group overflow-hidden border-0 shadow-soft hover:shadow-warm ${className}`}>
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          {/* Product Image */}
          <div className="aspect-square bg-muted animate-pulse">
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>

          {/* Wishlist Button */}
          <Button
            variant="outline"
            size="sm"
            className="absolute top-3 right-3 w-8 h-8 p-0 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={handleWishlist}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isWishlisted ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
              }`}
            />
          </Button>

          {/* Badges */}
          {product.badges.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              {product.badges.map((badge, index) => (
                <Badge
                  key={index}
                  variant={badge === 'Handmade' ? 'secondary' : badge === 'Eco-Friendly' ? 'default' : 'outline'}
                  className="text-xs"
                >
                  {badge}
                </Badge>
              ))}
            </div>
          )}

          {/* Stock Status */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
              <Badge variant="destructive">Out of Stock</Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          {/* Product Name */}
          <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < 4 ? 'fill-sacred text-sacred' : 'text-muted-foreground'
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">(4.0)</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xl font-bold text-primary">{formatPrice(product.price)}</span>
            <span className="text-sm text-muted-foreground">{product.category}</span>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full rounded-2xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;