import React, { useState } from 'react';
import type { DislikedFood, FoodCategory, DislikeSeverity } from '../types';
import { FOOD_CATEGORIES, DISLIKE_SEVERITIES } from '../types';
import { createDislikedFood, validateFoodName, groupFoodsByCategory, getSeverityColor, formatSeverityLabel } from '../utils';
import { FoodItemComponent } from './FoodItemComponent';

interface DislikedFoodsProps {
  foods: DislikedFood[];
  onUpdate: (foods: DislikedFood[]) => void;
}

export const DislikedFoods: React.FC<DislikedFoodsProps> = ({ foods, onUpdate }) => {
  const [newFood, setNewFood] = useState({
    name: '',
    category: '',
    notes: '',
    severity: 'mild' as DislikeSeverity,
  });
  const [error, setError] = useState<string | null>(null);
  const [groupByCategory, setGroupByCategory] = useState(false);

  const handleAdd = () => {
    const nameError = validateFoodName(newFood.name);
    if (nameError) {
      setError(nameError);
      return;
    }

    const foodItem = createDislikedFood(
      newFood.name,
      newFood.severity,
      newFood.category as FoodCategory || undefined,
      newFood.notes || undefined
    );

    onUpdate([...foods, foodItem]);
    setNewFood({ name: '', category: '', notes: '', severity: 'mild' });
    setError(null);
  };

  const handleUpdate = (updatedItem: DislikedFood) => {
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

  const SeverityBadge: React.FC<{ severity: DislikeSeverity }> = ({ severity }) => {
    const severityInfo = DISLIKE_SEVERITIES.find(s => s.value === severity);
    const colorClass = `severity-${getSeverityColor(severity)}`;

    return (
      <span className={`severity-badge ${colorClass}`} title={severityInfo?.description}>
        {formatSeverityLabel(severity)}
      </span>
    );
  };

  const SeveritySelector: React.FC<{ value: DislikeSeverity; onChange: (value: DislikeSeverity) => void }> = ({ value, onChange }) => (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as DislikeSeverity)}
      className="input-field"
    >
      {DISLIKE_SEVERITIES.map((severity) => (
        <option key={severity.value} value={severity.value}>
          {severity.label}
        </option>
      ))}
    </select>
  );

  return (
    <div className="card">
      <div className="section-header">
        <span className="text-2xl">👎</span>
        <span>Disliked Foods</span>
        <span className="text-sm font-normal text-gray-500 ml-2">
          ({foods.length} item{foods.length !== 1 ? 's' : ''})
        </span>
      </div>

      <p className="text-gray-600 mb-6">
        Add foods that the elderly person dislikes or prefers to avoid. Include severity levels to help caregivers understand preferences.
      </p>

      {/* Add new food form */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-gray-900 mb-3">Add Disliked Food</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <input
              type="text"
              value={newFood.name}
              onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
              onKeyPress={handleKeyPress}
              className="input-field"
              placeholder="Food name (e.g., Brussels sprouts)"
            />
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
          </div>
          <SeveritySelector
            value={newFood.severity}
            onChange={(severity) => setNewFood({ ...newFood, severity })}
          />
          <select
            value={newFood.category}
            onChange={(e) => setNewFood({ ...newFood, category: e.target.value })}
            className="input-field"
          >
            <option value="">Select category (optional)</option>
            {FOOD_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={newFood.notes}
            onChange={(e) => setNewFood({ ...newFood, notes: e.target.value })}
            className="input-field"
            placeholder="Notes (optional)"
          />
        </div>
        <button
          onClick={handleAdd}
          disabled={!newFood.name.trim()}
          className="btn-primary mt-3"
        >
          Add Disliked Food
        </button>
      </div>

      {/* View options */}
      {foods.length > 0 && (
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={groupByCategory}
              onChange={(e) => setGroupByCategory(e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700">Group by category</span>
          </label>
        </div>
      )}

      {/* Foods list */}
      {foods.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <span className="text-4xl mb-2 block">👎</span>
          <p>No disliked foods added yet</p>
          <p className="text-sm">Add foods the person prefers to avoid</p>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedFoods).map(([category, categoryFoods]) => (
            <div key={category}>
              {groupByCategory && category !== 'all' && (
                <h4 className="font-medium text-gray-900 mb-2 capitalize">
                  {FOOD_CATEGORIES.find(cat => cat.value === category)?.label || category}
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    ({categoryFoods.length})
                  </span>
                </h4>
              )}
              <div className="space-y-2">
                {categoryFoods.map((food) => (
                  <FoodItemComponent
                    key={food.id}
                    item={food}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    showCategory={!groupByCategory}
                    additionalFields={
                      <div className="mt-2">
                        <SeverityBadge severity={food.severity} />
                      </div>
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
