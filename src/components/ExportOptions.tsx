import React, { useState, useEffect, useRef } from 'react';
import type { MealPreferences } from '../types';
import { ShareIcon, ClipboardIcon, CheckIcon, CloseIcon } from './Icons';

interface ExportOptionsProps {
  preferences: MealPreferences;
  onClose: () => void;
}

export const ExportOptions: React.FC<ExportOptionsProps> = ({ preferences, onClose }) => {
  const [exportStatus, setExportStatus] = useState<'idle' | 'copying' | 'copied' | 'generating'>('idle');
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Focus management
  useEffect(() => {
    // Focus the first focusable element when modal opens
    if (firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const generateFormattedText = () => {
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    let content = `
╔══════════════════════════════════════════════════════════════╗
║                    ZENARIS CAREMATE                         ║
║                 Meal Preferences Guide                      ║
╚══════════════════════════════════════════════════════════════╝

Generated on: ${currentDate}

This comprehensive meal preference guide has been carefully compiled to
ensure safe and enjoyable dining experiences for your loved one.

═══════════════════════════════════════════════════════════════

🍽️ FAVORITE FOODS (${preferences.favoriteFoods.length} items)
═══════════════════════════════════════════════════════════════`;

    if (preferences.favoriteFoods.length > 0) {
      preferences.favoriteFoods.forEach((food, index) => {
        content += `\n${index + 1}. ${food.name}`;
        if (food.category && food.category !== 'other') {
          content += ` (${food.category})`;
        }
        if (food.notes) {
          content += `\n   Notes: ${food.notes}`;
        }
      });
    } else {
      content += '\nNo specific favorite foods documented.';
    }

    content += `\n\n⚠️ FOODS TO AVOID (${preferences.dislikedFoods.length} items)
═══════════════════════════════════════════════════════════════`;

    if (preferences.dislikedFoods.length > 0) {
      preferences.dislikedFoods.forEach((food, index) => {
        content += `\n${index + 1}. ${food.name}`;
        content += ` [${food.severity.toUpperCase()} DISLIKE]`;
        if (food.category && food.category !== 'other') {
          content += ` (${food.category})`;
        }
        if (food.notes) {
          content += `\n   Notes: ${food.notes}`;
        }
      });
    } else {
      content += '\nNo specific food dislikes documented.';
    }

    content += `\n\n🚨 MEDICAL RESTRICTIONS (${preferences.allergiesIntolerances.length} items)
═══════════════════════════════════════════════════════════════`;

    if (preferences.allergiesIntolerances.length > 0) {
      preferences.allergiesIntolerances.forEach((item, index) => {
        content += `\n${index + 1}. ${item.name}`;
        content += ` [${item.severity.toUpperCase()} ${item.type.toUpperCase()}]`;
        if (item.category && item.category !== 'other') {
          content += ` (${item.category})`;
        }
        if (item.notes) {
          content += `\n   Notes: ${item.notes}`;
        }
      });
    } else {
      content += '\nNo known allergies or intolerances documented.';
    }

    if (preferences.additionalConsiderations.trim()) {
      content += `\n\n📝 ADDITIONAL CONSIDERATIONS
═══════════════════════════════════════════════════════════════
${preferences.additionalConsiderations}`;
    }

    content += `\n\n═══════════════════════════════════════════════════════════════
IMPORTANT SAFETY REMINDERS:
═══════════════════════════════════════════════════════════════

• Always verify ingredients for any documented allergies or intolerances
• Respect food preferences to ensure meal acceptance and enjoyment
• Consider texture and temperature preferences for optimal dining experience
• Keep this guide accessible to all caregivers and meal preparers
• Update this information as preferences or medical needs change

═══════════════════════════════════════════════════════════════

This document was generated by Zenaris CareMate Interface
Designed with empathy for caregivers and elderly individuals

For questions or updates, please consult with healthcare providers
and update this preference guide as needed.

═══════════════════════════════════════════════════════════════`;

    return content;
  };

  const generatePDFContent = () => {
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Meal Preferences Guide - Zenaris CareMate</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background: white;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
        }

        .header {
            text-align: center;
            margin-bottom: 40px;
            padding: 30px;
            background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
            color: white;
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(59, 130, 246, 0.2);
        }

        .logo {
            width: 60px;
            height: 60px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            font-size: 24px;
            font-weight: bold;
            color: #3b82f6;
        }

        .header h1 {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
        }

        .header p {
            font-size: 16px;
            opacity: 0.9;
        }

        .meta-info {
            background: #f8fafc;
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 30px;
            border-left: 4px solid #3b82f6;
        }

        .section {
            margin-bottom: 35px;
            page-break-inside: avoid;
        }

        .section-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 20px;
            padding: 16px;
            background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
            border-radius: 12px;
            border-left: 4px solid #3b82f6;
        }

        .section-icon {
            font-size: 24px;
        }

        .section-title {
            font-size: 20px;
            font-weight: 600;
            color: #1e293b;
        }

        .section-count {
            background: #3b82f6;
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
            margin-left: auto;
        }

        .item-list {
            list-style: none;
        }

        .item {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 12px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .item-name {
            font-weight: 600;
            font-size: 16px;
            color: #1e293b;
            margin-bottom: 4px;
        }

        .item-badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 500;
            margin-right: 8px;
        }

        .severity-mild { background: #fef3c7; color: #92400e; }
        .severity-strong { background: #fed7aa; color: #c2410c; }
        .severity-absolute { background: #fecaca; color: #dc2626; }
        .severity-moderate { background: #fde68a; color: #d97706; }
        .severity-severe { background: #fca5a5; color: #dc2626; }
        .severity-life-threatening { background: #f87171; color: #991b1b; }

        .category-badge {
            background: #dbeafe;
            color: #1d4ed8;
        }

        .item-notes {
            font-style: italic;
            color: #6b7280;
            margin-top: 8px;
            padding-left: 12px;
            border-left: 2px solid #e5e7eb;
        }

        .additional-considerations {
            background: #f0f9ff;
            border: 1px solid #bae6fd;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 30px;
        }

        .safety-reminders {
            background: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 12px;
            padding: 20px;
            margin-top: 30px;
        }

        .safety-reminders h3 {
            color: #dc2626;
            margin-bottom: 15px;
            font-size: 18px;
        }

        .safety-reminders ul {
            list-style-type: disc;
            padding-left: 20px;
        }

        .safety-reminders li {
            margin-bottom: 8px;
            color: #7f1d1d;
        }

        .footer {
            text-align: center;
            margin-top: 40px;
            padding: 20px;
            background: #f8fafc;
            border-radius: 12px;
            color: #6b7280;
            font-size: 14px;
        }

        .empty-state {
            text-align: center;
            color: #6b7280;
            font-style: italic;
            padding: 20px;
            background: #f9fafb;
            border-radius: 8px;
        }

        @media print {
            body { padding: 20px; }
            .header { box-shadow: none; }
            .item { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">Z</div>
        <h1>Zenaris CareMate</h1>
        <p>Comprehensive Meal Preferences Guide</p>
    </div>

    <div class="meta-info">
        <strong>Generated:</strong> ${currentDate}<br>
        <strong>Purpose:</strong> This guide ensures safe and enjoyable dining experiences by documenting important meal preferences and medical restrictions.
    </div>

    <div class="section">
        <div class="section-header">
            <span class="section-icon">🍽️</span>
            <span class="section-title">Favorite Foods</span>
            <span class="section-count">${preferences.favoriteFoods.length} items</span>
        </div>
        ${preferences.favoriteFoods.length > 0 ? `
            <ul class="item-list">
                ${preferences.favoriteFoods.map(food => `
                    <li class="item">
                        <div class="item-name">${food.name}</div>
                        ${food.category && food.category !== 'other' ? `<span class="item-badge category-badge">${food.category}</span>` : ''}
                        ${food.notes ? `<div class="item-notes">${food.notes}</div>` : ''}
                    </li>
                `).join('')}
            </ul>
        ` : '<div class="empty-state">No specific favorite foods documented.</div>'}
    </div>

    <div class="section">
        <div class="section-header">
            <span class="section-icon">⚠️</span>
            <span class="section-title">Foods to Avoid</span>
            <span class="section-count">${preferences.dislikedFoods.length} items</span>
        </div>
        ${preferences.dislikedFoods.length > 0 ? `
            <ul class="item-list">
                ${preferences.dislikedFoods.map(food => `
                    <li class="item">
                        <div class="item-name">${food.name}</div>
                        <span class="item-badge severity-${food.severity}">${food.severity.replace('-', ' ').toUpperCase()}</span>
                        ${food.category && food.category !== 'other' ? `<span class="item-badge category-badge">${food.category}</span>` : ''}
                        ${food.notes ? `<div class="item-notes">${food.notes}</div>` : ''}
                    </li>
                `).join('')}
            </ul>
        ` : '<div class="empty-state">No specific food dislikes documented.</div>'}
    </div>

    <div class="section">
        <div class="section-header">
            <span class="section-icon">🚨</span>
            <span class="section-title">Medical Restrictions</span>
            <span class="section-count">${preferences.allergiesIntolerances.length} items</span>
        </div>
        ${preferences.allergiesIntolerances.length > 0 ? `
            <ul class="item-list">
                ${preferences.allergiesIntolerances.map(item => `
                    <li class="item">
                        <div class="item-name">${item.name}</div>
                        <span class="item-badge severity-${item.severity}">${item.severity.toUpperCase()} ${item.type.toUpperCase()}</span>
                        ${item.category && item.category !== 'other' ? `<span class="item-badge category-badge">${item.category}</span>` : ''}
                        ${item.notes ? `<div class="item-notes">${item.notes}</div>` : ''}
                    </li>
                `).join('')}
            </ul>
        ` : '<div class="empty-state">No known allergies or intolerances documented.</div>'}
    </div>

    ${preferences.additionalConsiderations.trim() ? `
        <div class="section">
            <div class="section-header">
                <span class="section-icon">📝</span>
                <span class="section-title">Additional Considerations</span>
            </div>
            <div class="additional-considerations">
                ${preferences.additionalConsiderations.replace(/\n/g, '<br>')}
            </div>
        </div>
    ` : ''}

    <div class="safety-reminders">
        <h3>🛡️ Important Safety Reminders</h3>
        <ul>
            <li>Always verify ingredients for any documented allergies or intolerances</li>
            <li>Respect food preferences to ensure meal acceptance and enjoyment</li>
            <li>Consider texture and temperature preferences for optimal dining experience</li>
            <li>Keep this guide accessible to all caregivers and meal preparers</li>
            <li>Update this information as preferences or medical needs change</li>
        </ul>
    </div>

    <div class="footer">
        <strong>Zenaris CareMate Interface</strong><br>
        Designed with empathy for caregivers and elderly individuals<br><br>
        For questions or updates, please consult with healthcare providers<br>
        and update this preference guide as needed.
    </div>
</body>
</html>`;
  };

  const handleCopyText = async () => {
    setExportStatus('copying');
    try {
      const formattedText = generateFormattedText();
      await navigator.clipboard.writeText(formattedText);
      setExportStatus('copied');
      setTimeout(() => setExportStatus('idle'), 3000);
    } catch (error) {
      console.error('Failed to copy text:', error);
      setExportStatus('idle');
    }
  };

  const handleGeneratePDF = () => {
    setExportStatus('generating');
    try {
      const htmlContent = generatePDFContent();
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);

      // Create a temporary link to download the HTML file
      const link = document.createElement('a');
      link.href = url;
      link.download = `meal-preferences-guide-${new Date().toISOString().split('T')[0]}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setTimeout(() => setExportStatus('idle'), 2000);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      setExportStatus('idle');
    }
  };

  const handlePrintPDF = () => {
    const htmlContent = generatePDFContent();
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 500);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
      aria-describedby="export-modal-description"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        role="document"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShareIcon size={24} className="text-blue-600" aria-hidden="true" />
              <h3 id="export-modal-title" className="text-xl font-bold text-gray-900">Share Preferences</h3>
            </div>
            <button
              ref={firstFocusableRef}
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
              aria-label="Close export options dialog"
            >
              <CloseIcon size={20} className="text-current" />
            </button>
          </div>
          <p id="export-modal-description" className="text-gray-600 mt-2">
            Choose how you'd like to share this meal preference guide with other caregivers.
          </p>
        </div>

        <div className="p-6 space-y-4">
          {/* Professional PDF Option */}
          <div className="border border-gray-200 rounded-2xl p-4 hover:border-blue-300 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">📄</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Professional PDF Guide</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Beautifully formatted document with Zenaris branding, perfect for printing or sharing digitally.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleGeneratePDF}
                    disabled={exportStatus === 'generating'}
                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50"
                  >
                    {exportStatus === 'generating' ? 'Generating...' : 'Download HTML'}
                  </button>
                  <button
                    onClick={handlePrintPDF}
                    className="border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200"
                  >
                    Print PDF
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Formatted Text Option */}
          <div className="border border-gray-200 rounded-2xl p-4 hover:border-blue-300 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <ClipboardIcon size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Formatted Text</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Clean, structured text format that you can paste into emails, documents, or messaging apps.
                </p>
                <button
                  onClick={handleCopyText}
                  disabled={exportStatus === 'copying'}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 flex items-center gap-2"
                >
                  {exportStatus === 'copying' ? (
                    'Copying...'
                  ) : exportStatus === 'copied' ? (
                    <>
                      <CheckIcon size={16} className="text-white" />
                      Copied!
                    </>
                  ) : (
                    'Copy to Clipboard'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Share Option */}
          <div className="border border-gray-200 rounded-2xl p-4 hover:border-blue-300 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">💬</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Quick Summary</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Brief overview perfect for quick communication with healthcare providers or family members.
                </p>
                <button
                  onClick={() => {
                    const summary = `Meal Preferences Summary:\n• ${preferences.favoriteFoods.length} favorite foods\n• ${preferences.dislikedFoods.length} foods to avoid\n• ${preferences.allergiesIntolerances.length} medical restrictions\n\nGenerated by Zenaris CareMate`;
                    navigator.clipboard.writeText(summary);
                  }}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200"
                >
                  Copy Summary
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 rounded-b-3xl">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-blue-500">💡</span>
            <span>
              <strong>Tip:</strong> The PDF option provides the most professional format for healthcare settings and official documentation.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
