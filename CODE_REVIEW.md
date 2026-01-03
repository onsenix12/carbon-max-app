# Code Review: CarbonMax Project Structure

## Executive Summary

The project has redundant "carbonmax" naming across multiple directory levels, which creates confusion and unnecessary nesting. This review identifies the issues and provides recommendations for restructuring.

---

## Current Structure Analysis

### Directory Structure
```
carbonmax/                          # Root project folder
├── app/
│   ├── page.tsx                    # Changi app homepage (shows CarbonMax banner)
│   ├── carbonmax/                   # ⚠️ REDUNDANT: CarbonMax route group
│   │   ├── layout.tsx              # CarbonMax section layout
│   │   ├── page.tsx                # Quest Hub (/carbonmax)
│   │   ├── chat/page.tsx           # Chat page (/carbonmax/chat)
│   │   ├── impact/page.tsx         # Impact page (/carbonmax/impact)
│   │   └── quest/[id]/page.tsx     # Quest detail (/carbonmax/quest/[id])
│   └── api/
├── components/
│   └── carbonmax/                  # ⚠️ REDUNDANT: All CarbonMax components
│       ├── CarbonMaxBanner.tsx
│       ├── QuestCard.tsx
│       ├── ModeSelector.tsx
│       └── quests/
├── lib/
│   └── carbonmax/                  # ⚠️ REDUNDANT: CarbonMax utilities
│       ├── types.ts
│       ├── constants.ts
│       └── utils.ts
└── hooks/
```

### Issues Identified

1. **Triple Nesting of "carbonmax"**
   - Root folder: `carbonmax/`
   - Route group: `app/carbonmax/`
   - Component folder: `components/carbonmax/`
   - Library folder: `lib/carbonmax/`

2. **Unclear Project Scope**
   - `app/page.tsx` suggests this is a Changi Airport app with CarbonMax as a feature
   - But the root folder is named `carbonmax/`, suggesting the entire app IS CarbonMax
   - This creates confusion about project boundaries

3. **Import Path Redundancy**
   - All imports use `@/components/carbonmax/...` and `@/lib/carbonmax/...`
   - Since the entire project is CarbonMax, this nesting is unnecessary

---

## Recommendations

### Option 1: Flatten Structure (Recommended if entire app is CarbonMax)

If CarbonMax is the entire application:

**Changes:**
1. Move `app/carbonmax/*` → `app/*` (remove route grouping)
2. Move `components/carbonmax/*` → `components/*`
3. Move `lib/carbonmax/*` → `lib/*`
4. Update all imports accordingly
5. Update routes from `/carbonmax/*` to `/*`

**New Structure:**
```
carbonmax/
├── app/
│   ├── page.tsx                    # Quest Hub (main page)
│   ├── layout.tsx                  # Root layout
│   ├── chat/page.tsx               # /chat
│   ├── impact/page.tsx             # /impact
│   └── quest/[id]/page.tsx         # /quest/[id]
├── components/
│   ├── CarbonMaxBanner.tsx
│   ├── QuestCard.tsx
│   ├── ModeSelector.tsx
│   └── quests/
├── lib/
│   ├── types.ts
│   ├── constants.ts
│   └── utils.ts
```

**Pros:**
- Cleaner, flatter structure
- Shorter import paths
- Less confusion
- Standard Next.js structure

**Cons:**
- Requires updating all imports
- Requires updating all route references
- Breaking change if URLs are already in use

---

### Option 2: Rename Root Folder (Recommended if CarbonMax is a feature)

If CarbonMax is just one feature of a larger Changi app:

**Changes:**
1. Rename root folder from `carbonmax/` → `changi-app/` or `app/`
2. Keep `app/carbonmax/` route group (makes sense for URL structure)
3. Keep `components/carbonmax/` (organizes CarbonMax components)
4. Keep `lib/carbonmax/` (organizes CarbonMax utilities)

**New Structure:**
```
changi-app/                         # Or just "app"
├── app/
│   ├── page.tsx                    # Changi homepage
│   ├── carbonmax/                  # ✅ Makes sense as route group
│   │   ├── page.tsx                # /carbonmax
│   │   ├── chat/page.tsx           # /carbonmax/chat
│   │   └── ...
│   └── other-features/            # Future features
├── components/
│   ├── carbonmax/                  # ✅ Organized by feature
│   └── layout/
└── lib/
    ├── carbonmax/                  # ✅ Organized by feature
    └── utils.ts                    # Shared utilities
```

**Pros:**
- Clear separation of features
- Scalable for multiple features
- URL structure makes sense (`/carbonmax/*`)
- No breaking changes to routes

**Cons:**
- Still has some nesting, but it's intentional

---

### Option 3: Hybrid Approach (Keep route group, flatten components/lib)

**Changes:**
1. Keep `app/carbonmax/` route group (for URLs)
2. Move `components/carbonmax/*` → `components/*`
3. Move `lib/carbonmax/*` → `lib/*`
4. Update imports

**New Structure:**
```
carbonmax/
├── app/
│   ├── page.tsx                    # Changi homepage
│   └── carbonmax/                  # Route group for /carbonmax/*
│       ├── page.tsx
│       ├── chat/page.tsx
│       └── ...
├── components/                     # Flattened
│   ├── CarbonMaxBanner.tsx
│   ├── QuestCard.tsx
│   └── layout/
└── lib/                            # Flattened
    ├── types.ts
    ├── constants.ts
    └── utils.ts
```

**Pros:**
- Keeps URL structure (`/carbonmax/*`)
- Flattens component/lib structure
- Moderate refactoring effort

**Cons:**
- Still has route group nesting

---

## Code Quality Issues

### 1. Duplicate Provider Usage
**Location:** `app/page.tsx` and `app/carbonmax/layout.tsx`

**Issue:**
- `app/page.tsx` wraps content in `<QuestProgressProvider>`
- `app/carbonmax/layout.tsx` also provides `<QuestProgressProvider>`
- This creates nested providers unnecessarily

**Recommendation:**
- Remove provider from `app/page.tsx` since it's already in the layout
- Or move provider to root layout if needed globally

### 2. Import Consistency
All imports correctly use `@/` alias, which is good. However, the paths are verbose:
- `@/components/carbonmax/QuestCard` could be `@/components/QuestCard`
- `@/lib/carbonmax/types` could be `@/lib/types`

### 3. Route References
Multiple hardcoded route strings:
- `router.push('/carbonmax/quest/${questId}')`
- `href="/carbonmax/chat"`
- `href="/carbonmax/impact"`

**Recommendation:**
- Create a route constants file: `lib/routes.ts`
- Use constants instead of hardcoded strings

---

## Migration Checklist (if choosing Option 1)

- [ ] Move `app/carbonmax/*` files to `app/*`
- [ ] Update `app/carbonmax/layout.tsx` → merge with root layout or remove
- [ ] Move `components/carbonmax/*` to `components/*`
- [ ] Move `lib/carbonmax/*` to `lib/*`
- [ ] Update all imports (use find/replace)
- [ ] Update all route references
- [ ] Update `CarbonMaxBanner.tsx` link from `/carbonmax` to `/`
- [ ] Test all routes
- [ ] Update any documentation

---

## Migration Checklist (if choosing Option 2)

- [ ] Rename root folder `carbonmax/` → `changi-app/`
- [ ] Update `package.json` name if needed
- [ ] Update any CI/CD paths
- [ ] Update documentation
- [ ] No code changes needed (structure stays the same)

---

## Migration Checklist (if choosing Option 3)

- [ ] Move `components/carbonmax/*` to `components/*`
- [ ] Move `lib/carbonmax/*` to `lib/*`
- [ ] Update all imports
- [ ] Keep `app/carbonmax/` route group
- [ ] Test all routes

---

## Recommendation Summary

**If the entire app is CarbonMax:** Choose **Option 1** (Flatten Structure)
- Simplest, cleanest structure
- Standard Next.js pattern
- Requires most refactoring but worth it long-term

**If CarbonMax is a feature of a larger app:** Choose **Option 2** (Rename Root)
- Clear feature boundaries
- Scalable architecture
- Minimal code changes

**If you want to keep URLs as `/carbonmax/*`:** Choose **Option 3** (Hybrid)
- Keeps route structure
- Flattens components/lib
- Moderate refactoring

---

## Additional Observations

### Positive Aspects
✅ Good use of TypeScript
✅ Consistent use of path aliases (`@/`)
✅ Proper component organization
✅ Good separation of concerns (hooks, components, lib)
✅ Clean use of Next.js App Router

### Areas for Improvement
⚠️ Redundant folder nesting
⚠️ Hardcoded route strings (should use constants)
⚠️ Nested providers (minor optimization)
⚠️ Unclear project scope (is this CarbonMax app or Changi app with CarbonMax?)

---

## Questions to Consider

1. **Is CarbonMax the entire application, or just one feature?**
   - If entire app → Option 1
   - If one feature → Option 2

2. **Do you need the `/carbonmax` URL prefix?**
   - If yes → Option 2 or 3
   - If no → Option 1

3. **Are there plans for other features?**
   - If yes → Option 2 (better scalability)
   - If no → Option 1 (simpler)

---

## Next Steps

1. Decide on which option fits your use case
2. Create a backup branch
3. Follow the migration checklist for chosen option
4. Test thoroughly
5. Update documentation

