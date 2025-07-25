import React, { useState } from 'react';
import type { AllergyIntolerance, FoodCategory, AllergySeverity } from '../types';
import { FOOD_CATEGORIES, ALLERGY_SEVERITIES, COMMON_ALLERGIES } from '../types';
import { createAllergyIntolerance, validateFoodName, groupFoodsByCategory, getSeverityColor, formatSeverityLabel } from '../utils';
import { FoodItemComponent } from './FoodItemComponent';

interface AllergiesIntolerancesProps {
  items: AllergyIntolerance[];
  onUpdate: (items: AllergyIntolerance[]) => void;
}

export const AllergiesIntolerances: React.FC<AllergiesIntolerancesProps> = ({ items, onUpdate }) => {
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    notes: '',
    severity: 'mild' as AllergySeverity,
    type: 'allergy' as 'allergy' | 'intolerance',
  });
  const [error, setError] = useState<string | null>(null);
  const [groupByCategory, setGroupByCategory] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(true);

  const handleAdd = () => {
    const nameError = validateFoodName(newItem.name);
    if (nameError) {
      setError(nameError);
      return;
    }

    const allergyItem = createAllergyIntolerance(
      newItem.name,
      newItem.severity,
      newItem.type,
      newItem.category as FoodCategory || undefined,
      newItem.notes || undefined
    );

    onUpdate([...items, allergyItem]);
    setNewItem({ name: '', category: '', notes: '', severity: 'mild', type: 'allergy' });
    setError(null);
  };

  const handleQuickAdd = (commonAllergy: typeof COMMON_ALLERGIES[0]) => {
    const allergyItem = createAllergyIntolerance(
      commonAllergy.name,
      'moderate',
      'allergy',
      undefined,
      undefined
    );

    onUpdate([...items, allergyItem]);
  };

  const handleUpdate = (updatedItem: AllergyIntolerance) => {
    onUpdate(items.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const handleDelete = (id: string) => {
    onUpdate(items.filter(item => item.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newItem.name.trim()) {
      handleAdd();
    }
  };

  const groupedItems = groupByCategory ? groupFoodsByCategory(items) : { all: items };

  const SeverityBadge: React.FC<{ severity: AllergySeverity; type: 'allergy' | 'intolerance' }> = ({ severity, type }) => {
    const severityInfo = ALLERGY_SEVERITIES.find(s => s.value === severity);
    const colorClass = `severity-${getSeverityColor(severity)}`;

    return (
      <div className="flex items-center gap-2">
        <span className={`severity-badge ${colorClass}`} title={severityInfo?.description}>
          {formatSeverityLabel(severity)}
        </span>
        <span className={`text-xs px-2 py-1 rounded ${type === 'allergy' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
          {type === 'allergy' ? '🚨 Allergy' : '⚠️ Intolerance'}
        </span>
      </div>
    );
  };

  const availableCommonAllergies = COMMON_ALLERGIES.filter(
    common => !items.some(item => item.name.toLowerCase() === common.name.toLowerCase())
  );

  return (
    <div className="card border-red-200 bg-red-50">
      <div className="section-header text-red-900">
        <span className="text-2xl">🚨</span>
        <span>Food Allergies & Intolerances</span>
        <span className="text-sm font-normal text-red-600 ml-2">
          ({items.length} item{items.length !== 1 ? 's' : ''})
        </span>
      </div>

      <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <span className="text-red-600 text-xl">⚠️</span>
          <div>
            <h3 className="font-semibold text-red-900 mb-1">Critical Medical Information</h3>
            <p className="text-red-800 text-sm">
              This section contains vital medical information about food allergies and intolerances.
              Ensure all caregivers are aware of these restrictions to prevent serious health complications.
            </p>
          </div>
        </div>
      </div>

      {/* Quick add common allergies */}
      {showQuickAdd && availableCommonAllergies.length > 0 && (
        <div className="bg-white rounded-lg p-4 mb-6 border border-red-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900">Quick Add Common Allergies</h3>
            <button
              onClick={() => setShowQuickAdd(false)}
              className="text-gray-400 hover:text-gray-600 text-sm"
            >
              Hide
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {availableCommonAllergies.map((allergy) => (
              <button
                key={allergy.id}
                onClick={() => handleQuickAdd(allergy)}
                className="text-left p-2 text-sm border border-gray-200 rounded hover:bg-gray-50 hover:border-red-300 transition-colors"
              >
                {allergy.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add new item form */}
      <div className="bg-white rounded-lg p-4 mb-6 border border-red-200">
        <h3 className="font-medium text-gray-900 mb-3">Add Allergy or Intolerance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          <div>
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              onKeyPress={handleKeyPress}
              className="input-field"
              placeholder="Food name (e.g., Peanuts)"
            />
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
          </div>
          <select
            value={newItem.type}
            onChange={(e) => setNewItem({ ...newItem, type: e.target.value as 'allergy' | 'intolerance' })}
            className="input-field"
          >
            <option value="allergy">Allergy</option>
            <option value="intolerance">Intolerance</option>
          </select>
          <select
            value={newItem.severity}
            onChange={(e) => setNewItem({ ...newItem, severity: e.target.value as AllergySeverity })}
            className="input-field"
          >
            {ALLERGY_SEVERITIES.map((severity) => (
              <option key={severity.value} value={severity.value}>
                {severity.label}
              </option>
            ))}
          </select>
          <select
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            className="input-field"
          >
            <option value="">Category (optional)</option>
            {FOOD_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={newItem.notes}
            onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
            className="input-field"
            placeholder="Notes (optional)"
          />
        </div>
        <button
          onClick={handleAdd}
          disabled={!newItem.name.trim()}
          className="btn-danger mt-3"
        >
          Add {newItem.type === 'allergy' ? 'Allergy' : 'Intolerance'}
        </button>
      </div>

      {/* View options */}
      {items.length > 0 && (
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={groupByCategory}
              onChange={(e) => setGroupByCategory(e.target.checked)}
              className="rounded border-gray-300 text-red-600 focus:ring-red-500"
            />
            <span className="text-sm text-gray-700">Group by category</span>
          </label>
          {!showQuickAdd && availableCommonAllergies.length > 0 && (
            <button
              onClick={() => setShowQuickAdd(true)}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Show quick add
            </button>
          )}
        </div>
      )}

      {/* Items list */}
      {items.length === 0 ? (
        <div className="text-center py-8 text-gray-500 bg-white rounded-lg border border-red-200">
          <span className="text-4xl mb-2 block">🚨</span>
          <p>No allergies or intolerances added yet</p>
          <p className="text-sm">Add any food allergies or intolerances for safety</p>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedItems).map(([category, categoryItems]) => (
            <div key={category}>
              {groupByCategory && category !== 'all' && (
                <h4 className="font-medium text-gray-900 mb-2 capitalize">
                  {FOOD_CATEGORIES.find(cat => cat.value === category)?.label || category}
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    ({categoryItems.length})
                  </span>
                </h4>
              )}
              <div className="space-y-2">
                {categoryItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg border border-red-200">
                    <FoodItemComponent
                      item={item}
                      onUpdate={handleUpdate}
                      onDelete={handleDelete}
                      showCategory={!groupByCategory}
                      additionalFields={
                        <div className="mt-2">
                          <SeverityBadge severity={item.severity} type={item.type} />
                        </div>
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
