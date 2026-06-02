# M-Chai Admin Portal

A React 19 + Tailwind v4 compatible admin portal for the M-Chai digital farming platform.

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── data/
│   └── data.json          # All dummy data
├── components/
│   ├── Sidebar.jsx        # Left navigation sidebar
│   ├── Topbar.jsx         # Top navigation bar
│   └── Footer.jsx         # Page footer
├── pages/
│   ├── LoginPage.jsx      # Login + Register screens
│   ├── Dashboard.jsx      # Admin dashboard with charts
│   ├── FarmerManagement.jsx # Farmer table + Record Delivery modal
│   ├── Reports.jsx        # Reports with 3 tabs
│   ├── ExchangeRates.jsx  # Rate management + history
│   └── Factories.jsx      # Factory cards grid
├── App.jsx                # Root component with routing
├── index.jsx              # Entry point
└── index.css              # Global styles (CSS variables, all component styles)
```

## Pages

| Page | Route (useState) | Description |
|------|-----------------|-------------|
| Login | (unauthenticated) | Farmer/Admin login with 4-digit PIN |
| Register | (from Login) | 2-step farmer registration |
| Dashboard | `dashboard` | Stats, charts, recent transactions |
| Farmer Management | `farmers` | Searchable table, filter by status/factory |
| Reports | `reports` | Overview / Factory / Transaction tabs |
| Exchange Rates | `exchange` | Set KES/kg rate, conversion preview, history |
| Factories | `factories` | Grid of 6 tea factory cards |

## Demo Credentials

- **Farmer login**: Phone `0712345678` / PIN `1234`  
- **Admin login**: any credentials with Admin tab selected

## Tech Stack

- React 19
- Recharts 2.x (charts)
- Vite 6 (bundler)
- CSS Custom Properties (theming — no Tailwind config needed)

## Swapping to Tailwind v4

To use Tailwind v4 instead of the custom CSS:
1. `npm install tailwindcss@^4.0.0 @tailwindcss/vite`
2. Add `@tailwindcss/vite` plugin to `vite.config.js`
3. Replace `index.css` with `@import "tailwindcss";`
4. Replace class names in components with Tailwind utilities
