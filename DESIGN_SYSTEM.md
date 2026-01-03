# CarbonMax Design System

A high-fidelity mobile design system for sustainability applications featuring glassmorphism effects and eco-friendly aesthetics.

## Design Tokens

### Colors

- **Primary**: `#10B981` (Emerald Green) - Used for primary actions, CTAs, and active states
- **Background**: `#F8FAFC` (Soft Neutral) - Main app background
- **Foreground**: `#1F2937` (Deep Charcoal) - Primary text color
- **Muted Foreground**: `#6B7280` - Secondary text, descriptions
- **Border**: `rgba(255, 255, 255, 0.3)` - Subtle borders on glass elements

### Typography

- **Headings (H1-H3)**: Poppins - Used for titles and section headers
- **Body Text**: Inter - Used for general content and UI elements
- **Font Weights**: 
  - Regular: 400
  - Medium: 500
  - Semibold: 600
  - Bold: 700

### Spacing & Borders

- **Border Radius**: 24px (rounded-3xl) - Applied to all cards and containers
- **Component Border Radius**: 16px (rounded-2xl) - Applied to buttons and smaller elements
- **Blur**: 16px - Backdrop blur for glassmorphism effect

## Glassmorphism

The design system features three variants of glass cards:

1. **Default Glass** (`.glass`)
   - Background: `rgba(255, 255, 255, 0.7)`
   - Backdrop filter: `blur(16px)`
   - Border: `1px solid rgba(255, 255, 255, 0.3)`

2. **Strong Glass** (`.glass-strong`)
   - Background: `rgba(255, 255, 255, 0.85)`
   - More opaque for emphasis
   - Border: `1px solid rgba(255, 255, 255, 0.5)`

3. **Light Glass** (`.glass-light`)
   - Background: `rgba(255, 255, 255, 0.5)`
   - More transparent for subtle backgrounds
   - Border: `1px solid rgba(255, 255, 255, 0.2)`

## Components

### Core Components

#### GlassCard
Glassmorphic container with three variants (default, strong, light).

```tsx
<GlassCard variant="default" className="p-6">
  Content here
</GlassCard>
```

#### Button
Primary action component with three variants and three sizes.

```tsx
<Button variant="primary" size="md">
  Click me
</Button>
```

Variants: `primary`, `secondary`, `ghost`
Sizes: `sm`, `md`, `lg`

#### Badge
Small label component for status indicators.

```tsx
<Badge variant="success">Active</Badge>
```

Variants: `success`, `warning`, `info`, `default`

#### Input
Glassmorphic input field with optional icon.

```tsx
<Input 
  placeholder="Search..." 
  icon={<SearchIcon />}
/>
```

#### ProgressBar
Visual progress indicator with customizable color.

```tsx
<ProgressBar 
  value={450} 
  max={650} 
  color="#10B981"
  showLabel 
/>
```

### Composite Components

#### StatCard
Display key metrics with icon, value, label, and optional trend.

```tsx
<StatCard
  icon={<TreePine />}
  value="12.5kg"
  label="CO₂ Saved"
  trend="+15% this week"
/>
```

#### QuestCard
Interactive card for displaying quests/challenges with progress tracking.

```tsx
<QuestCard
  icon={<Utensils />}
  title="Green Plate Discovery"
  description="Find sustainable restaurants"
  points="+15 pts"
  badge="Available"
  progress={1}
  maxProgress={3}
/>
```

#### ImpactMetric
Large metric display with colored icon background.

```tsx
<ImpactMetric
  icon={<Droplet />}
  value="250"
  unit="L"
  label="Water Conserved"
  color="#3B82F6"
/>
```

#### AchievementCard
Gamification card showing achievement progress and unlock status.

```tsx
<AchievementCard
  icon={<Trophy />}
  title="First Steps"
  description="Complete your first quest"
  unlocked={true}
/>
```

#### ListItem
Clickable list item with icon, title, subtitle, and optional badge.

```tsx
<ListItem
  icon={<MapPin />}
  title="Visited Green Cafe"
  subtitle="2 hours ago"
  badge={<span>+15 pts</span>}
  onClick={() => {}}
/>
```

#### Header
App header with title, subtitle, and optional action button.

```tsx
<Header 
  title="CarbonMax"
  subtitle="Your sustainability companion"
  action={<Button>Action</Button>}
/>
```

#### TabBar & BottomNav
Navigation components for switching between sections.

```tsx
<TabBar
  tabs={[
    { id: 'overview', label: 'Overview' },
    { id: 'quests', label: 'Quests' }
  ]}
  activeTab="overview"
  onChange={(id) => setActiveTab(id)}
/>
```

#### InfoCard
Information/notification card with type-based styling.

```tsx
<InfoCard
  type="success"
  title="Great Progress!"
  message="You've saved enough CO₂..."
/>
```

Types: `info`, `success`, `warning`

## Best Practices

### Accessibility
- All interactive elements have appropriate hover and active states
- Color contrast meets WCAG AA standards for text readability
- Icons are paired with text labels for clarity

### Responsive Design
- Mobile-first approach with max-width container
- Flexible grid layouts using CSS Grid
- Touch-friendly target sizes (minimum 44x44px)

### Performance
- Glassmorphism effects use GPU-accelerated properties
- Images use lazy loading where appropriate
- Smooth transitions with optimized CSS properties

### Sustainability Theme
- Green color palette reflects environmental focus
- Icons from lucide-react for consistency
- Eco-friendly messaging and gamification elements

## Usage Example

```tsx
import { GlassCard, Button, StatCard } from './components';

function App() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen p-6">
      <GlassCard className="p-6">
        <h1>Dashboard</h1>
        <StatCard
          icon={<LeafIcon />}
          value="125"
          label="Points Earned"
        />
        <Button variant="primary">
          Continue
        </Button>
      </GlassCard>
    </div>
  );
}
```

## Color Palette

### Primary Colors
- **Emerald Green**: `#10B981` - Primary brand color
- **Success Green**: `#34D399` - Success states
- **Warning Orange**: `#F59E0B` - Warning states
- **Info Blue**: `#3B82F6` - Information states
- **Error Red**: `#EF4444` - Error states

### Neutral Colors
- **Charcoal**: `#1F2937` - Primary text
- **Gray**: `#6B7280` - Secondary text
- **Light Gray**: `#E5E7EB` - Borders, dividers
- **White**: `#F8FAFC` - Background

## Animation

All interactive components include subtle transitions:
- Duration: 200ms
- Easing: ease-out
- Properties: background-color, transform, opacity

### Micro-interactions
- Buttons scale to 95% on click (active state)
- Cards scale to 102% on hover
- Smooth color transitions on state changes
