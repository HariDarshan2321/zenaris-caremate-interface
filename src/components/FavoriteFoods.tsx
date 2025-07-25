import React, { useState } from 'react';
import type { FoodItem, FoodCategory } from '../types';
import { FOOD_CATEGORIES } from '../types';
import { createFoodItem, validateFoodName, groupFoodsByCategory } from '../utils';
import { FoodItemComponent } from './FoodItemComponent';

interface FavoriteFoodsProps {
  foods: FoodItem[];
  onUpdate: (foods: FoodItem[]) => void;
}

export const FavoriteFoods: React.FC<FavoriteFoodsProps> = ({ foods, onUpdate }) => {
  const [newFood, setNewFood] = useState({
    name: '',
    category: '',
    notes: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [groupByCategory, setGroupByCategory] = useState(false);

  const handleAdd = () => {
    const nameError = validateFoodName(newFood.name);
    if (nameError) {
      setError(nameError);
      return;
    }

    const foodItem = createFoodItem(
      newFood.name,
      newFood.category as FoodCategory || undefined,
      newFood.notes || undefined
    );

    onUpdate([...foods, foodItem]);
    setNewFood({ name: '', category: '', notes: '' });
    setError(null);
  };

  const handleUpdate = (updatedItem: FoodItem) => {
    onUpdate(foods.map(food => food.id === updatedItem.id ? updatedItem : food));
  };

  const handleDelete = (id: string) => {
    onUpdate(foods.filter(food => food.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newFood.name.trim()) {
      handleAdd();
    }
  };

  const groupedFoods = groupByCategory ? groupFoodsByCategory(foods) : { all: foods };

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-green-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-8 py-6 border-b border-green-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">🍽️</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Foods They Love</h3>
              <p className="text-sm text-gray-600">
                {foods.length === 0 ? "Let's start with their favorites" : `${foods.length} favorite${foods.length !== 1 ? 's' : ''} added`}
              </p>
            </div>
          </div>
          {foods.length > 0 && (
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{foods.length}</div>
              <div className="text-xs text-gray-500">items</div>
            </div>
          )}
        </div>
      </div>

      <div className="p-8">
        <div className="mb-6">
          <p className="text-gray-700 text-center max-w-md mx-auto">
            Think about meals that always make them smile. What foods bring them comfort and joy?
          </p>
        </div>

        {/* Add new food form */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-6 border border-green-100">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-lg">➕</span>
            Add a Favorite Food
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What food do they love?
              </label>
              <input
                type="text"
                value={newFood.name}
                onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                onKeyPress={handleKeyPress}
                className="input-field text-lg"
                placeholder="e.g., Grandma's apple pie, Chicken noodle soup..."
              />
              {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meal type (optional)
                </label>
                <select
                  value={newFood.category}
                  onChange={(e) => setNewFood({ ...newFood, category: e.target.value })}
                  className="input-field"
                >
                  <option value="">Choose when they enjoy this...</option>
                  {FOOD_CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Special notes (optional)
                </label>
                <input
                  type="text"
                  value={newFood.notes}
                  onChange={(e) => setNewFood({ ...newFood, notes: e.target.value })}
                  className="input-field"
                  placeholder="e.g., Extra crispy, No onions..."
                />
              </div>
            </div>

            <button
              onClick={handleAdd}
              disabled={!newFood.name.trim()}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              ✨ Add This Favorite
            </button>
          </div>
        </div>

        {/* View options */}
        {foods.length > 0 && (
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={groupByCategory}
                onChange={(e) => setGroupByCategory(e.target.checked)}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">Group by meal type</span>
            </label>
          </div>
        )}

        {/* Foods list */}
        {foods.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🍽️</span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Ready to start?</h4>
            <p className="text-gray-600 max-w-sm mx-auto">
              Add their first favorite food above. Think about what always makes them happy at mealtime.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedFoods).map(([category, categoryFoods]) => (
              <div key={category}>
                {groupByCategory && category !== 'all' && (
                  <div className="flex items-center gap-2 mb-3">
                    <h4 className="font-semibold text-gray-900 text-lg">
                      {FOOD_CATEGORIES.find(cat => cat.value === category)?.label || category}
                    </h4>
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                      {categoryFoods.length} item{categoryFoods.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                )}
                <div className="space-y-3">
                  {categoryFoods.map((food) => (
                    <div key={food.id} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                      <FoodItemComponent
                        item={food}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                        showCategory={!groupByCategory}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
