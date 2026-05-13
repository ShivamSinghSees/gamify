# Gamify Project Code Quality Rules

## Project Overview
This is a React + TypeScript + Vite project using shadcn/ui components with Tailwind CSS v4.

---

## File Structure

```
src/
├── components/
│   ├── ui/           # shadcn/ui base components (button, sidebar, tooltip, etc.)
│   └── *.tsx         # Feature/composite components (app-sidebar, etc.)
├── lib/
│   └── utils.ts      # Utility functions (cn helper)
├── hooks/            # Custom React hooks
├── assets/           # Static assets (images, icons)
├── App.tsx           # Root component
├── main.tsx          # Entry point
└── index.css         # Global styles and Tailwind theme
```

---

## Code Style Guidelines

### TypeScript
- **Strict mode**: Always use strict TypeScript configuration
- **Explicit types**: Define interfaces/types for component props
- **No `any`**: Avoid `any` type; use `unknown` or proper generics
- **Const assertions**: Use `as const` for static arrays/objects

```tsx
// ✅ Good
const NAV_ITEMS = [
  { title: 'Home', icon: Home, href: '/' },
] as const

interface NavItemProps {
  title: string
  icon: LucideIcon
  href: string
}

// ❌ Bad
const items: any[] = [...]
```

### React Components
- **Function components**: Always use function components with arrow syntax or function declarations
- **forwardRef**: Use for UI primitives that need ref forwarding
- **displayName**: Set displayName for forwardRef components
- **Props interface**: Define props interface above component

```tsx
// ✅ Good
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', ...props }, ref) => {
    return <button ref={ref} {...props} />
  }
)
Button.displayName = 'Button'

// ❌ Bad
function Button(props: any) { ... }
```

### Component Organization
1. Imports (external → internal → types → styles)
2. Type definitions
3. Constants
4. Component definition
5. Exports

```tsx
// 1. External imports
import * as React from 'react'
import { cva } from 'class-variance-authority'

// 2. Internal imports
import { cn } from '@/lib/utils'

// 3. Type definitions
interface Props { ... }

// 4. Constants
const variants = cva(...)

// 5. Component
export function Component() { ... }
```

---

## Styling Guidelines

### Tailwind CSS
- **Use theme variables**: Reference `--color-*` variables from `@theme`
- **cn() helper**: Always use `cn()` for conditional classes
- **Responsive design**: Mobile-first approach with `md:`, `lg:` breakpoints
- **No inline styles**: Prefer Tailwind classes over inline styles

```tsx
// ✅ Good
<div className={cn(
  'flex items-center gap-2',
  isActive && 'bg-sidebar-accent'
)} />

// ❌ Bad
<div style={{ display: 'flex', alignItems: 'center' }} />
```

### CSS Variables (Tailwind v4)
Define colors in `@theme` block in `index.css`:
```css
@theme {
  --color-primary: oklch(0.205 0 0);
  --color-sidebar: oklch(0.985 0.002 300);
}
```

---

## Component Patterns

### Reusable UI Components
- Place in `src/components/ui/`
- Use CVA (class-variance-authority) for variants
- Support `className` prop for customization
- Use `asChild` pattern with Radix Slot for composition

```tsx
const buttonVariants = cva('base-classes', {
  variants: {
    variant: { default: '...', outline: '...' },
    size: { sm: '...', md: '...', lg: '...' },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})
```

### Feature Components
- Place in `src/components/`
- Compose from UI primitives
- Keep business logic minimal; delegate to hooks
- Use descriptive names: `AppSidebar`, `NavMain`, `UserMenu`

### Data-Driven Components
- Define data as typed constants
- Map over data arrays for rendering
- Keep data separate from presentation

```tsx
const NAV_ITEMS = [
  { title: 'Home', icon: Home, href: '/' },
] as const

{NAV_ITEMS.map((item) => (
  <NavItem key={item.title} {...item} />
))}
```

---

## Import Aliases
Use `@/` alias for all internal imports:
```tsx
// ✅ Good
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

// ❌ Bad
import { cn } from '../../lib/utils'
```

---

## Accessibility
- **Semantic HTML**: Use proper elements (`button`, `nav`, `main`)
- **ARIA labels**: Add labels for icon-only buttons
- **Keyboard navigation**: Ensure focusable elements are reachable
- **Screen reader text**: Use `sr-only` class for hidden labels

```tsx
<button aria-label="Toggle sidebar">
  <PanelLeft />
  <span className="sr-only">Toggle Sidebar</span>
</button>
```

---

## Performance
- **Memoization**: Use `useMemo`/`useCallback` for expensive computations
- **Lazy loading**: Use `React.lazy()` for route-level code splitting
- **Image optimization**: Use appropriate formats and sizes
- **Bundle analysis**: Regularly check bundle size

---

## Testing Conventions
- **File naming**: `*.test.tsx` or `*.spec.tsx`
- **Test location**: Co-locate with component or in `__tests__/`
- **Coverage**: Aim for critical path coverage, not 100%

---

## Git Conventions
- **Commits**: Use conventional commits (`feat:`, `fix:`, `chore:`)
- **Branch naming**: `feature/`, `fix/`, `chore/` prefixes
- **PR size**: Keep PRs focused and reviewable

---

## Dependencies
- **shadcn/ui**: Use CLI to add components (`npx shadcn@latest add <component>`)
- **Icons**: Use Lucide React exclusively
- **Utilities**: `clsx` + `tailwind-merge` via `cn()` helper
- **Radix UI**: Use for accessible primitives (via shadcn/ui)

---

## Don'ts
- ❌ Don't use CSS modules or styled-components
- ❌ Don't add comments unless explaining complex logic
- ❌ Don't use `index.ts` barrel files (causes tree-shaking issues)
- ❌ Don't mix styling approaches (stick to Tailwind)
- ❌ Don't hardcode colors; use theme variables
