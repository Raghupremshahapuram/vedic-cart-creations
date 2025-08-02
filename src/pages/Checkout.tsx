import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Smartphone, Banknote, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { state, clearCart } = useCart();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India'
  });

  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const [upiId, setUpiId] = useState('');

  const formatPrice = (price: number) => {
    const symbols = { INR: '₹', USD: '$', EUR: '€', GBP: '£' };
    const symbol = symbols[state.currency as keyof typeof symbols] || '₹';
    
    const rates = { INR: 1, USD: 0.012, EUR: 0.011, GBP: 0.0095 };
    const convertedPrice = price * (rates[state.currency as keyof typeof rates] || 1);
    
    return `${symbol}${convertedPrice.toFixed(2)}`;
  };

  const subtotal = state.total;
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    const required = ['name', 'email', 'phone', 'address', 'city', 'state', 'pincode'];
    return required.every(field => formData[field as keyof FormData].trim() !== '');
  };

  const validateStep2 = () => {
    if (paymentMethod === 'card') {
      return cardData.number && cardData.expiry && cardData.cvv && cardData.name;
    }
    if (paymentMethod === 'upi') {
      return upiId.trim() !== '';
    }
    return true; // COD doesn't need validation
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !validateStep1()) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    if (currentStep === 2 && !validateStep2()) {
      toast({
        title: "Please complete payment information",
        variant: "destructive"
      });
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate random payment success/failure
    const isSuccess = Math.random() > 0.1; // 90% success rate
    
    if (isSuccess) {
      clearCart();
      toast({
        title: "Order Placed Successfully!",
        description: "You will receive a confirmation email shortly.",
      });
      navigate('/payment-success');
    } else {
      toast({
        title: "Payment Failed",
        description: "Please try again or use a different payment method.",
        variant: "destructive"
      });
    }
    
    setIsProcessing(false);
  };

  if (state.items.length === 0) {
    navigate('/cart');
    return null;
  }

  const steps = [
    { number: 1, title: 'Shipping Address', completed: currentStep > 1 },
    { number: 2, title: 'Payment Method', completed: currentStep > 2 },
    { number: 3, title: 'Order Summary', completed: false }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate('/cart')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Button>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step.completed ? 'bg-nature text-nature-foreground' :
                currentStep === step.number ? 'bg-primary text-primary-foreground' :
                'bg-muted text-muted-foreground'
              }`}>
                {step.completed ? <Check className="w-5 h-5" /> : step.number}
              </div>
              <span className={`ml-2 font-medium ${
                step.completed || currentStep === step.number ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  step.completed ? 'bg-nature' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Address */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Street address, apartment number"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        placeholder="State"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode">PIN Code *</Label>
                      <Input
                        id="pincode"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        placeholder="123456"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleNextStep} className="w-full">
                    Continue to Payment
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Method */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <CreditCard className="w-5 h-5" />
                      <Label htmlFor="card" className="flex-1">Credit/Debit Card</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="upi" id="upi" />
                      <Smartphone className="w-5 h-5" />
                      <Label htmlFor="upi" className="flex-1">UPI Payment</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="cod" id="cod" />
                      <Banknote className="w-5 h-5" />
                      <Label htmlFor="cod" className="flex-1">Cash on Delivery</Label>
                    </div>
                  </RadioGroup>

                  {/* Card Details */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          value={cardData.number}
                          onChange={(e) => setCardData(prev => ({ ...prev, number: e.target.value }))}
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            value={cardData.expiry}
                            onChange={(e) => setCardData(prev => ({ ...prev, expiry: e.target.value }))}
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            value={cardData.cvv}
                            onChange={(e) => setCardData(prev => ({ ...prev, cvv: e.target.value }))}
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* UPI Details */}
                  {paymentMethod === 'upi' && (
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input
                        id="upiId"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@paytm"
                      />
                    </div>
                  )}

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setCurrentStep(1)}>
                      Back
                    </Button>
                    <Button onClick={handleNextStep} className="flex-1">
                      Review Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Order Summary */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Confirm Your Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Shipping Address Summary */}
                  <div>
                    <h3 className="font-semibold mb-2">Shipping Address</h3>
                    <div className="text-sm text-muted-foreground">
                      <p>{formData.name}</p>
                      <p>{formData.address}</p>
                      <p>{formData.city}, {formData.state} {formData.pincode}</p>
                      <p>{formData.phone}</p>
                    </div>
                  </div>

                  <Separator />

                  {/* Payment Method Summary */}
                  <div>
                    <h3 className="font-semibold mb-2">Payment Method</h3>
                    <div className="flex items-center gap-2">
                      {paymentMethod === 'card' && <CreditCard className="w-4 h-4" />}
                      {paymentMethod === 'upi' && <Smartphone className="w-4 h-4" />}
                      {paymentMethod === 'cod' && <Banknote className="w-4 h-4" />}
                      <span className="text-sm">
                        {paymentMethod === 'card' && 'Credit/Debit Card'}
                        {paymentMethod === 'upi' && 'UPI Payment'}
                        {paymentMethod === 'cod' && 'Cash on Delivery'}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setCurrentStep(2)}>
                      Back
                    </Button>
                    <Button 
                      onClick={handlePlaceOrder} 
                      className="flex-1 bg-gradient-to-r from-nature to-accent hover:from-nature/90 hover:to-accent/90"
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : 'Place Order'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Totals */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;