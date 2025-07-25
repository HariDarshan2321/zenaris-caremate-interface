export interface FoodItem {
  id: string;
  name: string;
  category?: FoodCategory;
  notes?: string;
}

export interface DislikedFood extends FoodItem {
  severity: DislikeSeverity;
}

export interface AllergyIntolerance extends FoodItem {
  severity: AllergySeverity;
  type: 'allergy' | 'intolerance';
}

export type FoodCategory = 'breakfast' | 'lunch' | 'dinner' | 'snacks' | 'beverages' | 'other';

export type DislikeSeverity = 'mild' | 'strong' | 'absolute';

export type AllergySeverity = 'mild' | 'moderate' | 'severe' | 'life-threatening';

export interface MealPreferences {
  favoriteFoods: FoodItem[];
  dislikedFoods: DislikedFood[];
  allergiesIntolerances: AllergyIntolerance[];
  additionalConsiderations: string;
}

export interface CommonAllergy {
  id: string;
  name: string;
  category: string;
}

export const COMMON_ALLERGIES: CommonAllergy[] = [
  { id: 'nuts', name: 'Tree Nuts', category: 'nuts' },
  { id: 'peanuts', name: 'Peanuts', category: 'nuts' },
  { id: 'dairy', name: 'Dairy/Milk', category: 'dairy' },
  { id: 'eggs', name: 'Eggs', category: 'protein' },
  { id: 'fish', name: 'Fish', category: 'protein' },
  { id: 'shellfish', name: 'Shellfish', category: 'protein' },
  { id: 'soy', name: 'Soy', category: 'protein' },
  { id: 'wheat', name: 'Wheat/Gluten', category: 'grains' },
  { id: 'sesame', name: 'Sesame', category: 'seeds' },
  { id: 'sulfites', name: 'Sulfites', category: 'additives' },
  { id: 'lactose', name: 'Lactose', category: 'dairy' },
  { id: 'fructose', name: 'Fructose', category: 'sugars' },
];

export const FOOD_CATEGORIES: { value: FoodCategory; label: string }[] = [
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' },
  { value: 'snacks', label: 'Snacks' },
  { value: 'beverages', label: 'Beverages' },
  { value: 'other', label: 'Other' },
];

export const DISLIKE_SEVERITIES: { value: DislikeSeverity; label: string; description: string }[] = [
  { value: 'mild', label: 'Mild Dislike', description: 'Will eat if necessary' },
  { value: 'strong', label: 'Strong Dislike', description: 'Prefers to avoid' },
  { value: 'absolute', label: 'Absolutely Won\'t Eat', description: 'Refuses completely' },
];

export const ALLERGY_SEVERITIES: { value: AllergySeverity; label: string; description: string; color: string }[] = [
  { value: 'mild', label: 'Mild', description: 'Minor discomfort', color: 'yellow' },
  { value: 'moderate', label: 'Moderate', description: 'Noticeable symptoms', color: 'orange' },
  { value: 'severe', label: 'Severe', description: 'Serious reaction', color: 'red' },
  { value: 'life-threatening', label: 'Life-Threatening', description: 'Emergency medical attention required', color: 'red' },
];
