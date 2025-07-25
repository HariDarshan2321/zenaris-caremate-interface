import React, { useState, useEffect } from 'react';
import { validateAdditionalConsiderations } from '../utils';

interface AdditionalConsiderationsProps {
  value: string;
  onChange: (value: string) => void;
}

export const AdditionalConsiderations: React.FC<AdditionalConsiderationsProps> = ({ value, onChange }) => {
  const [error, setError] = useState<string | null>(null);
  const [charCount, setCharCount] = useState(value.length);

  useEffect(() => {
    setCharCount(value.length);
    const validationError = validateAdditionalConsiderations(value);
    setError(validationError);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  const suggestions = [
    {
      category: "Texture Preferences",
      examples: [
        "Prefers soft foods due to dental issues",
        "Dislikes crunchy textures",
        "Enjoys smooth, pureed foods",
        "Needs foods cut into small pieces"
      ]
    },
    {
      category: "Temperature Preferences",
      examples: [
        "Prefers warm foods, not hot",
        "Enjoys room temperature beverages",
        "Dislikes very cold foods",
        "Needs time for food to cool down"
      ]
    },
    {
      category: "Cultural/Religious",
      examples: [
        "Follows kosher dietary laws",
        "Vegetarian by choice",
        "Halal requirements",
        "Traditional cultural foods preferred"
      ]
    },
    {
      category: "Medical Considerations",
      examples: [
        "Low sodium diet required",
        "Diabetic-friendly meals needed",
        "Soft diet due to swallowing difficulties",
        "Small frequent meals preferred"
      ]
    }
  ];

  return (
    <div className="card">
      <div className="section-header">
        <span className="text-2xl">📝</span>
        <span>Additional Considerations</span>
      </div>

      <p className="text-gray-600 mb-6">
        Add any special instructions, preferences, or considerations that don't fit in the other categories.
        This could include texture preferences, temperature preferences, cultural or religious restrictions,
        or any other important meal-related information.
      </p>

      {/* Suggestions */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-blue-900 mb-3">💡 Suggestion Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.map((suggestion) => (
            <div key={suggestion.category} className="bg-white rounded-lg p-3 border border-blue-200">
              <h4 className="font-medium text-gray-900 mb-2 text-sm">{suggestion.category}</h4>
              <ul className="space-y-1">
                {suggestion.examples.map((example, index) => (
                  <li key={index} className="text-xs text-gray-600 flex items-start gap-1">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Text area */}
      <div className="space-y-2">
        <label htmlFor="additional-considerations" className="block text-sm font-medium text-gray-700">
          Special Instructions and Preferences
        </label>
        <textarea
          id="additional-considerations"
          value={value}
          onChange={handleChange}
          className={`input-field min-h-32 resize-y ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
          placeholder="Enter any additional meal preferences, dietary restrictions, cultural considerations, texture preferences, or special instructions..."
          rows={6}
        />

        {/* Character count and error */}
        <div className="flex items-center justify-between text-sm">
          <div>
            {error && <span className="text-red-600">{error}</span>}
          </div>
          <span className={`${charCount > 450 ? 'text-red-600' : charCount > 400 ? 'text-orange-600' : 'text-gray-500'}`}>
            {charCount}/500 characters
          </span>
        </div>
      </div>

      {/* Quick add buttons */}
      {value.trim() === '' && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Add Common Considerations:</h4>
          <div className="flex flex-wrap gap-2">
            {[
              "Prefers soft foods",
              "Low sodium diet",
              "Small frequent meals",
              "Vegetarian",
              "Kosher",
              "Halal",
              "Diabetic-friendly",
              "No spicy foods"
            ].map((quickAdd) => (
              <button
                key={quickAdd}
                onClick={() => onChange(value ? `${value}\n• ${quickAdd}` : `• ${quickAdd}`)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
              >
                + {quickAdd}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Preview */}
      {value.trim() && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Preview:</h4>
          <div className="text-sm text-gray-600 whitespace-pre-wrap">{value}</div>
        </div>
      )}
    </div>
  );
};
