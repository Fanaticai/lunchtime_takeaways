import React from 'react';
import { Utensils } from 'lucide-react';

interface SplashScreenProps {
  onStart: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center px-6">
      <div className="text-center">
        <div className="bg-white rounded-full p-6 mb-8 mx-auto w-24 h-24 flex items-center justify-center shadow-lg">
          <Utensils className="w-12 h-12 text-emerald-500" />
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-2">Lunch Time Cafe</h1>
        <p className="text-emerald-100 text-lg mb-12">
          Delicious food, freshly made!
        </p>
        
        <button
          onClick={onStart}
          className="bg-white text-emerald-600 font-semibold py-4 px-8 rounded-full text-lg shadow-lg hover:bg-gray-50 transition-colors duration-200 active:scale-95"
        >
          Start Ordering
        </button>
      </div>
    </div>
  );
};

export default SplashScreen;