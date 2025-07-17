import React from 'react';
import { ArrowLeft, Plus, Minus, Trash2 } from 'lucide-react';
import { CartItem } from '../App';

interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onCheckout: () => void;
  onBack: () => void;
  totalPrice: number;
}

const CartPage: React.FC<CartPageProps> = ({
  cartItems,
  onUpdateQuantity,
  onCheckout,
  onBack,
  totalPrice
}) => {
  const [isDelivery, setIsDelivery] = React.useState(true);
  const deliveryFee = isDelivery ? 2.99 : 0;
  const finalTotal = totalPrice;{/*+ deliveryFee*/}

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Your Cart</h1>
          </div>
        </div>
        
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🛒</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some delicious food to get started!</p>
            <button
              onClick={onBack}
              className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-600 transition-colors"
            >
              Browse Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          <h1 className="text-xl font-semibold text-gray-900">Your Cart</h1>
        </div>
      </div>

      {/* Cart Items */}
      <div className="p-4 pb-32">
        {cartItems.map((item) => (
          <div key={item.id} className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg mr-4"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-emerald-600 font-semibold">R{item.price}</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="bg-white rounded-full p-2 shadow-sm hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-4 h-4 text-gray-700" />
                </button>
                <span className="font-semibold text-gray-900 min-w-[2rem] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="bg-emerald-500 rounded-full p-2 hover:bg-emerald-600 transition-colors"
                >
                  <Plus className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => onUpdateQuantity(item.id, 0)}
                  className="bg-red-500 rounded-full p-2 hover:bg-red-600 transition-colors ml-2"
                >
                  <Trash2 className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">R{totalPrice.toFixed(2)}</span>
            </div>
            {/*{isDelivery && (
              <div className="flex justify-between">
              <span className="text-gray-600">Delivery Fee</span>
                <span className="text-gray-900">R{deliveryFee.toFixed(2)}</span>
            </div>
            )}*/}
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between font-semibold">
                <span className="text-gray-900">Total</span>
                <span className="text-emerald-600">R{finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pickup/Delivery Toggle */}
        {/*<div className="bg-gray-50 rounded-xl p-4 mb-6">
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
        </div>/*}

        {/* Checkout Button - Now scrollable */}
        <button
          onClick={onCheckout}
          className="w-full bg-emerald-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-emerald-600 transition-colors active:scale-95 mb-6"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;