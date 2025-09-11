import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Crown, Sparkles } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { postDataHandler } from '@/config/services'

const Cart = () => {
  const { items, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const { toast } = useToast();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  });

  const handleQuantityUpdate = (productId: string, size: string, color: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, size, color, newQuantity);
  };

  const handleRemoveItem = (productId: string, size: string, color: string) => {
    console.log(productId, size, color, "1")
    removeFromCart(productId, size, color);
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
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

    setIsSubmitting(true);

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
      // Send order data to backend
      console.log('Order Data to be sent:', JSON.stringify(orderData, null, 2));
      await postDataHandler('query', orderData);
      
      toast({
        title: "Order submitted successfully!",
        description: "We will contact you shortly to confirm your order.",
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
    } finally {
      setIsSubmitting(false);
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
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-amber-950 mb-4">Your Luxury Cart is Empty</h1>
            <p className="text-amber-700 mb-8 max-w-md mx-auto">
              Discover our exquisite collection and add something special to your cart.
            </p>
            <Link to="/products">
              <button className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-4 rounded-lg font-semibold inline-flex items-center transition-all duration-300">
                Explore Collections
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="text-center mb-12">
          <span className="bg-amber-100 text-amber-700 border border-amber-200 px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center mb-4">
            <Crown className="h-4 w-4 mr-2" />
            Luxury Cart
          </span>
          <h1 className="text-4xl font-bold text-amber-950 mb-4">Your Shopping Cart</h1>
          <p className="text-amber-700">Review your selected luxury items</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={`${item.product._id}-${item.size}-${item.color}`} className="bg-white rounded-xl shadow-lg border border-amber-200 overflow-hidden">
                <div className="p-6">
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
                        <span className="bg-amber-100 text-amber-700 border border-amber-200 px-2 py-1 rounded-md text-sm">
                          Size: {item.size}
                        </span>
                        <span className="bg-amber-100 text-amber-700 border border-amber-200 px-2 py-1 rounded-md text-sm">
                          Color: {item.color}
                        </span>
                      </div>
                      <p className="font-semibold text-amber-800 text-xl">
                        ₹{(item.product.discountedPrice || item.product.originalPrice) * item.quantity}
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:items-end space-y-3">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleQuantityUpdate(
                            item.product._id, 
                            item.size, 
                            item.color, 
                            item.quantity - 1
                          )}
                          disabled={item.quantity <= 1}
                          className="border border-amber-300 text-amber-700 hover:border-amber-600 hover:text-amber-900 rounded-md p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-12 text-center font-semibold text-amber-900 text-lg">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityUpdate(
                            item.product._id, 
                            item.size, 
                            item.color, 
                            item.quantity + 1
                          )}
                          className="border border-amber-300 text-amber-700 hover:border-amber-600 hover:text-amber-900 rounded-md p-2"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => handleRemoveItem(item.product._id, item.size, item.color)}
                        className="text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded-md px-3 py-1 inline-flex items-center"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="flex justify-between items-center pt-4">
              <button
                onClick={clearCart}
                className="border border-amber-300 text-amber-700 hover:border-amber-600 hover:text-amber-900 rounded-md px-4 py-2"
              >
                Clear Entire Cart
              </button>
              <Link to="/products">
                <button className="border border-amber-300 text-amber-700 hover:border-amber-600 hover:text-amber-900 rounded-md px-4 py-2">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-xl shadow-2xl border border-amber-200 sticky top-4 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-b border-amber-200 px-6 py-4">
                <h2 className="text-amber-900 font-semibold text-lg flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-amber-600" />
                  Order Summary
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-amber-700">Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span className="font-semibold text-amber-900">₹{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-700">Shipping</span>
                    <span className="text-green-600 font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between text-sm text-amber-600">
                    <span>Taxes</span>
                    <span>Included</span>
                  </div>
                </div>
                
                <div className="border-t border-amber-200 my-4"></div>
                
                <div className="flex justify-between text-xl font-semibold text-amber-900">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                
                <button 
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-amber-700/30 transition-all duration-300 inline-flex items-center justify-center"
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                
                <div className="text-xs text-amber-600 text-center pt-2">
                  Secure checkout • Encrypted payment • Luxury guarantee
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="px-6 py-4 border-b border-amber-200">
              <h2 className="text-amber-900 font-semibold text-lg flex items-center">
                <Crown className="h-5 w-5 mr-2 text-amber-600" />
                Complete Your Order
              </h2>
            </div>
            <form onSubmit={handleCheckout} className="p-6 space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-amber-900 font-medium">Full Name *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-amber-900 font-medium">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-amber-900 font-medium">Phone Number *</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="+91 98765 43210"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="address" className="block text-amber-900 font-medium">Delivery Address *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Enter complete delivery address"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="block text-amber-900 font-medium">Additional Message (Optional)</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Special instructions or requests..."
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-2 rounded-md font-medium disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    "Submit Order"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(false)}
                  disabled={isSubmitting}
                  className="border border-amber-300 text-amber-700 hover:border-amber-600 hover:text-amber-900 py-2 px-4 rounded-md font-medium disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
              
              <p className="text-xs text-amber-600 text-center pt-4">
                We'll contact you within 24 hours to confirm your order and arrange payment.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;