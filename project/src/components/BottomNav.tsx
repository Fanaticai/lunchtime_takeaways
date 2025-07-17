import React from 'react';
import { Home, ShoppingCart, Tag, User } from 'lucide-react';

interface BottomNavProps {
  activeItem: string;
  onNavigation: (item: string) => void;
  cartCount: number;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeItem, onNavigation, cartCount }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'cart', icon: ShoppingCart, label: 'Cart' },
    //{ id: 'offers', icon: Tag, label: 'Offers' },
    //{ id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 px-2 py-3">
          <div className="flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigation(item.id)}
                  className={`flex-1 flex flex-col items-center justify-center py-2 relative rounded-xl transition-all duration-200 ${
                  isActive ? 'text-emerald-600' : 'text-gray-400'
                  } ${isActive ? 'bg-emerald-50' : 'hover:bg-gray-50'}`}
              >
                <div className="relative">
                  <Icon className={`w-6 h-6 ${isActive ? 'text-emerald-600' : 'text-gray-400'}`} />
                  {item.id === 'cart' && cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                      {cartCount}
                    </span>
                  )}
                </div>
                  <span className={`text-xs mt-1 font-medium ${isActive ? 'text-emerald-600' : 'text-gray-400'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;