import React, { useState } from 'react';
import type { MealPreferences } from '../types';

interface MealPlanningAssistantProps {
  preferences: MealPreferences;
}

export const MealPlanningAssistant: React.FC<MealPlanningAssistantProps> = ({ preferences }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedMealTime, setSelectedMealTime] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast');

  const generateMealSuggestions = (mealTime: string) => {
    const suggestions = {
      breakfast: [
        'Oatmeal with soft fruits',
        'Scrambled eggs (soft)',
        'Toast with butter',
        'Yogurt with honey',
        'Warm milk with cereal'
      ],
      lunch: [
        'Chicken soup with soft vegetables',
        'Mashed potatoes with gravy',
        'Soft pasta with mild sauce',
        'Tender fish with rice',
        'Vegetable puree'
      ],
      dinner: [
        'Slow-cooked stew',
        'Baked chicken (tender)',
        'Soft rice dishes',
        'Steamed vegetables',
        'Comfort casseroles'
      ],
      snack: [
        'Soft fruits',
        'Pudding or custard',
        'Warm tea with biscuits',
        'Smooth ice cream',
        'Applesauce'
      ]
    };

    return suggestions[mealTime as keyof typeof suggestions] || [];
  };

  const getPersonalizedTips = () => {
    const tips = [];

    if (preferences.allergiesIntolerances.length > 0) {
      tips.push({
        icon: '🚨',
        title: 'Safety First',
        content: `Always check ingredients for ${preferences.allergiesIntolerances.map(a => a.name).join(', ')} before preparing meals.`
      });
    }

    if (preferences.dislikedFoods.some(food => food.severity === 'absolute')) {
      tips.push({
        icon: '⚠️',
        title: 'Avoid Completely',
        content: 'Some foods are marked as "absolutely won\'t eat" - respect these preferences for better meal acceptance.'
      });
    }

    if (preferences.additionalConsiderations.toLowerCase().includes('soft')) {
      tips.push({
        icon: '🥄',
        title: 'Texture Matters',
        content: 'Focus on soft, easy-to-chew foods. Consider pureeing or mashing when needed.'
      });
    }

    if (tips.length === 0) {
      tips.push({
        icon: '💡',
        title: 'General Tip',
        content: 'Keep meals colorful, nutritious, and at comfortable temperatures for the best dining experience.'
      });
    }

    return tips;
  };

  if (!isExpanded) {
    return (
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 border border-indigo-100 mb-6">
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 text-indigo-700 hover:text-indigo-800 transition-colors"
        >
          <span className="text-lg">🍳</span>
          <span className="font-medium">Get personalized meal planning tips</span>
          <span className="text-sm">→</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">🍳</span>
          <h4 className="font-semibold text-gray-900">Meal Planning Assistant</h4>
        </div>
        <button
          onClick={() => setIsExpanded(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Meal Suggestions */}
        <div>
          <h5 className="font-medium text-gray-900 mb-3">🍽️ Meal Ideas</h5>
          <div className="flex gap-2 mb-3">
            {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((meal) => (
              <button
                key={meal}
                onClick={() => setSelectedMealTime(meal)}
                className={`text-xs px-3 py-1 rounded-full transition-colors ${
                  selectedMealTime === meal
                    ? 'bg-indigo-200 text-indigo-800'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {meal.charAt(0).toUpperCase() + meal.slice(1)}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            {generateMealSuggestions(selectedMealTime).map((suggestion, index) => (
              <div key={index} className="bg-white/60 rounded-lg p-2">
                <span className="text-sm text-gray-700">• {suggestion}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Personalized Tips */}
        <div>
          <h5 className="font-medium text-gray-900 mb-3">💡 Personalized Tips</h5>
          <div className="space-y-3">
            {getPersonalizedTips().map((tip, index) => (
              <div key={index} className="bg-white/60 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <span className="text-sm">{tip.icon}</span>
                  <div>
                    <h6 className="text-sm font-medium text-gray-900">{tip.title}</h6>
                    <p className="text-xs text-gray-600 mt-1">{tip.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {preferences.favoriteFoods.length > 0 && (
        <div className="mt-4 p-3 bg-white/60 rounded-lg">
          <p className="text-xs text-gray-600">
            <span className="font-medium">Based on their favorites:</span> Try incorporating{' '}
            {preferences.favoriteFoods.slice(0, 3).map(f => f.name).join(', ')} into different meals for variety!
          </p>
        </div>
      )}
    </div>
  );
};
