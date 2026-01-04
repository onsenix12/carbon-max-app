# CarbonMax 🌱

A gamified carbon reduction platform for Changi Airport that encourages sustainable travel through quests, rewards, and impact tracking.

## ✨ Features

- **Quest System**: Complete sustainability quests across three journey modes (Jewel, Departure, Transit)
- **Impact Tracking**: Track CO₂ avoided, plastic saved, and trees equivalent
- **Tier System**: Progress through Green Tiers (Seedling → Sapling → Tree → Forest → Canopy)
- **AI Chat Assistant**: Ask Max for sustainability tips and quest recommendations
- **Glassmorphism UI**: Modern, mobile-first design with glassmorphic effects
- **Real-time Progress**: Track quest completion and earn eco-points

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
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── carbonmax/         # Quest hub page
│   ├── chat/              # AI chat page
│   ├── impact/            # Impact tracking page
│   ├── tiers/             # Green tiers page
│   └── quest/[id]/        # Quest detail pages
├── components/             # React components
│   ├── quests/           # Quest-specific components
│   └── layout/           # Layout components
├── data/                  # JSON data files
├── docs/                  # Documentation
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and types
│   ├── routes.ts         # Route constants
│   ├── types.ts          # TypeScript types
│   └── constants.ts      # App constants
└── public/               # Static assets
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
- **[Code Review](docs/CODE_REVIEW.md)** - Project structure review and fixes
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

## 📝 Route Constants

All routes are centralized in `lib/routes.ts`:

```typescript
import { ROUTES } from '@/lib/routes';

// Use constants instead of hardcoded strings
<Link href={ROUTES.CARBONMAX}>Quest Hub</Link>
router.push(ROUTES.QUEST('quest-id'));
```

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
