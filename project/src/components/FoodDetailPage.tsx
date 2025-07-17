import React, { useState } from 'react';
import { ArrowLeft, Star, Plus, Minus } from 'lucide-react';
import { FoodItem } from '../App';
import Footer from './Footer';

interface FoodDetailPageProps {
  food: FoodItem;
  onBack: () => void;
  onAddToCart: (food: FoodItem, quantity: number) => void;
}

const FoodDetailPage: React.FC<FoodDetailPageProps> = ({ food, onBack, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(food, quantity);
    onBack();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-80 object-cover"
        />
        <button
          onClick={onBack}
          className="absolute top-6 left-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{food.name}</h1>
          <div className="flex items-center mb-3">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="text-gray-600 ml-2">{food.rating} Rating</span>
          </div>
          <p className="text-3xl font-bold text-emerald-600">R{food.price}</p>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
          <p className="text-gray-600 leading-relaxed">{food.description}</p>
        </div>

        {/* Quantity Selector */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-colors"
            >
              <Minus className="w-5 h-5 text-gray-700" />
            </button>
            <span className="text-xl font-semibold text-gray-900 min-w-[2rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="bg-emerald-500 rounded-full p-2 hover:bg-emerald-600 transition-colors"
            >
              <Plus className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Add to Basket Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-emerald-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-emerald-600 transition-colors active:scale-95 mb-6"
        >
          Add to Basket - R{(food.price * quantity).toFixed(2)}
        </button>
      </div>
      {/* Footer */}
       <Footer />
    </div>
  );
};

export default FoodDetailPage;