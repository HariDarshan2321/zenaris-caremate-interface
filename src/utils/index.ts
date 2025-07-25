import type { FoodItem, DislikedFood, AllergyIntolerance, MealPreferences, FoodCategory, DislikeSeverity, AllergySeverity } from '../types';

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const createFoodItem = (name: string, category?: FoodCategory, notes?: string): FoodItem => ({
  id: generateId(),
  name: name.trim(),
  category,
  notes: notes?.trim(),
});

export const createDislikedFood = (
  name: string,
  severity: DislikeSeverity,
  category?: FoodCategory,
  notes?: string
): DislikedFood => ({
  ...createFoodItem(name, category, notes),
  severity,
});

export const createAllergyIntolerance = (
  name: string,
  severity: AllergySeverity,
  type: 'allergy' | 'intolerance',
  category?: FoodCategory,
  notes?: string
): AllergyIntolerance => ({
  ...createFoodItem(name, category, notes),
  severity,
  type,
});

export const validateFoodName = (name: string): string | null => {
  const trimmed = name.trim();
  if (!trimmed) {
    return 'Food name is required';
  }
  if (trimmed.length < 2) {
    return 'Food name must be at least 2 characters';
  }
  if (trimmed.length > 50) {
    return 'Food name must be less than 50 characters';
  }
  return null;
};

export const validateAdditionalConsiderations = (text: string): string | null => {
  if (text.length > 500) {
    return 'Additional considerations must be less than 500 characters';
  }
  return null;
};

export const exportMealPreferences = (preferences: MealPreferences): string => {
  return JSON.stringify(preferences, null, 2);
};

export const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case 'mild':
      return 'yellow';
    case 'moderate':
    case 'strong':
      return 'orange';
    case 'severe':
    case 'absolute':
      return 'red';
    case 'life-threatening':
      return 'red';
    default:
      return 'gray';
  }
};

export const formatSeverityLabel = (severity: string): string => {
  return severity
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const groupFoodsByCategory = <T extends FoodItem>(foods: T[]): Record<string, T[]> => {
  return foods.reduce((groups, food) => {
    const category = food.category || 'other';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(food);
    return groups;
  }, {} as Record<string, T[]>);
};

export const searchFoods = <T extends FoodItem>(foods: T[], query: string): T[] => {
  if (!query.trim()) return foods;

  const lowercaseQuery = query.toLowerCase().trim();
  return foods.filter(food =>
    food.name.toLowerCase().includes(lowercaseQuery) ||
    food.category?.toLowerCase().includes(lowercaseQuery) ||
    food.notes?.toLowerCase().includes(lowercaseQuery)
  );
};
