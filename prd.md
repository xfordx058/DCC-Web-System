# Requirements Document — Diocese of Catarman Website

## 1. Application Overview

**Application Name**: Diocese of Catarman Website (DCC WEB)

**Description**: A web-based platform for managing and displaying information about churches, priests, bishops, and events within the Diocese of Catarman. The system consists of two interfaces: an **Admin Panel** for data management (authenticated administrators only) and a **Public Website** for parishioners and visitors. The backend uses **Firebase** (Realtime Database, Auth, Storage) for data storage, authentication, and file uploads.

**Tech Stack**:
- React 18 + TypeScript
- Vite 8 (build tool)
- Tailwind CSS 3 (styling)
- Firebase (Realtime Database, Auth, Storage)
- Radix UI (dialog primitives)
- Framer Motion (animations)
- Lucide React (icons)

---

## 2. Design System — "Minimal" Theme

> Derived from `DESIGN.md` and the reference site (`reference.png`).

### 2.1 Color Palette

| Token | Value | Usage |
|---|---|---|
| Primary Background | `#FFFFFF` | Page background, cards |
| Secondary Background | `#F8F9FB` | Subtle section alternation |
| Primary Text | `#111827` | Headings, body text (dark gray, not pure black) |
| Secondary Text | `#6B7280` | Captions, metadata |
| Border | `#E5E7EB` | 1px borders on cards, dividers |
| Signal Color | Configurable | Selected states, primary buttons, active indicators |

### 2.2 Typography

- **Primary Font**: Montserrat (variable weight) — loaded from CDN
- **Hero Accent Font**: Playfair Display (serif) — for hero pull-quotes only
- **Hierarchy**: Information established through font size, weight, and spacing — not color or decoration

### 2.3 Spacing & Layout

- Content organized into clear modules with ample whitespace
- Section padding: `5rem` (80px) vertical
- Left-aligned text preferred; structured image layouts
- Max container width: `1400px` (public), `1200px` (admin content)

### 2.4 Visual Rules

- **Shadows ≈ 0**: No decorative box-shadows
- **Borders ≤ 1px**: Minimal border usage
- **Square corners**: Border-radius suppressed globally; small radii only where functional
- **Grayscale imagery**: Images display in grayscale, colorize on hover
- **Button style**: Border-only (no fill), text emphasis over color blocks

### 2.5 Animation

- **Elemental**: Minimalist, linear; elements slide into place along grid lines
- **Entrance**: No bounce/elasticity; natural document-like scroll with `ease-out`
- **Transition**: Fade-in or slight displacement on content load
- **Implementation**: `framer-motion` for hero/bishop animations; CSS transitions for general use
- **Reduced motion**: `prefers-reduced-motion` media query respected

---

## 3. Reference Site Structure

> Based on `reference.png` — the target visual design.

### 3.1 Header (Sticky, Clean)

```
┌──────────────────────────────────────────────────────────────────┐
│ DIOCESE OF     │ --°C • 03:33 PM    LATEST  PASTORAL  VISION   │
│ CATARMAN       │                        MISSION  CONTACT        │
└──────────────────────────────────────────────────────────────────┘
```

- **Logo**: "DIOCESE OF CATARMAN" — bold, uppercase, left-aligned
- **Weather/Time**: Real-time temperature and clock, center-left
- **Navigation**: Uppercase, light-weight, right-aligned — `LATEST`, `PASTORAL`, `VISION`, `MISSION`, `CONTACT`
- **Style**: 1px bottom border, white background, no shadow

### 3.2 Hero Section (Two-Column)

```
┌─────────────────────────────────┬──────────────────────────────┐
│                                 │                              │
│  God is for                     │   ┌──────────────────────┐   │
│  you                            │   │                      │   │
│  *and so we*                    │   │   Bishop Portrait    │   │
│  *are.*                         │   │                      │   │
│                                 │   └──────────────────────┘   │
│                                 │   MOST REV. EMMANUEL C.      │
│                                 │   TRANCE, D.D.               │
│                                 │   Current Bishop              │
│                                 │   Ordained: 199X              │
└─────────────────────────────────┴──────────────────────────────┘
```

- **Left column**: Large serif pull-quote (Playfair Display), editorial style
- **Right column**: Current bishop card with portrait, name, title, ordination year
- **Style**: Generous whitespace, minimal decoration

### 3.3 Content Sections (Top-to-Bottom)

| Section | Description |
|---|---|
| **Latest (Announcements)** | Active announcements in clean card layout |
| **Pastoral (Events)** | Upcoming events with dates |
| **Vision** | Diocese vision statement |
| **Mission** | Diocese mission statement |
| **Contact** | Contact details + Google Maps embed |

---

## 4. Users and Usage Scenarios

**Target Users**:
- **Admin Users**: Authenticated administrators who manage all system data
- **Public Visitors**: Parishioners and general visitors viewing public information (no login required)

**Core Usage Scenarios**:
- Admin logs in to manage priests, bishops, churches, events, announcements, year themes, heroes, and donations
- Admin searches and filters data across churches, events, and priests
- Admin uploads images for priests, bishops, churches, heroes, and year themes
- Admin enables/disables maintenance mode and configures maintenance settings
- Admin schedules maintenance periods and manages IP whitelist
- Admin views weather data with severity alerts and auto-refresh
- Admin exports weather event logs as CSV
- Public visitors view church information, clergy, events, announcements, live streams, statistics, and contact details
- Public visitors see maintenance page when maintenance mode is active
- Public visitors view weather information and current time/temperature in header

---

## 5. Page Structure

```
DCC WEB
├── Public Website (No login required)
│   ├── Header (sticky: logo, weather/time, navigation)
│   ├── Home (/)
│   │   ├── Hero Section (pull-quote + current bishop card)
│   │   ├── Announcements Banner
│   │   ├── Latest Events
│   │   ├── Parishes Section (photo stacks)
│   │   ├── Clergy Section
│   │   ├── Statistics
│   │   ├── Live Streams (YouTube embeds)
│   │   ├── Year Of Feature
│   │   ├── Weather Metrics
│   │   └── Vision & Mission
│   ├── Announcements (/announcements)
│   ├── Events (/events)
│   ├── Streams (/streams)
│   ├── Statistics (/statistics)
│   ├── Year Of (/year-of)
│   ├── Weather (/weather)
│   ├── Clergy (/clergy)
│   ├── Parishes (/parishes)
│   ├── Church Detail (/parishes/:id)
│   ├── Contact (/contact)
│   ├── Footer (contact, location map, explore links)
│   └── Maintenance Page (shown when maintenance mode active)
│
├── Login (/login)
│
└── Admin Panel (Login required)
    ├── Dashboard (/admin)
    ├── Priests Management (/admin/priests)
    ├── Bishops Management (/admin/bishops)
    ├── Churches Management (/admin/churches)
    ├── Events Management (/admin/events)
    ├── Announcements Management (/admin/announcements)
    ├── Year Of Management (/admin/yearof)
    ├── Heroes Management (/admin/heroes)
    ├── Donations Management (/admin/donations)
    ├── Weather Forecast (/admin/weather)
    ├── Maintenance Mode (/admin/maintenance)
    ├── Activity Logs (/admin/logs)
    ├── Settings (/admin/settings)
    └── Account (/admin/account)
```

---

## 6. Functional Specifications

### 6.1 Public Website

#### Header
- Sticky positioning (top: 0)
- Logo: "DIOCESE OF CATARMAN" — Montserrat, bold, uppercase
- Weather/time display: `29°C • 07:03 PM` format, real-time updates
- Navigation links: uppercase, light-weight, right-aligned
- Mobile: hamburger menu with slide-in drawer

#### Home Page
- **Hero**: Two-column layout — left: large serif pull-quote (Playfair Display); right: current bishop card with portrait, name, title, ordination year
- **Announcements**: Active announcements from Firebase, sorted newest-first
- **Events**: Upcoming non-expired events from Firebase
- **Parishes**: Church cards with photo stacks (grayscale → color on hover)
- **Clergy**: Priest cards with photos, assignments
- **Statistics**: 4-cell grid — total churches, priests, bishops, "1 Diocese"
- **Streams**: YouTube live stream embeds (lazy-loaded via IntersectionObserver)
- **Year Of**: Current year theme with image and description
- **Weather**: Current conditions from Open-Meteo API
- **Vision/Mission**: Editorial text sections

#### Announcements Page
- 3-column card grid of active announcements
- Each card: title, content, published date

#### Events Page
- 2-column grid with event image + text
- Non-expired events only

#### Clergy Page
- 3-column card grid of priests
- Each card: photo, name, assignment, ordination year, biography
- Links to parish detail

#### Parishes Page
- 3-column card grid of churches
- Each card: image, patron saint, address
- Filterable by status (Parish / Mission Center)

#### Church Detail Page
- Full church information: address, patron saint, year established, status, history
- Leadership section: main priest, assistant priests
- Secretary name

#### Weather Page
- Current weather metrics for Catarman area
- OpenStreetMap embed showing location

#### Contact Page
- Contact information
- Google Maps embed

#### Footer
- 4-column layout: contact info, location (Google Maps), explore links, branding
- "Managed by RBMDev — Diocese of Catarman"

#### Maintenance Page
- Displayed to all non-admin users when maintenance mode is active
- Customizable message, countdown timer, contact info
- Branded design matching site aesthetics

---

### 6.2 Admin Panel

#### Login Page
- Email and password fields
- Firebase Auth authentication
- "Forgot password" sends reset email
- Error toast on invalid credentials
- Persistence toggle (remember me)

#### Dashboard
- Stats grid: total churches, priests, events, announcements, year themes
- Search bar: filters across churches, priests, events
- Upcoming events list
- Maintenance mode status indicator
- Weather widget (if enabled in settings)
- Current bishop display

#### CRUD Pages (Generic — via `AdminCrudPage`)
- **Bishops**: name, year installed, image, isCurrent flag (exclusive boolean)
- **Events**: title, description, end date (auto-archived when expired)
- **Announcements**: title, content, published date, active status toggle
- **Year Of**: year name, description, isCurrent flag, image (exclusive boolean)
- **Heroes**: title, subtitle, caption, image, order, active status
- **Donations**: donor name, amount, date, payment method, reference, status, notes

Each CRUD page provides:
- Table/card list view with search
- Add/Edit dialog form
- Delete with confirmation
- Image upload to Firebase Storage
- Real-time data synchronization via Firebase RTDB

#### Custom CRUD Pages
- **Priests**: search, assignment filter, pagination (10/page), image upload, inline edit
- **Churches**: search, status filter, pagination, multi-select assistant priests, image upload

#### Weather Forecast
- Region-based weather data from Open-Meteo API
- Severity detection with color-coded alerts (red/severe, orange/high, yellow/moderate, blue/low)
- Auto-refresh with configurable intervals (5, 10, 30 minutes)
- Historical weather event logging to Firebase RTDB
- CSV export of weather alerts
- OpenStreetMap embed with region display

#### Maintenance Mode
- Toggle switch for immediate activation/deactivation
- Configuration: message, reason, start/end time, countdown toggle
- Contact info: email, phone, support link
- IP whitelist management (add/remove)
- Activity log with timestamp, admin, action, reason
- Live preview via `?maintenance-preview=1` query parameter

#### Activity Logs
- Unified log viewer combining maintenance and weather logs
- Search, source filter, date range filtering

#### Settings
- Dark mode toggle
- Weather widget toggle (dashboard visibility)
- Logout button

#### Account
- Admin profile: name, email
- Password change with confirmation
- Firebase Auth SDK integration

---

## 7. Data Architecture

### 7.1 Firebase Realtime Database Schema

```
/firebase/
├── announcements/{id}/     { title, content, publishedDate, active, createdAt }
├── bishops/{id}/           { name, yearInstalled, image, isCurrent }
├── churches/{id}/          { name, patronSaint, address, status, history,
│                             mainPriestId, assistantPriests[], image,
│                             secretary, coordinates }
├── donations/{id}/         { donorName, amount, date, method, reference,
│                             status, notes }
├── events/{id}/            { title, description, dateExpired, image }
├── heroes/{id}/            { title, subtitle, caption, image, order, active }
├── maintenanceMode/
│   └── config/             { enabled, message, reason, startAt, endAt,
│                             contactEmail, contactPhone, supportLink,
│                             countdownEnabled, template }
├── maintenanceLogs/{id}/   { action, reason, admin, createdAt }
├── priests/{id}/           { name, ordinationYear, assignment, photo,
│                             biography, status }
├── settings/               { theme: 'light'|'dark', weatherEnabled: boolean }
├── weatherEventLogs/{id}/  { date, region, eventType, severity,
│                             description, createdAt }
├── whitelistedIPs/{id}/    string (IP address)
└── admins/{uid}/           { name, email, updatedAt }
```

### 7.2 Firebase Storage Structure

```
/priests/{id}/{filename}
/bishops/{id}/{filename}
/churches/{id}/{filename}
/heroes/{id}/{filename}
/year-of/{id}/{filename}
```

---

## 8. Business Rules

### 8.1 Authentication & Access
- Admin Panel requires login via Firebase Auth (email/password)
- No public user registration; only admin accounts exist
- Public Website is accessible without login
- Only authenticated admins can access maintenance mode and weather management

### 8.2 Data Operations
- All data stored in Firebase Realtime Database (JSON tree)
- Real-time synchronization via `onValue()` listeners
- Images uploaded to Firebase Storage with download URLs stored in RTDB
- Generic CRUD abstraction (`AdminCrudPage`) handles create/edit/delete/image upload

### 8.3 Events
- Events with `dateExpired` in the past are automatically filtered from public view
- Admin can still view and manage expired events

### 8.4 Announcements
- Only announcements with `active: true` appear on public website
- Sorted by `publishedDate` (newest first)

### 8.5 Year Of Theme
- Only one theme can have `isCurrent: true` at a time
- Setting a new current theme automatically unmarks the previous

### 8.6 Church Assignment
- Each church has one main priest (`mainPriestId`)
- Each church can have multiple assistant priests (`assistantPriests[]`)

### 8.7 Maintenance Mode
- When enabled, all non-admin users see maintenance page
- Admin users and whitelisted IPs bypass maintenance
- Scheduled activation/deactivation via `startAt`/`endAt`
- Activity log records all toggle actions

### 8.8 Weather
- Data fetched from Open-Meteo API (free, no key required)
- Displayed in header (temperature/time), home page, and weather page
- Severe weather detection based on temperature/wind thresholds
- Auto-refresh with configurable intervals

### 8.9 Visual Style
- Minimal aesthetic: ample whitespace, restrained decor, gentle contrast
- Grayscale imagery that colorizes on hover
- Square corners, no shadows, 1px borders
- Responsive design for desktop, tablet, and mobile

---

## 9. Exceptions and Edge Cases

| Scenario | Handling |
|---|---|
| Invalid login credentials | Display error toast message |
| No events available | Display placeholder: "No upcoming events" |
| No announcements available | Display placeholder: "No announcements" |
| No current year theme set | Hide Year Of section |
| Image upload fails | Display error message, allow retry |
| Delete priest assigned to church | Warning, confirmation required, update church assignment |
| Delete church with assigned priests | Warning, confirmation required, remove assignments |
| Mark multiple year themes as current | System auto-unmarks previous current theme |
| Empty required fields on submit | HTML5 validation + visual feedback |
| Network error during data fetch | Display error, provide retry |
| Expired events visible | System filters expired events from public view |
| Inactive announcements visible | System filters inactive announcements from public view |
| Search returns no results | Display: "No results found" |
| Admin enables maintenance without message | Default: "Site is currently under maintenance" |
| Scheduled maintenance overlaps | Warning, require confirmation to override |
| Invalid IP format in whitelist | Validation error, prevent adding |
| Rapid maintenance toggle clicks | Rate limiting prevents accidental changes |
| Weather API unavailable | Display: "Weather information unavailable" |
| Header temperature unavailable | Display: `--°C • --:-- --` |
| Countdown reaches zero while active | Hide timer, display: "Maintenance in progress" |
| Non-admin access during maintenance | Redirect to maintenance page |
| Weather feature disabled | Hide widget immediately |

---

## 10. Acceptance Criteria

### Public Website
1. Visitor sees sticky header with logo, real-time temperature/time, and navigation links
2. Home page loads with hero section showing pull-quote and current bishop card
3. Announcements section displays active announcements sorted by newest first
4. Events section shows upcoming non-expired events
5. Parishes section displays church cards with grayscale-to-color hover effect
6. Clergy section shows priest cards with photos and assignments
7. Statistics section displays counts in a clean grid
8. Live streams section embeds YouTube videos with lazy loading
9. Year Of section shows current theme with image
10. Weather section displays current conditions from Open-Meteo
11. Contact section shows details and Google Maps embed
12. Footer displays contact info, map, and explore links
13. Maintenance page displays when maintenance mode is active (non-admin)
14. All pages responsive on mobile, tablet, and desktop

### Admin Panel
15. Admin logs in with valid credentials via Firebase Auth
16. Dashboard shows stats, search, upcoming events, maintenance status, weather widget
17. CRUD operations work for all entity types (bishops, events, announcements, year of, heroes, donations)
18. Priests and Churches pages support custom search, filter, and pagination
19. Image uploads succeed and display correctly
20. Weather page shows region-based data with severity detection
21. CSV export of weather alerts succeeds
22. Maintenance mode toggle activates/deactivates maintenance page
23. IP whitelist correctly allows bypass during maintenance
24. Activity log records all maintenance actions
25. Settings toggles (dark mode, weather widget) take effect immediately
26. Account page allows profile and password updates

---

## 11. Known Issues and Technical Debt

| Issue | Severity | Description |
|---|---|---|
| Massive CSS file (2,700+ lines) | High | `index.css` has duplicate/conflicting declarations; needs refactoring |
| Dead code | Medium | `AppContext.tsx`, `lib/admin.ts`, `routes.tsx` are unused |
| Inconsistent CRUD patterns | Medium | Priests/Churches use custom CRUD; others use `AdminCrudPage` |
| Mixed data access patterns | Medium | Some pages use `useRealtimeCollection`; others use manual `onValue` |
| Missing `DATABASE_URL` in `.env` | High | Firebase RTDB may fail to connect |
| Playfair Display not loaded | Medium | Referenced in CSS but never imported; falls back to Georgia |
| No error boundaries | High | Any component crash brings down entire app |
| No loading skeletons | Medium | "Loading..." text instead of skeleton UI |
| No form validation library | Medium | Only HTML5 `required` attribute; no Zod or React Hook Form |
| Weather fetched 3x redundantly | Low | Header, Home, Weather all fetch independently |
| Hardcoded YouTube URLs | Low | Streams page not reading from database |
| Login has custom toast | Low | Not using the shared Toaster component |

---

## 12. Improvement Roadmap

### Phase 1 — Stabilization (Priority: Critical)
1. Add `VITE_FIREBASE_DATABASE_URL` to `.env`
2. Remove dead code (`AppContext.tsx`, `lib/admin.ts`, `routes.tsx`)
3. Add React Error Boundaries around routes
4. Fix Playfair Display font loading
5. Consolidate duplicate CSS declarations in `index.css`

### Phase 2 — Consistency (Priority: High)
6. Refactor Priests and Churches admin pages to use `AdminCrudPage`
7. Create shared data access hook for all Firebase RTDB listeners
8. Extract shared TypeScript types into a `types/` directory
9. Replace Login custom toast with shared Toaster
10. Add loading skeleton components for public pages

### Phase 3 — Polish (Priority: Medium)
11. Create shared weather context/hook to eliminate redundant fetches
12. Make Streams page dynamic (read from database)
13. Add form validation with Zod schemas
14. Add loading states and error handling to all CRUD operations
15. Implement `tailwindcss-intersect` plugin for viewport animations

### Phase 4 — Professional (Priority: Low)
16. Add SEO meta tags and Open Graph data
17. Implement Lighthouse performance optimizations
18. Add unit tests for critical paths
19. Set up CI/CD pipeline
20. Add Content Security Policy headers

---

## 13. Out of Scope for This Release

- User accounts for parish staff
- Mass schedule per church
- Feedback or contact form for visitors
- Multi-language support
- Mobile app version
- Advanced analytics or reporting
- Email notifications
- Calendar integration
- Document management
- Role-based permissions (multiple admin roles)
- Batch operations (bulk delete, bulk edit)
- Version history or change tracking
- Integration with third-party systems beyond weather service
- Custom themes beyond light/dark mode
- Social media sharing features
- Comments or feedback on events
- Event registration or RSVP
- Rich text editor for content
- A/B testing
- API for external integrations
