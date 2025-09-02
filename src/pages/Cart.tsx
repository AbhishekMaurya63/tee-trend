import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Crown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const Cart = () => {
  const { items, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const { toast } = useToast();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  });

  const handleQuantityUpdate = (productId: string, size: string, color: string, newQuantity: number) => {
    updateQuantity(productId, size, color, newQuantity);
  };

  const handleRemoveItem = (productId: string, size: string, color: string) => {
    removeFromCart(productId, size, color);
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
      className: "bg-gradient-to-r from-amber-50 to-white border-l-4 border-amber-500"
    });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast({
        title: "Please fill required fields",
        description: "Name, email, phone, and address are required.",
        variant: "destructive",
      });
      return;
    }

    // Prepare order data in JSON format
    const orderData = {
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address
      },
      order: {
        items: items.map(item => ({
          productId: item.product._id,
          productName: item.product.name,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          price: item.product.discountedPrice || item.product.originalPrice,
          thumbnail: item.product.thumbnail?.url
        })),
        totalAmount: total,
        itemCount: items.reduce((sum, item) => sum + item.quantity, 0)
      },
      additionalMessage: formData.message,
      timestamp: new Date().toISOString()
    };

    try {
      // Here you would send the orderData to your backend
      console.log('Order Data to be sent:', JSON.stringify(orderData, null, 2));
      
      // Simulate API call - replace with your actual API call
      // await fetch('/api/orders', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(orderData),
      // });

      toast({
        title: "Order submitted successfully!",
        description: "We will contact you shortly to confirm your order.",
        className: "bg-gradient-to-r from-amber-50 to-white border-l-4 border-amber-500"
      });

      // Reset form and close dialog
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        message: ''
      });
      setIsCheckoutOpen(false);
      clearCart();

    } catch (error) {
      toast({
        title: "Error submitting order",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-25 to-amber-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-amber-950 mb-4">Your Luxury Cart is Empty</h1>
            <p className="text-amber-700/90 mb-8 max-w-md mx-auto">
              Discover our exquisite collection and add something special to your cart.
            </p>
            <Link to="/products">
              <Button 
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-6 text-base font-semibold"
              >
                Explore Collections
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-25 to-amber-50">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Badge className="bg-amber-500/10 text-amber-700 border-amber-400/20 px-4 py-1.5 text-sm font-medium rounded-full mb-4">
            <Crown className="h-4 w-4 mr-2" />
            Luxury Cart
          </Badge>
          <h1 className="text-4xl font-bold text-amber-950 mb-4">Your Shopping Cart</h1>
          <p className="text-amber-700/90">Review your selected luxury items</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <Card key={`${item.product._id}-${item.size}-${item.color}`} className="shadow-lg border-amber-200">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <img
                        src={item.product.thumbnail?.url || '/placeholder.svg'}
                        alt={item.product.name}
                        className="w-28 h-28 object-cover rounded-xl border-2 border-amber-100 shadow-sm"
                      />
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <h3 className="font-semibold text-amber-900 text-lg">{item.product.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                          Size: {item.size}
                        </Badge>
                        <Badge className="bg-amber-100 text-amber-700 border-amber-200">
                          Color: {item.color}
                        </Badge>
                      </div>
                      <p className="font-semibold text-amber-800 text-xl">
                        ₹{(item.product.discountedPrice || item.product.originalPrice) * item.quantity}
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:items-end space-y-3">
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityUpdate(
                            item.product._id, 
                            item.size, 
                            item.color, 
                            item.quantity - 1
                          )}
                          disabled={item.quantity <= 1}
                          className="border-amber-300 text-amber-700 hover:border-amber-600 hover:text-amber-900"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-semibold text-amber-900 text-lg">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleQuantityUpdate(
                            item.product._id, 
                            item.size, 
                            item.color, 
                            item.quantity + 1
                          )}
                          className="border-amber-300 text-amber-700 hover:border-amber-600 hover:text-amber-900"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.product._id, item.size, item.color)}
                        className="text-amber-600 hover:text-amber-800 hover:bg-amber-50"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="flex justify-between items-center pt-4">
              <Button
                variant="outline"
                onClick={clearCart}
                className="border-amber-300 text-amber-700 hover:border-amber-600 hover:text-amber-900"
              >
                Clear Entire Cart
              </Button>
              <Link to="/products">
                <Button variant="outline" className="border-amber-300 text-amber-700 hover:border-amber-600 hover:text-amber-900">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <Card className="shadow-2xl border-amber-200 sticky top-4">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 border-b border-amber-200">
                <CardTitle className="text-amber-900 flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-amber-600" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-amber-700">Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span className="font-semibold text-amber-900">₹{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-700">Shipping</span>
                    <span className="text-green-600 font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between text-sm text-amber-600/80">
                    <span>Taxes</span>
                    <span>Included</span>
                  </div>
                </div>
                
                <Separator className="bg-amber-200" />
                
                <div className="flex justify-between text-xl font-semibold text-amber-900">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                
                <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-6 text-base font-semibold rounded-xl shadow-lg hover:shadow-amber-700/30 transition-all duration-300"
                    >
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md bg-white">
                    <DialogHeader>
                      <DialogTitle className="text-amber-900 flex items-center">
                        <Crown className="h-5 w-5 mr-2 text-amber-600" />
                        Complete Your Order
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleCheckout} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-amber-900">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="border-amber-300 focus:border-amber-500 focus:ring-amber-500"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-amber-900">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="border-amber-300 focus:border-amber-500 focus:ring-amber-500"
                          placeholder="your.email@example.com"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-amber-900">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="border-amber-300 focus:border-amber-500 focus:ring-amber-500"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address" className="text-amber-900">Delivery Address *</Label>
                        <Textarea
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          rows={3}
                          className="border-amber-300 focus:border-amber-500 focus:ring-amber-500"
                          placeholder="Enter complete delivery address"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-amber-900">Additional Message (Optional)</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={3}
                          className="border-amber-300 focus:border-amber-500 focus:ring-amber-500"
                          placeholder="Special instructions or requests..."
                        />
                      </div>
                      
                      <div className="flex space-x-3 pt-2">
                        <Button 
                          type="submit" 
                          className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white"
                        >
                          Submit Order
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsCheckoutOpen(false)}
                          className="border-amber-300 text-amber-700 hover:border-amber-600 hover:text-amber-900"
                        >
                          Cancel
                        </Button>
                      </div>
                      
                      <p className="text-xs text-amber-600/80 text-center pt-2">
                        We'll contact you within 24 hours to confirm your order and arrange payment.
                      </p>
                    </form>
                  </DialogContent>
                </Dialog>
                
                <div className="text-xs text-amber-600/80 text-center pt-2">
                  Secure checkout • Encrypted payment • Luxury guarantee
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;