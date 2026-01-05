# CarbonMax 🌱

A gamified carbon reduction platform for Changi Airport that encourages sustainable travel through quests, rewards, and impact tracking.

## ✨ Features

### Consumer App
- **Quest System**: Complete sustainability quests across three journey modes (Jewel, Departure, Transit)
- **Impact Tracking**: Track CO₂ avoided, plastic saved, and trees equivalent
- **Tier System**: Progress through Green Tiers (Seedling → Sapling → Tree → Forest → Canopy)
- **AI Chat Assistant**: Ask Max for sustainability tips and quest recommendations
- **Glassmorphism UI**: Modern, mobile-first design with glassmorphic effects
- **Real-time Progress**: Track quest completion and earn eco-points

### Operations Dashboard
- **Emissions Tracking**: Monitor Scope 1, 2, and 3 emissions across operations
- **Aircraft Analytics**: Track emissions by aircraft type and airline
- **Tenant Management**: Monitor tenant emissions and carbon ratings
- **CarbonMax Integration**: View consumer app activity and impact
- **AI Insights**: Get AI-powered insights and anomaly detection with interactive chat
- **Data-Driven Chat**: Ask questions about emissions, trends, forecasts, airlines, and tenants using Claude API
- **Transparent Calculations**: See detailed calculation methodologies

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/onsenix12/carbon-max-app.git
cd carbon-max-app

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file for local development:

```env
CLAUDE_API_KEY=your_claude_api_key_here
```

## 📁 Project Structure

```
carbon-max-app/
├── app/                           # Next.js App Router pages
│   ├── (operations)/             # Operations dashboard route group
│   │   └── dashboard/            # Operations dashboard pages
│   │       ├── page.tsx          # Overview
│   │       ├── aircraft/         # Aircraft emissions
│   │       ├── tenants/         # Tenant management
│   │       ├── carbonmax/        # CarbonMax feed
│   │       ├── insights/         # AI insights
│   │       └── settings/          # Settings
│   ├── api/                      # API routes
│   │   └── chat/                 # Chat API endpoint
│   ├── carbonmax/                # Quest hub page
│   ├── chat/                     # AI chat page
│   ├── impact/                   # Impact tracking page
│   ├── tiers/                    # Green tiers page
│   └── quest/[id]/               # Quest detail pages
├── components/                    # React components
│   ├── operations/              # Operations dashboard components
│   │   ├── cards/               # Card components
│   │   ├── charts/              # Chart components
│   │   ├── layout/             # Layout components
│   │   └── tables/             # Table components
│   ├── quests/                  # Quest-specific components
│   └── layout/                  # Layout components
├── config/                       # Configuration files
│   └── emissions-factors.ts     # Emission factors
├── data/                         # JSON data files
│   └── emissions/              # Emissions data
├── docs/                         # Documentation
├── hooks/                        # Custom React hooks
│   ├── useDashboardData.ts      # Dashboard data hook
│   ├── useAircraftData.ts       # Aircraft data hook
│   └── useQuestProgress.tsx     # Quest progress hook
├── lib/                          # Utilities and types
│   ├── emissions/               # Emissions calculation library
│   │   ├── types.ts            # Emissions types
│   │   ├── constants.ts        # Emissions constants
│   │   └── calculator.ts       # Calculation functions
│   ├── routes.ts                # Route constants (ROUTES)
│   ├── types.ts                 # TypeScript types
│   └── constants.ts             # App constants
└── public/                       # Static assets
```

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Custom components with glassmorphism
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Context API
- **AI Chat**: Claude API (Anthropic)

## 📚 Documentation

- **[Design System](docs/DESIGN_SYSTEM.md)** - Design tokens, components, and styling guidelines
- **[Deployment Guide](docs/DEPLOYMENT.md)** - How to deploy to Vercel/GitHub Pages
- **[Code Review](docs/CODE_REVIEW.md)** - Project structure review and code quality status ✅
- **[Operations Dashboard](docs/OPERATIONS_DASHBOARD_IMPLEMENTATION.md)** - Operations dashboard implementation guide
- **[Structure Verification](docs/STRUCTURE_VERIFICATION.md)** - File structure and route constants verification
- **[Implementation Guide](docs/IMPLEMENTATION.md)** - Step-by-step build guide (reference)

## 🎮 Journey Modes

1. **Jewel** - Pre-flight activities at Changi Airport
2. **Departure** - Sustainable flight choices
3. **Transit** - Eco-friendly actions during layovers

## 🏆 Green Tiers

- **Seedling** (0-499 pts) - Starting your journey
- **Sapling** (500-1,499 pts) - Growing awareness (10% bonus points)
- **Tree** (1,500-3,999 pts) - Making an impact (15% bonus points)
- **Forest** (4,000-9,999 pts) - Significant contribution (20% bonus points)
- **Canopy** (10,000+ pts) - Sustainability champion (25% bonus points)

## 🚢 Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Set `CLAUDE_API_KEY` in environment variables
4. Deploy!

### GitHub Pages

For static deployment, see [Deployment Guide](docs/DEPLOYMENT.md).

## 🧪 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Code Quality

The project follows best practices:
- ✅ **Route Constants**: All routes centralized in `lib/routes.ts` and `lib/emissions/constants.ts`
- ✅ **Type Safety**: Full TypeScript with proper types throughout
- ✅ **Code Organization**: Clean file structure following Next.js App Router patterns
- ✅ **No Code Duplication**: DRY principles followed
- ✅ **Consistent Imports**: Path aliases (`@/*`) used throughout

See [Code Review](docs/CODE_REVIEW.md) for detailed code quality assessment.

## 📝 Route Constants

All routes are centralized for consistency and maintainability:

### Consumer App Routes (`lib/routes.ts`)
```typescript
import { ROUTES } from '@/lib/routes';

// Use constants instead of hardcoded strings
<Link href={ROUTES.CARBONMAX}>Quest Hub</Link>
router.push(ROUTES.QUEST('quest-id'));
```

### Operations Dashboard Routes (`lib/emissions/constants.ts`)
```typescript
import { DASHBOARD_ROUTES } from '@/lib/emissions/constants';

// Dashboard routes
<Link href={DASHBOARD_ROUTES.overview}>Overview</Link>
<Link href={DASHBOARD_ROUTES.aircraft}>Aircraft</Link>
```

**✅ All hardcoded routes have been replaced with constants for better maintainability.**

## 🌐 Application URLs

### Consumer App Routes

| URL | Description | Example |
|-----|------------|---------|
| `/` | Home page with CarbonMax banner | `https://your-app.vercel.app/` |
| `/carbonmax` | Quest Hub - Browse and start quests | `https://your-app.vercel.app/carbonmax` |
| `/quest/[id]` | Quest detail page | `https://your-app.vercel.app/quest/jewel-green-plate` |
| `/chat` | Ask Max - AI chat assistant | `https://your-app.vercel.app/chat` |
| `/impact` | Impact tracking - View your sustainability impact | `https://your-app.vercel.app/impact` |
| `/tiers` | Green Tiers - View tier progress and rewards | `https://your-app.vercel.app/tiers` |

**API Routes:**
- `/api/chat` - Chat API endpoint (POST)

### Operations Dashboard Routes

| URL | Description | Example |
|-----|------------|---------|
| `/dashboard` | Overview - Main dashboard with KPIs | `https://your-app.vercel.app/dashboard` |
| `/dashboard/aircraft` | Aircraft emissions analytics | `https://your-app.vercel.app/dashboard/aircraft` |
| `/dashboard/tenants` | Tenant management and emissions | `https://your-app.vercel.app/dashboard/tenants` |
| `/dashboard/carbonmax` | CarbonMax consumer app activity feed | `https://your-app.vercel.app/dashboard/carbonmax` |
| `/dashboard/insights` | AI-powered insights, anomaly detection, and interactive data chat | `https://your-app.vercel.app/dashboard/insights` |
| `/dashboard/settings` | Dashboard settings and configuration | `https://your-app.vercel.app/dashboard/settings` |

### Example Quest URLs

- `/quest/jewel-green-plate` - Green Plate quest (Jewel mode)
- `/quest/departure-green-flight` - Green Flight quest (Departure mode)
- `/quest/transit-hydration-station` - Hydration Station quest (Transit mode)

## 🎨 Design System

The app uses a custom design system with:
- Glassmorphism effects
- Eco-friendly color palette (emerald green primary)
- Mobile-first responsive design
- Smooth animations and transitions

See [Design System Documentation](docs/DESIGN_SYSTEM.md) for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- Changi Airport for the sustainability initiative
- Next.js team for the amazing framework
- Anthropic for Claude API

---

Built with ❤️ for a more sustainable future ✈️🌍
