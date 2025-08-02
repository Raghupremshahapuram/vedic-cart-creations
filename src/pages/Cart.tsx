import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

const Cart = () => {
  const { state, updateQuantity, removeItem } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const { toast } = useToast();

  const formatPrice = (price: number) => {
    const symbols = { INR: '₹', USD: '$', EUR: '€', GBP: '£' };
    const symbol = symbols[state.currency as keyof typeof symbols] || '₹';
    
    // Simple conversion rates
    const rates = { INR: 1, USD: 0.012, EUR: 0.011, GBP: 0.0095 };
    const convertedPrice = price * (rates[state.currency as keyof typeof rates] || 1);
    
    return `${symbol}${convertedPrice.toFixed(2)}`;
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
      toast({
        title: "Item Removed",
        description: "Item has been removed from your cart.",
      });
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleApplyPromo = () => {
    const validPromoCodes = {
      'FIRST10': 10,
      'SAVE20': 20,
      'WELCOME15': 15
    };

    const code = promoCode.toUpperCase();
    const discount = validPromoCodes[code as keyof typeof validPromoCodes];

    if (discount) {
      setAppliedPromo({ code, discount });
      toast({
        title: "Promo Code Applied!",
        description: `You saved ${discount}% on your order.`,
      });
    } else {
      toast({
        title: "Invalid Promo Code",
        description: "Please check your promo code and try again.",
        variant: "destructive"
      });
    }
    setPromoCode('');
  };

  const subtotal = state.total;
  const promoDiscount = appliedPromo ? (subtotal * appliedPromo.discount) / 100 : 0;
  const shipping = subtotal > 500 ? 0 : 50; // Free shipping over ₹500
  const total = subtotal - promoDiscount + shipping;

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/products">
              <Button size="lg" className="rounded-2xl px-8 py-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                Start Shopping
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Shopping Cart</h1>
          <p className="text-muted-foreground">
            Review your items and proceed to checkout
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Cart Items ({state.items.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {state.items.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 border border-border rounded-lg">
                    {/* Product Image */}
                    <div className="w-full sm:w-24 h-48 sm:h-24 bg-muted rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row justify-between">
                        <div className="mb-2 sm:mb-0">
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-muted-foreground text-sm">{item.category}</p>
                          
                          {/* Badges */}
                          <div className="flex gap-1 mt-2">
                            {item.badges.map((badge, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {badge}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">
                            {formatPrice(item.price)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            per item
                          </p>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          
                          <span className="font-semibold min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-8 h-8 p-0"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Promo Code */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleApplyPromo} disabled={!promoCode.trim()}>
                      Apply
                    </Button>
                  </div>
                  {appliedPromo && (
                    <div className="mt-2">
                      <Badge variant="default" className="bg-nature">
                        {appliedPromo.code} applied - {appliedPromo.discount}% off
                      </Badge>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  {appliedPromo && (
                    <div className="flex justify-between text-nature">
                      <span>Discount ({appliedPromo.discount}%)</span>
                      <span>-{formatPrice(promoDiscount)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <Badge variant="default" className="bg-nature text-xs">FREE</Badge>
                      ) : (
                        formatPrice(shipping)
                      )}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>

                {shipping > 0 && (
                  <p className="text-sm text-muted-foreground">
                    💡 Add {formatPrice(500 - subtotal)} more for free shipping!
                  </p>
                )}

                <Link to="/checkout">
                  <Button 
                    size="lg" 
                    className="w-full rounded-2xl mt-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  >
                    Proceed to Checkout
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>

                <Link to="/products">
                  <Button variant="outline" size="lg" className="w-full rounded-2xl">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;