# 🏥 Zenaris CareMate - Elderly Meal Preferences Interface

> **A compassionate, accessible web application designed to help caregivers document comprehensive meal preferences for elderly individuals.**

[![React](https://img.shields.io/badge/React-19.1.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.1-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-38B2AC.svg)](https://tailwindcss.com/)

## 🌟 Live Demo

**[View Live Application →](https://your-app-url.vercel.app)**

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technical Stack](#technical-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [Accessibility](#accessibility)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Zenaris CareMate is a React TypeScript application specifically designed for stressed caregivers managing multiple responsibilities. The interface prioritizes **empathy**, **accessibility**, and **ease of use** to reduce cognitive load while documenting critical meal preference information.

### 🎨 Design Philosophy

- **Empathetic Design**: Acknowledges the emotional weight of caregiving
- **Cognitive Load Reduction**: Step-by-step wizard instead of overwhelming forms
- **Accessibility First**: WCAG compliant with full keyboard and screen reader support
- **Professional Quality**: Healthcare-grade documentation and export capabilities

## ✨ Features

### 🍽️ Core Functionality

- **Favorite Foods Management**
  - Dynamic add/edit/remove functionality
  - Meal categorization (breakfast, lunch, dinner, snacks)
  - Notes and special preferences
  - Group by meal type option

- **Foods to Avoid**
  - Severity levels (Mild, Strong, Absolute dislike)
  - Category organization
  - Detailed notes for context

- **Medical Restrictions**
  - Critical allergy and intolerance tracking
  - Severity indicators (Mild to Life-threatening)
  - Quick-select common allergens
  - Clear visual distinction for safety

- **Additional Considerations**
  - Free-form text area (500 character limit)
  - Texture, temperature, cultural preferences
  - Real-time character counting

### 🚀 Advanced Features

- **Step-by-Step Wizard**: Reduces overwhelm with focused, one-task-at-a-time approach
- **Smart Suggestions**: AI-powered recommendations for common foods and preferences
- **Meal Planning Assistant**: Personalized meal suggestions based on documented preferences
- **Professional Export System**:
  - Branded PDF documents
  - Formatted text for emails/messaging
  - Quick summaries for healthcare providers
- **Progress Tracking**: Visual progress bar and completion percentage
- **Real-time Validation**: Immediate feedback and error prevention

### ♿ Accessibility Excellence

- **WCAG 2.1 AA Compliant**
- **Full Keyboard Navigation**
- **Screen Reader Optimized**
- **Focus Management**
- **High Contrast Support**
- **Click-outside-to-close** modals
- **Escape key** modal dismissal

## 🛠️ Technical Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.1.0 | UI Framework |
| **TypeScript** | 5.6.3 | Type Safety |
| **Vite** | 6.0.1 | Build Tool |
| **TailwindCSS** | 3.4.17 | Styling |
| **ESLint** | 9.17.0 | Code Quality |

### 🏗️ Architecture Highlights

- **Functional Components** with React Hooks
- **TypeScript Strict Mode** for maximum type safety
- **Custom Hook Patterns** for reusable logic
- **Component Composition** for maintainability
- **Responsive Design** for all devices

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/zenaris-caremate-interface.git
   cd zenaris-caremate-interface
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Icons.tsx        # SVG icon library
│   ├── StepWizard.tsx   # Main wizard component
│   ├── FavoriteFoods.tsx
│   ├── DislikedFoods.tsx
│   ├── AllergiesIntolerances.tsx
│   ├── AdditionalConsiderations.tsx
│   ├── SmartSuggestions.tsx
│   ├── MealPlanningAssistant.tsx
│   ├── ExportOptions.tsx
│   └── FoodItemComponent.tsx
├── types/               # TypeScript type definitions
│   └── index.ts
├── utils/               # Utility functions
│   └── index.ts
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🔧 Key Components

### StepWizard
The main orchestrator component that manages the step-by-step flow, progress tracking, and state management.

### ExportOptions
Professional export system with PDF generation, formatted text, and quick summary options.

### SmartSuggestions
AI-powered suggestion system that helps users when they're stuck or need inspiration.

### Icons
Comprehensive SVG icon library replacing emojis for professional healthcare appearance.

## ♿ Accessibility Features

### Keyboard Navigation
- **Tab navigation** through all interactive elements
- **Enter/Space** activation for buttons
- **Escape** to close modals
- **Arrow keys** for option selection

### Screen Reader Support
- **ARIA labels** and descriptions
- **Role attributes** for proper element identification
- **Live regions** for dynamic content updates
- **Semantic HTML** structure

### Visual Accessibility
- **High contrast** color schemes
- **Focus indicators** for keyboard users
- **Scalable text** and icons
- **Color-blind friendly** design

## 🚀 Deployment

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

3. **Or connect GitHub repository**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Automatic deployments on push

### Netlify Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Visit [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Or connect GitHub repository for automatic deployments

### Environment Configuration

No environment variables required - the application is fully self-contained.

## 🎯 Usage Guide

### For Caregivers

1. **Start the Journey**: Begin with the welcoming introduction
2. **Document Favorites**: Add foods that bring joy to your loved one
3. **Note Dislikes**: Record foods to avoid with severity levels
4. **Medical Safety**: Document critical allergies and intolerances
5. **Special Notes**: Add cultural, texture, or temperature preferences
6. **Export & Share**: Generate professional documents for other caregivers

### For Healthcare Providers

- **Professional PDFs** with comprehensive meal preference documentation
- **Safety highlights** for critical medical restrictions
- **Organized format** for easy reference during meal planning
- **Branded documentation** suitable for medical records

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Zenaris** for the opportunity to create meaningful healthcare technology
- **React Team** for the excellent framework
- **Tailwind Labs** for the utility-first CSS framework
- **Vite Team** for the lightning-fast build tool

## 📞 Support

For support, please contact:
- **Email**: support@zenaris.com
- **Documentation**: [docs.zenaris.com](https://docs.zenaris.com)
- **Issues**: [GitHub Issues](https://github.com/your-username/zenaris-caremate-interface/issues)

---

<div align="center">

**Built with ❤️ for caregivers and elderly individuals**

*Zenaris CareMate - Making meal preference documentation compassionate and accessible*

</div>
