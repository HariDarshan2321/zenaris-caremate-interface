import React, { useState } from 'react';
import { BrainIcon, CloseIcon, LightbulbIcon } from './Icons';

interface SmartSuggestionsProps {
  onSuggestionSelect: (suggestion: string, type: 'favorite' | 'dislike' | 'allergy') => void;
}

export const SmartSuggestions: React.FC<SmartSuggestionsProps> = ({ onSuggestionSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const suggestions = {
    comfort: ['Chicken soup', 'Mashed potatoes', 'Apple pie', 'Hot tea', 'Oatmeal'],
    cultural: ['Rice dishes', 'Pasta', 'Bread', 'Traditional stews', 'Herbal teas'],
    texture: ['Soft foods', 'Pureed vegetables', 'Smooth yogurt', 'Tender meats'],
    common_dislikes: ['Spicy foods', 'Raw vegetables', 'Tough meats', 'Very cold foods'],
    allergies: ['Nuts', 'Dairy', 'Gluten', 'Shellfish', 'Eggs']
  };

  if (!isExpanded) {
    return (
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100 mb-6">
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 text-purple-700 hover:text-purple-800 transition-colors"
        >
          <BrainIcon size={20} className="text-purple-600" />
          <span className="font-medium">Need inspiration? Get smart suggestions</span>
          <span className="text-sm">→</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BrainIcon size={20} className="text-purple-600" />
          <h4 className="font-semibold text-gray-900">Smart Suggestions</h4>
        </div>
        <button
          onClick={() => setIsExpanded(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <CloseIcon size={16} className="text-current" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <h5 className="text-sm font-medium text-gray-700 mb-2">💝 Comfort Foods</h5>
          <div className="flex flex-wrap gap-2">
            {suggestions.comfort.map((item) => (
              <button
                key={item}
                onClick={() => onSuggestionSelect(item, 'favorite')}
                className="text-xs bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-full transition-colors"
              >
                + {item}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium text-gray-700 mb-2">🌍 Cultural Favorites</h5>
          <div className="flex flex-wrap gap-2">
            {suggestions.cultural.map((item) => (
              <button
                key={item}
                onClick={() => onSuggestionSelect(item, 'favorite')}
                className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-full transition-colors"
              >
                + {item}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium text-gray-700 mb-2">⚠️ Common Dislikes</h5>
          <div className="flex flex-wrap gap-2">
            {suggestions.common_dislikes.map((item) => (
              <button
                key={item}
                onClick={() => onSuggestionSelect(item, 'dislike')}
                className="text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-3 py-1 rounded-full transition-colors"
              >
                + {item}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h5 className="text-sm font-medium text-gray-700 mb-2">🚨 Common Allergies</h5>
          <div className="flex flex-wrap gap-2">
            {suggestions.allergies.map((item) => (
              <button
                key={item}
                onClick={() => onSuggestionSelect(item, 'allergy')}
                className="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-full transition-colors"
              >
                + {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-white/60 rounded-lg">
        <p className="text-xs text-gray-600 italic flex items-center gap-2">
          <LightbulbIcon size={14} className="text-yellow-500" />
          These suggestions are based on common preferences for elderly individuals. Click any item to add it quickly!
        </p>
      </div>
    </div>
  );
};
