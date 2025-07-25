import { useState } from 'react';
import type { MealPreferences } from './types';
import { StepWizard } from './components/StepWizard';
import { ExportOptions } from './components/ExportOptions';

function App() {
  const [preferences, setPreferences] = useState<MealPreferences>({
    favoriteFoods: [],
    dislikedFoods: [],
    allergiesIntolerances: [],
    additionalConsiderations: '',
  });

  const [showExportModal, setShowExportModal] = useState(false);

  const handleExport = () => {
    setShowExportModal(true);
  };

  return (
    <>
      <StepWizard
        preferences={preferences}
        onUpdate={setPreferences}
        onExport={handleExport}
        showExport={false}
      />

      {showExportModal && (
        <ExportOptions
          preferences={preferences}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </>
  );
}

export default App;
