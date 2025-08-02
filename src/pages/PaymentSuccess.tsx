import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const PaymentSuccess = () => {
  const orderNumber = `COW${Date.now().toString().slice(-6)}`;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-6 py-16">
        <Card className="max-w-md mx-auto text-center border-0 shadow-warm">
          <CardContent className="p-8">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-gradient-to-r from-nature to-accent rounded-full flex items-center justify-center mx-auto mb-6 animate-glow">
              <CheckCircle className="w-12 h-12 text-nature-foreground" />
            </div>

            {/* Success Message */}
            <h1 className="text-3xl font-bold text-foreground mb-4">
              🎉 Order Placed Successfully!
            </h1>
            
            <p className="text-lg text-muted-foreground mb-6">
              Thank you for your order! Your authentic cow products will be delivered soon.
            </p>

            {/* Order Details */}
            <div className="bg-muted/30 p-4 rounded-lg mb-6">
              <p className="text-sm text-muted-foreground mb-1">Order Number</p>
              <p className="font-bold text-lg text-primary">#{orderNumber}</p>
            </div>

            <div className="space-y-3 mb-8 text-sm text-muted-foreground">
              <p>📧 Confirmation email sent to your inbox</p>
              <p>📦 You'll receive tracking details soon</p>
              <p>🚛 Estimated delivery: 3-5 business days</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link to="/products" className="block">
                <Button 
                  size="lg" 
                  className="w-full rounded-2xl bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
              
              <Link to="/" className="block">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full rounded-2xl"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>

            {/* Contact Info */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Need help? Contact us at{' '}
                <a href="mailto:support@cowproducts.com" className="text-primary hover:underline">
                  support@cowproducts.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccess;