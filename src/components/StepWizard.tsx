import React, { useState } from 'react';
import type { MealPreferences } from '../types';
import { FavoriteFoods } from './FavoriteFoods';
import { DislikedFoods } from './DislikedFoods';
import { AllergiesIntolerances } from './AllergiesIntolerances';
import { AdditionalConsiderations } from './AdditionalConsiderations';
import { SmartSuggestions } from './SmartSuggestions';
import { MealPlanningAssistant } from './MealPlanningAssistant';
import { createFoodItem, createDislikedFood, createAllergyIntolerance } from '../utils';
import {
  HeartIcon,
  SmileIcon,
  ThinkingIcon,
  MedicalIcon,
  NotesIcon,
  CelebrationIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  BrainIcon
} from './Icons';

interface StepWizardProps {
  preferences: MealPreferences;
  onUpdate: (preferences: MealPreferences) => void;
  onExport: () => void;
  showExport: boolean;
}

const initialPreferences: MealPreferences = {
  favoriteFoods: [],
  dislikedFoods: [],
  allergiesIntolerances: [],
  additionalConsiderations: '',
};

const steps = [
  {
    id: 'welcome',
    title: 'Welcome',
    subtitle: 'Let\'s start this journey together',
    icon: HeartIcon,
    color: 'blue'
  },
  {
    id: 'favorites',
    title: 'Foods They Love',
    subtitle: 'What brings them joy at mealtime?',
    icon: SmileIcon,
    color: 'green'
  },
  {
    id: 'dislikes',
    title: 'Foods to Avoid',
    subtitle: 'What would they prefer not to eat?',
    icon: ThinkingIcon,
    color: 'yellow'
  },
  {
    id: 'medical',
    title: 'Medical Information',
    subtitle: 'Important allergies and intolerances',
    icon: MedicalIcon,
    color: 'red'
  },
  {
    id: 'additional',
    title: 'Special Notes',
    subtitle: 'Any other preferences or needs?',
    icon: NotesIcon,
    color: 'purple'
  },
  {
    id: 'summary',
    title: 'All Done!',
    subtitle: 'Review and share the preferences',
    icon: CelebrationIcon,
    color: 'indigo'
  }
];

export const StepWizard: React.FC<StepWizardProps> = ({ preferences, onUpdate, onExport, showExport }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showStartOverModal, setShowStartOverModal] = useState(false);

  const handleSuggestionSelect = (suggestion: string, type: 'favorite' | 'dislike' | 'allergy') => {
    if (type === 'favorite') {
      const newFood = createFoodItem(suggestion);
      onUpdate({
        ...preferences,
        favoriteFoods: [...preferences.favoriteFoods, newFood]
      });
    } else if (type === 'dislike') {
      const newDislike = createDislikedFood(suggestion, 'mild');
      onUpdate({
        ...preferences,
        dislikedFoods: [...preferences.dislikedFoods, newDislike]
      });
    } else if (type === 'allergy') {
      const newAllergy = createAllergyIntolerance(suggestion, 'moderate', 'allergy');
      onUpdate({
        ...preferences,
        allergiesIntolerances: [...preferences.allergiesIntolerances, newAllergy]
      });
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const handleStartOver = () => {
    setShowStartOverModal(true);
  };

  const confirmStartOver = () => {
    onUpdate(initialPreferences);
    setCurrentStep(0);
    setShowSuggestions(false);
    setShowStartOverModal(false);
  };

  const cancelStartOver = () => {
    setShowStartOverModal(false);
  };

  const getTotalItems = () => {
    return preferences.favoriteFoods.length +
           preferences.dislikedFoods.length +
           preferences.allergiesIntolerances.length;
  };

  const getStepProgress = () => {
    return Math.round(((currentStep + 1) / steps.length) * 100);
  };

  const renderStepContent = () => {
    const step = steps[currentStep];

    switch (step.id) {
      case 'welcome':
        return (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <HeartIcon size={48} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              You're doing something wonderful
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
              Taking time to document meal preferences shows how much you care. We'll guide you through this step by step - no rush, no pressure.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 max-w-md mx-auto mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">What we'll cover together:</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span>Foods they love (optional)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  <span>Foods to avoid (optional)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                  <span>Medical restrictions (if any)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  <span>Special notes (optional)</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-4 max-w-md mx-auto">
              <p className="text-sm text-green-800">
                💡 <strong>Remember:</strong> Every section is optional. Share only what you know and feel comfortable with.
              </p>
            </div>
          </div>
        );

      case 'favorites':
        return (
          <div>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <SmileIcon size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Foods They Love</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Think about meals that always make them smile. What foods bring them comfort and joy?
              </p>
            </div>

            {!showSuggestions && preferences.favoriteFoods.length === 0 && (
              <div className="text-center mb-6">
                <button
                  onClick={() => setShowSuggestions(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-2 px-4 rounded-xl transition-all duration-200 flex items-center gap-2"
                >
                  <BrainIcon size={20} className="text-white" />
                  Need some inspiration?
                </button>
              </div>
            )}

            {showSuggestions && (
              <div className="mb-6">
                <SmartSuggestions onSuggestionSelect={handleSuggestionSelect} />
              </div>
            )}

            <FavoriteFoods
              foods={preferences.favoriteFoods}
              onUpdate={(foods) => onUpdate({ ...preferences, favoriteFoods: foods })}
            />
          </div>
        );

      case 'dislikes':
        return (
          <div>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ThinkingIcon size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Foods to Avoid</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Are there foods they'd prefer not to eat? This helps us respect their preferences.
              </p>
            </div>

            <DislikedFoods
              foods={preferences.dislikedFoods}
              onUpdate={(foods) => onUpdate({ ...preferences, dislikedFoods: foods })}
            />
          </div>
        );

      case 'medical':
        return (
          <div>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MedicalIcon size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Medical Information</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Any allergies or intolerances we should know about? This is important for their safety.
              </p>
            </div>

            <AllergiesIntolerances
              items={preferences.allergiesIntolerances}
              onUpdate={(items) => onUpdate({ ...preferences, allergiesIntolerances: items })}
            />
          </div>
        );

      case 'additional':
        return (
          <div>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <NotesIcon size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Special Notes</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Any other preferences, cultural needs, or special instructions?
              </p>
            </div>

            <AdditionalConsiderations
              value={preferences.additionalConsiderations}
              onChange={(value) => onUpdate({ ...preferences, additionalConsiderations: value })}
            />
          </div>
        );

      case 'summary':
        return (
          <div>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CelebrationIcon size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">All Done!</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                You've created a comprehensive meal preference guide. This will help ensure every meal is both safe and enjoyable.
              </p>
            </div>

            {getTotalItems() > 0 && (
              <MealPlanningAssistant preferences={preferences} />
            )}

            <div className="bg-white rounded-3xl shadow-lg border border-blue-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-blue-100">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Meal Preferences Summary</h3>
                  <p className="text-gray-600">Ready to share with caregivers</p>
                </div>
              </div>

              <div className="p-8">
                {getTotalItems() > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">💚</span>
                          <div>
                            <div className="text-2xl font-bold text-green-700">
                              {preferences.favoriteFoods.length}
                            </div>
                            <div className="text-sm text-green-600">Favorite Foods</div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600">Foods that bring joy</p>
                      </div>

                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-100">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">⚠️</span>
                          <div>
                            <div className="text-2xl font-bold text-orange-700">
                              {preferences.dislikedFoods.length}
                            </div>
                            <div className="text-sm text-orange-600">Foods to Avoid</div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600">Preferences to respect</p>
                      </div>

                      <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">🚨</span>
                          <div>
                            <div className="text-2xl font-bold text-red-700">
                              {preferences.allergiesIntolerances.length}
                            </div>
                            <div className="text-sm text-red-600">Medical Restrictions</div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600">Critical safety info</p>
                      </div>
                    </div>

                    <div className="text-center">
                      <button
                        onClick={onExport}
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-200 shadow-lg text-lg"
                      >
                        📤 Share These Preferences
                      </button>

                      {showExport && (
                        <div className="mt-4 inline-flex items-center gap-2 text-green-700 bg-green-100 px-4 py-2 rounded-xl">
                          <span>✅</span>
                          <span className="text-sm font-medium">Copied to clipboard! Ready to share with caregivers.</span>
                        </div>
                      )}

                      <p className="text-gray-600 text-sm mt-4 max-w-md mx-auto">
                        This information will help ensure every meal is both safe and enjoyable for your loved one.
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">🌟</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">That's perfectly fine!</h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      You can always come back and add more details later. Even a little information helps caregivers provide better care.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Sticky Progress Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-blue-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">Z</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Zenaris CareMate</h1>
                <p className="text-xs text-blue-600">Step {currentStep + 1} of {steps.length}</p>
              </div>
            </div>
            <div className="text-right flex items-center gap-3">
              <div>
                <div className="text-sm font-medium text-gray-900">{getStepProgress()}% complete</div>
                <div className="text-xs text-gray-500">{getTotalItems()} items added</div>
              </div>
              {getTotalItems() > 0 && (
                <button
                  onClick={handleStartOver}
                  className="text-xs text-gray-500 hover:text-red-600 transition-colors px-2 py-1 rounded hover:bg-red-50"
                  title="Clear all progress and start over"
                >
                  Start Over
                </button>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${getStepProgress()}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Step Navigation */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => goToStep(index)}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                  index === currentStep
                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                    : index < currentStep
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                <step.icon size={16} className="text-current" />
                <span className="hidden sm:inline">{step.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-3xl shadow-lg border border-blue-100 overflow-hidden">
          <div className="p-8">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeftIcon size={16} className="text-current" />
                <span>Previous</span>
              </button>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  {currentStep === steps.length - 1 ? "You're all done!" : "Take your time, no pressure"}
                </p>
              </div>

              <button
                onClick={nextStep}
                disabled={currentStep === steps.length - 1}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{currentStep === steps.length - 2 ? "Finish" : "Next"}</span>
                <ArrowRightIcon size={16} className="text-current" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Start Over Confirmation Modal */}
      {showStartOverModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">⚠️</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Start Over?</h3>
                  <p className="text-sm text-gray-600">This will clear all your progress</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <p className="text-gray-700 mb-4">
                  Are you sure you want to start over? This will permanently delete:
                </p>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  {preferences.favoriteFoods.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-green-500">💚</span>
                      <span>{preferences.favoriteFoods.length} favorite food{preferences.favoriteFoods.length !== 1 ? 's' : ''}</span>
                    </div>
                  )}
                  {preferences.dislikedFoods.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-yellow-500">⚠️</span>
                      <span>{preferences.dislikedFoods.length} food{preferences.dislikedFoods.length !== 1 ? 's' : ''} to avoid</span>
                    </div>
                  )}
                  {preferences.allergiesIntolerances.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-red-500">🚨</span>
                      <span>{preferences.allergiesIntolerances.length} medical restriction{preferences.allergiesIntolerances.length !== 1 ? 's' : ''}</span>
                    </div>
                  )}
                  {preferences.additionalConsiderations.trim() && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-purple-500">📝</span>
                      <span>Special notes and considerations</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={cancelStartOver}
                  className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
                >
                  Keep My Progress
                </button>
                <button
                  onClick={confirmStartOver}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium rounded-xl transition-all duration-200"
                >
                  Yes, Start Over
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-3">
                You can always come back and add information later
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
