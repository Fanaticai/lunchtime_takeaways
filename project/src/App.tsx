import React, { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import HomePage from './components/HomePage';
import FoodDetailPage from './components/FoodDetailPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import BottomNav from './components/BottomNav';

export interface FoodItem {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  description: string;
  isPopular?: boolean;
}

export interface CartItem extends FoodItem {
  quantity: number;
}

export interface Order {
  name: string;
  phone: string;
  address: string;
  notes: string;
  isDelivery: boolean;
  //isDelivery: boolean;
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'home' | 'detail' | 'cart' | 'checkout'>('splash');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeNavItem, setActiveNavItem] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const mockFoodData: FoodItem[] = [
    {
      id: 1,
      name: "Grilled Chicken Salad",
      price: 12.99,
      image: "https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.5,
      category: "Lunch",
      description: "Fresh mixed greens with grilled chicken, cherry tomatoes, and balsamic vinaigrette. A healthy and delicious meal perfect for lunch.",
      isPopular: true
    },
    {
      id: 2,
      name: "Margherita Pizza",
      price: 15.99,
      image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      category: "Dinner",
      description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil. Made with our signature wood-fired oven.",
      isPopular: true
    },
    {
      id: 3,
      name: "Avocado Toast",
      price: 8.99,
      image: "https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.2,
      category: "Breakfast",
      description: "Toasted sourdough bread topped with fresh avocado, cherry tomatoes, and a drizzle of olive oil.",
      isPopular: true
    },
    {
      id: 4,
      name: "Chocolate Brownie",
      price: 6.99,
      image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.7,
      category: "Snacks",
      description: "Rich, fudgy chocolate brownie served warm with vanilla ice cream and chocolate sauce.",
      isPopular: false
    },
    {
      id: 5,
      name: "Caesar Salad",
      price: 10.99,
      image: "https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.3,
      category: "Lunch",
      description: "Crisp romaine lettuce with parmesan cheese, croutons, and our signature Caesar dressing.",
      isPopular: false
    },
    {
      id: 6,
      name: "Berry Smoothie",
      price: 5.99,
      image: "https://images.pexels.com/photos/775032/pexels-photo-775032.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.4,
      category: "Breakfast",
      description: "Refreshing blend of mixed berries, banana, and yogurt. Perfect for a healthy start to your day.",
      isPopular: false
    },
    {
      id: 7,
      name: "Berry Smoothie",
      price: 5.99,
      image: "https://images.pexels.com/photos/775032/pexels-photo-775032.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.4,
      category: "Breakfast",
      description: "Refreshing blend of mixed berries, banana, and yogurt. Perfect for a healthy start to your day.",
      isPopular: false
    }
  ];

  const addToCart = (food: FoodItem, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === food.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...food, quantity }];
    });
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== id));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleNavigation = (screen: string) => {
    setActiveNavItem(screen);
    switch (screen) {
      case 'home':
        setCurrentScreen('home');
        break;
      case 'cart':
        setCurrentScreen('cart');
        break;
      case 'offers':
        setCurrentScreen('home');
        break;
      case 'profile':
        setCurrentScreen('home');
        break;
    }
  };

  const showFoodDetail = (food: FoodItem) => {
    setSelectedFood(food);
    setCurrentScreen('detail');
  };

  const goToCheckout = () => {
    setCurrentScreen('checkout');
  };

  const placeOrder = (orderDetails: Order) => {
    // Handle order placement logic here
    console.log('Order placed:', orderDetails, cart);
    setCart([]);
    setCurrentScreen('home');
  };

  if (currentScreen === 'splash') {
    return <SplashScreen onStart={() => setCurrentScreen('home')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen relative">
        {currentScreen === 'home' && (
          <HomePage
            foodData={mockFoodData}
            onFoodClick={showFoodDetail}
            onAddToCart={addToCart}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        )}
        {currentScreen === 'detail' && selectedFood && (
          <FoodDetailPage
            food={selectedFood}
            onBack={() => setCurrentScreen('home')}
            onAddToCart={addToCart}
          />
        )}
        {currentScreen === 'cart' && (
          <CartPage
            cartItems={cart}
            onUpdateQuantity={updateCartQuantity}
            onCheckout={goToCheckout}
            onBack={() => setCurrentScreen('home')}
            totalPrice={getTotalPrice()}
          />
        )}
        {currentScreen === 'checkout' && (
          <CheckoutPage
            onBack={() => setCurrentScreen('cart')}
            onPlaceOrder={placeOrder}
            totalPrice={getTotalPrice()}
            cartItems={cart}
          />
        )}
        <BottomNav
          activeItem={activeNavItem}
          onNavigation={handleNavigation}
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        />
      </div>
    </div>
  );
}

export default App;