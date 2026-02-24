# Fashion.AI Ecosystem MVP

A premium Next.js frontend scaffold for an AI-powered fashion marketplace, specifically tailored for the Bangladesh (BD) market with global luxury standards.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
npm install
```

### Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production
```bash
npm run build
npm run start
```

## 🏗 Architecture & Features

### Core Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Bootstrap 5 + Css (Custom Luxury Tokens)
- **Icons**: Lucide React
- **State Management**: React Context API with LocalStorage Persistence

### Key Components
- **AI Stylist Widget**: Interactive floating assistant for user engagement.
- **Creator Studio**: Mock dashboard for creators to manage AI and physical drops.
- **Localized View**: Support for BDT currency and region-specific metadata.
- **Onboarding Flow**: Multi-step protected flow for new users.

### Data Models (`src/types/index.ts`)
- `Product`: Comprehensive apparel model with AI metadata.
- `Creator`: Human vs Synthetic studio profiles.
- `User`: Mock authentication state.

## ♿ Accessibility & Quality Assurance

- **Contrast**: All custom tokens ($primary, $gold, etc.) meet AA standards on white/linen backgrounds.
- **Typography**: Uses `Playfair Display` for high-end headings and `Inter` for readability.
- **Keyboard Navigation**: Bootstrap components and custom buttons use standard focus states.
- **ARIA**: Semantic HTML5 used throughout (main, nav, footer, sections).
- **Responsive Breakpoints**:
  - `Mobile (< 576px)`: Stacked cards, simplified navbar.
  - `Tablet (576px - 992px)`: 2-column grids.
  - `Desktop (> 992px)`: Expanded navigation, context-rich layouts.

## 📅 Roadmap

- **Phase 1**: Scaffold & Design System (Completed)
- **Phase 2**: Core Catalog & E-commerce Logic (Completed)
- **Phase 3**: Marketplace Interactions & AI Polish (Completed)
- **Phase 4**: Real API Integration & Image Generation Backend (Backend Pending)
