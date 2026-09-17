# Design System — DevSolve

## Design philosophy
Reddit-inspired feed structure, but not a Reddit clone visually. shadcn design patterns as the component/interaction baseline (clean borders, soft shadows, subtle radius, calm surfaces) — never loud, never neon. Orange is the single accent; everything else stays quiet so the accent (and the content) carries attention.

---

## Color tokens

### Light mode
| Token | Hex | Usage |
|---|---|---|
| `--background` | `#F7F7F5` | Page background (not pure white — soft warm-grey) |
| `--surface` (container) | `#FFFFFF` | Cards, header, post containers — pure white to emphasize *against* the background |
| `--surface-border` | `#E7E5E2` | 1px border on containers |
| `--surface-shadow` | `rgba(20, 20, 20, 0.06)` | Soft shadow under containers |
| `--text-primary` | `#1A1A1A` | Body/heading text (soft black, not `#000`) |
| `--text-secondary` | `#6B6B68` | Meta text, timestamps, placeholders |
| `--primary` | `#F97316` | Primary accent (orange) — CTAs, active states, links |
| `--primary-hover` | `#EA6A0C` | Hover state for primary |
| `--primary-soft` | `#FFF1E6` | Orange tint for subtle backgrounds (badges, active tab bg) |

### Dark mode (inverse relationship, not literal invert)
| Token | Hex | Usage |
|---|---|---|
| `--background` | `#151513` | Page background (soft near-black, not pure `#000`) |
| `--surface` (container) | `#1E1E1C` | Cards, header, post containers — dark surface lifted from background |
| `--surface-border` | `#2E2E2B` | 1px border on containers |
| `--surface-shadow` | `rgba(0, 0, 0, 0.35)` | Soft shadow (more opaque, since dark-on-dark needs more depth) |
| `--text-primary` | `#F2F2F0` | Body/heading text (soft white, not `#FFF`) |
| `--text-secondary` | `#A0A09B` | Meta text, timestamps, placeholders |
| `--primary` | `#FB923C` | Primary accent (slightly lighter orange — retains contrast on dark) |
| `--primary-hover` | `#FDBA74` | Hover state for primary |
| `--primary-soft` | `#3A2413` | Orange tint for subtle backgrounds |

**Container emphasis rule**: In both modes, `--surface` must always sit visually "above" `--background`. Light mode does this with white-on-warm-grey + border + shadow. Dark mode does this with a lighter dark tone + border + shadow. Never let a container blend into the background — the border + shadow pairing is mandatory, not optional.

---

## Typography

- **Font**: One family, two weights doing the work — a grounded, slightly technical sans (e.g., "Inter" or "Geist") for everything. No serif, no second display face — this product is about clarity and utility, not editorial flair.
- **Scale**:
  - Post title: 16px / 600 weight
  - Body/comment text: 14px / 400 weight
  - Meta (timestamps, category tags): 12px / 500 weight, `--text-secondary`
  - Header logo/wordmark: 18px / 700 weight
- Line-height: 1.5 for body text, 1.3 for headings.
- No all-caps labels. No tracked-out eyebrows above headings.

---

## Layout structure

```
┌──────────────────────────────────────────────────┐
│  [Logo]   [ Search your problem statement's.. ]   [🔔] [Avatar]  │  ← Header (surface, sticky top)
├──────────────────────────────────────────────────┤
│                                                    │
│   ┌────────────────────────────────────────┐      │
│   │ Post card (surface, border, shadow)     │      │
│   │  category tag · author · timestamp      │      │
│   │  problem statement preview              │      │
│   │  [comment] [like] [save] [share]        │      │
│   └────────────────────────────────────────┘      │
│   ┌────────────────────────────────────────┐      │
│   │ Post card...                            │      │
│   └────────────────────────────────────────┘      │
│                                                    │
│              ┌───────────────────┐                │
│              │ [Create] [Explore]│  ← floating pill nav │
│              └───────────────────┘                │
├──────────────────────────────────────────────────┤
│                    Footer                         │
└──────────────────────────────────────────────────┘
```

- **Header**: `--surface` background, `--surface-border` bottom border, sticky on scroll. Logo left, search bar center (flexible width), notification icon + avatar right.
- **Search bar**: placeholder text = `Search your problem statement's..`, background slightly recessed (use `--background` tone inside the `--surface` header, or a 1px inset border) so it doesn't compete with the header itself.
- **Feed**: single-column, centered, max-width ~640px (keeps line lengths readable, Reddit-style but tighter). Each post is its own `--surface` card with border + shadow, comfortable vertical rhythm (16–20px gap between cards).
- **Bottom floating nav**: positioned fixed, centered horizontally, sitting just above the footer (not overlapping it). Pill-shaped container (`--surface` bg, border, shadow, fully rounded). Two tabs: "Create" and "Explore."
  - Animated tab indicator: a `--primary-soft` background pill slides between the two tabs on selection/hover (shared-element slide transition, ~150–200ms ease).
  - Active tab text/icon uses `--primary`; inactive uses `--text-secondary`.
  - Hover state: subtle background lift (`--primary-soft` at reduced opacity) before click — signals interactivity without being loud.

---

## Component patterns (shadcn-aligned)

- **Border radius**: consistent scale — `8px` for buttons/inputs, `12px` for cards, `999px` (full) for pills/avatars/tags. Don't mix arbitrary radii.
- **Buttons**:
  - Primary: `--primary` background, white text, `--primary-hover` on hover.
  - Secondary/ghost: transparent bg, `--surface-border` border, `--text-primary` text.
- **Cards**: `--surface` bg, `1px solid --surface-border`, `--surface-shadow` (subtle, not heavy), `12px` radius.
- **Tags/category badges**: `--primary-soft` background, `--primary` text, small pill shape, 12px font.
- **Icons**: outline-style icons (not filled), `--text-secondary` default, `--primary` on active/hover.
- **Focus states**: visible focus ring on all interactive elements (`2px solid --primary`, offset 2px) — accessibility non-negotiable.

---

## Motion principles
- One orchestrated moment only: the bottom nav tab-switch slide animation is the signature interaction — keep it smooth and deliberate.
- Hover transitions: fast (~120ms), subtle opacity/background shifts only — no scale/bounce effects on every card.
- Respect `prefers-reduced-motion` — disable the sliding tab animation and cross-fade instead for users who request it.

---

## What to avoid (explicit anti-patterns for this project)
- Pure `#000000` / `#FFFFFF` anywhere in text or backgrounds.
- Generic SaaS card kit: don't apply the same shadow/radius to every element regardless of hierarchy — cards, buttons, and pills each have their own defined radius per above.
- All-caps labels or tracked-out eyebrow text above post titles.
- Neon or saturated secondary accent colors — orange is the only accent; everything else is neutral.
- Overlapping the bottom floating nav with the footer — maintain clear spacing between them.