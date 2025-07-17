import React from 'react';
import { Search, MapPin, Star, Plus } from 'lucide-react';
import { FoodItem } from '../App';
import Footer from './Footer';

interface HomePageProps {
  foodData: FoodItem[];
  onFoodClick: (food: FoodItem) => void;
  onAddToCart: (food: FoodItem) => void;
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ 
  foodData, 
  onFoodClick, 
  onAddToCart, 
  selectedCategory, 
  onCategorySelect,
  searchQuery,
  onSearchChange 
}) => {
  const getTimeBasedGreeting = () => {
    const currentHour = new Date().getHours();
    
    if (currentHour >= 5 && currentHour < 12) {
      return 'Good Morning!';
    } else if (currentHour >= 12 && currentHour < 17) {
      return 'Good Afternoon!';
    } else {
      return 'Closed';
    }
  };

  const categories = [
    { name: 'All', icon: '🍽️', id: null },
    { name: 'Breakfast', icon: '🍳', id: 'Breakfast' },
    { name: 'Lunch', icon: '🥗', id: 'Lunch' },
    { name: 'Snacks', icon: '🍕', id: 'Snacks' },
    { name: 'Dinner', icon: '🍽️', id: 'Dinner' },
    { name: 'Drinks', icon: '🥤', id: 'Drinks' },
    { name: 'Desserts', icon: '🍰', id: 'Desserts' }
  ];

  const popularFoods = foodData.filter(food => food.isPopular);
  
  // Filter food data based on selected category and search query
  const filteredFoodData = foodData.filter(food => {
    const matchesCategory = selectedCategory ? food.category === selectedCategory : true;
    const matchesSearch = searchQuery 
      ? food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        food.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        food.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });
  
  const filteredPopularFoods = popularFoods.filter(food => {
    const matchesCategory = selectedCategory ? food.category === selectedCategory : true;
    const matchesSearch = searchQuery 
      ? food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        food.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        food.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{getTimeBasedGreeting()}</h1>
            <div className="flex items-center text-gray-600 mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">LunchTime, Atlantis</span>
            </div>
          </div>
          <div className="bg-emerald-50 rounded-full p-2">
            <span className="text-2xl">👋</span>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for food..."
            className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Valentine's Day Promotion */}
      <div className="px-4 py-6">
        <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Special for Today</h3>
          <p className="text-sm opacity-90 mb-3">Get 25% off on all orders above R200</p>
          <button className="bg-white text-red-500 px-4 py-2 rounded-lg text-sm font-semibold">
            Order Now
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Categories</h2>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex-shrink-0 text-center cursor-pointer"
              onClick={() => onCategorySelect(category.id)}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-colors ${
                selectedCategory === category.id 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-emerald-50 hover:bg-emerald-100'
              }`}>
                <span className="text-2xl">{category.icon}</span>
              </div>
              <span className={`text-sm font-medium ${
                selectedCategory === category.id 
                  ? 'text-emerald-600' 
                  : 'text-gray-600'
              }`}>{category.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Food - Only show if no category is selected or if filtered popular foods exist */}
      {(!selectedCategory || filteredPopularFoods.length > 0) && !searchQuery && (
      <div className="px-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {selectedCategory ? `Popular ${selectedCategory}` : 'Popular Food'}
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {filteredPopularFoods.map((food) => (
            <div
              key={food.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onFoodClick(food)}
            >
              <div className="flex">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-24 h-24 object-cover"
                />
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg">{food.name}</h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(food);
                      }}
                      className="bg-emerald-500 text-white rounded-full p-1 hover:bg-emerald-600 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center mb-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{food.rating}</span>
                  </div>
                  <p className="text-emerald-600 font-semibold text-lg">R{food.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      )}

      {/* Food Items */}
      <div className="px-4 mt-8">
        {filteredFoodData.length > 0 ? (
          <>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {searchQuery 
                ? `Search Results for "${searchQuery}"` 
                : selectedCategory 
                  ? `${selectedCategory} Items` 
                  : 'All Items'
              }
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {filteredFoodData.map((food) => (
                <div
                  key={food.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onFoodClick(food)}
                >
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{food.name}</h3>
                    <div className="flex items-center mb-2">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600 ml-1">{food.rating}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-emerald-600 font-semibold">R{food.price}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(food);
                        }}
                        className="bg-emerald-500 text-white rounded-full p-1 hover:bg-emerald-600 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery 
                ? `No results found for "${searchQuery}"`
                : selectedCategory 
                  ? `No items found in ${selectedCategory} category`
                  : 'No items available'
              }
            </p>
            {(searchQuery || selectedCategory) && (
              <button
                onClick={() => {
                  onSearchChange('');
                  onCategorySelect(null);
                }}
                className="bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;