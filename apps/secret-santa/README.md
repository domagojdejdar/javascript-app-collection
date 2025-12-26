# 🎅 Secret Santa - Gift Exchange Manager

A modern Secret Santa enrollment and assignment application built with **AlpineJS**, **TypeScript**, and **Tailwind CSS**.

## ✨ Features

- 👥 **Participant Management** - Add and remove participants easily
- 🎄 **Group Creation** - Create exclusion groups (e.g., couples, family members who shouldn't draw each other)
- 🎁 **Smart Assignment Generation** - Automatically generates valid Secret Santa assignments respecting group constraints
- 🔒 **Name Verification** - Requires name verification before revealing assignments
- ⏱️ **Timed Reveal** - Shows receiver name for 5 seconds after verification
- 💾 **History Tracking** - Saves the last 5 generated lists to localStorage
- 📱 **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- ♿ **Accessible** - WCAG 2.1 AA compliant

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## 🔧 Development

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code with Prettier
npm run format
```

## 📁 Project Structure

```
apps/secret-santa/
├── src/
│   ├── components/          # Alpine components
│   ├── stores/              # Alpine stores (state management)
│   ├── utils/               # Helper functions
│   ├── types/               # TypeScript type definitions
│   ├── styles/              # CSS styles
│   └── main.ts              # Application entry point
├── tests/
│   ├── unit/                # Unit tests
│   └── integration/         # Integration tests
├── public/                  # Static assets
└── index.html               # Main HTML file
```

## 🎯 Usage

1. **Add Participants** - Enter names of people participating in Secret Santa
2. **Create Groups (Optional)** - Group people who shouldn't draw each other
3. **Generate Assignments** - Click generate to create Secret Santa assignments
4. **View Assignments** - Each giver can verify their name to see their receiver
5. **Access History** - View or reload previously generated assignments

## 🛠️ Tech Stack

- **Framework**: AlpineJS 3.x
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Testing**: Vitest + Testing Library
- **Linting**: ESLint + Prettier

## 📋 Implementation Status

✅ Stage 1: Project Setup & Configuration - **COMPLETE**
⏳ Stage 2: Core Types & Data Models - Pending
⏳ Stage 3: Utility Functions & Business Logic - Pending
⏳ Stage 4: Alpine Stores - Pending
⏳ Stage 5: UI Components - Input & Management - Pending
⏳ Stage 6: UI Components - Assignment Generation & Viewing - Pending
⏳ Stage 7: Integration & Polish - Pending
⏳ Stage 8: Testing & Documentation - Pending

See [PLAN.md](./PLAN.md) for detailed implementation plan.

## 📝 License

This project is part of the javascript-app-collection repository.

## 🤝 Contributing

This is a personal learning project. Feel free to fork and adapt for your own use!

---

Made with ❤️ for spreading holiday cheer
