import React, { useState } from 'react';
import type { FoodItem, FoodCategory } from '../types';
import { FOOD_CATEGORIES } from '../types';
import { validateFoodName } from '../utils';

interface FoodItemComponentProps<T extends FoodItem = FoodItem> {
  item: T;
  onUpdate: (item: T) => void;
  onDelete: (id: string) => void;
  showCategory?: boolean;
  additionalFields?: React.ReactNode;
}

export const FoodItemComponent = <T extends FoodItem = FoodItem>({
  item,
  onUpdate,
  onDelete,
  showCategory = true,
  additionalFields,
}: FoodItemComponentProps<T>) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: item.name,
    category: item.category || '',
    notes: item.notes || '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    const nameError = validateFoodName(editForm.name);
    if (nameError) {
      setError(nameError);
      return;
    }

    onUpdate({
      ...item,
      name: editForm.name.trim(),
      category: editForm.category as FoodCategory || undefined,
      notes: editForm.notes.trim() || undefined,
    } as T);
    setIsEditing(false);
    setError(null);
  };

  const handleCancel = () => {
    setEditForm({
      name: item.name,
      category: item.category || '',
      notes: item.notes || '',
    });
    setIsEditing(false);
    setError(null);
  };

  if (isEditing) {
    return (
      <div className={`food-item food-item-editing`}>
        <div className="flex-1 space-y-3">
          <div>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              className="input-field"
              placeholder="Food name"
              autoFocus
            />
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
          </div>

          {showCategory && (
            <select
              value={editForm.category}
              onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
              className="input-field"
            >
              <option value="">Select category (optional)</option>
              {FOOD_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          )}

          <input
            type="text"
            value={editForm.notes}
            onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
            className="input-field"
            placeholder="Notes (optional)"
          />

          {additionalFields}
        </div>

        <div className="flex gap-2 ml-4">
          <button onClick={handleSave} className="btn-success text-sm">
            Save
          </button>
          <button onClick={handleCancel} className="btn-secondary text-sm">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="food-item group">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-gray-900">{item.name}</span>
          {item.category && (
            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
              {FOOD_CATEGORIES.find(cat => cat.value === item.category)?.label || item.category}
            </span>
          )}
        </div>
        {item.notes && (
          <p className="text-sm text-gray-600">{item.notes}</p>
        )}
        {additionalFields}
      </div>

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={() => setIsEditing(true)}
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="text-red-600 hover:text-red-700 text-sm font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
