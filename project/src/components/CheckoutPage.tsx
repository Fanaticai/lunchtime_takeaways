import React, { useState } from 'react';
import { ArrowLeft, User, Phone, MapPin, MessageSquare } from 'lucide-react';
import { Order, CartItem } from '../App';

interface CheckoutPageProps {
  onBack: () => void;
  onPlaceOrder: (order: Order) => void;
  totalPrice: number;
  cartItems: CartItem[];
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({
  onBack,
  /*onPlaceOrder,*/
  totalPrice,
  cartItems
}) => {
  const [isDelivery, setIsDelivery] = React.useState(true);
  const [orderDetails, setOrderDetails] = useState<Order>({
    name: '',
    phone: '',
    address: '',
    notes: '',
    isDelivery: true
  });

  const deliveryFee = isDelivery ? 30.00 : 0;
  const finalTotal = totalPrice + deliveryFee;

  React.useEffect(() => {
    setOrderDetails(prev => ({ ...prev, isDelivery }));
  }, [isDelivery]);

  const handleInputChange = (field: keyof Order, value: string) => {
    setOrderDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const { name, phone, address, notes } = orderDetails;
  if (!name || !phone || (isDelivery && !address)) return;

  // Format cart items
  const itemList = cartItems
    .map(item => `• ${item.name} x ${item.quantity}`)
    .join('\n');

  // WhatsApp message body
  let message = `*New Order* 📦\n\n`;
  message += `*Name:* ${name}\n`;
  message += `*Phone Number:* ${phone}\n`;
  message += `*Order Type:* ${isDelivery ? 'Delivery' : 'Pickup'}\n`;
  if (isDelivery) message += `*Address:* ${address}\n`;
  if (notes) message += `*Notes:* ${notes}\n`;
  message += `\n*Order Items:*\n${itemList}\n`;
  message += `\n*Total:* R${(totalPrice + (isDelivery ? 2.99 : 0)).toFixed(2)}\n`;

  const encodedMsg = encodeURIComponent(message);
  const whatsappNumber = "27659804982"; // Add your full international WhatsApp number without +
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;

  window.open(whatsappURL, '_blank');
};
// Previous handleSubmit before whatsapp part added
  {/*const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = orderDetails.name && orderDetails.phone && (isDelivery ? orderDetails.address : true);
    if (isValid) {
      onPlaceOrder(orderDetails);
    }
  };*/}

  const isFormValid = orderDetails.name && orderDetails.phone && (isDelivery ? orderDetails.address : true);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">Checkout</h1>
        </div>
      </div>

      <div className="p-4 pb-32">
        {/* Order Summary */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
          <div className="space-y-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.name} x {item.quantity}</span>
                <span className="text-gray-900">R{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">R{totalPrice.toFixed(2)}</span>
              </div>
              {isDelivery && (
                <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                  <span className="text-gray-900">R{deliveryFee.toFixed(2)}</span>
              </div>
              )}
              <div className="flex justify-between font-semibold pt-2">
                <span className="text-gray-900">Total</span>
                <span className="text-emerald-600">R{finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pickup/Delivery Toggle */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Order Type</h3>
          <div className="flex bg-white rounded-lg p-1">
            <button
              onClick={() => setIsDelivery(false)}
              className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
                !isDelivery
                  ? 'bg-emerald-500 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🏪 Pickup
            </button>
            <button
              onClick={() => setIsDelivery(true)}
              className={`flex-1 py-3 px-4 rounded-md font-medium transition-colors ${
                isDelivery
                  ? 'bg-emerald-500 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🚚 Delivery
            </button>
          </div>
          
          {!isDelivery && (
            <div className="mt-4 p-3 bg-emerald-50 rounded-lg">
              <p className="text-sm text-emerald-700 font-medium">📍 Pickup Location:</p>
              <p className="text-sm text-emerald-600">Lunch Time Cafe, Atlantis</p>
              <p className="text-sm text-emerald-600">Ready in 15-20 minutes</p>
            </div>
          )}
        </div>

        {/* Personal Details Form */}
        <div className="bg-white">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Details</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={orderDetails.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={orderDetails.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            {isDelivery && (
              <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Address *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  value={orderDetails.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  placeholder="Enter your delivery address"
                  rows={3}
                  required
                />
              </div>
            </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Notes
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  value={orderDetails.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  placeholder="Any special instructions for your order..."
                  rows={3}
                />
              </div>
            </div>

            {/* Place Order Button - Now scrollable */}
            <button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-colors active:scale-95 mt-6 mb-6 ${
                isFormValid
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isDelivery ? 'Place Order' : 'Place Pickup Order'} - R{finalTotal.toFixed(2)}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;