# Project Overview — DevSolve (working name)

## What this project is
A web platform where developers, designers, and entrepreneurs post **real project problem statements** and a global community of random developers solves them to build hands-on portfolio experience.

Think: **"LeetCode for real-world project building"** — instead of algorithmic puzzles, users solve structured problem statements and walk away with a resume-worthy project.

## The core pain point being solved
Students and early-career developers waste significant time *searching* for project ideas for their resume/portfolio (on Reddit, Twitter, random blogs) instead of actually *building*. This platform removes that search friction by centralizing structured, categorized problem statements in one place.

## Core user flow
1. **Poster** creates a problem statement:
   - Selects a project **category** (e.g., Web Dev, Mobile, AI/ML, DevOps)
   - Writes a clear **problem statement**
   - Publishes it
2. **Solver** (developer/entrepreneur/designer) browses posts by category, picks a problem, and builds a solution
3. Solver submits their solution (e.g., GitHub repo link + short writeup)
4. Community engages via **comments, likes/upvotes** on solutions
5. Best/most useful solutions rise to the top via upvotes

## MVP feature scope (2-day build)
- [ ] User auth (signup/login)
- [ ] Post creation (category + problem statement)
- [ ] Browse/filter posts by category
- [ ] Comment on posts
- [ ] Submit a solution (link + writeup)
- [ ] Upvote/like solutions
- [ ] Save post (bookmark)

## Deferred to v2 (not in current MVP)
- Real-time chat between users
- Share functionality (beyond native link copy)
- Plagiarism/duplicate solution detection
- Advanced moderation & reporting
- Notifications

## Key differentiation vs Reddit/Twitter
| Reddit/Twitter | DevSolve |
|---|---|
| General discussion | Structured problem → solution loop |
| No difficulty/category structure | Categorized by domain + difficulty |
| No "solved" tracking | Solutions linked, upvoted, trackable |
| Not resume-oriented | Every solved post = portfolio-ready project |

## Data model (draft — refine before building)
- **User**: id, name, email, password_hash, created_at
- **Post**: id, author_id, category, problem_statement, status (open/solved), created_at
- **Solution**: id, post_id, author_id, repo_link, writeup, upvotes, created_at
- **Comment**: id, post_id, author_id, content, created_at
- **SavedPost**: user_id, post_id

## Known edge cases to guard against in code
- Prevent self-upvoting (author upvoting own solution/post)
- Validate problem statement isn't empty/too short before publish
- Handle duplicate/near-duplicate post detection (basic string similarity, optional for MVP)
- Sanitize all user input (XSS, SQL injection) — especially in problem statements and solution writeups
- Paginate post listings (avoid loading all posts at once)
- Graceful empty states (no posts in a category, no solutions yet on a post)

## Tech stack
*(fill in based on your actual stack choice — e.g., Next.js + Postgres + Prisma, or MERN, etc.)*

## Design system — MANDATORY
**Every UI/styling decision must follow `DESIGN_SYSTEM.md` in the project root.** This includes colors (light/dark tokens), typography scale, border-radius rules, component patterns (shadcn-aligned), layout structure (header, feed, floating bottom nav), and motion principles.

Do not introduce colors, spacing values, radii, or component styles that are not defined in `DESIGN_SYSTEM.md`. If a new UI need arises that the design system doesn't cover, extend `DESIGN_SYSTEM.md` first, then implement — don't improvise ad hoc styles inline.

## Folder structure

```
devsolve/
├── AGENTS.md
├── DESIGN_SYSTEM.md
├── .env.example
├── .env.local                  # gitignored
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.js              # (adjust if not Next.js)
│
├── prisma/                     # or /db if using another ORM
│   ├── schema.prisma
│   └── migrations/
│
├── public/
│   └── assets/                 # static images, icons, logo
│
├── src/
│   ├── app/                    # routes (Next.js App Router) or /pages
│   │   ├── layout.tsx
│   │   ├── page.tsx            # main feed
│   │   ├── create/
│   │   │   └── page.tsx        # create post flow
│   │   ├── explore/
│   │   │   └── page.tsx        # browse/filter by category
│   │   ├── post/[id]/
│   │   │   └── page.tsx        # single post + solutions + comments
│   │   ├── profile/[username]/
│   │   │   └── page.tsx
│   │   └── api/                # API routes (or separate /server if not Next.js)
│   │       ├── posts/
│   │       ├── solutions/
│   │       ├── comments/
│   │       └── auth/
│   │
│   ├── components/
│   │   ├── ui/                 # shadcn primitives (button, input, card, avatar, badge, etc.)
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── BottomNav.tsx   # animated Create/Explore pill nav
│   │   │   └── Footer.tsx
│   │   ├── post/
│   │   │   ├── PostCard.tsx
│   │   │   ├── PostForm.tsx
│   │   │   └── CategoryTag.tsx
│   │   ├── solution/
│   │   │   ├── SolutionCard.tsx
│   │   │   └── SolutionForm.tsx
│   │   └── comment/
│   │       ├── CommentList.tsx
│   │       └── CommentForm.tsx
│   │
│   ├── lib/
│   │   ├── db.ts                # Prisma client instance
│   │   ├── auth.ts              # auth helpers/session logic
│   │   ├── validators/          # input validation schemas (zod, etc.)
│   │   │   ├── post.schema.ts
│   │   │   ├── solution.schema.ts
│   │   │   └── comment.schema.ts
│   │   └── utils.ts              # cn(), formatDate(), etc.
│   │
│   ├── hooks/
│   │   ├── usePosts.ts
│   │   ├── useAuth.ts
│   │   └── useUpvote.ts
│   │
│   ├── types/
│   │   ├── post.ts
│   │   ├── solution.ts
│   │   ├── user.ts
│   │   └── comment.ts
│   │
│   └── styles/
│       └── globals.css          # design tokens as CSS variables (from DESIGN_SYSTEM.md)
│
└── tests/
    ├── unit/
    └── integration/
```

**Rules:**
- Route-level files (`app/**/page.tsx`) stay thin — they compose components, they don't hold business logic.
- One component per file. Component file name matches the exported component name (PascalCase).
- Shared/reusable UI primitives go in `components/ui/`; feature-specific composed components go in their own domain folder (`post/`, `solution/`, `comment/`).
- All CSS variables from `DESIGN_SYSTEM.md` live in one place: `src/styles/globals.css`, scoped for `:root` (light) and `.dark` (dark mode). Never redefine tokens elsewhere.

## Code style

- **Language**: TypeScript everywhere. No implicit `any`. Prefer explicit return types on exported functions.
- **Naming**:
  - Components: `PascalCase` (`PostCard.tsx`)
  - Functions/variables: `camelCase`
  - Constants: `UPPER_SNAKE_CASE` (only for true constants, e.g., `MAX_TITLE_LENGTH`)
  - Files match their default export name
- **Components**: Functional components only. Props typed via a named `interface` (`interface PostCardProps { ... }`), not inline object types.
- **Styling**: Tailwind CSS utility classes, driven by the CSS variables defined in `DESIGN_SYSTEM.md` (e.g., `bg-[var(--surface)]`, or mapped into `tailwind.config` theme tokens — prefer mapping into config over raw `var()` calls for readability). No inline `style={{}}` unless a computed/dynamic value truly requires it.
- **Imports order**: 1) external packages, 2) internal absolute imports (`@/components/...`), 3) relative imports, 4) types. One blank line between groups.
- **Async/data fetching**: Server components fetch data directly where possible; client components use hooks in `hooks/`. No fetch calls directly inside JSX render logic.
- **Validation**: All user input (post creation, solution submission, comments) validated with a schema (zod recommended) in `lib/validators/` before hitting the database — never trust client input.
- **Error handling**: No silent failures. API routes return typed error responses `{ error: string }` with appropriate status codes. Client-side, show the empty/error states defined in `DESIGN_SYSTEM.md`'s writing principles (clear, in the interface's voice, no vague messages).
- **Comments**: Only where intent isn't obvious from the code itself (business rule reasoning, edge-case handling). Don't narrate what the code already says.
- **No dead code / commented-out blocks** left in committed files.

## Tools & workflow context (for agent awareness)
- Architecture & design decisions: discussed with Claude
- Code analysis & bug fixing: Gemini
- General brainstorming: ChatGPT
- Implementation: Cursor + developer (primary hands-on build)

## Success criteria for MVP
A user can: sign up → post a problem → another user finds it, comments/submits a solution → original poster and community can upvote the best solution.