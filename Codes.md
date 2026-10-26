# Project Codes and Structure
Generated on Wed Jul 22 10:20:24 AM CST 2026

# Code Updates

## Animation & UI Enhancements
- **Header Scroll Effect:** Added shrink and transparency effect on scroll in `PublicLayout.tsx`.
- **Hero Title Animation:** Implemented a word-by-word fade-in using `framer-motion` in `Home.tsx`.
- **Logo Hover Animation:** Added a subtle scale and rotation on hover for the logo.
- **Mobile Announcement Marquee:** Added an infinitely scrolling CSS marquee effect for the announcement banner on small screens.
- **Modal Layout Responsiveness:** Fixed `DialogContent` layout using flex containers and `max-h-[90dvh]` to resolve overflow issues on mobile (`Clergy.tsx` and `Parishes.tsx`).
- **Modal Spring Animation:** Replaced standard Radix UI fade/scale in `dialog.tsx` with a custom `cubic-bezier(0.175, 0.885, 0.32, 1.15)` easing and a 500ms duration for a polished, subtle spring effect.
- **Modal Aesthetic Refinement:** Stripped out extraneous decorative colors (`text-primary`, `bg-muted/30`, colorful badges) in both Clergy and Parishes modals. Transitioned to a strictly neutral, minimalist palette using `bg-background` and `text-muted-foreground` to align perfectly with the "Minimal" design aesthetic of the site.


## File Structure
```
.
├── biome.json
├── components.json
├── create_admin.js
├── docs
│   ├── DESIGN.md
│   ├── MODAL_DESIGN_SPEC.md
│   └── prd.md
├── generate_codes.sh
├── historical_context.txt
├── history
│   └── config.json
├── index.html
├── package.json
├── package-lock.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── postcss.config.js
├── public
│   ├── favicon.png
│   └── images
│       ├── error
│       │   ├── 404-dark.svg
│       │   ├── 404.svg
│       │   ├── 500-dark.svg
│       │   ├── 500.svg
│       │   ├── 503-dark.svg
│       │   └── 503.svg
│       ├── favicon.ico
│       ├── logo
│       │   ├── auth-logo.svg
│       │   ├── logo-dark.svg
│       │   └── logo-icon.svg
│       └── shape
│           └── grid-01.svg
├── README.md
├── refactor2.cjs
├── refactor.cjs
├── refactor.js
├── seed-admin.js
├── seed-admin.mjs
├── sgconfig.yml
├── src
│   ├── App.tsx
│   ├── components
│   │   ├── common
│   │   │   ├── IntersectObserver.tsx
│   │   │   ├── MaintenanceGuard.tsx
│   │   │   ├── PageMeta.tsx
│   │   │   └── RouteGuard.tsx
│   │   ├── dropzone.tsx
│   │   ├── layouts
│   │   │   ├── AdminLayout.tsx
│   │   │   └── PublicLayout.tsx
│   │   ├── public
│   │   │   └── WeatherWidget.tsx
│   │   └── ui
│   │       ├── accordion.tsx
│   │       ├── alert-dialog.tsx
│   │       ├── alert.tsx
│   │       ├── aspect-ratio.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── breadcrumb.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── chart.tsx
│   │       ├── checkbox.tsx
│   │       ├── collapsible.tsx
│   │       ├── command.tsx
│   │       ├── content-modal.tsx
│   │       ├── context-menu.tsx
│   │       ├── dialog.tsx
│   │       ├── drawer.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── expandable-text.tsx
│   │       ├── form.tsx
│   │       ├── hover-card.tsx
│   │       ├── input-otp.tsx
│   │       ├── input.tsx
│   │       ├── kbd.tsx
│   │       ├── label.tsx
│   │       ├── menubar.tsx
│   │       ├── multi-select.tsx
│   │       ├── navigation-menu.tsx
│   │       ├── pagination.tsx
│   │       ├── popover.tsx
│   │       ├── progress.tsx
│   │       ├── qrcodedataurl.tsx
│   │       ├── radio-group.tsx
│   │       ├── resizable.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── slider.tsx
│   │       ├── sonner.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── toast.tsx
│   │       ├── toggle-group.tsx
│   │       ├── toggle.tsx
│   │       ├── tooltip.tsx
│   │       ├── video.css
│   │       └── video.tsx
│   ├── contexts
│   │   └── AuthContext.tsx
│   ├── db
│   │   └── supabase.ts
│   ├── global.d.ts
│   ├── hooks
│   │   ├── use-debounce.ts
│   │   ├── use-go-back.ts
│   │   ├── use-mobile.tsx
│   │   └── use-supabase-upload.ts
│   ├── index.css
│   ├── lib
│   │   └── utils.ts
│   ├── main.tsx
│   ├── pages
│   │   ├── admin
│   │   │   ├── Account.tsx
│   │   │   ├── Announcements.tsx
│   │   │   ├── Bishops.tsx
│   │   │   ├── Churches.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Donations.tsx
│   │   │   ├── Events.tsx
│   │   │   ├── Heroes.tsx
│   │   │   ├── Logs.tsx
│   │   │   ├── Maintenance.tsx
│   │   │   ├── Priests.tsx
│   │   │   ├── Settings.tsx
│   │   │   └── YearOf.tsx
│   │   ├── auth
│   │   │   └── Login.tsx
│   │   └── public
│   │       ├── Clergy.tsx
│   │       ├── ContentExpansionShowcase.tsx
│   │       ├── Events.tsx
│   │       ├── Home.tsx
│   │       ├── Maintenance.tsx
│   │       ├── ModalShowcase.tsx
│   │       └── Parishes.tsx
│   ├── routes.tsx
│   ├── services
│   ├── svg.d.ts
│   ├── types
│   │   └── index.ts
│   └── vite-env.d.ts
├── supabase
│   ├── config.toml
│   └── migrations
│       ├── 00001_01_initial_schema.sql
│       ├── 00002_02_rls_policies.sql
│       ├── 00003_03_seed_data.sql
│       ├── 00004_04_new_diocese_schema.sql
│       ├── 00005_create_heroes_table.sql
│       ├── 00006_create_maintenance_tables.sql
│       ├── 00007_create_maintenance_subscribers.sql
│       ├── 00008_fix_maintenance_fkeys.sql
│       ├── 00009_create_announcements_table.sql
│       ├── 00010_create_donations_table.sql
│       ├── 00011_00011_seed_donations.sql
│       ├── 00012_create_admin_logs.sql
│       ├── 00013_add_image_to_events.sql
│       ├── 00014_add_detail_fields.sql
│       ├── 00015_add_assignment_history.sql
│       └── 00016_seed_assignment_history.sql
├── tailwind.config.js
├── tasks
│   ├── 00013_add_image_to_events.sql
│   ├── 00016_seed_assignment_history.sql
│   ├── 3f0944ba-9f54-4717-9f26-5a17ce699e16.jpg
│   ├── 85c29c5e-b511-4379-aeb9-eefe5c5eee7e.jpg
│   ├── Announcements.tsx
│   ├── App.tsx
│   ├── Bishops.tsx
│   ├── Churches.tsx
│   ├── Clergy.tsx
│   ├── Codes.md
│   ├── ContentExpansionShowcase.tsx
│   ├── content-modal.tsx
│   ├── design.png
│   ├── DSD.png
│   ├── Events.tsx
│   ├── expandable-text.tsx
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── logo.jpg
│   ├── MODAL_DESIGN_SPEC.md
│   ├── ModalShowcase.tsx
│   ├── neondb_guide.tmp
│   ├── package.json
│   ├── package-lock.json
│   ├── PageMeta.tsx
│   ├── Parishes.tsx
│   ├── Priests.tsx
│   ├── PublicLayout.tsx
│   ├── screenshot-1784620577070.png
│   ├── seed-admin.js
│   ├── seed-admin.mjs
│   └── web.pdf
├── tsconfig.app.json
├── tsconfig.check.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

27 directories, 187 files
```

## Source Files
### docs/DESIGN.md
```md
# Theme Name: Minimal
# Vibe & Description: Prioritizing a sense of airiness, it establishes information hierarchy through ample whitespace and clear distinctions in font size, weight, and spacing. The design remains extremely restrained, with almost no use of shadows or decorative colors, while ensuring long‑term reading comfort through gentle contrast and fine, non‑sharp typefaces.

# Color
- Primary Background: #FFFFFF;
-Secondary Background: #F8F9FB → Use only extremely subtle color differences to distinguish layers.
- Primary Text: #111827 (dark gray rather than pure black).
- Secondary Text: #6B7280.
- Border: #E5E7EB (1px).
- Unique Signal Color (selectable based on user requirements): Used for selected states, primary buttons, and current status indicators.

# Font
- Heading & Body: Montserrat (url: https://resource-static.bj.bcebos.com/fonts/Montserrat-VariableFont_wght.woff2)
# Animation
## Elemental animation
-The animation is minimalist and linear. Elements slide into place along the grid lines;
## Entrance animation
- There is no bouncing or elasticity effect; the page scrolls naturally like a document with an ease-out effect.
##Transition animation
- Use a fade-in or slight displacement when loading content;
##Animation implementation
- The project integrates the tailwindcss-intersect plugin, which allows you to achieve animation effects when elements enter the viewport in a manner similar to the following:
opacity-0 intersect:opacity-100 transition duration-700
- Animations can also be achieved using motion/react.

# Layout
- Content is organized into clear modules. Ample white space is used to distinguish different sections.
- Prefers left-aligned text and structured image layouts, avoiding decorative misalignments.

# Elements
- Prefers minimalist linear charts with uniform stroke thickness and no fill.
- Shadow ≈ 0, border ≤ 1px, minimizes the button's visual impact; main button ≠ large color block, emphasizes text more.
```

### docs/MODAL_DESIGN_SPEC.md
```md
# Professional Modal Dialog Component - Design Specification

## 1. Overview
The modal dialog component serves as a focused overlay for important interactions, including alerts, confirmations, form submissions, and information displays. Following the "Minimal" aesthetic template, it prioritizes ample whitespace, clean typography, and restrained use of borders and shadows.

## 2. Core Functionality & Anatomy
A standard modal consists of the following layers and areas:
- **Backdrop (Overlay)**: A semi-transparent layer (`bg-black/80` or `bg-background/80` with backdrop blur) that obscures the main content, preventing interaction with the background.
- **Container**: The modal window itself, centered vertically and horizontally. 
- **Header**: Contains the `DialogTitle`, optional `DialogDescription`, and an absolute-positioned top-right `X` close button.
- **Content Area**: The scrollable or fixed body containing text, lists, or form fields.
- **Footer**: The action area, typically right-aligned, containing Primary (Confirm/Submit) and Secondary (Cancel) buttons.

## 3. Visual Design (Minimal Aesthetic)
- **Container Styling**: `bg-background` (pure white or dark gray depending on theme), rounded corners (`rounded-xl` or `rounded-lg`), subtle shadow (`shadow-lg`), and minimal or no borders (`border border-border/50`).
- **Typography**: 
  - Title: 18px-20px (`text-lg font-semibold`), neutral high contrast.
  - Body/Description: 14px (`text-sm`), muted text (`text-muted-foreground`) for secondary information.
  - Form Labels: 14px (`text-sm font-medium`).
- **Spacing**: Generous padding (`p-6` or `p-8` for header/content, `gap-4` between elements).

## 4. Interaction & Accessibility Requirements
- **Keyboard Navigation**: 
  - `Escape` to close the modal.
  - `Tab` traps focus within the modal container.
- **ARIA Attributes**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` linked to the title.
- **Focus Management**: Focus automatically moves to the first focusable element (or the modal container) upon opening, and returns to the trigger button upon closing.
- **Mobile Responsive**: Max-width is constrained (`max-w-[calc(100%-2rem)] md:max-w-lg`). On smaller screens, the modal may take up most of the screen, with action buttons stacking vertically if necessary.

## 5. Modal Types & Variations

### A. Information Modal
Used for displaying large blocks of text or detailed views (e.g., terms of service, profile details).
- **Structure**: Header (Title), Scrollable Content Area (`max-h-[60vh]`), Footer (Close button).
- **Actions**: Single "Close" button.

### B. Confirmation / Alert Modal
Used for destructive actions or important confirmations.
- **Structure**: Header (Title, Alert Icon), Content (Warning message), Footer (Cancel, Confirm/Delete).
- **Styling**: Primary button uses `variant="destructive"` (red background) for dangerous actions.

### C. Form Submission Modal
Used for creating or editing records without leaving the context of the current page.
- **Structure**: Header (Title), Content (Inputs, Selects), Footer (Cancel, Submit).
- **Styling**: Uses `React Hook Form` or standard controlled inputs with clear labels.

## 6. Implementation Example (React + Tailwind + shadcn/ui)

```tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function StandardModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Modal</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[calc(100%-2rem)] md:max-w-lg rounded-xl">
        <DialogHeader>
          <DialogTitle>Modal Title</DialogTitle>
          <DialogDescription>
            This is a brief description of the modal's purpose.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 text-sm text-foreground">
          <p>Main content area. Place your forms, text, or elements here.</p>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" type="button">Cancel</Button>
          <Button type="submit">Confirm Action</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

```

### docs/prd.md
```md
# Requirements Document

## 1. Application Overview

**Application Name**: Diocese Website Management System

**Description**: A web-based platform for managing and displaying information about churches, priests, bishops, and events within the Diocese of Catarman. The system consists of two interfaces: an Admin Panel for data management (accessible only to authenticated administrators) and a Public Website for parishioners and visitors to view church information, events, and contact details. The backend uses Supabase (PostgreSQL, Storage, Auth) for data storage and authentication.

## 2. Users and Usage Scenarios

**Target Users**:
- Admin Users: Authenticated administrators who manage all system data
- Public Visitors: Parishioners and general visitors viewing public information (no login required)

**Core Usage Scenarios**:
- Admin logs in to manage priests, bishops, churches, events, announcements, and year themes
- Admin searches and filters data across churches, events, and priests
- Admin uploads images for priests, bishops, churches, and year themes
- Admin enables/disables maintenance mode and configures maintenance settings
- Admin schedules maintenance periods and manages IP whitelist
- Admin views live interactive weather map with real-time data for multiple regions
- Admin monitors severe weather alerts and exports weather event logs
- Admin configures weather feature display and auto-refresh intervals
- Public visitors view church information, upcoming events, announcements, live streams, statistics, and contact details
- Public visitors access Google Maps location and social media embeds
- Public visitors see maintenance page when maintenance mode is active
- Public visitors view weather information and current time/temperature in header

## 3. Page Structure and Functional Description

### Page Structure
```
Diocese Website Management System
├── Public Website (No login required)
│   ├── Header (with temperature and time display)
│   ├── Hero Banner
│   ├── Announcements Section
│   ├── Events Section
│   ├── Live Streams Section
│   ├── Statistics Section
│   ├── Year Of Section
│   ├── Weather Section
│   ├── Contact & Map Section
│   ├── Footer
│   └── Maintenance Page (shown when maintenance mode active)
└── Admin Panel (Login required)
    ├── Login Page
    ├── Dashboard
    ├── Priests Management
    ├── Bishops Management
    ├── Churches Management
    ├── Events Management
    ├── Announcements Management
    ├── Year Of Management
    ├── Weather Forecast Management
    ├── Maintenance Mode Management
    ├── Settings
    └── Account
```

### 3.1 Public Website

#### 3.1.1 Header
- Display current temperature and time in format: 29°C • 07:03 PM
- Temperature data fetched from weather service
- Time displays current local time, updates in real-time

#### 3.1.2 Hero Banner
- Display church background image
- Overlay with 60% transparent dark layer
- Text aligned left with 30px margin:
  + Title: \"Diocese of Catarman\"
  + Subtitle: \"Serving Faith Through Digital Connection\"

#### 3.1.3 Announcements Section
- Display list of active announcements loaded from Supabase
- Each announcement shows: Title, Content, Published Date
- Announcements sorted by published date (newest first)

#### 3.1.4 Events Section
- Display list of upcoming events loaded from Supabase
- Each event shows: Event Title, Description, End Date
- Events sorted by date

#### 3.1.5 Live Streams Section
- Facebook Live video embed
- YouTube video embed

#### 3.1.6 Statistics Section
- Display in 2-column grid:
  + Total Churches count (Parish + Mission Center combined)
  + Total Priests count

#### 3.1.7 Year Of Section
- Display current year theme (marked as \"isCurrent\" in database)
- Show: Year Name (e.g., \"Year of Faith\"), Description, Background Image

#### 3.1.8 Weather Section
- Display current weather information for Catarman area
- Show: Temperature, Weather condition, Humidity, Wind speed

#### 3.1.9 Contact & Map Section
- Display contact information
- Embed Google Maps showing DCC Catarman location

#### 3.1.10 Footer
- Text: \"Managed by RBMDev — Diocese of Catarman\"

#### 3.1.11 Maintenance Page
- Displayed to all non-admin users when maintenance mode is active
- Show customizable maintenance message
- Display estimated restoration time or end date
- Show countdown timer (if enabled) with hours, minutes, seconds remaining
- Display contact information (email, phone, support link)
- Include optional newsletter signup or notification request form
- Branded design matching site aesthetics
- Mobile-responsive layout

### 3.2 Admin Panel

#### 3.2.1 Login Page
- Email and password input fields
- Login button to authenticate admin users
- Authentication handled by Supabase Auth
- Display visible error toast message when invalid credentials are entered

#### 3.2.2 Dashboard
- Display list of upcoming events sorted by date
- Search bar to filter by church name, event title, or priest name
- Summary display showing total counts:
  + Total Churches
  + Total Priests
  + Total Events
  + Total Announcements
  + Total Year Of themes
- Graph or count visualization of the above statistics
- Maintenance mode status indicator showing current state (active/inactive)
- Weather forecast widget (if enabled in settings) displaying current weather summary and recent severe alerts

#### 3.2.3 Priests Management
- Display list of all priests
- Each entry shows: Name, Ordain Year, Assignment (church), Image
- Actions:
  + Add Priest button
  + Edit button for each priest
  + Delete button for each priest
- Add/Edit form fields:
  + Name (text input)
  + Ordain Year (text input)
  + Assignment (dropdown or text input for church)
  + Image Upload (file upload to Supabase Storage)

#### 3.2.4 Bishops Management
- Display list of all bishops
- Each entry shows: Name, Year Installed, Image, Current Bishop flag
- Actions:
  + Add Bishop button
  + Edit button for each bishop
  + Delete button for each bishop
- Add/Edit form fields:
  + Name (text input)
  + Year Installed (text input)
  + Image Upload (file upload to Supabase Storage)
  + Mark as Current Bishop (checkbox)

#### 3.2.5 Churches Management
- Display churches in grid or list view (toggle option)
- Each church card shows: Church Address, Patron Saint, Status (Parish/Mission Center)
- View Info button opens modal with full details:
  + Church Address
  + Patron Saint (churchPatruno)
  + Year Established
  + Status (Parish or Mission Center)
  + History
  + Main Priest in-charge (dropdown selection)
  + Assistant priests (multi-select dropdown)
  + Secretary name
  + Image Upload (file upload to Supabase Storage)
- Actions:
  + Add Church button
  + Edit button for each church
  + Delete button for each church

#### 3.2.6 Events Management
- Display list of all events
- Each entry shows: Event Title, Description, End Date (dateExpired)
- Actions:
  + Add Event button
  + Update/Extend button for each event
  + Delete button for each event
- Add/Edit form fields:
  + Event Title (text input)
  + Description (text area)
  + End Date (dateExpired) (date picker)
- Expired events are automatically archived or hidden from public view

#### 3.2.7 Announcements Management
- Display list of all announcements
- Each entry shows: Title, Content, Published Date, Status (Active/Inactive)
- Actions:
  + Add Announcement button
  + Edit button for each announcement
  + Delete button for each announcement
  + Toggle Active/Inactive status
- Add/Edit form fields:
  + Title (text input)
  + Content (text area)
  + Published Date (date picker)
  + Status (Active/Inactive toggle)

#### 3.2.8 Year Of Management
- Display list of all year themes
- Each entry shows: Year Name, Description, Is Current flag, Image
- Actions:
  + Add Year Of button
  + Edit button for each year theme
  + Delete button for each year theme
- Add/Edit form fields:
  + Year Name (text input, e.g., \"Year of Hope\")
  + Description (text area)
  + Is Current (checkbox, only one can be marked as current)
  + Image Upload (file upload to Supabase Storage)

#### 3.2.9 Weather Forecast Management
- Live interactive weather map using OpenStreetMap
- Display current weather data:
  + Temperature
  + Humidity
  + Wind speed
  + Precipitation
- Severe weather alerts panel:
  + List of active alerts with color-coded severity levels (e.g., red for severe, yellow for moderate)
  + Alert details: Type, Region, Start time, End time, Description
- Location-based filtering:
  + Dropdown or search input to select region
  + Map updates to show selected region weather data
- Auto-refresh configuration:
  + Toggle to enable/disable auto-refresh
  + Dropdown to select refresh interval (e.g., 5 minutes, 10 minutes, 30 minutes)
- Historical weather events log:
  + Table displaying past severe weather events with columns: Date, Region, Event Type, Severity, Description
  + Sortable by date and severity
- Export weather alerts:
  + Export button to download alerts as CSV or PDF
- Toggle to enable/disable weather feature display in admin dashboard

#### 3.2.10 Maintenance Mode Management
- Prominently displayed control section in admin dashboard
- Toggle switch to enable/disable maintenance mode with single-click activation
- Configuration settings:
  + Maintenance message/description (text area)
  + Estimated end time or duration (date/time picker)
  + Enable countdown timer (checkbox)
  + Contact email (text input)
  + Contact phone number (text input)
  + Support link (text input)
  + Maintenance page template selector (dropdown or visual selector)
- Scheduled maintenance:
  + Start date/time (date/time picker)
  + End date/time (date/time picker)
  + Automatic activation/deactivation based on schedule
- IP whitelist management:
  + Add IP address (text input with Add button)
  + Display list of whitelisted IPs
  + Remove IP button for each entry
- Activity log:
  + Display table with columns: Timestamp, Admin User, Action (Enabled/Disabled), Reason/Notes, Duration
  + Sortable and filterable by date range
- Live preview button to review maintenance page before publishing
- Save configuration button

#### 3.2.11 Settings
- Theme color switch (light/dark mode toggle)
- Weather feature display toggle (enable/disable weather widget on dashboard)
- Logout button

#### 3.2.12 Account
- Display admin profile information
- Editable fields:
  + Name (text input)
  + Email (text input)
  + Password (password input with confirmation)
- Save Changes button

## 4. Business Rules and Logic

### 4.1 Authentication and Access Control
- Admin Panel requires login via Supabase Auth (email/password)
- No public user registration; only admin accounts exist
- Public Website is accessible without login
- Only authenticated admin users can access Maintenance Mode Management and Weather Forecast Management

### 4.2 Data Storage
- All data stored in Supabase PostgreSQL database
- Database tables correspond to data models: churches, staff, admins/profiles, priests, bishops, events, announcements, yearOf, maintenanceMode, maintenanceLogs, whitelistedIPs, weatherEventLogs
- Images uploaded to Supabase Storage
- Weather event logs stored in weatherEventLogs table with fields: id, date, region, eventType, severity, description, createdAt

### 4.3 Events Management
- Events with End Date (dateExpired) in the past are automatically archived
- Archived events do not appear on Public Website
- Admin can still view and manage archived events in Admin Panel

### 4.4 Announcements Management
- Only announcements with Status set to Active appear on Public Website
- Announcements sorted by Published Date (newest first)
- Admin can toggle announcement status between Active and Inactive

### 4.5 Year Of Theme
- Only one year theme can be marked as \"Is Current\" at a time
- When admin marks a new year theme as current, the previous current theme is automatically unmarked
- Public Website displays only the current year theme

### 4.6 Church Assignment
- Each church has one Main Priest in-charge (single selection)
- Each church can have multiple Assistant priests (multi-select)
- Priests are assigned to churches via dropdown/multi-select in Churches Management

### 4.7 Statistics Calculation
- Total Churches count includes both Parish and Mission Center statuses
- Total Priests count includes all priests in the database
- Total Announcements count includes all announcements regardless of status
- Counts are dynamically calculated from database

### 4.8 Search and Filter
- Dashboard search bar filters results across churches, events, and priests
- Search matches against church names, event titles, and priest names

### 4.9 Maintenance Mode Logic
- When maintenance mode is enabled, all non-admin users see maintenance page
- Admin users and whitelisted IP addresses can access site normally during maintenance
- Scheduled maintenance activates and deactivates automatically based on configured start/end times
- Only one maintenance mode configuration can be active at a time
- Countdown timer calculates remaining time based on configured end time
- Activity log records all maintenance mode actions with timestamp, admin user, and reason
- Live preview generates temporary view of maintenance page without activating mode

### 4.10 Weather Information
- Weather data fetched from external weather service (e.g., Open-Meteo API)
- Display current weather conditions for Catarman area on Public Website
- Header displays current temperature and time, updated in real-time
- Data refreshed periodically

### 4.11 Weather Forecast Management Logic
- Real-time weather data fetched from Open-Meteo or similar free API
- Weather map displays current conditions for selected region using OpenStreetMap
- Severe weather alerts color-coded by severity: red (severe), orange (high), yellow (moderate), blue (low)
- Auto-refresh enabled by default with configurable intervals (5, 10, 30 minutes)
- Historical weather events automatically logged to database when severe alerts are detected
- Admin can export weather alerts as CSV or PDF file
- Weather feature display toggle in Settings controls visibility of weather widget on Dashboard
- Location-based filtering allows admin to view weather for multiple regions within diocese coverage area

### 4.12 Visual Style
- Follow \"Minimal\" aesthetic template: ample whitespace, restrained decor, gentle contrast
- Use neutral tones and clear typography
- Responsive design for desktop and mobile devices

## 5. Exceptions and Edge Cases

| Scenario | Handling |
|----------|----------|
| Invalid login credentials | Display visible error toast message |
| No events available | Display placeholder: \"No upcoming events\" on Public Website |
| No announcements available | Display placeholder: \"No announcements\" on Public Website |
| No current year theme set | Display placeholder or hide Year Of section on Public Website |
| Image upload fails | Display error message, allow retry |
| Delete priest assigned to church | Display warning, require confirmation, update church assignment to empty |
| Delete church with assigned priests | Display warning, require confirmation, remove assignments |
| Mark multiple year themes as current | System automatically unmarks previous current theme |
| Empty required fields on form submit | Highlight fields, display validation messages |
| Network error during data fetch | Display error message, provide retry button |
| Expired events still visible | System automatically filters expired events from public view |
| Inactive announcements visible | System automatically filters inactive announcements from public view |
| Duplicate priest or bishop name | Allow duplicate names (no unique constraint) |
| Duplicate announcement title | Allow duplicate titles (no unique constraint) |
| Search returns no results | Display message: \"No results found\" |
| Admin enables maintenance mode without message | Use default message: \"Site is currently under maintenance\" |
| Scheduled maintenance overlaps with active maintenance | Display warning, require confirmation to override |
| Invalid IP address format in whitelist | Display validation error, prevent adding |
| Maintenance mode toggle clicked rapidly | Rate limiting prevents accidental rapid changes |
| Admin loses connection during maintenance activation | Rollback to previous state, log error |
| Weather service unavailable | Display placeholder: \"Weather information unavailable\" |
| Header temperature/time data unavailable | Display placeholder: \"-- °C • --:-- --\" |
| Countdown timer reaches zero but mode still active | Hide timer, display message: \"Maintenance in progress\" |
| Non-admin user attempts to access admin panel during maintenance | Redirect to maintenance page |
| Whitelisted IP removed while user is active | User session remains valid until logout or session expiry |
| Weather API rate limit exceeded | Display cached weather data with timestamp, retry after cooldown period |
| No severe weather alerts available | Display message: \"No active weather alerts\" |
| Weather map fails to load | Display error message, provide reload button |
| Invalid region selected for weather filtering | Display validation error, reset to default region |
| Auto-refresh interval set to invalid value | Use default interval (10 minutes) |
| Weather event log export fails | Display error message, allow retry |
| Historical weather events table empty | Display message: \"No historical weather events recorded\" |
| Weather feature disabled but widget still visible | Hide widget immediately when toggle is disabled |

## 6. Acceptance Criteria

1. Public visitor accesses Public Website, views Header displaying current temperature and time in format 29°C • 07:03 PM
2. Public visitor views Hero Banner with church background image and overlay text \"Diocese of Catarman\" and \"Serving Faith Through Digital Connection\"
3. Public visitor scrolls to Announcements Section, sees list of active announcements with titles, content, and published dates sorted by newest first
4. Public visitor scrolls to Events Section, sees list of upcoming events with titles, descriptions, and end dates
5. Public visitor views Live Streams Section with embedded Facebook and YouTube videos
6. Public visitor views Statistics Section showing total count of Churches (Parish + Mission Center) and total count of Priests in 2-column grid
7. Public visitor views Year Of Section displaying current year theme with name, description, and background image
8. Public visitor views Weather Section displaying current weather information for Catarman area
9. Public visitor views Contact & Map Section with contact information and embedded Google Maps showing DCC Catarman location
10. Public visitor views Footer displaying text \"Managed by RBMDev — Diocese of Catarman\"
11. Admin attempts login with invalid credentials, visible error toast message appears
12. Admin logs in with valid email and password via Supabase Auth, successfully accesses Admin Panel Dashboard
13. Admin views Dashboard with list of upcoming events, search bar, summary counts of Churches, Priests, Events, Announcements, Year Of themes, maintenance mode status indicator, and weather forecast widget (if enabled)
14. Admin navigates to Priests Management, adds a new priest with name, ordain year, assignment, and image upload, saves successfully
15. Admin navigates to Churches Management, views church in grid/list view, opens church modal, assigns Main Priest in-charge and Assistant priests via dropdown/multi-select, saves successfully
16. Admin navigates to Events Management, adds a new event with title, description, and end date, saves successfully, event appears on Public Website
17. Admin navigates to Announcements Management, adds a new announcement with title, content, published date, and sets status to Active, saves successfully, announcement appears on Public Website
18. Admin navigates to Announcements Management, toggles an announcement status to Inactive, announcement disappears from Public Website
19. Admin navigates to Year Of Management, adds a new year theme with name, description, image, and marks as current, previous current theme is automatically unmarked, new theme appears on Public Website
20. Admin navigates to Weather Forecast Management, views live interactive weather map using OpenStreetMap displaying current temperature, humidity, wind speed, and precipitation for selected region
21. Admin views severe weather alerts panel with color-coded severity levels, selects an alert to view details including type, region, start time, end time, and description
22. Admin uses location-based filtering dropdown to select a different region, weather map and data update to show selected region
23. Admin enables auto-refresh toggle, selects 10-minute refresh interval, weather data updates automatically every 10 minutes
24. Admin views historical weather events log table showing past severe weather events sorted by date and severity
25. Admin clicks export button, downloads weather alerts as CSV file successfully
26. Admin navigates to Settings, toggles weather feature display off, returns to Dashboard, weather widget is hidden
27. Admin navigates to Maintenance Mode Management, toggles maintenance mode on, configures message and end time, saves configuration, public visitors see maintenance page with countdown timer
28. Admin adds IP address to whitelist, user from whitelisted IP accesses site normally during maintenance mode

## 7. Out of Scope for This Release

- User accounts for parish staff
- Mass schedule per church
- Feedback or contact form for visitors
- Multi-language support
- Mobile app version
- Advanced analytics or reporting
- Email notifications for maintenance mode activation
- Calendar integration
- Document management
- Role-based permissions (multiple admin roles)
- Data export functionality (except weather alerts)
- Advanced search filters (date range, status, etc.)
- Batch operations (bulk delete, bulk edit)
- Version history or change tracking
- Integration with third-party systems beyond weather service
- Custom themes beyond light/dark mode
- Social media sharing features
- Comments or feedback on events or announcements
- Event registration or RSVP functionality
- Announcement subscription or notification system
- Rich text editor for announcement content
- Announcement categories or tags
- Automated weather alerts or notifications
- Historical weather data display beyond severe events log
- Multi-location weather support beyond diocese regions
- Maintenance mode notification emails to subscribers
- SMS notifications for maintenance periods
- Custom maintenance page HTML/CSS editor
- A/B testing for maintenance page designs
- Maintenance mode API for external integrations
- Weather forecast predictions (only current conditions)
- Weather radar imagery
- Satellite weather imagery
- Weather alerts push notifications
- Integration with national weather services
- Custom weather alert thresholds
- Weather data visualization charts or graphs
- Weather comparison across multiple regions simultaneously
- Weather API key management interface
- Automated weather event archiving rules
```

### index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

```

### package.json
```json
{
  "name": "miaoda-react-admin",
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "echo 'Do not use this command, only use lint to check'",
    "build": "echo 'Do not use this command, only use lint to check'",
    "lint": "tsgo -p tsconfig.check.json; npx biome lint; .rules/check.sh;npx tailwindcss -i ./src/index.css -o /dev/null 2>&1 | grep -E '^(CssSyntaxError|Error):.*' || true;.rules/testBuild.sh"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.2.2",
    "@radix-ui/react-accordion": "^1.2.12",
    "@radix-ui/react-alert-dialog": "^1.1.15",
    "@radix-ui/react-aspect-ratio": "^1.1.7",
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-collapsible": "^1.1.12",
    "@radix-ui/react-context-menu": "^2.2.16",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-hover-card": "^1.1.15",
    "@radix-ui/react-icons": "^1.3.2",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-menubar": "^1.1.16",
    "@radix-ui/react-navigation-menu": "^1.2.14",
    "@radix-ui/react-popover": "^1.1.15",
    "@radix-ui/react-progress": "^1.1.7",
    "@radix-ui/react-radio-group": "^1.3.8",
    "@radix-ui/react-scroll-area": "^1.2.10",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slider": "^1.3.6",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.2.6",
    "@radix-ui/react-tabs": "^1.1.13",
    "@radix-ui/react-toast": "^1.2.15",
    "@radix-ui/react-toggle": "^1.1.10",
    "@radix-ui/react-toggle-group": "^1.1.11",
    "@radix-ui/react-tooltip": "^1.2.8",
    "@sentry/react": "^9.47.1",
    "@supabase/supabase-js": "2.103.1",
    "axios": "^1.13.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^3.6.0",
    "dotenv": "^17.4.2",
    "embla-carousel-autoplay": "^8.6.0",
    "embla-carousel-react": "^8.6.0",
    "eventsource-parser": "^3.0.6",
    "input-otp": "^1.4.2",
    "ky": "^1.13.0",
    "lucide-react": "^0.576.0",
    "miaoda-react-devkit": "0.1.1-beta.15",
    "miaoda-sc-plugin": "1.0.62",
    "motion": "^12.23.25",
    "next-themes": "^0.4.6",
    "qrcode": "^1.5.4",
    "react": "^18.0.0",
    "react-day-picker": "^9.13.0",
    "react-dom": "^18.0.0",
    "react-dropzone": "^14.3.8",
    "react-helmet-async": "^2.0.5",
    "react-hook-form": "^7.66.0",
    "react-resizable-panels": "^2.1.8",
    "react-router": "^7.9.5",
    "react-router-dom": "^7.18.1",
    "recharts": "2.15.4",
    "sonner": "^2.0.7",
    "streamdown": "^1.4.0",
    "tailwind-merge": "^3.6.0",
    "tailwindcss-animate": "^1.0.7",
    "tailwindcss-intersect": "^2.2.0",
    "vaul": "^1.1.2",
    "video-react": "^0.16.0",
    "zod": "^3.25.76",
    "zustand": "^5.0.14"
  },
  "devDependencies": {
    "@biomejs/biome": "2.4.5",
    "@tailwindcss/container-queries": "^0.1.1",
    "@types/bmapgl": "^0.0.7",
    "@types/lodash": "^4.17.24",
    "@types/react": "^19.2.2",
    "@types/react-dom": "^19.2.2",
    "@types/video-react": "^0.15.8",
    "@typescript/native-preview": "7.0.0-dev.20260514.1",
    "@vitejs/plugin-react": "^5.1.4",
    "autoprefixer": "^10.4.27",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.11",
    "typescript": "~5.9.3",
    "vite": "npm:rolldown-vite@latest",
    "vite-plugin-svgr": "^4.5.0"
  }
}

```

### src/App.tsx
```tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IntersectObserver from '@/components/common/IntersectObserver';
import { Toaster } from '@/components/ui/sonner';

import { AuthProvider } from '@/contexts/AuthContext';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { PublicLayout } from '@/components/layouts/PublicLayout';

import PublicHome from '@/pages/public/Home';
import Login from '@/pages/auth/Login';
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminPriests from '@/pages/admin/Priests';
import AdminBishops from '@/pages/admin/Bishops';
import AdminChurches from '@/pages/admin/Churches';
import AdminEvents from '@/pages/admin/Events';
import AdminYearOf from '@/pages/admin/YearOf';
import AdminSettings from '@/pages/admin/Settings';
import AdminLogs from '@/pages/admin/Logs';
import AdminAccount from '@/pages/admin/Account';
import AdminDonations from '@/pages/admin/Donations';
import AdminHeroes from '@/pages/admin/Heroes';
import AdminAnnouncements from '@/pages/admin/Announcements';
import AdminMaintenance from '@/pages/admin/Maintenance';
import PublicMaintenance from '@/pages/public/Maintenance';
import ContentExpansionShowcase from '@/pages/public/ContentExpansionShowcase';
import ModalShowcase from '@/pages/public/ModalShowcase';
import PublicEvents from '@/pages/public/Events';
import Parishes from '@/pages/public/Parishes';
import Clergy from '@/pages/public/Clergy';
import MaintenanceGuard from '@/components/common/MaintenanceGuard';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <IntersectObserver />
        <Routes>
          <Route element={<MaintenanceGuard />}>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<PublicHome />} />
              <Route path="/maintenance" element={<PublicMaintenance />} />
              <Route path="/events" element={<PublicEvents />} />
              <Route path="/parishes" element={<Parishes />} />
              <Route path="/clergy" element={<Clergy />} />
              <Route path="/components/content-expansion" element={<ContentExpansionShowcase />} />
              <Route path="/components/modals" element={<ModalShowcase />} />
            </Route>

            <Route path="/login" element={<Login />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="heroes" element={<AdminHeroes />} />
              <Route path="maintenance" element={<AdminMaintenance />} />
          <Route path="logs" element={<AdminLogs />} />
              <Route path="priests" element={<AdminPriests />} />
              <Route path="bishops" element={<AdminBishops />} />
              <Route path="churches" element={<AdminChurches />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="announcements" element={<AdminAnnouncements />} />
              <Route path="year-of" element={<AdminYearOf />} />
          <Route path="donations" element={<AdminDonations />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="account" element={<AdminAccount />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
};

export default App;

```

### src/components/common/IntersectObserver.tsx
```tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Observer } from 'tailwindcss-intersect';

const IntersectObserver = () => {
  const location = useLocation();

  useEffect(() => {
    // When the location changes, we need to restart the observer
    // to pick up new elements on the page.
    // We use a small timeout to ensure the DOM has updated.
    const timer = setTimeout(() => {
        Observer.restart();
    }, 100);

    return () => clearTimeout(timer);
  }, [location]);

  return null;
};

export default IntersectObserver;

```

### src/components/common/MaintenanceGuard.tsx
```tsx
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { supabase } from '@/db/supabase';
import { useAuth } from '@/contexts/AuthContext';

export default function MaintenanceGuard() {
  const [checking, setChecking] = useState(true);
  const [isMaintenance, setIsMaintenance] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    checkMaintenanceStatus();
  }, [location.pathname, user]);

  const checkMaintenanceStatus = async () => {
    try {
      // Allow access to maintenance page itself
      if (location.pathname === '/maintenance') {
        setChecking(false);
        return;
      }

      // Allow admin users to bypass maintenance mode entirely
      if (user) {
        setIsMaintenance(false);
        setChecking(false);
        return;
      }

      // Check maintenance settings
      const { data: settings } = await supabase.from('maintenance_settings').select('*').limit(1).maybeSingle();
      
      let maintenanceActive = false;

      if (settings) {
        // Check manual toggle
        if (settings.is_active) {
          maintenanceActive = true;
        } 
        // Check scheduled maintenance
        else if (settings.scheduled_start && settings.scheduled_end) {
          const now = new Date();
          const start = new Date(settings.scheduled_start);
          const end = new Date(settings.scheduled_end);
          if (now >= start && now <= end) {
            maintenanceActive = true;
          }
        }
      }

      if (maintenanceActive) {
        // Check IP whitelist
        try {
          const ipRes = await fetch('https://api.ipify.org?format=json');
          const ipData = await ipRes.json();
          const clientIp = ipData.ip;

          const { data: whitelist } = await supabase
            .from('maintenance_whitelisted_ips')
            .select('*')
            .eq('ip_address', clientIp)
            .limit(1)
            .maybeSingle();

          if (whitelist) {
            // IP is whitelisted
            maintenanceActive = false;
          }
        } catch (e) {
          console.error("Failed to check IP", e);
        }
      }

      setIsMaintenance(maintenanceActive);
    } catch (e) {
      console.error(e);
    } finally {
      setChecking(false);
    }
  };

  if (checking) {
    return <div className="min-h-screen flex items-center justify-center">Checking status...</div>;
  }

  if (isMaintenance && location.pathname !== '/maintenance') {
    return <Navigate to="/maintenance" replace />;
  }

  if (!isMaintenance && location.pathname === '/maintenance') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
```

### src/components/common/PageMeta.tsx
```tsx
import { HelmetProvider, Helmet } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";

const PageMeta = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
  </Helmet>
);

export const AppWrapper = ({ children }: { children: React.ReactNode }) => (
  <HelmetProvider>
    <TooltipProvider>
      {children}
    </TooltipProvider>
  </HelmetProvider>
);

export default PageMeta;

```

### src/components/common/RouteGuard.tsx
```tsx
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { routes } from '@/routes';

interface RouteGuardProps {
  children: React.ReactNode;
}

// System-level public routes (no need to register in routes.tsx)
const SYSTEM_PUBLIC_ROUTES = ['/login', '/403', '/404'];

// Derived from routes.tsx: all routes marked with public: true
const routePublicPaths = routes.filter(r => r.public).map(r => r.path);

const PUBLIC_ROUTES = [...SYSTEM_PUBLIC_ROUTES, ...routePublicPaths];

function matchPublicRoute(path: string, patterns: string[]) {
  return patterns.some(pattern => {
    if (pattern.includes('*')) {
      const regex = new RegExp('^' + pattern.replace('*', '.*') + '$');
      return regex.test(path);
    }
    return path === pattern;
  });
}

export function RouteGuard({ children }: RouteGuardProps) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading) return;

    const isPublic = matchPublicRoute(location.pathname, PUBLIC_ROUTES);

    if (!user && !isPublic) {
      navigate('/login', { state: { from: location.pathname }, replace: true });
    }
  }, [user, loading, location.pathname, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}
```

### src/components/dropzone.tsx
```tsx
import { cn } from '@/lib/utils'
import { type UseSupabaseUploadReturn } from '@/hooks/use-supabase-upload'
import { Button } from '@/components/ui/button'
import { CheckCircle, File, Loader2, Upload, X } from 'lucide-react'
import { createContext, type PropsWithChildren, useCallback, useContext } from 'react'

export const formatBytes = (
  bytes: number,
  decimals = 2,
  size?: 'bytes' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB' | 'EB' | 'ZB' | 'YB'
) => {
  const k = 1000
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  if (bytes === 0 || bytes === undefined) return size !== undefined ? `0 ${size}` : '0 bytes'
  const i = size !== undefined ? sizes.indexOf(size) : Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

type DropzoneContextType = Omit<UseSupabaseUploadReturn, 'getRootProps' | 'getInputProps'>

const DropzoneContext = createContext<DropzoneContextType | undefined>(undefined)

type DropzoneProps = UseSupabaseUploadReturn & {
  className?: string
}

const Dropzone = ({
  className,
  children,
  getRootProps,
  getInputProps,
  ...restProps
}: PropsWithChildren<DropzoneProps>) => {
  const isSuccess = restProps.isSuccess
  const isActive = restProps.isDragActive
  const isInvalid =
    (restProps.isDragActive && restProps.isDragReject) ||
    (restProps.errors.length > 0 && !restProps.isSuccess) ||
    restProps.files.some((file) => file.errors.length !== 0)

  return (
    <DropzoneContext.Provider value={{ ...restProps }}>
      <div
        {...getRootProps({
          className: cn(
            'border-2 border-gray-300 rounded-lg p-6 text-center bg-card transition-colors duration-300 text-foreground',
            className,
            isSuccess ? 'border-solid' : 'border-dashed',
            isActive && 'border-primary bg-primary/10',
            isInvalid && 'border-destructive bg-destructive/10'
          ),
        })}
      >
        <input {...getInputProps()} />
        {children}
      </div>
    </DropzoneContext.Provider>
  )
}
const DropzoneContent = ({ className }: { className?: string }) => {
  const {
    files,
    setFiles,
    onUpload,
    loading,
    successes,
    errors,
    maxFileSize,
    maxFiles,
    isSuccess,
  } = useDropzoneContext()

  const exceedMaxFiles = files.length > maxFiles

  const handleRemoveFile = useCallback(
    (fileName: string) => {
      setFiles(files.filter((file) => file.name !== fileName))
    },
    [files, setFiles]
  )

  if (isSuccess) {
    return (
      <div className={cn('flex flex-row items-center gap-x-2 justify-center', className)}>
        <CheckCircle size={16} className="text-primary" />
        <p className="text-primary text-sm">
          Successfully uploaded {files.length} file{files.length > 1 ? 's' : ''}
        </p>
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col', className)}>
      {files.map((file, idx) => {
        const fileError = errors.find((e) => e.name === file.name)
        const isSuccessfullyUploaded = !!successes.find((e) => e === file.name)

        return (
          <div
            key={`${file.name}-${idx}`}
            className="flex items-center gap-x-4 border-b py-2 first:mt-4 last:mb-4 "
          >
            {file.type.startsWith('image/') ? (
              <div className="h-10 w-10 rounded border overflow-hidden shrink-0 bg-muted flex items-center justify-center">
                <img src={file.preview} alt={file.name} className="object-cover" />
              </div>
            ) : (
              <div className="h-10 w-10 rounded border bg-muted flex items-center justify-center">
                <File size={18} />
              </div>
            )}

            <div className="shrink grow flex flex-col items-start truncate">
              <p title={file.name} className="text-sm truncate max-w-full">
                {file.name}
              </p>
              {file.errors.length > 0 ? (
                <p className="text-xs text-destructive">
                  {file.errors
                    .map((e) =>
                      e.message.startsWith('File is larger than')
                        ? `File is larger than ${formatBytes(maxFileSize, 2)} (Size: ${formatBytes(file.size, 2)})`
                        : e.message
                    )
                    .join(', ')}
                </p>
              ) : loading && !isSuccessfullyUploaded ? (
                <p className="text-xs text-muted-foreground">Uploading file...</p>
              ) : !!fileError ? (
                <p className="text-xs text-destructive">Failed to upload: {fileError.message}</p>
              ) : isSuccessfullyUploaded ? (
                <p className="text-xs text-primary">Successfully uploaded file</p>
              ) : (
                <p className="text-xs text-muted-foreground">{formatBytes(file.size, 2)}</p>
              )}
            </div>

            {!loading && !isSuccessfullyUploaded && (
              <Button
                size="icon"
                variant="link"
                className="shrink-0 justify-self-end text-muted-foreground hover:text-foreground"
                onClick={() => handleRemoveFile(file.name)}
              >
                <X />
              </Button>
            )}
          </div>
        )
      })}
      {exceedMaxFiles && (
        <p className="text-sm text-left mt-2 text-destructive">
          You may upload only up to {maxFiles} files, please remove {files.length - maxFiles} file
          {files.length - maxFiles > 1 ? 's' : ''}.
        </p>
      )}
      {files.length > 0 && !exceedMaxFiles && (
        <div className="mt-2">
          <Button
            variant="outline"
            onClick={onUpload}
            disabled={files.some((file) => file.errors.length !== 0) || loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>Upload files</>
            )}
          </Button>
        </div>
      )}
    </div>
  )
}

const DropzoneEmptyState = ({ className }: { className?: string }) => {
  const { maxFiles, maxFileSize, inputRef, isSuccess } = useDropzoneContext()

  if (isSuccess) {
    return null
  }

  return (
    <div className={cn('flex flex-col items-center gap-y-2', className)}>
      <Upload size={20} className="text-muted-foreground" />
      <p className="text-sm">
        Upload{!!maxFiles && maxFiles > 1 ? ` ${maxFiles}` : ''} file
        {!maxFiles || maxFiles > 1 ? 's' : ''}
      </p>
      <div className="flex flex-col items-center gap-y-1">
        <p className="text-xs text-muted-foreground">
          Drag and drop or{' '}
          <a
            onClick={() => inputRef.current?.click()}
            className="underline cursor-pointer transition hover:text-foreground"
          >
            select {maxFiles === 1 ? `file` : 'files'}
          </a>{' '}
          to upload
        </p>
        {maxFileSize !== Number.POSITIVE_INFINITY && (
          <p className="text-xs text-muted-foreground">
            Maximum file size: {formatBytes(maxFileSize, 2)}
          </p>
        )}
      </div>
    </div>
  )
}

const useDropzoneContext = () => {
  const context = useContext(DropzoneContext)

  if (!context) {
    throw new Error('useDropzoneContext must be used within a Dropzone')
  }

  return context
}

export { Dropzone, DropzoneContent, DropzoneEmptyState, useDropzoneContext }

```

### src/components/layouts/AdminLayout.tsx
```tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, UserSquare, Church, Calendar, CalendarRange, Settings, UserCircle, LogOut, ImageIcon, AlertTriangle, Bell, Banknote, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { supabase } from '@/db/supabase';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: ImageIcon, label: 'Heroes', path: '/admin/heroes' },
  { icon: Users, label: 'Priests', path: '/admin/priests' },
  { icon: UserSquare, label: 'Bishops', path: '/admin/bishops' },
  { icon: Church, label: 'Churches', path: '/admin/churches' },
  { icon: Calendar, label: 'Events', path: '/admin/events' },
  { icon: Bell, label: 'Announcements', path: '/admin/announcements' },
  { icon: CalendarRange, label: 'Year Of', path: '/admin/year-of' },
  { icon: Banknote, label: 'Donations', path: '/admin/donations' },
  { icon: AlertTriangle, label: 'Maintenance', path: '/admin/maintenance' },
  { icon: Activity, label: 'Activity Logs', path: '/admin/logs' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export const AdminLayout: React.FC = () => {
  const { user, profile } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <aside className="hidden md:flex flex-col w-64 shrink-0 border-r bg-sidebar">
        <div className="p-4 border-b">
          <h1 className="text-xl font-semibold">Diocese Admin</h1>
        </div>
        <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn("w-full justify-start", isActive && "bg-secondary font-medium")}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t flex flex-col gap-2">
          <Link to="/admin/account">
            <Button variant="ghost" className="w-full justify-start">
              <UserCircle className="mr-2 h-4 w-4" />
              Account
            </Button>
          </Link>
          <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>
      
      <div className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        <header className="h-14 border-b flex items-center px-4 md:hidden bg-sidebar shrink-0">
          <h1 className="text-lg font-semibold">Diocese Admin</h1>
        </header>
        <main className="flex-1 min-w-0 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

```

### src/components/layouts/PublicLayout.tsx
```tsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, ChevronDown, X, Smartphone, Wallet, Banknote, Play, Pause } from 'lucide-react';
import { format } from 'date-fns';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';
import { supabase } from '@/db/supabase';

function DonationCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [donationOptions, setDonationOptions] = useState<any[]>([]);

  useEffect(() => {
    const fetchDonations = async () => {
      const { data } = await supabase
        .from('donation_options')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      if (data) setDonationOptions(data);
    };
    fetchDonations();
  }, []);

  const plugin = useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true })
  );

  useEffect(() => {
    if (!api) return;
    
    setCurrent(api.selectedScrollSnap());
    
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const togglePlay = () => {
    if (!api) return;
    const autoplay = api.plugins().autoplay;
    if (!autoplay) return;

    if (isPlaying) {
      autoplay.stop();
    } else {
      autoplay.play();
    }
    setIsPlaying(!isPlaying);
  };

  const getIcon = (name: string) => {
    switch (name?.toLowerCase()) {
      case 'smartphone': return <Smartphone className="h-5 w-5 mr-2" />;
      case 'wallet': return <Wallet className="h-5 w-5 mr-2" />;
      case 'banknote': return <Banknote className="h-5 w-5 mr-2" />;
      default: return <Smartphone className="h-5 w-5 mr-2" />;
    }
  };

  if (donationOptions.length === 0) return null;

  return (
    <div className="bg-card border rounded-lg p-6 flex flex-col items-center">
      <h4 className="font-semibold uppercase tracking-wider mb-2 text-center">Support Our Mission</h4>
      <p className="text-xs text-muted-foreground mb-6 text-center">Scan QR code to donate</p>
      
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        className="w-full max-w-xs"
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => { if (isPlaying) plugin.current.play(); }}
      >
        <CarouselContent>
          {donationOptions.map((option) => (
            <CarouselItem key={option.id}>
              <div className="flex flex-col items-center p-2">
                <div className="flex items-center justify-center font-medium mb-4 text-lg">
                  {getIcon(option.icon_name)}
                  {option.name}
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm border mb-4">
                  <img src={option.qr_image_url} alt={`${option.name} QR Code`} className="w-48 h-48 object-contain" loading="lazy" />
                </div>
                <p className="text-sm text-muted-foreground text-center">{option.description}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-center mt-6 space-x-4">
          <CarouselPrevious className="relative translate-y-0 left-auto right-auto" />
          
          <Button variant="ghost" size="icon" onClick={togglePlay} className="h-8 w-8 rounded-full">
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          
          <CarouselNext className="relative translate-y-0 left-auto right-auto" />
        </div>
      </Carousel>
      
      <div className="flex justify-center mt-4 space-x-2">
        {donationOptions.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${current === index ? 'bg-primary' : 'bg-muted-foreground/30'}`}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      <div className="mt-6 pt-4 border-t w-full text-center">
        <p className="text-xs text-muted-foreground">Or contact us directly at <br/>dioceseofcatarman@gmail.com</p>
      </div>
    </div>
  );
}

export function PublicLayout() {
  const [time, setTime] = useState(new Date());
  const [temp, setTemp] = useState<number | null>(null);
  const [announcement, setAnnouncement] = useState<any>(null);
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true);

  useEffect(() => {
    // Fetch announcement
    const fetchAnnouncement = async () => {
      const { data } = await supabase
        .from('announcements')
        .select('*')
        .eq('status', 'Active')
        .order('published_date', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (data) {
        setAnnouncement(data);
      }
    };
    fetchAnnouncement();
  }, []);

  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Fetch temperature
    const fetchWeather = async () => {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=12.4984&longitude=124.6366&current=temperature_2m');
        const data = await res.json();
        setTemp(Math.round(data.current.temperature_2m));
      } catch (e) {
        console.error('Failed to fetch weather', e);
      }
    };
    fetchWeather();
    const weatherTimer = setInterval(fetchWeather, 5 * 60 * 1000);
    return () => clearInterval(weatherTimer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-background font-sans">
      {announcement && isAnnouncementVisible && (
        <div className="bg-primary text-primary-foreground py-2 px-4 relative z-[60]">
          <div className="container mx-auto flex items-center justify-between text-sm">
            <div className="flex-1 text-center font-medium truncate">
              {announcement.title} <span className="font-normal opacity-90 mx-2">•</span> <span className="font-normal opacity-90">{announcement.content}</span>
            </div>
            <button 
              onClick={() => setIsAnnouncementVisible(false)}
              className="ml-4 hover:bg-primary-foreground/20 p-1 rounded-full transition-colors shrink-0"
              aria-label="Close announcement"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-3 text-foreground">
              <img 
                src="https://dcc-catarman.web.app/images/dioces-of-catarman.png" 
                alt="Logo" 
                className="h-10 w-auto object-contain" 
              />
              <span className="hidden sm:inline-block font-semibold text-lg tracking-wide uppercase">Diocese of Catarman</span>
            </Link>
            <div className="hidden sm:flex text-sm text-muted-foreground font-medium border-l pl-6 py-1 h-8 items-center">
              {temp !== null ? `${temp}°C` : '--°C'} • {format(time, 'hh:mm a')}
            </div>
          </div>
          <div className="hidden md:flex items-center justify-end space-x-6 text-sm font-medium tracking-wide uppercase">
            <div className="flex sm:hidden text-muted-foreground border-r pr-6 mr-2 h-4 items-center">
               {temp !== null ? `${temp}°C` : '--°C'} • {format(time, 'hh:mm a')}
            </div>
            <a href="/#latest" className="transition-colors hover:text-foreground/70">Latest</a>
            <Link to="/events" className="transition-colors hover:text-foreground/70">Events</Link>
            <Link to="/parishes" className="transition-colors hover:text-foreground/70">Parishes</Link>
            <Link to="/clergy" className="transition-colors hover:text-foreground/70">Clergy</Link>
            <a href="/#vision" className="transition-colors hover:text-foreground/70">Vision</a>
            <a href="/#mission" className="transition-colors hover:text-foreground/70">Mission</a>
            <a href="/#contact" className="transition-colors hover:text-foreground/70">Contact</a>
          </div>
          <div className="flex md:hidden items-center ml-auto">
            <div className="text-xs text-muted-foreground font-medium mr-4">
              {temp !== null ? `${temp}°C` : '--°C'} • {format(time, 'hh:mm a')}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-foreground hover:text-foreground/70 outline-none">
                <ChevronDown className="h-5 w-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-background border rounded-none shadow-sm uppercase tracking-wide text-xs">
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-muted focus:text-foreground rounded-none">
                  <a href="/#latest" className="w-full">Latest</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-muted focus:text-foreground rounded-none">
                  <Link to="/events" className="w-full">Events</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-muted focus:text-foreground rounded-none">
                  <Link to="/parishes" className="w-full">Parishes</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-muted focus:text-foreground rounded-none">
                  <Link to="/clergy" className="w-full">Clergy</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-muted focus:text-foreground rounded-none">
                  <a href="/#vision" className="w-full">Vision</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-muted focus:text-foreground rounded-none">
                  <a href="/#mission" className="w-full">Mission</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-muted focus:text-foreground rounded-none border-t">
                  <a href="/#contact" className="w-full">Contact</a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer id="contact" className="border-t bg-muted/20 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-2">
                <img 
                  src="https://miaoda-conversation-file.s3cdn.medo.dev/user-b2myjxpwnf2a/app-d5vw2eem0z5t/20260721/logo.jpg" 
                  alt="Diocese of Catarman Logo" 
                  className="h-24 w-auto object-contain mix-blend-multiply" 
                />
              </div>
              <div className="flex space-x-4">
                <a href="#" className="h-8 w-8 border border-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"><Facebook className="h-4 w-4" /></a>
                <a href="#" className="h-8 w-8 border border-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"><Twitter className="h-4 w-4" /></a>
                <a href="#" className="h-8 w-8 border border-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"><Instagram className="h-4 w-4" /></a>
                <a href="#" className="h-8 w-8 border border-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"><Youtube className="h-4 w-4" /></a>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <h4 className="font-semibold uppercase tracking-wider mb-4">Contact</h4>
              <p>+63 90976-793129 (TM)</p>
              <p>+63 90976-6396271 (TNT)</p>
              <p>dioceseofcatarman@gmail.com</p>
            </div>
            <div className="space-y-4 text-sm">
              <h4 className="font-semibold uppercase tracking-wider mb-4">Address</h4>
              <p className="leading-relaxed">
                DCC Cathedral Compound, Acacia (Pob.)<br />
                Catarman, Northern Samar, Visayas, 6400
              </p>
              <div className="w-full h-40 bg-muted mt-4 border grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300 overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15502.94697960309!2d124.631853!3d12.499645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33086b9a896d85eb%3A0xc0c4273df1503c!2sCatarman%20Cathedral!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
            <div className="w-full h-full">
              <DonationCarousel />
            </div>
          </div>
          <div className="mt-12 pt-6 border-t text-xs text-center text-muted-foreground">{"Copyright © 2026 DCC | Powered by RBMDev.ph"}</div>
        </div>
      </footer>
    </div>
  );
}

```

### src/components/public/WeatherWidget.tsx
```tsx
import { useEffect, useState } from 'react';
import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudMoon, CloudRain, CloudSnow, CloudSun, Droplets, Sun, Wind } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const WMO_CODES: Record<number, { label: string, icon: any }> = {
  0: { label: 'Clear sky', icon: Sun },
  1: { label: 'Mainly clear', icon: CloudSun },
  2: { label: 'Partly cloudy', icon: Cloud },
  3: { label: 'Overcast', icon: Cloud },
  45: { label: 'Fog', icon: CloudFog },
  48: { label: 'Depositing rime fog', icon: CloudFog },
  51: { label: 'Drizzle: Light', icon: CloudDrizzle },
  53: { label: 'Drizzle: Moderate', icon: CloudDrizzle },
  55: { label: 'Drizzle: Dense', icon: CloudDrizzle },
  61: { label: 'Rain: Slight', icon: CloudRain },
  63: { label: 'Rain: Moderate', icon: CloudRain },
  65: { label: 'Rain: Heavy', icon: CloudRain },
  71: { label: 'Snow fall: Slight', icon: CloudSnow },
  73: { label: 'Snow fall: Moderate', icon: CloudSnow },
  75: { label: 'Snow fall: Heavy', icon: CloudSnow },
  80: { label: 'Rain showers: Slight', icon: CloudRain },
  81: { label: 'Rain showers: Moderate', icon: CloudRain },
  82: { label: 'Rain showers: Violent', icon: CloudRain },
  95: { label: 'Thunderstorm', icon: CloudLightning },
  96: { label: 'Thunderstorm with slight hail', icon: CloudLightning },
  99: { label: 'Thunderstorm with heavy hail', icon: CloudLightning },
};

export default function WeatherWidget() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 5 * 60 * 1000); // refresh every 5 mins
    return () => clearInterval(interval);
  }, []);

  const fetchWeather = async () => {
    try {
      const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=12.4984&longitude=124.6366&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m');
      const data = await res.json();
      setWeather(data.current);
    } catch (e) {
      console.error('Failed to fetch weather', e);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !weather) return null;

  const weatherInfo = WMO_CODES[weather.weather_code] || { label: 'Unknown', icon: Cloud };
  const WeatherIcon = weatherInfo.icon;

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-none overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center gap-6">
          <div className="flex-shrink-0">
            <WeatherIcon className="w-16 h-16 text-primary/80" strokeWidth={1.5} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Catarman Weather</div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-light">{Math.round(weather.temperature_2m)}°C</span>
              <span className="text-muted-foreground text-sm">{weatherInfo.label}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5" />
                <span>{weather.relative_humidity_2m}%</span>
              </div>
              <div className="flex items-center gap-1">
                <Wind className="w-3.5 h-3.5" />
                <span>{weather.wind_speed_10m} km/h</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

### src/components/ui/accordion.tsx
```tsx
import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

```

### src/components/ui/alert-dialog.tsx
```tsx
import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    )}
    {...props}
  />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}

```

### src/components/ui/alert.tsx
```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }

```

### src/components/ui/aspect-ratio.tsx
```tsx
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

const AspectRatio = AspectRatioPrimitive.Root

export { AspectRatio }

```

### src/components/ui/avatar.tsx
```tsx
"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }

```

### src/components/ui/badge.tsx
```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

```

### src/components/ui/breadcrumb.tsx
```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />)
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    )}
    {...props}
  />
))
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}

```

### src/components/ui/button.tsx
```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

```

### src/components/ui/calendar.tsx
```tsx
import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-background group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-4 md:flex-row",
          defaultClassNames.months
        ),
        month: cn("flex w-full flex-col gap-4", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-[--cell-size] w-full items-center justify-center px-[--cell-size]",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-[--cell-size] w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "bg-popover absolute inset-0 opacity-0",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label"
            ? "text-sm"
            : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal",
          defaultClassNames.weekday
        ),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn(
          "w-[--cell-size] select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-muted-foreground select-none text-[0.8rem]",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md",
          defaultClassNames.day
        ),
        range_start: cn(
          "bg-accent rounded-l-md",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("bg-accent rounded-r-md", defaultClassNames.range_end),
        today: cn(
          "bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4", className)}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-[--cell-size] items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-[--cell-size] flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }

```

### src/components/ui/card.tsx
```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

```

### src/components/ui/carousel.tsx
```tsx
import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute  h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}

```

### src/components/ui/chart.tsx
```tsx
import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme || config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: "line" | "dot" | "dashed"
      nameKey?: string
      labelKey?: string
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null
      }

      const [item] = payload
      const key = `${labelKey || item?.dataKey || item?.name || "value"}`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        )
      }

      if (!value) {
        return null
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ])

    if (!active || !payload?.length) {
      return null
    }

    const nestLabel = payload.length === 1 && indicator !== "dot"

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload
            .filter((item) => item.type !== "none")
            .map((item, index) => {
              const key = `${nameKey || item.name || item.dataKey || "value"}`
              const itemConfig = getPayloadConfigFromPayload(config, item, key)
              const indicatorColor = color || item.payload.fill || item.color

              return (
                <div
                  key={item.dataKey}
                  className={cn(
                    "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                    indicator === "dot" && "items-center"
                  )}
                >
                  {formatter && item?.value !== undefined && item.name ? (
                    formatter(item.value, item.name, item, index, item.payload)
                  ) : (
                    <>
                      {itemConfig?.icon ? (
                        <itemConfig.icon />
                      ) : (
                        !hideIndicator && (
                          <div
                            className={cn(
                              "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                              {
                                "h-2.5 w-2.5": indicator === "dot",
                                "w-1": indicator === "line",
                                "w-0 border-[1.5px] border-dashed bg-transparent":
                                  indicator === "dashed",
                                "my-0.5": nestLabel && indicator === "dashed",
                              }
                            )}
                            style={
                              {
                                "--color-bg": indicatorColor,
                                "--color-border": indicatorColor,
                              } as React.CSSProperties
                            }
                          />
                        )
                      )}
                      <div
                        className={cn(
                          "flex flex-1 justify-between leading-none",
                          nestLabel ? "items-end" : "items-center"
                        )}
                      >
                        <div className="grid gap-1.5">
                          {nestLabel ? tooltipLabel : null}
                          <span className="text-muted-foreground">
                            {itemConfig?.label || item.name}
                          </span>
                        </div>
                        {item.value && (
                          <span className="font-mono font-medium tabular-nums text-foreground">
                            {item.value.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltip"

const ChartLegend = RechartsPrimitive.Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean
      nameKey?: string
    }
>(
  (
    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
    ref
  ) => {
    const { config } = useChart()

    if (!payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        )}
      >
        {payload
          .filter((item) => item.type !== "none")
          .map((item) => {
            const key = `${nameKey || item.dataKey || "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)

            return (
              <div
                key={item.value}
                className={cn(
                  "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
                )}
              >
                {itemConfig?.icon && !hideIcon ? (
                  <itemConfig.icon />
                ) : (
                  <div
                    className="h-2 w-2 shrink-0 rounded-[2px]"
                    style={{
                      backgroundColor: item.color,
                    }}
                  />
                )}
                {itemConfig?.label}
              </div>
            )
          })}
      </div>
    )
  }
)
ChartLegendContent.displayName = "ChartLegend"

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}

```

### src/components/ui/checkbox.tsx
```tsx
"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("grid place-content-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }

```

### src/components/ui/collapsible.tsx
```tsx
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }

```

### src/components/ui/command.tsx
```tsx
"use client"

import * as React from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/ui/dialog"

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

const CommandDialog = ({ children, ...props }: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
))

CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
))

CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
))

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
))

CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className
    )}
    {...props}
  />
))

CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}

```

### src/components/ui/content-modal.tsx
```tsx
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Share2, Bookmark, Calendar, User, Folder, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface ContentModalProps {
  title: string;
  content: React.ReactNode;
  imageUrl?: string;
  metadata?: {
    date?: string | Date;
    author?: string;
    category?: string;
  };
  trigger: React.ReactNode;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

export function ContentModal({
  title,
  content,
  imageUrl,
  metadata,
  trigger,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext
}: ContentModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className={cn(
        "max-w-[calc(100%-2rem)] md:max-w-2xl lg:max-w-4xl p-0 overflow-hidden gap-0 h-[85vh] sm:h-auto sm:max-h-[90vh] flex flex-col",
        imageUrl && "[&>button]:bg-black/50 [&>button]:text-white [&>button]:hover:bg-black/70 [&>button]:border [&>button]:border-white/20"
      )}>
        {imageUrl && (
          <div className="relative w-full h-48 sm:h-64 md:h-72 shrink-0">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />
          </div>
        )}
        
        <DialogHeader className={cn(
          "p-6 pb-2 text-left shrink-0 z-10",
          !imageUrl ? "pt-8" : "absolute bottom-0 w-full"
        )}>
          <div className="flex justify-between items-start gap-4">
            <div className="w-full">
              <DialogTitle className={cn(
                "text-2xl md:text-3xl font-light tracking-wide leading-tight",
                imageUrl && "text-foreground drop-shadow-md"
              )}>
                {title}
              </DialogTitle>
              {metadata && (
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground font-medium">
                  {metadata.date && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {metadata.date instanceof Date ? format(metadata.date, 'MMMM d, yyyy') : metadata.date}
                    </span>
                  )}
                  {metadata.author && (
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      {metadata.author}
                    </span>
                  )}
                  {metadata.category && (
                    <span className="flex items-center gap-1.5">
                      <Folder className="w-3.5 h-3.5" />
                      {metadata.category}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className={cn("flex-1 p-6", imageUrl ? "pt-2" : "pt-4")}>
          <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none font-light leading-relaxed">
            {content}
          </div>
        </ScrollArea>
        
        {(hasPrevious || hasNext) && (
          <div className="flex justify-between items-center p-4 border-t bg-muted/30 shrink-0">
            <Button 
              variant="outline" 
              onClick={onPrevious} 
              disabled={!hasPrevious}
              className="text-xs tracking-widest uppercase"
            >
              <ChevronLeft className="w-4 h-4 mr-2" /> Previous
            </Button>
            <Button 
              variant="outline" 
              onClick={onNext} 
              disabled={!hasNext}
              className="text-xs tracking-widest uppercase"
            >
              Next <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

```

### src/components/ui/context-menu.tsx
```tsx
"use client"

import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const ContextMenu = ContextMenuPrimitive.Root

const ContextMenuTrigger = ContextMenuPrimitive.Trigger

const ContextMenuGroup = ContextMenuPrimitive.Group

const ContextMenuPortal = ContextMenuPrimitive.Portal

const ContextMenuSub = ContextMenuPrimitive.Sub

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </ContextMenuPrimitive.SubTrigger>
))
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-context-menu-content-transform-origin]",
      className
    )}
    {...props}
  />
))
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 max-h-[--radix-context-menu-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-context-menu-content-transform-origin]",
        className
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
))
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
))
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-4 w-4 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
))
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold text-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
))
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName

const ContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
ContextMenuShortcut.displayName = "ContextMenuShortcut"

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}

```

### src/components/ui/dialog.tsx
```tsx
import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}

```

### src/components/ui/drawer.tsx
```tsx
import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
)
Drawer.displayName = "Drawer"

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
))
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}

```

### src/components/ui/dropdown-menu.tsx
```tsx
"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}

```

### src/components/ui/expandable-text.tsx
```tsx
import React, { useState, useRef, useEffect } from 'react';
import { Button } from './button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExpandableTextProps {
  content: string;
  limit?: number; // Character limit
  className?: string;
  expandText?: string;
  collapseText?: string;
}

export function ExpandableText({
  content,
  limit = 150,
  className,
  expandText = 'See More',
  collapseText = 'See Less',
}: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandable, setIsExpandable] = useState(false);

  useEffect(() => {
    if (content && content.length > limit) {
      setIsExpandable(true);
    } else {
      setIsExpandable(false);
    }
  }, [content, limit]);

  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  const displayText = isExpanded ? content : content?.substring(0, limit) + (isExpandable && !isExpanded ? '...' : '');

  return (
    <div className={cn("flex flex-col items-start", className)}>
      <div className={cn(
        "prose prose-sm md:prose-base dark:prose-invert max-w-none transition-all duration-300",
        !isExpanded && "line-clamp-3 md:line-clamp-none" // Use line-clamp on mobile if preferred, but character limit is more reliable here
      )}>
        {displayText}
      </div>
      
      {isExpandable && (
        <Button 
          variant="link" 
          onClick={toggleExpand} 
          className="p-0 h-auto mt-2 text-primary uppercase tracking-wider text-xs font-medium inline-flex items-center"
        >
          {isExpanded ? (
            <>{collapseText} <ChevronUp className="ml-1 w-3 h-3" /></>
          ) : (
            <>{expandText} <ChevronDown className="ml-1 w-3 h-3" /></>
          )}
        </Button>
      )}
    </div>
  );
}

```

### src/components/ui/form.tsx
```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  if (!itemContext) {
    throw new Error("useFormField should be used within <FormItem>")
  }

  const fieldState = getFieldState(fieldContext.name, formState)

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue | null>(null)

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}

```

### src/components/ui/hover-card.tsx
```tsx
import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "@/lib/utils"

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-hover-card-content-transform-origin]",
      className
    )}
    {...props}
  />
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent }

```

### src/components/ui/input-otp.tsx
```tsx
import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Minus } from "lucide-react"

import { cn } from "@/lib/utils"

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-1 ring-ring",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Minus />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }

```

### src/components/ui/input.tsx
```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

```

### src/components/ui/kbd.tsx
```tsx
import { cn } from "@/lib/utils"

function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "bg-muted text-muted-foreground pointer-events-none inline-flex h-5 w-fit min-w-5 select-none items-center justify-center gap-1 rounded-sm px-1 font-sans text-xs font-medium",
        "[&_svg:not([class*='size-'])]:size-3",
        "[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10",
        className
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }

```

### src/components/ui/label.tsx
```tsx
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }

```

### src/components/ui/menubar.tsx
```tsx
import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu {...props} />
}

function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group {...props} />
}

function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal {...props} />
}

function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return <MenubarPrimitive.RadioGroup {...props} />
}

function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-9 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm",
      className
    )}
    {...props}
  />
))
Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className
    )}
    {...props}
  />
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </MenubarPrimitive.SubTrigger>
))
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-menubar-content-transform-origin]",
      className
    )}
    {...props}
  />
))
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-menubar-content-transform-origin]",
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
)
MenubarContent.displayName = MenubarPrimitive.Content.displayName

const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName

const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
))
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="h-4 w-4 fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
))
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
MenubarShortcut.displayname = "MenubarShortcut"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}

```

### src/components/ui/multi-select.tsx
```tsx
/**
 * @file Custom multi-select dropdown component
 */

import type React from "react";
import { useEffect, useState, useRef } from "react";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  value?: string[];
  defaultSelected?: string[];
  onChange?: (selected: string[]) => void;
  disabled?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  defaultSelected = [],
  value,
  onChange,
  disabled = false,
}) => {
  const [selectedOptions, setSelectedOptions] =
    useState<string[]>(defaultSelected);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    if (!disabled) setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (selectedOptions.length && value && !value?.length) {
      onChange?.(defaultSelected);
    }
  }, [defaultSelected]);

  useEffect(() => {
    if (
      value?.length &&
      (value.length !== selectedOptions.length ||
        value.some((val) => !selectedOptions.includes(val)))
    ) {
      setSelectedOptions(value);
    }
  }, [value, selectedOptions]);

  const handleSelect = (optionValue: string) => {
    const newSelectedOptions = selectedOptions.includes(optionValue)
      ? selectedOptions.filter((value) => value !== optionValue)
      : [...selectedOptions, optionValue];

    setSelectedOptions(newSelectedOptions);
    onChange?.(newSelectedOptions);
  };

  const removeOption = (value: string) => {
    const newSelectedOptions = selectedOptions.filter((opt) => opt !== value);
    setSelectedOptions(newSelectedOptions);
    onChange?.(newSelectedOptions);
  };

  const selectedValuesText = selectedOptions.map(
    (value) => options.find((option) => option.value === value)?.label || ""
  );

  return (
    <div className="relative z-20 inline-block w-full" ref={containerRef}>
      <div className="relative flex flex-col items-center">
        <div onClick={toggleDropdown} className="w-full">
          <div className="mb-2 flex h-11 rounded-lg border border-gray-300 py-1.5 pl-3 pr-3 shadow-theme-xs outline-hidden transition focus:border-brand-300 focus:shadow-focus-ring dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-300">
            <div className="flex flex-wrap flex-auto gap-2">
              {selectedValuesText.length > 0 ? (
                selectedValuesText.map((text, index) => (
                  <div
                    key={index}
                    className="group flex items-center justify-center rounded-full border-[0.7px] border-transparent bg-gray-100 py-1 pl-2.5 pr-2 text-sm text-gray-800 hover:border-gray-200 dark:bg-gray-800 dark:text-white/90 dark:hover:border-gray-800"
                  >
                    <span className="flex-initial max-w-full">{text}</span>
                    <div className="flex flex-row-reverse flex-auto">
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          removeOption(selectedOptions[index]);
                        }}
                        className="pl-2 text-gray-500 cursor-pointer group-hover:text-gray-400 dark:text-gray-400"
                      >
                        <svg
                          className="fill-current"
                          role="button"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.40717 4.46881C3.11428 4.17591 3.11428 3.70104 3.40717 3.40815C3.70006 3.11525 4.17494 3.11525 4.46783 3.40815L6.99943 5.93975L9.53095 3.40822C9.82385 3.11533 10.2987 3.11533 10.5916 3.40822C10.8845 3.70112 10.8845 4.17599 10.5916 4.46888L8.06009 7.00041L10.5916 9.53193C10.8845 9.82482 10.8845 10.2997 10.5916 10.5926C10.2987 10.8855 9.82385 10.8855 9.53095 10.5926L6.99943 8.06107L4.46783 10.5927C4.17494 10.8856 3.70006 10.8856 3.40717 10.5927C3.11428 10.2998 3.11428 9.8249 3.40717 9.53201L5.93877 7.00041L3.40717 4.46881Z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <input
                  placeholder="Please select options..."
                  className="w-full h-full p-1 pr-2 text-sm bg-transparent border-0 outline-hidden appearance-none placeholder:text-gray-800 focus:border-0 focus:outline-hidden focus:ring-0 dark:placeholder:text-white/90"
                  readOnly
                  value="Please select options..."
                />
              )}
            </div>
            <div className="flex items-center py-1 pl-1 pr-1 w-7">
              <button
                type="button"
                onClick={toggleDropdown}
                className="w-5 h-5 text-gray-700 outline-hidden cursor-pointer focus:outline-hidden dark:text-gray-400"
              >
                <svg
                  className={`stroke-current ${isOpen ? "rotate-180" : ""}`}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.79175 7.39551L10.0001 12.6038L15.2084 7.39551"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div
            className="absolute left-0 z-40 w-full overflow-y-auto bg-white rounded-lg shadow-sm top-full max-h-select dark:bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col">
              {options.map((option, index) => (
                <div
                  key={index}
                  className={`hover:bg-primary/5 w-full cursor-pointer rounded-t border-b border-gray-200 dark:border-gray-800`}
                  onClick={() => handleSelect(option.value)}
                >
                  <div
                    className={`relative flex w-full items-center p-2 pl-2 ${
                      selectedOptions.includes(option.value)
                        ? "bg-primary/10"
                        : ""
                    }`}
                  >
                    <div className="mx-2 leading-6 text-gray-800 dark:text-white/90">
                      {option.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;

```

### src/components/ui/navigation-menu.tsx
```tsx
import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    )}
    {...props}
  />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent"
)

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
      className
    )}
    {...props}
  />
))
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

const NavigationMenuLink = NavigationMenuPrimitive.Link

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
))
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
))
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}

```

### src/components/ui/pagination.tsx
```tsx
import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}

```

### src/components/ui/popover.tsx
```tsx
import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-popover-content-transform-origin]",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }

```

### src/components/ui/progress.tsx
```tsx
"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }

```

### src/components/ui/qrcodedataurl.tsx
```tsx
/**
 * QR Code Generator Component
 * 
 * React wrapper component based on QRCode.js that can convert any text to QR code image
 * 
 * Usage example:
 * import QRCodeDataUrl from './components/qrcodedataurl'
 * 
 * function App() {
 *   return <QRCodeDataUrl text="https://example.com" /> // Replace with valid URL
 * }
 */

import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface QRCodeDataUrlProps {
  /** 
   * Text content to be encoded as QR code
   * Can be URL, text, contact information, etc.
   * Example: "https://example.com" or "CONTACT:1234567890"
   */
  text: string;

  /**
   * QR code image width (pixels)
   * @default 128
   */
  width?: number;

  /**
   * QR code foreground color (valid CSS color value)
   * @default "#000000" (black)
   */
  color?: string;

  /**
   * QR code background color (valid CSS color value) 
   * @default "#ffffff" (white)
   */
  backgroundColor?: string;

  /**
   * Custom CSS class name
   */
  className?: string;
}

/**
 * QR Code Generator Component
 * @param {QRCodeDataUrlProps} props - Component properties
 */
const QRCodeDataUrl: React.FC<QRCodeDataUrlProps> = ({
  text,
  width = 128,
  color = '#000000',
  backgroundColor = '#ffffff',
  className = '',
}) => {
  const [dataUrl, setDataUrl] = useState<string>('');

  useEffect(() => {
    const generateQR = async () => {
      try {
        const url = await QRCode.toDataURL(text, {
          width,
          color: {
            dark: color,
            light: backgroundColor,
          },
        });
        setDataUrl(url);
      } catch (err) {
        console.error('Failed to generate QR code:', err);
      }
    };

    generateQR();
  }, [text, width, color, backgroundColor]);

  return (
    <div className={`qr-code-container ${className}`}>
      {dataUrl ? (
        <img
          src={dataUrl}
          alt={`QR Code: ${text}`}
          width={width}
          height={width}
        />
      ) : (
        <div>Generating QR code...</div>
      )}
    </div>
  );
};

export default QRCodeDataUrl;
```

### src/components/ui/radio-group.tsx
```tsx
import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-3.5 w-3.5 fill-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }

```

### src/components/ui/resizable.tsx
```tsx
"use client"

import { GripVertical } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
)

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) => (
  <ResizablePrimitive.PanelResizeHandle
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </ResizablePrimitive.PanelResizeHandle>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }

```

### src/components/ui/scroll-area.tsx
```tsx
import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }

```

### src/components/ui/select.tsx
```tsx
"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-[--radix-select-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-select-content-transform-origin]",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}

```

### src/components/ui/separator.tsx
```tsx
import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }

```

### src/components/ui/sheet.tsx
```tsx
"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}

```

### src/components/ui/sidebar.tsx
```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { PanelLeft } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextProps | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isMobile = useIsMobile()
    const [openMobile, setOpenMobile] = React.useState(false)

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen)
    const open = openProp ?? _open
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value
        if (setOpenProp) {
          setOpenProp(openState)
        } else {
          _setOpen(openState)
        }

        // This sets the cookie to keep the sidebar state.
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
      },
      [setOpenProp, open]
    )

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
      return isMobile
        ? setOpenMobile((open) => !open)
        : setOpen((open) => !open)
    }, [isMobile, setOpen, setOpenMobile])

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault()
          toggleSidebar()
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [toggleSidebar])

    // We add a state so that we can do data-state="expanded" or "collapsed".
    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? "expanded" : "collapsed"

    const contextValue = React.useMemo<SidebarContextProps>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    )

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
              className
            )}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    )
  }
)
SidebarProvider.displayName = "SidebarProvider"

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right"
    variant?: "sidebar" | "floating" | "inset"
    collapsible?: "offcanvas" | "icon" | "none"
  }
>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar()

    if (collapsible === "none") {
      return (
        <div
          className={cn(
            "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </div>
      )
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
              } as React.CSSProperties
            }
            side={side}
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Sidebar</SheetTitle>
              <SheetDescription>Displays the mobile sidebar.</SheetDescription>
            </SheetHeader>
            <div className="flex h-full w-full flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      )
    }

    return (
      <div
        ref={ref}
        className="group peer hidden text-sidebar-foreground md:block"
        data-state={state}
        data-collapsible={state === "collapsed" ? collapsible : ""}
        data-variant={variant}
        data-side={side}
      >
        {/* This is what handles the sidebar gap on desktop */}
        <div
          className={cn(
            "relative w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear",
            "group-data-[collapsible=offcanvas]:w-0",
            "group-data-[side=right]:rotate-180",
            variant === "floating" || variant === "inset"
              ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
              : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
          )}
        />
        <div
          className={cn(
            "fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear md:flex",
            side === "left"
              ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
              : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
            // Adjust the padding for floating and inset variants.
            variant === "floating" || variant === "inset"
              ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
              : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
            className
          )}
          {...props}
        >
          <div
            data-sidebar="sidebar"
            className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow"
          >
            {children}
          </div>
        </div>
      </div>
    )
  }
)
Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      className={cn("h-7 w-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()

  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
        "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      {...props}
    />
  )
})
SidebarRail.displayName = "SidebarRail"

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"main">
>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn(
        "relative flex w-full flex-1 flex-col bg-background",
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
        className
      )}
      {...props}
    />
  )
})
SidebarInset.displayName = "SidebarInset"

const SidebarInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      className={cn(
        "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        className
      )}
      {...props}
    />
  )
})
SidebarInput.displayName = "SidebarInput"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
})
SidebarHeader.displayName = "SidebarHeader"

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
})
SidebarFooter.displayName = "SidebarFooter"

const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => {
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn("mx-2 w-auto bg-sidebar-border", className)}
      {...props}
    />
  )
})
SidebarSeparator.displayName = "SidebarSeparator"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarContent.displayName = "SidebarContent"

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  )
})
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-sidebar="group-action"
      className={cn(
        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarGroupAction.displayName = "SidebarGroupAction"

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn("w-full text-sm", className)}
    {...props}
  />
))
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn("flex w-full min-w-0 flex-col gap-1", className)}
    {...props}
  />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn("group/menu-item relative", className)}
    {...props}
  />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    isActive?: boolean
    tooltip?: string | React.ComponentProps<typeof TooltipContent>
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const { isMobile, state } = useSidebar()

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    )

    if (!tooltip) {
      return button
    }

    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip,
      }
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          hidden={state !== "collapsed" || isMobile}
          {...tooltip}
        />
      </Tooltip>
    )
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    showOnHover?: boolean
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuAction.displayName = "SidebarMenuAction"

const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="menu-badge"
    className={cn(
      "pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground",
      "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
      "peer-data-[size=sm]/menu-button:top-1",
      "peer-data-[size=default]/menu-button:top-1.5",
      "peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:hidden",
      className
    )}
    {...props}
  />
))
SidebarMenuBadge.displayName = "SidebarMenuBadge"

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    showIcon?: boolean
  }
>(({ className, showIcon = false, ...props }, ref) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  }, [])

  return (
    <div
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 max-w-[--skeleton-width] flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  )
})
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton"

const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    className={cn(
      "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
      "group-data-[collapsible=icon]:hidden",
      className
    )}
    {...props}
  />
))
SidebarMenuSub.displayName = "SidebarMenuSub"

const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ ...props }, ref) => <li ref={ref} {...props} />)
SidebarMenuSubItem.displayName = "SidebarMenuSubItem"

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean
    size?: "sm" | "md"
    isActive?: boolean
  }
>(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}

```

### src/components/ui/skeleton.tsx
```tsx
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  )
}

export { Skeleton }

```

### src/components/ui/slider.tsx
```tsx
import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }

```

### src/components/ui/sonner.tsx
```tsx
"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }

```

### src/components/ui/switch.tsx
```tsx
import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }

```

### src/components/ui/table.tsx
```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}

```

### src/components/ui/tabs.tsx
```tsx
import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }

```

### src/components/ui/textarea.tsx
```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }

```

### src/components/ui/toast.tsx
```tsx
import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold [&+div]:text-xs", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}

```

### src/components/ui/toggle-group.tsx
```tsx
"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
})

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
))

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }

```

### src/components/ui/toggle.tsx
```tsx
import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }

```

### src/components/ui/tooltip.tsx
```tsx
"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]",
        className
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

```

### src/components/ui/video.css
```css
.video-react-paused .video-react-big-play-button.big-play-button-hide {
    display: block;
}

.video-react .video-react-big-play-button {
    width: 48px;
    height: 40px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    margin-left: -24px !important;
    margin-top: -20px !important;
    background: rgba(7, 12, 20, 0.6) !important;
}

.video-react .video-react-big-play-button:hover {
    background: rgba(7, 12, 20, 0.8) !important;
}

.video-react .video-react-big-play-button::before {
    display: block;
    content: '';
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAqCAYAAADBNhlmAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGVSURBVHgB7ZnhbYMwEIWPqAN0BHcDRiAbdASyQTpB6QRpJyAjdAO8QbsBbNBs4L6TcYtaUADb+H7kk56cgKJ8sX0RHBmNYIwpMBT92w7RWZZ1lBoWQ1rzny/kGbmnVODLc3OdFikpBWZ85mSI9ku7htbY/RqNXT8WtA6FNJCsEUUR2FEYSqSNIRpK0FGSFT2FEg0t6DiSXfojeRJLkFHIybfiYwo6FFKvFd1C0KHIijZL9ueWgo6CFlR8CkFHSTNEUwo6SuTDTFyMSBBkWKwiK1oOT0gRdCj6rXh+LU7QocjOppIqyPCy15IFmUK6oNg9+MNN0BMtWfCCHKQKdsiemwXSBHnWniD2gHzygTuSAYu9Ia8QuwxPSBBkseqvmCOloEYO15pSKfagJlsA+zkdsy1nUCMvkNJLPrSFYEdW7EwriCk4WZlLiCEYRMwRWvBMdjk7CoQT9P2lmlYUwGw8GphN7AbmULJdINZuJjYQnDOL3O33bqn5SOZm+jFEZRI8hsjGDkLkEUNO9taPL3veQ/xlrOEbeloBZoEUypwAAAAASUVORK5CYII=) no-repeat;
    background-size: contain;
    width: 15px;
    height: 16.25px;
    margin: 0 auto;
    position: relative;
}

.h-full > .video-react.video-react-fluid {
    height: 100%;
    padding-top: 0 !important;
    aspect-ratio: 16 / 9;
}

```

### src/components/ui/video.tsx
```tsx
/**
 * Video Player Component
 *
 * Video player based on video-react wrapper, supports custom poster, autoplay, mute and other features
 *
 * Usage example:
 * <Video
 *   src="" // Video resource URL, defaults to empty string
 *   poster="https://internal-amis-res.cdn.bcebos.com/images/2019-12/1577157239810/da6376bf988c.png" // Video poster image
 * />
 */

import {
    Player,
    BigPlayButton,
    ControlBar,
    PlayToggle,
    CurrentTimeDisplay,
    TimeDivider,
    DurationDisplay,
    FullscreenToggle,
    VolumeMenuButton,
    ProgressControl
} from 'video-react';
import 'video-react/dist/video-react.css';
import './video.css';
import { cn } from '@/lib/utils';

interface VideoProps {
    /** Video resource URL */
    src: string;
    /** Video poster image URL */
    poster?: string;
    /** Custom class name */
    className?: string;
    /** Whether to autoplay, defaults to false */
    autoPlay?: boolean;
    /** Whether to mute, defaults to false */
    muted?: boolean;
    /** Whether to show controls, defaults to true */
    controls?: boolean;
    /** Video aspect ratio, defaults to 'auto' */
    aspectRatio?: 'auto' | '16:9' | '4:3' | (string & {});
}

export default function Video({
    className,
    src,
    poster,
    autoPlay = false,
    muted = false,
    controls = true,
    aspectRatio = 'auto'
}: VideoProps) {
    return (
        <div className={cn('min-w-[100px]', className)} custom-component="video">
            <Player
                poster={poster}
                src={src}
                autoPlay={autoPlay}
                muted={muted}
                aspectRatio={aspectRatio}
            >
                <ControlBar
                    disableDefaultControls
                    autoHide
                    disableCompletely={!controls}
                >
                    <PlayToggle key="play-toggle" />
                    <VolumeMenuButton key="volume-menu-button" vertical />
                    <CurrentTimeDisplay key="current-time-display" />
                    <TimeDivider key="time-divider" />
                    <DurationDisplay key="duration-display" />
                    <ProgressControl key="progress-control" />
                    <FullscreenToggle key="fullscreen-toggle" />
                </ControlBar>
                <BigPlayButton position="center" />
            </Player>
        </div>
    );
}

```

### src/contexts/AuthContext.tsx
```tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
// @ts-ignore
import { supabase } from '@/db/supabase';
import type { User } from '@supabase/supabase-js';
// @ts-ignore
import type { Profile } from '@/types/types';
import { toast } from 'sonner';

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) {
    console.error('获取用户信息失败:', error);
    return null;
  }
  return data;
}
interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signInWithUsername: (username: string, password: string) => Promise<{ error: Error | null }>;
  signUpWithUsername: (username: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = async () => {
    if (!user) {
      setProfile(null);
      return;
    }

    const profileData = await getProfile(user.id);
    setProfile(profileData);
  };

  useEffect(() => {
    supabase
      .auth
      .getSession()
      // @ts-ignore
      .then(({ data: { session } }) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          getProfile(session.user.id).then(setProfile);
        }
      })
      // @ts-ignore
      .catch(error => {
        toast.error(`获取用户信息失败: ${error.message}`);
      })
      .finally(() => {
        setLoading(false);
      });

    // @ts-ignore
    // In this function, do NOT use any await calls. Use `.then()` instead to avoid deadlocks.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        getProfile(session.user.id).then(setProfile);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithUsername = async (username: string, password: string) => {
    try {
      const email = `${username}@miaoda.com`;
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signUpWithUsername = async (username: string, password: string) => {
    try {
      const email = `${username}@miaoda.com`;
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signInWithUsername, signUpWithUsername, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

```

### src/db/supabase.ts
```ts

            import { createClient } from "@supabase/supabase-js";

            const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
            const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

            export const supabase = createClient(supabaseUrl, supabaseAnonKey);
            
```

### src/global.d.ts
```ts
// global types

// 百度地图GL版本全局类型声明
/// <reference types="bmapgl" />

```

### src/hooks/use-debounce.ts
```ts
import * as React from "react";

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay ?? 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

```

### src/hooks/use-go-back.ts
```ts
import { useNavigate } from "react-router-dom";

const useGoBack = () => {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1); // Go back to the previous page
    } else {
      navigate("/"); // Redirect to home if no history exists
    }
  };

  return goBack;
};

export default useGoBack;

```

### src/hooks/use-mobile.tsx
```tsx
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

```

### src/hooks/use-supabase-upload.ts
```ts
import { useCallback, useEffect, useMemo, useState } from 'react'
import { type FileError, type FileRejection, useDropzone } from 'react-dropzone'
import {type SupabaseClient} from '@supabase/supabase-js'

interface FileWithPreview extends File {
  preview?: string
  errors: readonly FileError[]
}

type UseSupabaseUploadOptions = {
  /**
   * Name of bucket to upload files to in your Supabase project
   */
  bucketName: string
  /**
   * Folder to upload files to in the specified bucket within your Supabase project.
   *
   * Defaults to uploading files to the root of the bucket
   *
   * e.g If specified path is `test`, your file will be uploaded as `test/file_name`
   */
  path?: string
  /**
   * Allowed MIME types for each file upload (e.g `image/png`, `text/html`, etc). Wildcards are also supported (e.g `image/*`).
   *
   * Defaults to allowing uploading of all MIME types.
   */
  allowedMimeTypes?: string[]
  /**
   * Maximum upload size of each file allowed in bytes. (e.g 1000 bytes = 1 KB)
   */
  maxFileSize?: number
  /**
   * Maximum number of files allowed per upload.
   */
  maxFiles?: number
  /**
   * The number of seconds the asset is cached in the browser and in the Supabase CDN.
   *
   * This is set in the Cache-Control: max-age=<seconds> header. Defaults to 3600 seconds.
   */
  cacheControl?: number
  /**
   * When set to true, the file is overwritten if it exists.
   *
   * When set to false, an error is thrown if the object already exists. Defaults to `false`
   */
  upsert?: boolean

  /**
   * initialized Supabase client instance
   */
  supabase: SupabaseClient
}

type UseSupabaseUploadReturn = ReturnType<typeof useSupabaseUpload>

const useSupabaseUpload = (options: UseSupabaseUploadOptions) => {
  const {
    bucketName,
    path,
    allowedMimeTypes = [],
    maxFileSize = Number.POSITIVE_INFINITY,
    maxFiles = 1,
    cacheControl = 3600,
    upsert = false,
    supabase
  } = options

  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<{ name: string; message: string }[]>([])
  const [successes, setSuccesses] = useState<string[]>([])

  const isSuccess = useMemo(() => {
    if (errors.length === 0 && successes.length === 0) {
      return false
    }
    if (errors.length === 0 && successes.length === files.length) {
      return true
    }
    return false
  }, [errors.length, successes.length, files.length])

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const validFiles = acceptedFiles
        .filter((file) => !files.find((x) => x.name === file.name))
        .map((file) => {
          ;(file as FileWithPreview).preview = URL.createObjectURL(file)
          ;(file as FileWithPreview).errors = []
          return file as FileWithPreview
        })

      const invalidFiles = fileRejections.map(({ file, errors }) => {
        ;(file as FileWithPreview).preview = URL.createObjectURL(file)
        ;(file as FileWithPreview).errors = errors
        return file as FileWithPreview
      })

      const newFiles = [...files, ...validFiles, ...invalidFiles]

      setFiles(newFiles)
    },
    [files, setFiles]
  )

  const dropzoneProps = useDropzone({
    onDrop,
    noClick: true,
    accept: allowedMimeTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: maxFileSize,
    maxFiles: maxFiles,
    multiple: maxFiles !== 1,
  })

  const onUpload = useCallback(async () => {
    setLoading(true)

    // [Joshen] This is to support handling partial successes
    // If any files didn't upload for any reason, hitting "Upload" again will only upload the files that had errors
    const filesWithErrors = errors.map((x) => x.name)
    const filesToUpload =
      filesWithErrors.length > 0
        ? [
            ...files.filter((f) => filesWithErrors.includes(f.name)),
            ...files.filter((f) => !successes.includes(f.name)),
          ]
        : files

    const responses = await Promise.all(
      filesToUpload.map(async (file) => {
        const { error } = await supabase.storage
          .from(bucketName)
          .upload(!!path ? `${path}/${file.name}` : file.name, file, {
            cacheControl: cacheControl.toString(),
            upsert,
          })
        if (error) {
          return { name: file.name, message: error.message }
        } else {
          return { name: file.name, message: undefined }
        }
      })
    )

    const responseErrors = responses.filter((x) => x.message !== undefined)
    // if there were errors previously, this function tried to upload the files again so we should clear/overwrite the existing errors.
    setErrors(responseErrors)

    const responseSuccesses = responses.filter((x) => x.message === undefined)
    const newSuccesses = Array.from(
      new Set([...successes, ...responseSuccesses.map((x) => x.name)])
    )
    setSuccesses(newSuccesses)

    setLoading(false)
  }, [files, path, bucketName, errors, successes])

  useEffect(() => {
    if (files.length === 0) {
      setErrors([])
    }

    // If the number of files doesn't exceed the maxFiles parameter, remove the error 'Too many files' from each file
    if (files.length <= maxFiles) {
      let changed = false
      const newFiles = files.map((file) => {
        if (file.errors.some((e) => e.code === 'too-many-files')) {
          file.errors = file.errors.filter((e) => e.code !== 'too-many-files')
          changed = true
        }
        return file
      })
      if (changed) {
        setFiles(newFiles)
      }
    }
  }, [files.length, setFiles, maxFiles])

  return {
    files,
    setFiles,
    successes,
    isSuccess,
    loading,
    errors,
    setErrors,
    onUpload,
    maxFileSize: maxFileSize,
    maxFiles: maxFiles,
    allowedMimeTypes,
    ...dropzoneProps,
  }
}

export { useSupabaseUpload, type UseSupabaseUploadOptions, type UseSupabaseUploadReturn }

```

### src/index.css
```css
/* stylelint-disable */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Definition of the design system. All colors, gradients, fonts, etc should be defined here.
All colors MUST be HSL.
*/

@layer base {
  :root {
    --radius: 0.5rem;
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 240 5.9% 10%;
    --sidebar-primary-foreground: 0 0% 98%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 217.2 91.2% 59.8%;
    --destructive-foreground: 210 40% 98%;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 224.3 76.3% 48%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 217.2 91.2% 59.8%;
    --destructive-foreground: 210 40% 98%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
  }
}

@layer utilities {
  .writing-vertical-rl {
    writing-mode: vertical-rl;
  }
}

```

### src/lib/utils.ts
```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Params = Partial<
  Record<keyof URLSearchParams, string | number | null | undefined>
>;

export function createQueryString(
  params: Params,
  searchParams: URLSearchParams
) {
  const newSearchParams = new URLSearchParams(searchParams?.toString());

  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined) {
      newSearchParams.delete(key);
    } else {
      newSearchParams.set(key, String(value));
    }
  }

  return newSearchParams.toString();
}

export function formatDate(
  date: Date | string | number,
  opts: Intl.DateTimeFormatOptions = {}
) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: opts.month ?? "long",
    day: opts.day ?? "numeric",
    year: opts.year ?? "numeric",
    ...opts,
  }).format(new Date(date));
}

```

### src/main.tsx
```tsx
import * as Sentry from "@sentry/react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import "./index.css";

Sentry.init({
  dsn: import.meta.env['VITE_SENTRY_DSN'] as string | undefined,
  environment: import.meta.env.MODE,
});

createRoot(document.getElementById("root")!).render(
  <Sentry.ErrorBoundary fallback={<p>应用发生错误，请刷新页面重试</p>}>
    <AppWrapper>
      <App />
    </AppWrapper>
  </Sentry.ErrorBoundary>
);

```

### src/pages/admin/Account.tsx
```tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/db/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function AdminAccount() {
  const { profile, user } = useAuth();
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
  });
  
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [pwdLoading, setPwdLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || profile.username || '',
        phone_number: profile.phone_number || '',
      });
    }
  }, [profile]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('profiles').update({
      full_name: formData.full_name,
      phone_number: formData.phone_number,
    }).eq('id', profile?.id);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Profile updated successfully');
    }
    setLoading(false);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return toast.error('Passwords do not match');
    }
    if (passwordData.newPassword.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }

    setPwdLoading(true);
    const { error } = await supabase.auth.updateUser({
      password: passwordData.newPassword
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Password updated successfully');
      setPasswordData({ newPassword: '', confirmPassword: '' });
    }
    setPwdLoading(false);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

      <Card>
        <form onSubmit={handleUpdateProfile}>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={profile?.email || user?.email || ''} disabled className="px-3 bg-muted" />
              <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
            </div>
            <div className="space-y-2">
              <Label>Name</Label>
              <Input 
                value={formData.full_name} 
                onChange={e => setFormData({...formData, full_name: e.target.value})} 
                className="px-3" 
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label>Current Role</Label>
              <Input value={profile?.role || 'User'} disabled className="px-3 bg-muted capitalize" />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</Button>
          </CardFooter>
        </form>
      </Card>

      <Card>
        <form onSubmit={handleUpdatePassword}>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Ensure your account is using a long, random password to stay secure.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input 
                type="password" 
                value={passwordData.newPassword} 
                onChange={e => setPasswordData({...passwordData, newPassword: e.target.value})} 
                className="px-3" 
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Confirm New Password</Label>
              <Input 
                type="password" 
                value={passwordData.confirmPassword} 
                onChange={e => setPasswordData({...passwordData, confirmPassword: e.target.value})} 
                className="px-3" 
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" variant="secondary" disabled={pwdLoading}>{pwdLoading ? 'Updating...' : 'Update Password'}</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
```

### src/pages/admin/Announcements.tsx
```tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '@/db/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Trash2, Plus, Edit, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { ContentModal } from '@/components/ui/content-modal';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { AlertCircle } from 'lucide-react';


export default function Announcements() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    published_date: format(new Date(), 'yyyy-MM-dd'),
    status: 'Active'
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('published_date', { ascending: false });
    
    if (error) {
      toast.error('Failed to load announcements');
    } else {
      setAnnouncements(data || []);
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.published_date) return toast.error('Title and Date are required');
    
    setLoading(true);
    let error;

    if (editingId) {
      const res = await supabase.from('announcements').update(formData).eq('id', editingId);
      error = res.error;
    } else {
      const res = await supabase.from('announcements').insert([formData]);
      error = res.error;
    }

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(`Announcement ${editingId ? 'updated' : 'added'} successfully`);
      setIsModalOpen(false);
      fetchAnnouncements();
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    
    
    const { error } = await supabase.from('announcements').delete().eq('id', id);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Announcement deleted');
      fetchAnnouncements();
    }
  };

  const openModal = (ann?: any) => {
    if (ann) {
      setEditingId(ann.id);
      setFormData({
        title: ann.title,
        content: ann.content || '',
        published_date: ann.published_date,
        status: ann.status
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        content: '',
        published_date: format(new Date(), 'yyyy-MM-dd'),
        status: 'Active'
      });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Announcements</h1>
        <Button onClick={() => openModal()}><Plus className="mr-2 h-4 w-4" /> Add Announcement</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Published Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={4} className="text-center">Loading...</TableCell></TableRow>
              ) : announcements.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="text-center">No announcements found</TableCell></TableRow>
              ) : (
                announcements.map(ann => (
                  <TableRow key={ann.id}>
                    <TableCell className="font-medium">{ann.title}</TableCell>
                    <TableCell>{format(new Date(ann.published_date), 'MMM d, yyyy')}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${ann.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {ann.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <ContentModal
                        title={ann.title}
                        content={<p className="whitespace-pre-line leading-relaxed">{ann.content}</p>}
                        metadata={{
                          date: new Date(ann.published_date),
                          category: 'Announcement'
                        }}
                        trigger={
                          <Button variant="ghost" size="sm" title="Preview" onClick={() => {}}><Eye className="h-4 w-4" /></Button>
                        }
                      />
                      <Button variant="ghost" size="sm" onClick={() => openModal(ann)}><Edit className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm" className="text-red-500" onClick={() => setDeleteId(ann.id)}><Trash2 className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[calc(100%-2rem)] md:max-w-lg rounded-xl p-6">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Announcement' : 'Add Announcement'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} rows={4} />
            </div>
            <div className="space-y-2">
              <Label>Published Date *</Label>
              <Input type="date" value={formData.published_date} onChange={e => setFormData({...formData, published_date: e.target.value})} required />
            </div>
            <div className="flex items-center justify-between border p-3 rounded-md">
              <div className="space-y-0.5">
                <Label>Active Status</Label>
                <div className="text-xs text-muted-foreground">Inactive announcements won't appear on the public site</div>
              </div>
              <Switch 
                checked={formData.status === 'Active'} 
                onCheckedChange={(checked) => setFormData({...formData, status: checked ? 'Active' : 'Inactive'})} 
              />
            </div>
            <div className="flex justify-end pt-4">
              <Button type="button" variant="outline" className="mr-2" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="max-w-[calc(100%-2rem)] md:max-w-md rounded-xl p-6">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="w-5 h-5" /> Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this record? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => {
              if (deleteId) handleDelete(deleteId);
              setDeleteId(null);
            }}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
</div>
  );
}
```

### src/pages/admin/Bishops.tsx
```tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '@/db/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { LayoutGrid, List as ListIcon, Search } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { AlertCircle } from 'lucide-react';


export default function AdminBishops() {
  const [bishops, setBishops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>(() => {
    return (localStorage.getItem('admin_view_preference') as 'list' | 'grid') || 'list';
  });
  
  const [formData, setFormData] = useState({
    name: '',
    year_installed: '',
    is_current: false,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('bishops').select('*').order('year_installed', { ascending: false });
    if (data) setBishops(data);
    setLoading(false);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ name: '', year_installed: '', is_current: false });
    setImageFile(null);
    setIsOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      year_installed: item.year_installed || '',
      is_current: item.is_current || false,
    });
    setImageFile(null);
    setIsOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name) return toast.error('Name is required');

    let imageUrl = editingItem?.image_url;

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data, error } = await supabase.storage.from('images').upload(`bishops/${fileName}`, imageFile);
      if (error) return toast.error('Image upload failed: ' + error.message);
      
      const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(`bishops/${fileName}`);
      imageUrl = publicUrlData.publicUrl;
    }

    const payload = {
      ...formData,
      image_url: imageUrl
    };

    if (editingItem) {
      const { error } = await supabase.from('bishops').update(payload).eq('id', editingItem.id);
      if (error) toast.error(error.message);
      else toast.success('Updated successfully');
    } else {
      const { error } = await supabase.from('bishops').insert([payload]);
      if (error) toast.error(error.message);
      else toast.success('Added successfully');
    }

    setIsOpen(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (true) {
      const { error } = await supabase.from('bishops').delete().eq('id', id);
      if (error) toast.error(error.message);
      else {
        toast.success('Deleted successfully');
        fetchData();
      }
    }
  };

  const filteredBishops = bishops.filter(b => 
    b.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.year_installed?.toString().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Bishops Management</h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search bishops..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Tabs value={viewMode} onValueChange={(v) => {
            setViewMode(v as 'list' | 'grid');
            localStorage.setItem('admin_view_preference', v);
          }}>
            <TabsList className="grid w-[80px] grid-cols-2">
              <TabsTrigger value="list" aria-label="List view"><ListIcon className="h-4 w-4" /></TabsTrigger>
              <TabsTrigger value="grid" aria-label="Grid view"><LayoutGrid className="h-4 w-4" /></TabsTrigger>
            </TabsList>
          </Tabs>
          <Button onClick={handleAdd}>Add Bishop</Button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table className="[&>div]:max-w-full min-w-[800px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Photo</TableHead>
                    <TableHead className="whitespace-nowrap">Name</TableHead>
                    <TableHead className="whitespace-nowrap">Year Installed</TableHead>
                    <TableHead className="whitespace-nowrap">Status</TableHead>
                    <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow><TableCell colSpan={5} className="text-center py-8">Loading...</TableCell></TableRow>
                  ) : filteredBishops.length === 0 ? (
                    <TableRow><TableCell colSpan={5} className="text-center py-8">No bishops found.</TableCell></TableRow>
                  ) : (
                    filteredBishops.map(item => (
                      <TableRow key={item.id}>
                        <TableCell>
                          {item.image_url ? (
                            <img src={item.image_url} alt="" className="w-10 h-10 rounded-full object-cover" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs">N/A</div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium whitespace-nowrap">{item.name}</TableCell>
                        <TableCell className="whitespace-nowrap">{item.year_installed}</TableCell>
                        <TableCell className="whitespace-nowrap">
                          {item.is_current ? (
                            <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">Current</span>
                          ) : null}
                        </TableCell>
                        <TableCell className="text-right whitespace-nowrap">
                          <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(item)}>Edit</Button>
                          <Button variant="ghost" size="sm" className="text-red-600" onClick={() => setDeleteId(item.id)}>Delete</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {loading ? (
            <div className="col-span-full text-center py-8 text-muted-foreground">Loading...</div>
          ) : filteredBishops.length === 0 ? (
            <div className="col-span-full text-center py-8 text-muted-foreground">No bishops found.</div>
          ) : (
            filteredBishops.map(item => (
              <Card key={item.id} className="overflow-hidden flex flex-col relative">
                {item.is_current && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium z-10 shadow-sm">
                    Current
                  </div>
                )}
                <div className="aspect-square bg-muted relative">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>
                  )}
                </div>
                <CardContent className="p-4 flex-1 flex flex-col">
                  <h3 className="font-medium truncate mb-1" title={item.name}>{item.name}</h3>
                  <div className="text-xs text-muted-foreground mb-4">
                    <p className="truncate">Year Installed: {item.year_installed || 'N/A'}</p>
                  </div>
                  <div className="mt-auto flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(item)}>Edit</Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => setDeleteId(item.id)}>Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[calc(100%-2rem)] md:max-w-lg rounded-xl p-6">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Bishop' : 'Add Bishop'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 w-full max-w-lg mx-auto">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="px-3" />
            </div>
            <div className="space-y-2">
              <Label>Year Installed</Label>
              <Input value={formData.year_installed} onChange={e => setFormData({...formData, year_installed: e.target.value})} className="px-3" />
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox 
                id="is_current" 
                checked={formData.is_current} 
                onCheckedChange={(c) => setFormData({...formData, is_current: c === true})} 
              />
              <Label htmlFor="is_current">Mark as Current Bishop</Label>
            </div>
            <div className="space-y-2">
              <Label>Photo Upload</Label>
              <Input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="px-3" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="max-w-[calc(100%-2rem)] md:max-w-md rounded-xl p-6">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="w-5 h-5" /> Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this record? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => {
              if (deleteId) handleDelete(deleteId);
              setDeleteId(null);
            }}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
</div>
  );
}
```

### src/pages/admin/Churches.tsx
```tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '@/db/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { LayoutGrid, List as ListIcon, Search } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { AlertCircle } from 'lucide-react';


export default function AdminChurches() {
  const [churches, setChurches] = useState<any[]>([]);
  const [priests, setPriests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>(() => {
    return (localStorage.getItem('admin_view_preference') as 'list' | 'grid') || 'list';
  });
  
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    patron: '',
    year_established: '',
    status: 'Parish',
    history: '',
    in_charge_priest_id: 'all',
    secretary: '',
    capacity: '',
    denomination: 'Catholic'
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: pData } = await supabase.from('priests').select('*').order('name');
    if (pData) setPriests(pData);

    const { data: cData, error } = await supabase.from('churches').select('*, in_charge:priests(name)').order('name');
    if (cData) setChurches(cData);
    setLoading(false);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ 
      name: '', address: '', patron: '', year_established: '', 
      status: 'Parish', history: '', in_charge_priest_id: 'all', secretary: '',
      capacity: '', denomination: 'Catholic'
    });
    setImageFile(null);
    setIsOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      address: item.address || '',
      patron: item.patron || '',
      year_established: item.year_established || '',
      status: item.status || 'Parish',
      history: item.history || '',
      in_charge_priest_id: item.in_charge_priest_id || 'all',
      secretary: item.secretary || '',
      capacity: item.capacity ? String(item.capacity) : '',
      denomination: item.denomination || 'Catholic'
    });
    setImageFile(null);
    setIsOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name) return toast.error('Name is required');

    let imageUrl = editingItem?.image_url;

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error } = await supabase.storage.from('images').upload(`churches/${fileName}`, imageFile);
      if (error) return toast.error('Image upload failed: ' + error.message);
      
      const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(`churches/${fileName}`);
      imageUrl = publicUrlData.publicUrl;
    }

    const payload = {
      name: formData.name,
      address: formData.address,
      patron: formData.patron,
      year_established: formData.year_established,
      status: formData.status,
      history: formData.history,
      capacity: formData.capacity ? parseInt(formData.capacity) : null,
      denomination: formData.denomination,
      secretary: formData.secretary,
      in_charge_priest_id: formData.in_charge_priest_id === 'all' ? null : formData.in_charge_priest_id,
      image_url: imageUrl
    };

    if (editingItem) {
      const { error } = await supabase.from('churches').update(payload).eq('id', editingItem.id);
      if (error) toast.error(error.message);
      else toast.success('Updated successfully');
    } else {
      const { error } = await supabase.from('churches').insert([payload]);
      if (error) toast.error(error.message);
      else toast.success('Added successfully');
    }

    setIsOpen(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (true) {
      const { error } = await supabase.from('churches').delete().eq('id', id);
      if (error) toast.error(error.message);
      else {
        toast.success('Deleted successfully');
        fetchData();
      }
    }
  };

  const filteredChurches = churches.filter(c => 
    c.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.patron?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Churches Management</h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search churches..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Tabs value={viewMode} onValueChange={(v) => {
            setViewMode(v as 'list' | 'grid');
            localStorage.setItem('admin_view_preference', v);
          }}>
            <TabsList className="grid w-[80px] grid-cols-2">
              <TabsTrigger value="list" aria-label="List view"><ListIcon className="h-4 w-4" /></TabsTrigger>
              <TabsTrigger value="grid" aria-label="Grid view"><LayoutGrid className="h-4 w-4" /></TabsTrigger>
            </TabsList>
          </Tabs>
          <Button onClick={handleAdd}>Add Church</Button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table className="[&>div]:max-w-full min-w-[1000px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Photo</TableHead>
                    <TableHead className="whitespace-nowrap">Name</TableHead>
                    <TableHead className="whitespace-nowrap">Patron Saint</TableHead>
                    <TableHead className="whitespace-nowrap">Status</TableHead>
                    <TableHead className="whitespace-nowrap">Priest In-Charge</TableHead>
                    <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow><TableCell colSpan={6} className="text-center py-8">Loading...</TableCell></TableRow>
                  ) : filteredChurches.length === 0 ? (
                    <TableRow><TableCell colSpan={6} className="text-center py-8">No churches found.</TableCell></TableRow>
                  ) : (
                    filteredChurches.map(item => (
                      <TableRow key={item.id}>
                        <TableCell>
                          {item.image_url ? (
                            <img src={item.image_url} alt="" className="w-10 h-10 rounded-md object-cover" />
                          ) : (
                            <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center text-xs">N/A</div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium whitespace-nowrap">
                          {item.name}
                          <div className="text-xs text-muted-foreground font-normal">{item.address}</div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{item.patron}</TableCell>
                        <TableCell className="whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'Parish' ? 'bg-primary/10 text-primary' : 'bg-secondary text-secondary-foreground'}`}>
                            {item.status}
                          </span>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{item.in_charge?.name || 'Unassigned'}</TableCell>
                        <TableCell className="text-right whitespace-nowrap">
                          <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(item)}>Edit</Button>
                          <Button variant="ghost" size="sm" className="text-red-600" onClick={() => setDeleteId(item.id)}>Delete</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {loading ? (
            <div className="col-span-full text-center py-8 text-muted-foreground">Loading...</div>
          ) : filteredChurches.length === 0 ? (
            <div className="col-span-full text-center py-8 text-muted-foreground">No churches found.</div>
          ) : (
            filteredChurches.map(item => (
              <Card key={item.id} className="overflow-hidden flex flex-col relative">
                <div className="absolute top-2 right-2 z-10 flex gap-1">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium shadow-sm ${item.status === 'Parish' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                    {item.status}
                  </span>
                </div>
                <div className="aspect-[4/3] bg-muted relative">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>
                  )}
                </div>
                <CardContent className="p-4 flex-1 flex flex-col">
                  <h3 className="font-medium truncate mb-1" title={item.name}>{item.name}</h3>
                  <p className="text-xs text-muted-foreground truncate mb-3" title={item.address}>{item.address}</p>
                  
                  <div className="text-xs space-y-1 mb-4">
                    <p className="truncate"><span className="text-muted-foreground">Patron:</span> {item.patron || 'N/A'}</p>
                    <p className="truncate"><span className="text-muted-foreground">Priest:</span> {item.in_charge?.name || 'Unassigned'}</p>
                  </div>

                  <div className="mt-auto flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(item)}>Edit</Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => setDeleteId(item.id)}>Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[calc(100%-2rem)] md:max-w-2xl rounded-xl p-6 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Church' : 'Add Church'}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="px-3" />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(v) => setFormData({...formData, status: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Parish">Parish</SelectItem>
                  <SelectItem value="Mission Center">Mission Center</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Patron Saint</Label>
              <Input value={formData.patron} onChange={e => setFormData({...formData, patron: e.target.value})} className="px-3" />
            </div>
            <div className="space-y-2">
              <Label>Year Established</Label>
              <Input value={formData.year_established} onChange={e => setFormData({...formData, year_established: e.target.value})} className="px-3" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Address</Label>
              <Input value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="px-3" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Main Priest In-Charge</Label>
              <Select value={formData.in_charge_priest_id} onValueChange={(v) => setFormData({...formData, in_charge_priest_id: v})}>
                <SelectTrigger><SelectValue placeholder="Select Priest" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Unassigned</SelectItem>
                  {priests.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Secretary Name</Label>
              <Input value={formData.secretary} onChange={e => setFormData({...formData, secretary: e.target.value})} className="px-3" />
            </div>
            <div className="space-y-2">
              <Label>Capacity</Label>
              <Input type="number" value={formData.capacity} onChange={e => setFormData({...formData, capacity: e.target.value})} className="px-3" placeholder="e.g. 500" />
            </div>
            <div className="space-y-2">
              <Label>Denomination</Label>
              <Input value={formData.denomination} onChange={e => setFormData({...formData, denomination: e.target.value})} className="px-3" placeholder="e.g. Catholic" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>History</Label>
              <Textarea value={formData.history} onChange={e => setFormData({...formData, history: e.target.value})} className="px-3" rows={4} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Photo Upload</Label>
              <Input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="px-3" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="max-w-[calc(100%-2rem)] md:max-w-md rounded-xl p-6">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="w-5 h-5" /> Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this record? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => {
              if (deleteId) handleDelete(deleteId);
              setDeleteId(null);
            }}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
</div>
  );
}
```

### src/pages/admin/Dashboard.tsx
```tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '@/db/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Church, Users, Calendar as CalendarIcon, CalendarRange } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    churches: 0,
    priests: 0,
    events: 0,
    yearOf: 0
  });
  const [search, setSearch] = useState('');
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Search Results
  const [searchResults, setSearchResults] = useState<{
    churches: any[];
    priests: any[];
    events: any[];
  }>({ churches: [], priests: [], events: [] });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    
    // Stats
    const { count: cCount } = await supabase.from('churches').select('*', { count: 'exact', head: true });
    const { count: pCount } = await supabase.from('priests').select('*', { count: 'exact', head: true });
    const { count: eCount } = await supabase.from('events').select('*', { count: 'exact', head: true });
    const { count: yCount } = await supabase.from('year_of').select('*', { count: 'exact', head: true });

    setStats({
      churches: cCount || 0,
      priests: pCount || 0,
      events: eCount || 0,
      yearOf: yCount || 0
    });

    // Upcoming events
    const { data: eventsData } = await supabase.from('events')
      .select('*')
      .gte('date_expired', new Date().toISOString())
      .order('date_expired', { ascending: true })
      .limit(5);

    if (eventsData) setUpcomingEvents(eventsData);

    setLoading(false);
  };

  useEffect(() => {
    if (search.length > 2) {
      performSearch();
    } else {
      setSearchResults({ churches: [], priests: [], events: [] });
    }
  }, [search]);

  const performSearch = async () => {
    const { data: cData } = await supabase.from('churches').select('*').ilike('name', `%${search}%`).limit(5);
    const { data: pData } = await supabase.from('priests').select('*').ilike('name', `%${search}%`).limit(5);
    const { data: eData } = await supabase.from('events').select('*').ilike('title', `%${search}%`).limit(5);

    setSearchResults({
      churches: cData || [],
      priests: pData || [],
      events: eData || []
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="mb-8 max-w-md">
        <Input 
          type="search" 
          placeholder="Search churches, priests, or events..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3"
        />
      </div>

      {search.length > 2 && (
        <div className="mb-8 space-y-6">
          <h2 className="text-xl font-semibold">Search Results</h2>
          {searchResults.churches.length === 0 && searchResults.priests.length === 0 && searchResults.events.length === 0 && (
            <p className="text-muted-foreground">No results found.</p>
          )}

          {searchResults.churches.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="text-sm">Churches</CardTitle></CardHeader>
              <CardContent>
                <ul className="list-disc pl-4">
                  {searchResults.churches.map(c => <li key={c.id}>{c.name} ({c.status})</li>)}
                </ul>
              </CardContent>
            </Card>
          )}

          {searchResults.priests.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="text-sm">Priests</CardTitle></CardHeader>
              <CardContent>
                <ul className="list-disc pl-4">
                  {searchResults.priests.map(p => <li key={p.id}>{p.name} - {p.assignment}</li>)}
                </ul>
              </CardContent>
            </Card>
          )}

          {searchResults.events.length > 0 && (
            <Card>
              <CardHeader><CardTitle className="text-sm">Events</CardTitle></CardHeader>
              <CardContent>
                <ul className="list-disc pl-4">
                  {searchResults.events.map(e => <li key={e.id}>{e.title}</li>)}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {search.length <= 2 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Churches</CardTitle>
                <Church className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.churches}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Priests</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.priests}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Events</CardTitle>
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.events}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Year Themes</CardTitle>
                <CalendarRange className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.yearOf}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading...</p>
              ) : upcomingEvents.length === 0 ? (
                <p className="text-muted-foreground">No upcoming events.</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table className="[&>div]:max-w-full min-w-[600px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event Title</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {upcomingEvents.map(evt => (
                        <TableRow key={evt.id}>
                          <TableCell className="font-medium whitespace-nowrap">{evt.title}</TableCell>
                          <TableCell className="whitespace-nowrap">{new Date(evt.date_expired).toLocaleDateString()}</TableCell>
                          <TableCell className="truncate max-w-[300px]">{evt.description}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
```

### src/pages/admin/Donations.tsx
```tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '@/db/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Edit, Trash2, Plus } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { AlertCircle } from 'lucide-react';


export default function AdminDonations() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon_name: '',
    is_active: true,
    display_order: 0
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('donation_options').select('*').order('display_order', { ascending: true });
    if (data) setItems(data);
    setLoading(false);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ name: '', description: '', icon_name: 'Smartphone', is_active: true, display_order: items.length + 1 });
    setImageFile(null);
    setIsOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description || '',
      icon_name: item.icon_name || 'Smartphone',
      is_active: item.is_active,
      display_order: item.display_order || 0
    });
    setImageFile(null);
    setIsOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name) return toast.error('Name is required');
    if (!editingItem && !imageFile) return toast.error('QR Image is required for new options');

    setLoading(true);
    let qrImageUrl = editingItem?.qr_image_url;

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `qr-${Math.random()}.${fileExt}`;
      const { data, error } = await supabase.storage.from('public').upload(`donations/${fileName}`, imageFile);
      if (error) {
        setLoading(false);
        return toast.error('Image upload failed: ' + error.message);
      }
      
      const { data: publicUrlData } = supabase.storage.from('public').getPublicUrl(`donations/${fileName}`);
      qrImageUrl = publicUrlData.publicUrl;
    }

    const payload = {
      ...formData,
      qr_image_url: qrImageUrl
    };

    if (editingItem) {
      const { error } = await supabase.from('donation_options').update(payload).eq('id', editingItem.id);
      if (error) toast.error(error.message);
      else toast.success('Updated successfully');
    } else {
      const { error } = await supabase.from('donation_options').insert([payload]);
      if (error) toast.error(error.message);
      else toast.success('Added successfully');
    }

    setIsOpen(false);
    setLoading(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (true) {
      const { error } = await supabase.from('donation_options').delete().eq('id', id);
      if (error) toast.error(error.message);
      else {
        toast.success('Deleted successfully');
        fetchData();
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Donation Methods</h1>
        <Button onClick={handleAdd}><Plus className="h-4 w-4 mr-2"/> Add Option</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>QR Code Payments</CardTitle>
          <CardDescription>Manage the donation payment options shown in the public footer carousel.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="[&>div]:max-w-full min-w-[800px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">QR</TableHead>
                  <TableHead className="whitespace-nowrap">Name</TableHead>
                  <TableHead className="whitespace-nowrap">Description</TableHead>
                  <TableHead className="whitespace-nowrap">Status</TableHead>
                  <TableHead className="whitespace-nowrap text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-8">Loading...</TableCell></TableRow>
                ) : items.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-8">No donation options found.</TableCell></TableRow>
                ) : (
                  items.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="w-12 h-12 bg-white rounded-md border flex items-center justify-center p-1">
                           <img src={item.qr_image_url} alt="QR" className="max-w-full max-h-full object-contain" />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium whitespace-nowrap">{item.name}</TableCell>
                      <TableCell className="whitespace-nowrap">{item.description}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${item.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {item.is_active ? 'Active' : 'Hidden'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right whitespace-nowrap">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}><Edit className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => setDeleteId(item.id)}><Trash2 className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[calc(100%-2rem)] md:max-w-lg rounded-xl p-6">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Option' : 'Add Option'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 w-full">
            <div className="space-y-2">
              <Label>Method Name (e.g. GCash)</Label>
              <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="px-3" />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="px-3" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Icon Name (Lucide)</Label>
                <Input value={formData.icon_name} onChange={e => setFormData({...formData, icon_name: e.target.value})} placeholder="Smartphone" className="px-3" />
              </div>
              <div className="space-y-2">
                <Label>Display Order</Label>
                <Input type="number" value={formData.display_order} onChange={e => setFormData({...formData, display_order: parseInt(e.target.value) || 0})} className="px-3" />
              </div>
            </div>
            <div className="space-y-2 pt-2">
              <Label>QR Code Image</Label>
              <Input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="px-3" />
              {editingItem?.qr_image_url && !imageFile && (
                <div className="mt-2 w-24 h-24 border rounded-md p-1 bg-white">
                  <img src={editingItem.qr_image_url} className="w-full h-full object-contain" alt="Current QR" />
                </div>
              )}
            </div>
            <div className="flex items-center justify-between border p-3 rounded-md mt-4">
              <Label>Active Status</Label>
              <Switch checked={formData.is_active} onCheckedChange={(c) => setFormData({...formData, is_active: c})} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)} disabled={loading}>Cancel</Button>
            <Button onClick={handleSave} disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="max-w-[calc(100%-2rem)] md:max-w-md rounded-xl p-6">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="w-5 h-5" /> Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this record? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => {
              if (deleteId) handleDelete(deleteId);
              setDeleteId(null);
            }}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
</div>
  );
}

```

### src/pages/admin/Events.tsx
```tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '@/db/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { LayoutGrid, List as ListIcon, Search, Eye } from 'lucide-react';
import { ContentModal } from '@/components/ui/content-modal';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { AlertCircle } from 'lucide-react';


export default function AdminEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>(() => {
    return (localStorage.getItem('admin_view_preference') as 'list' | 'grid') || 'list';
  });
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date_expired: '',
    image_url: ''
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('events').select('*').order('date_expired', { ascending: false });
    if (data) setEvents(data);
    setLoading(false);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ title: '', description: '', date_expired: '', image_url: '' });
    setIsOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || '',
      date_expired: item.date_expired ? new Date(item.date_expired).toISOString().split('T')[0] : '',
      image_url: item.image_url || ''
    });
    setIsOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `events/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      setFormData(prev => ({ ...prev, image_url: data.publicUrl }));
    } catch (error: any) {
      toast.error('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.date_expired) return toast.error('Title and Date are required');

    const payload = {
      title: formData.title,
      description: formData.description,
      date_expired: new Date(formData.date_expired).toISOString(),
      image_url: formData.image_url || null
    };

    if (editingItem) {
      const { error } = await supabase.from('events').update(payload).eq('id', editingItem.id);
      if (error) toast.error(error.message);
      else toast.success('Updated successfully');
    } else {
      const { error } = await supabase.from('events').insert([payload]);
      if (error) toast.error(error.message);
      else toast.success('Added successfully');
    }

    setIsOpen(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (true) {
      const { error } = await supabase.from('events').delete().eq('id', id);
      if (error) toast.error(error.message);
      else {
        toast.success('Deleted successfully');
        fetchData();
      }
    }
  };

  const filteredEvents = events.filter(e => 
    e.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    e.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Events Management</h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search events..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Tabs value={viewMode} onValueChange={(v) => {
            setViewMode(v as 'list' | 'grid');
            localStorage.setItem('admin_view_preference', v);
          }}>
            <TabsList className="grid w-[80px] grid-cols-2">
              <TabsTrigger value="list" aria-label="List view"><ListIcon className="h-4 w-4" /></TabsTrigger>
              <TabsTrigger value="grid" aria-label="Grid view"><LayoutGrid className="h-4 w-4" /></TabsTrigger>
            </TabsList>
          </Tabs>
          <Button onClick={handleAdd}>Add Event</Button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table className="[&>div]:max-w-full min-w-[800px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">Title</TableHead>
                    <TableHead className="whitespace-nowrap">Description</TableHead>
                    <TableHead className="whitespace-nowrap">End Date</TableHead>
                    <TableHead className="whitespace-nowrap">Status</TableHead>
                    <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow><TableCell colSpan={5} className="text-center py-8">Loading...</TableCell></TableRow>
                  ) : filteredEvents.length === 0 ? (
                    <TableRow><TableCell colSpan={5} className="text-center py-8">No events found.</TableCell></TableRow>
                  ) : (
                    filteredEvents.map(item => {
                      const isExpired = new Date(item.date_expired) < new Date();
                      return (
                        <TableRow key={item.id} className={isExpired ? 'opacity-50' : ''}>
                          <TableCell className="font-medium whitespace-nowrap">{item.title}</TableCell>
                          <TableCell className="max-w-[300px] truncate">{item.description}</TableCell>
                          <TableCell className="whitespace-nowrap">{new Date(item.date_expired).toLocaleDateString()}</TableCell>
                          <TableCell className="whitespace-nowrap">
                            {isExpired ? <span className="text-red-500">Archived</span> : <span className="text-green-500">Active</span>}
                          </TableCell>
                          <TableCell className="text-right whitespace-nowrap">
                            <ContentModal
                              title={item.title}
                              content={<p className="whitespace-pre-line leading-relaxed">{item.description}</p>}
                              imageUrl={item.image_url}
                              metadata={{
                                date: new Date(item.date_expired),
                                category: 'Event'
                              }}
                              trigger={
                                <Button variant="outline" size="sm" className="mr-2" title="Preview" onClick={() => {}}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                              }
                            />
                            <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(item)}>Edit</Button>
                            <Button variant="ghost" size="sm" className="text-red-600" onClick={() => setDeleteId(item.id)}>Delete</Button>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? (
            <div className="col-span-full text-center py-8 text-muted-foreground">Loading...</div>
          ) : filteredEvents.length === 0 ? (
            <div className="col-span-full text-center py-8 text-muted-foreground">No events found.</div>
          ) : (
            filteredEvents.map(item => {
              const isExpired = new Date(item.date_expired) < new Date();
              return (
                <Card key={item.id} className={`overflow-hidden flex flex-col relative rounded-none ${isExpired ? 'opacity-60' : ''}`}>
                  {item.image_url && (
                    <div className="w-full aspect-video bg-muted border-b overflow-hidden shrink-0">
                      <img src={item.image_url} alt={item.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 z-10">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium shadow-sm ${isExpired ? 'bg-muted text-muted-foreground' : 'bg-green-100 text-green-700'}`}>
                      {isExpired ? 'Archived' : 'Active'}
                    </span>
                  </div>
                  <CardContent className="p-5 flex-1 flex flex-col mt-4">
                    <h3 className="font-semibold text-lg line-clamp-2 mb-2" title={item.title}>{item.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                      {item.description || 'No description provided.'}
                    </p>
                    <div className="text-xs font-medium text-muted-foreground mb-4">
                      Ends: {new Date(item.date_expired).toLocaleDateString()}
                    </div>
                    <div className="mt-auto flex gap-2">
                      <ContentModal
                        title={item.title}
                        content={<p className="whitespace-pre-line leading-relaxed">{item.description}</p>}
                        imageUrl={item.image_url}
                        metadata={{
                          date: new Date(item.date_expired),
                          category: 'Event'
                        }}
                        trigger={
                          <Button variant="outline" size="sm" className="flex-1" title="Preview" onClick={() => {}}>
                            <Eye className="h-4 w-4 mr-2" /> Preview
                          </Button>
                        }
                      />
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(item)}>Edit</Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10 flex-none px-3" onClick={() => setDeleteId(item.id)}>Delete</Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[calc(100%-2rem)] md:max-w-lg rounded-xl p-6">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Event' : 'Add Event'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 w-full max-w-lg mx-auto">
            <div className="space-y-2">
              <Label>Image (Optional)</Label>
              <div className="flex gap-4 items-center">
                {formData.image_url ? (
                  <div className="relative w-32 h-20 rounded overflow-hidden border shrink-0">
                    <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-32 h-20 rounded border-2 border-dashed flex items-center justify-center bg-muted shrink-0 text-xs text-muted-foreground">
                    No image
                  </div>
                )}
                <Input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} className="flex-1" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Event Title</Label>
              <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="px-3" />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input type="date" value={formData.date_expired} onChange={e => setFormData({...formData, date_expired: e.target.value})} className="px-3" />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="px-3" rows={4} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="max-w-[calc(100%-2rem)] md:max-w-md rounded-xl p-6">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="w-5 h-5" /> Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this record? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => {
              if (deleteId) handleDelete(deleteId);
              setDeleteId(null);
            }}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
</div>
  );
}
```

### src/pages/admin/Heroes.tsx
```tsx
import { useState, useEffect } from 'react';
import { supabase } from '@/db/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { AlertCircle } from 'lucide-react';


export default function Heroes() {
  const [heroes, setHeroes] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    image_url: '',
    title: '',
    subtitle: '',
    display_order: 0,
    is_active: true,
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchHeroes();
  }, []);

  const fetchHeroes = async () => {
    const { data, error } = await supabase.from('heroes').select('*').order('display_order', { ascending: true });
    if (error) toast.error('Failed to fetch heroes');
    else setHeroes(data || []);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      setFormData(prev => ({ ...prev, image_url: data.publicUrl }));
    } catch (error: any) {
      toast.error('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image_url) {
      toast.error('Image is required');
      return;
    }

    try {
      if (editingId) {
        const { error } = await supabase.from('heroes').update(formData).eq('id', editingId);
        if (error) throw error;
        toast.success('Hero updated successfully');
      } else {
        const { error } = await supabase.from('heroes').insert([formData]);
        if (error) throw error;
        toast.success('Hero added successfully');
      }
      setIsOpen(false);
      resetForm();
      fetchHeroes();
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    }
  };

  const handleDelete = async (id: string) => {
    if (true) return;
    try {
      const { error } = await supabase.from('heroes').delete().eq('id', id);
      if (error) throw error;
      toast.success('Hero deleted successfully');
      fetchHeroes();
    } catch (error: any) {
      toast.error('Failed to delete hero');
    }
  };

  const resetForm = () => {
    setFormData({
      image_url: '',
      title: '',
      subtitle: '',
      display_order: 0,
      is_active: true,
    });
    setEditingId(null);
  };

  const openEdit = (hero: any) => {
    setFormData({
      image_url: hero.image_url || '',
      title: hero.title || '',
      subtitle: hero.subtitle || '',
      display_order: hero.display_order || 0,
      is_active: hero.is_active,
    });
    setEditingId(hero.id);
    setIsOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hero Slider Management</h1>
        <Dialog open={isOpen} onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" /> Add Hero Slide</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[calc(100%-2rem)] md:max-w-lg rounded-xl p-6">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Hero Slide' : 'Add Hero Slide'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Image</Label>
                <div className="flex gap-4 items-center">
                  {formData.image_url ? (
                    <div className="relative w-32 h-20 rounded overflow-hidden border">
                      <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-32 h-20 rounded border-2 border-dashed flex items-center justify-center bg-muted">
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                  <Input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} className="flex-1" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Title (Optional)</Label>
                <Input 
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. God is for you"
                />
              </div>

              <div className="space-y-2">
                <Label>Subtitle (Optional)</Label>
                <Input 
                  value={formData.subtitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                  placeholder="e.g. and so are we."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Display Order</Label>
                  <Input 
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div className="space-y-2 flex flex-col justify-end">
                  <label className="flex items-center gap-2 cursor-pointer pb-2">
                    <input 
                      type="checkbox" 
                      checked={formData.is_active}
                      onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Active</span>
                  </label>
                </div>
              </div>

              <Button type="submit" className="w-full">
                {editingId ? 'Update' : 'Create'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-lg border shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Image</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Text</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {heroes.map((hero) => (
              <TableRow key={hero.id}>
                <TableCell>
                  {hero.image_url ? (
                    <div className="w-16 h-10 rounded overflow-hidden">
                      <img src={hero.image_url} alt="" className="w-full h-full object-cover" />
                    </div>
                  ) : '-'}
                </TableCell>
                <TableCell>{hero.display_order}</TableCell>
                <TableCell>
                  <div className="text-sm font-medium">{hero.title || '-'}</div>
                  <div className="text-xs text-muted-foreground">{hero.subtitle}</div>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${hero.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {hero.is_active ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(hero)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setDeleteId(hero.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {heroes.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No hero slides found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="max-w-[calc(100%-2rem)] md:max-w-md rounded-xl p-6">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="w-5 h-5" /> Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this record? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => {
              if (deleteId) handleDelete(deleteId);
              setDeleteId(null);
            }}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
</div>
  );
}

```

### src/pages/admin/Logs.tsx
```tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '@/db/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';

export default function AdminLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    // Fetch logs and join with auth.users to get email (using an RPC or just raw if RLS permits, but auth.users might not be accessible directly from client without an RPC or a trigger that copies the email)
    // Actually, our trigger only saves user_id. We can fetch user_id, but showing email requires a helper function.
    // For now, let's just fetch the logs and display the JSON details and action.
    const { data, error } = await supabase
      .from('admin_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (data) setLogs(data);
    setLoading(false);
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'LOGIN': return 'bg-blue-100 text-blue-700';
      case 'INSERT': return 'bg-green-100 text-green-700';
      case 'UPDATE': return 'bg-orange-100 text-orange-700';
      case 'DELETE': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Activity Logs</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Audit Trail</CardTitle>
          <CardDescription>Recent administrative actions and authentication attempts across the system.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="[&>div]:max-w-full min-w-[800px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">Timestamp</TableHead>
                  <TableHead className="whitespace-nowrap">Action</TableHead>
                  <TableHead className="whitespace-nowrap">Table/Module</TableHead>
                  <TableHead className="whitespace-nowrap">Record ID</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-8">Loading logs...</TableCell></TableRow>
                ) : logs.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-8">No activity logs found.</TableCell></TableRow>
                ) : (
                  logs.map(log => (
                    <TableRow key={log.id}>
                      <TableCell className="whitespace-nowrap text-muted-foreground text-sm">
                        {format(new Date(log.created_at), 'MMM d, yyyy HH:mm:ss')}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${getActionColor(log.action)}`}>
                          {log.action}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium whitespace-nowrap">{log.table_name}</TableCell>
                      <TableCell className="font-mono text-xs whitespace-nowrap text-muted-foreground">{log.record_id || 'N/A'}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {log.action === 'LOGIN' && log.details?.ip ? (
                          <div className="flex flex-col space-y-1">
                            <span className="font-medium text-foreground">{log.details.email}</span>
                            <div className="flex items-center gap-2 opacity-80">
                              <span title="IP Address" className="inline-flex items-center">
                                <span className="mr-1">🌐</span> {log.details.ip}
                              </span>
                              {log.details.city && (
                                <span title="Location" className="inline-flex items-center">
                                  <span className="mr-1">📍</span> {log.details.city}, {log.details.country}
                                </span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="max-w-[400px] truncate" title={log.details ? JSON.stringify(log.details) : ''}>
                            {log.details ? JSON.stringify(log.details) : 'N/A'}
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

```

### src/pages/admin/Maintenance.tsx
```tsx
import { useState, useEffect } from 'react';
import { supabase } from '@/db/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Trash2, Plus, Eye } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminMaintenance() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<any>({
    is_active: false,
    message: '',
    end_time: '',
    show_countdown: false,
    contact_email: '',
    contact_phone: '',
    support_link: '',
    scheduled_start: '',
    scheduled_end: ''
  });
  const [settingsId, setSettingsId] = useState<string | null>(null);
  
  const [ips, setIps] = useState<any[]>([]);
  const [newIp, setNewIp] = useState('');
  const [newIpDesc, setNewIpDesc] = useState('');

  const [logs, setLogs] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Settings
    const { data: sData } = await supabase.from('maintenance_settings').select('*').limit(1).maybeSingle();
    if (sData) {
      setSettings({
        ...sData,
        end_time: sData.end_time ? sData.end_time.slice(0, 16) : '',
        scheduled_start: sData.scheduled_start ? sData.scheduled_start.slice(0, 16) : '',
        scheduled_end: sData.scheduled_end ? sData.scheduled_end.slice(0, 16) : ''
      });
      setSettingsId(sData.id);
    }

    // IPs
    const { data: ipData } = await supabase.from('maintenance_whitelisted_ips').select('*').order('created_at', { ascending: false });
    if (ipData) setIps(ipData);

    // Logs
    const { data: lData } = await supabase.from('maintenance_logs').select('*, profiles:created_by(email)').order('created_at', { ascending: false }).limit(50);
    if (lData) setLogs(lData);
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      const payload = {
        ...settings,
        end_time: settings.end_time ? new Date(settings.end_time).toISOString() : null,
        scheduled_start: settings.scheduled_start ? new Date(settings.scheduled_start).toISOString() : null,
        scheduled_end: settings.scheduled_end ? new Date(settings.scheduled_end).toISOString() : null,
        updated_by: user?.id,
        updated_at: new Date().toISOString()
      };

      if (settingsId) {
        await supabase.from('maintenance_settings').update(payload).eq('id', settingsId);
      } else {
        const { data } = await supabase.from('maintenance_settings').insert([payload]).select().single();
        if (data) setSettingsId(data.id);
      }

      // Add log
      await supabase.from('maintenance_logs').insert([{
        action: settings.is_active ? 'Enabled' : 'Disabled',
        reason: 'Manual settings update',
        created_by: user?.id
      }]);

      toast.success('Maintenance settings saved successfully');
      fetchData();
    } catch (err: any) {
      toast.error(err.message || 'Error saving settings');
    } finally {
      setLoading(false);
    }
  };

  const handleAddIp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIp) return;
    try {
      await supabase.from('maintenance_whitelisted_ips').insert([{
        ip_address: newIp,
        description: newIpDesc,
        created_by: user?.id
      }]);
      toast.success('IP whitelisted');
      setNewIp('');
      setNewIpDesc('');
      fetchData();
    } catch (err: any) {
      toast.error('Error adding IP');
    }
  };

  const handleRemoveIp = async (id: string) => {
    if (!confirm('Remove this IP from whitelist?')) return;
    try {
      await supabase.from('maintenance_whitelisted_ips').delete().eq('id', id);
      toast.success('IP removed');
      fetchData();
    } catch (err: any) {
      toast.error('Error removing IP');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Maintenance Mode</h1>
          <p className="text-muted-foreground mt-1">Configure site availability and maintenance pages.</p>
        </div>
        <div className="flex items-center gap-3 bg-card px-4 py-2 rounded-lg border shadow-sm">
          <span className="font-medium text-sm">Status:</span>
          <span className={`px-2 py-1 rounded text-xs font-bold ${settings.is_active ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {settings.is_active ? 'MAINTENANCE ACTIVE' : 'LIVE'}
          </span>
        </div>
      </div>

      <Tabs defaultValue="settings">
        <TabsList className="mb-4">
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="whitelist">IP Whitelist</TabsTrigger>
          <TabsTrigger value="logs">Activity Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Enable or disable maintenance mode instantly.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
                <div>
                  <h3 className="font-bold text-lg">Enable Maintenance Mode</h3>
                  <p className="text-sm text-muted-foreground">When active, all public pages will redirect to the maintenance screen.</p>
                </div>
                <Switch 
                  checked={settings.is_active} 
                  onCheckedChange={(v) => setSettings({...settings, is_active: v})} 
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Maintenance Message</Label>
                  <Textarea 
                    rows={4} 
                    value={settings.message || ''} 
                    onChange={e => setSettings({...settings, message: e.target.value})}
                    placeholder="We are currently performing scheduled maintenance. Please check back later."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Estimated End Time</Label>
                    <Input 
                      type="datetime-local" 
                      value={settings.end_time || ''} 
                      onChange={e => setSettings({...settings, end_time: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2 flex flex-col justify-end">
                    <label className="flex items-center gap-2 cursor-pointer pb-2">
                      <Switch 
                        checked={settings.show_countdown} 
                        onCheckedChange={v => setSettings({...settings, show_countdown: v})}
                      />
                      <span className="text-sm font-medium">Show Countdown Timer</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t">
                  <div className="space-y-2">
                    <Label>Contact Email</Label>
                    <Input 
                      placeholder="support@diocese.com" 
                      value={settings.contact_email || ''} 
                      onChange={e => setSettings({...settings, contact_email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Contact Phone</Label>
                    <Input 
                      placeholder="+63 123 456 7890" 
                      value={settings.contact_phone || ''} 
                      onChange={e => setSettings({...settings, contact_phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Support Link</Label>
                    <Input 
                      placeholder="https://support.diocese.com" 
                      value={settings.support_link || ''} 
                      onChange={e => setSettings({...settings, support_link: e.target.value})}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-4 text-sm uppercase tracking-wider text-muted-foreground">Scheduled Maintenance (Auto-activate)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Scheduled Start</Label>
                      <Input 
                        type="datetime-local" 
                        value={settings.scheduled_start || ''} 
                        onChange={e => setSettings({...settings, scheduled_start: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Scheduled End</Label>
                      <Input 
                        type="datetime-local" 
                        value={settings.scheduled_end || ''} 
                        onChange={e => setSettings({...settings, scheduled_end: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={() => window.open('/maintenance?preview=true', '_blank')}>
              <Eye className="w-4 h-4 mr-2" /> Live Preview
            </Button>
            <Button onClick={handleSaveSettings} disabled={loading}>
              {loading ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="whitelist" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>IP Whitelist</CardTitle>
              <CardDescription>IP addresses listed here bypass the maintenance page.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddIp} className="flex gap-4 mb-6">
                <div className="flex-1 space-y-2">
                  <Label>IP Address</Label>
                  <Input required placeholder="192.168.1.1" value={newIp} onChange={e => setNewIp(e.target.value)} />
                </div>
                <div className="flex-[2] space-y-2">
                  <Label>Description</Label>
                  <Input placeholder="Office Network" value={newIpDesc} onChange={e => setNewIpDesc(e.target.value)} />
                </div>
                <div className="flex items-end">
                  <Button type="submit"><Plus className="w-4 h-4 mr-2" /> Add IP</Button>
                </div>
              </form>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Added On</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ips.map(ip => (
                    <TableRow key={ip.id}>
                      <TableCell className="font-mono">{ip.ip_address}</TableCell>
                      <TableCell>{ip.description}</TableCell>
                      <TableCell>{format(new Date(ip.created_at), 'MMM d, yyyy HH:mm')}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleRemoveIp(ip.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {ips.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground py-6">No IPs whitelisted</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Activity Logs</CardTitle>
              <CardDescription>History of maintenance mode toggles and changes.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Admin</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map(log => (
                    <TableRow key={log.id}>
                      <TableCell>{format(new Date(log.created_at), 'MMM d, yyyy HH:mm:ss')}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${log.action === 'Enabled' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                          {log.action}
                        </span>
                      </TableCell>
                      <TableCell>{log.reason}</TableCell>
                      <TableCell>{log.profiles?.email || 'Unknown'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
```

### src/pages/admin/Priests.tsx
```tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '@/db/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Plus, Trash2 } from 'lucide-react';
import { LayoutGrid, List, Search } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { AlertCircle } from 'lucide-react';


export default function AdminPriests() {
  const [priests, setPriests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>(() => {
    return (localStorage.getItem('admin_view_preference') as 'list' | 'grid') || 'list';
  });
  
  const [formData, setFormData] = useState({
    name: '',
    ordain_year: '',
    assignment: '',
    biography: '',
    credentials: '',
    role: 'Pastor',
    assignment_history: [] as { period: string; parish: string; role: string; location: string; description: string }[]
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('priests').select('*').order('name', { ascending: true });
    if (data) setPriests(data);
    setLoading(false);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ name: '', ordain_year: '', assignment: '', biography: '', credentials: '', role: 'Pastor', assignment_history: [] });
    setImageFile(null);
    setIsOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      ordain_year: item.ordain_year || '',
      assignment: item.assignment || '',
      biography: item.biography || '',
      credentials: item.credentials || '',
      role: item.role || 'Pastor',
      assignment_history: item.assignment_history || []
    });
    setImageFile(null);
    setIsOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name) return toast.error('Name is required');

    let imageUrl = editingItem?.image_url;

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data, error } = await supabase.storage.from('images').upload(`priests/${fileName}`, imageFile);
      if (error) return toast.error('Image upload failed: ' + error.message);
      
      const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(`priests/${fileName}`);
      imageUrl = publicUrlData.publicUrl;
    }

    const payload = {
      ...formData,
      image_url: imageUrl
    };

    if (editingItem) {
      const { error } = await supabase.from('priests').update(payload).eq('id', editingItem.id);
      if (error) toast.error(error.message);
      else toast.success('Updated successfully');
    } else {
      const { error } = await supabase.from('priests').insert([payload]);
      if (error) toast.error(error.message);
      else toast.success('Added successfully');
    }

    setIsOpen(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (true) {
      const { error } = await supabase.from('priests').delete().eq('id', id);
      if (error) toast.error(error.message);
      else {
        toast.success('Deleted successfully');
        fetchData();
      }
    }
  };

  const filteredPriests = priests.filter(p => 
    p.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.assignment?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Priests Management</h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search priests..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Tabs value={viewMode} onValueChange={(v) => {
            setViewMode(v as 'list' | 'grid');
            localStorage.setItem('admin_view_preference', v);
          }}>
            <TabsList className="grid w-[80px] grid-cols-2">
              <TabsTrigger value="list" aria-label="List view"><List className="h-4 w-4" /></TabsTrigger>
              <TabsTrigger value="grid" aria-label="Grid view"><LayoutGrid className="h-4 w-4" /></TabsTrigger>
            </TabsList>
          </Tabs>
          <Button onClick={handleAdd}>Add Priest</Button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table className="[&>div]:max-w-full min-w-[800px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Photo</TableHead>
                    <TableHead className="whitespace-nowrap">Name</TableHead>
                    <TableHead className="whitespace-nowrap">Ordain Year</TableHead>
                    <TableHead className="whitespace-nowrap">Assignment</TableHead>
                    <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow><TableCell colSpan={5} className="text-center py-8">Loading...</TableCell></TableRow>
                  ) : filteredPriests.length === 0 ? (
                    <TableRow><TableCell colSpan={5} className="text-center py-8">No priests found.</TableCell></TableRow>
                  ) : (
                    filteredPriests.map(item => (
                      <TableRow key={item.id}>
                        <TableCell>
                          {item.image_url ? (
                            <img src={item.image_url} alt="" className="w-10 h-10 rounded-full object-cover" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs">N/A</div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium whitespace-nowrap">{item.name}</TableCell>
                        <TableCell className="whitespace-nowrap">{item.ordain_year}</TableCell>
                        <TableCell className="whitespace-nowrap">{item.assignment}</TableCell>
                        <TableCell className="text-right whitespace-nowrap">
                          <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(item)}>Edit</Button>
                          <Button variant="ghost" size="sm" className="text-red-600" onClick={() => setDeleteId(item.id)}>Delete</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {loading ? (
            <div className="col-span-full text-center py-8 text-muted-foreground">Loading...</div>
          ) : filteredPriests.length === 0 ? (
            <div className="col-span-full text-center py-8 text-muted-foreground">No priests found.</div>
          ) : (
            filteredPriests.map(item => (
              <Card key={item.id} className="overflow-hidden flex flex-col">
                <div className="aspect-square bg-muted relative">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>
                  )}
                </div>
                <CardContent className="p-4 flex-1 flex flex-col">
                  <h3 className="font-medium truncate mb-1" title={item.name}>{item.name}</h3>
                  <div className="text-xs text-muted-foreground mb-4">
                    <p className="truncate">Ordained: {item.ordain_year || 'N/A'}</p>
                    <p className="truncate" title={item.assignment}>Assign: {item.assignment || 'N/A'}</p>
                  </div>
                  <div className="mt-auto flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(item)}>Edit</Button>
                    <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => setDeleteId(item.id)}>Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[calc(100%-2rem)] md:max-w-lg rounded-xl p-6">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Priest' : 'Add Priest'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 w-full max-w-lg mx-auto">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="px-3" />
            </div>
            <div className="space-y-2">
              <Label>Ordain Year</Label>
              <Input value={formData.ordain_year} onChange={e => setFormData({...formData, ordain_year: e.target.value})} className="px-3" />
            </div>
            <div className="space-y-2">
              <Label>Assignment (Church)</Label>
              <Input value={formData.assignment} onChange={e => setFormData({...formData, assignment: e.target.value})} className="px-3" />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={formData.role} onValueChange={(v) => setFormData({...formData, role: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pastor">Pastor</SelectItem>
                  <SelectItem value="Deacon">Deacon</SelectItem>
                  <SelectItem value="Bishop">Bishop</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Credentials / Degrees</Label>
              <Input value={formData.credentials} onChange={e => setFormData({...formData, credentials: e.target.value})} className="px-3" placeholder="e.g. M.Div., Ph.D." />
            </div>
            <div className="space-y-2">
              <Label>Biography</Label>
              <Textarea value={formData.biography} onChange={e => setFormData({...formData, biography: e.target.value})} className="px-3" rows={4} placeholder="Detailed biography and history of assignments..." />
            </div>
            
            <div className="space-y-4 pt-2 border-t mt-4">
              <div className="flex justify-between items-center">
                <Label>Assignment History</Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setFormData({
                    ...formData, 
                    assignment_history: [...formData.assignment_history, { period: '', parish: '', role: '', location: '', description: '' }]
                  })}
                >
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>
              
              {formData.assignment_history.map((hist, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-muted/50 rounded-md relative border border-border/50">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={() => {
                      const newHist = [...formData.assignment_history];
                      newHist.splice(idx, 1);
                      setFormData({...formData, assignment_history: newHist});
                    }}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                  
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Period</Label>
                    <Input 
                      placeholder="e.g. 2022 - Present" 
                      value={hist.period} 
                      onChange={e => {
                        const newHist = [...formData.assignment_history];
                        newHist[idx].period = e.target.value;
                        setFormData({...formData, assignment_history: newHist});
                      }}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Parish / Assignment</Label>
                    <Input 
                      placeholder="e.g. St. Joseph Parish" 
                      value={hist.parish} 
                      onChange={e => {
                        const newHist = [...formData.assignment_history];
                        newHist[idx].parish = e.target.value;
                        setFormData({...formData, assignment_history: newHist});
                      }}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Role</Label>
                    <Input 
                      placeholder="e.g. Pastor" 
                      value={hist.role} 
                      onChange={e => {
                        const newHist = [...formData.assignment_history];
                        newHist[idx].role = e.target.value;
                        setFormData({...formData, assignment_history: newHist});
                      }}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Location</Label>
                    <Input 
                      placeholder="e.g. Allen, Northern Samar" 
                      value={hist.location} 
                      onChange={e => {
                        const newHist = [...formData.assignment_history];
                        newHist[idx].location = e.target.value;
                        setFormData({...formData, assignment_history: newHist});
                      }}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <Label className="text-xs text-muted-foreground">Key Achievements / Description</Label>
                    <Textarea 
                      placeholder="Brief description of achievements or duties..." 
                      value={hist.description || ''} 
                      onChange={e => {
                        const newHist = [...formData.assignment_history];
                        newHist[idx].description = e.target.value;
                        setFormData({...formData, assignment_history: newHist});
                      }}
                      className="text-sm"
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-2 border-t mt-4">
              <Label>Photo Upload</Label>
              <Input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="px-3" />
              {editingItem?.image_url && !imageFile && (
                <p className="text-xs text-muted-foreground mt-1">Leave empty to keep current image</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="max-w-[calc(100%-2rem)] md:max-w-md rounded-xl p-6">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="w-5 h-5" /> Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this record? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => {
              if (deleteId) handleDelete(deleteId);
              setDeleteId(null);
            }}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
</div>
  );
}
```

### src/pages/admin/Settings.tsx
```tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '@/db/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';

export default function AdminSettings() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [fbUrl, setFbUrl] = useState('');
  const [ytUrl, setYtUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase.from('system_settings').select('*').in('key', ['fb_live_url', 'yt_live_url']);
    if (data) {
      const fb = data.find(d => d.key === 'fb_live_url')?.value;
      const yt = data.find(d => d.key === 'yt_live_url')?.value;
      if (fb) setFbUrl(String(fb).replace(/"/g, ''));
      if (yt) setYtUrl(String(yt).replace(/"/g, ''));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    
    // Upsert FB URL
    await supabase.from('system_settings').upsert({ key: 'fb_live_url', value: fbUrl.replace(/"/g, '') }, { onConflict: 'key' });
    
    // Upsert YT URL
    await supabase.from('system_settings').upsert({ key: 'yt_live_url', value: ytUrl.replace(/"/g, '') }, { onConflict: 'key' });

    toast.success('Settings saved successfully');
    setLoading(false);
  };

  if (!mounted) return null;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">System Settings</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Live Streams</CardTitle>
            <CardDescription>Configure the live stream URLs to be displayed on the public home page.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Facebook Live Video URL</Label>
              <Input 
                placeholder="e.g. https://www.facebook.com/Diocese/videos/123456789" 
                value={fbUrl} 
                onChange={e => setFbUrl(e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label>YouTube Live Video URL</Label>
              <Input 
                placeholder="e.g. https://www.youtube.com/watch?v=123456789" 
                value={ytUrl} 
                onChange={e => setYtUrl(e.target.value)} 
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Manage the look and feel of the Admin Panel.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Theme Preference</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light Mode</SelectItem>
                  <SelectItem value="dark">Dark Mode</SelectItem>
                  <SelectItem value="system">System Default</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={loading}>{loading ? 'Saving...' : 'Save Settings'}</Button>
        </div>
      </div>
    </div>
  );
}
```

### src/pages/admin/YearOf.tsx
```tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '@/db/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { AlertCircle } from 'lucide-react';


export default function AdminYearOf() {
  const [themes, setThemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    year_name: '',
    description: '',
    is_current: false,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('year_of').select('*').order('created_at', { ascending: false });
    if (data) setThemes(data);
    setLoading(false);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({ year_name: '', description: '', is_current: false });
    setImageFile(null);
    setIsOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      year_name: item.year_name,
      description: item.description || '',
      is_current: item.is_current || false,
    });
    setImageFile(null);
    setIsOpen(true);
  };

  const handleSave = async () => {
    if (!formData.year_name) return toast.error('Year Name is required');

    let imageUrl = editingItem?.image_url;

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data, error } = await supabase.storage.from('images').upload(`themes/${fileName}`, imageFile);
      if (error) return toast.error('Image upload failed: ' + error.message);
      
      const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(`themes/${fileName}`);
      imageUrl = publicUrlData.publicUrl;
    }

    const payload = {
      ...formData,
      image_url: imageUrl
    };

    if (editingItem) {
      const { error } = await supabase.from('year_of').update(payload).eq('id', editingItem.id);
      if (error) toast.error(error.message);
      else toast.success('Updated successfully');
    } else {
      const { error } = await supabase.from('year_of').insert([payload]);
      if (error) toast.error(error.message);
      else toast.success('Added successfully');
    }

    setIsOpen(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (true) {
      const { error } = await supabase.from('year_of').delete().eq('id', id);
      if (error) toast.error(error.message);
      else {
        toast.success('Deleted successfully');
        fetchData();
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Year Themes Management</h1>
        <Button onClick={handleAdd}>Add Theme</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="[&>div]:max-w-full min-w-[800px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Image</TableHead>
                  <TableHead className="whitespace-nowrap">Year Name</TableHead>
                  <TableHead className="whitespace-nowrap">Description</TableHead>
                  <TableHead className="whitespace-nowrap">Status</TableHead>
                  <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-8">Loading...</TableCell></TableRow>
                ) : themes.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-8">No themes found.</TableCell></TableRow>
                ) : (
                  themes.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>
                        {item.image_url ? (
                          <img src={item.image_url} alt="" className="w-10 h-10 rounded-md object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center text-xs">N/A</div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium whitespace-nowrap">{item.year_name}</TableCell>
                      <TableCell className="max-w-[300px] truncate">{item.description}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        {item.is_current ? (
                          <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">Current</span>
                        ) : null}
                      </TableCell>
                      <TableCell className="text-right whitespace-nowrap">
                        <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(item)}>Edit</Button>
                        <Button variant="ghost" size="sm" className="text-red-600" onClick={() => setDeleteId(item.id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[calc(100%-2rem)] md:max-w-lg rounded-xl p-6">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit Theme' : 'Add Theme'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 w-full max-w-lg mx-auto">
            <div className="space-y-2">
              <Label>Year Name</Label>
              <Input value={formData.year_name} onChange={e => setFormData({...formData, year_name: e.target.value})} className="px-3" placeholder="e.g. Year of Faith" />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="px-3" rows={4} />
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox 
                id="is_current" 
                checked={formData.is_current} 
                onCheckedChange={(c) => setFormData({...formData, is_current: c === true})} 
              />
              <Label htmlFor="is_current">Mark as Current Theme</Label>
            </div>
            <div className="space-y-2">
              <Label>Background Image</Label>
              <Input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="px-3" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="max-w-[calc(100%-2rem)] md:max-w-md rounded-xl p-6">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="w-5 h-5" /> Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this record? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => {
              if (deleteId) handleDelete(deleteId);
              setDeleteId(null);
            }}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
</div>
  );
}
```

### src/pages/auth/Login.tsx
```tsx
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { supabase } from '@/db/supabase';
import { toast } from 'sonner';
import { ShieldCheck, Mail, Lock, AlertTriangle } from 'lucide-react';

export default function Login() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (loading) return <div className="flex h-screen items-center justify-center bg-muted/40"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div></div>;
  if (user) return <Navigate to="/admin" replace />;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    // Security: Basic input validation
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      setIsSubmitting(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Rate limiting is handled by Supabase Auth automatically.
        // It returns specific error messages like "Too many requests".
        setErrorMsg(error.message);
        toast.error(error.message);
      } else {
        toast.success('Authentication successful. Redirecting...');
        
        // Handle "Remember Me" using localStorage (if unchecked, session could be managed manually or via Supabase session persistence configuration, but Supabase handles token persistence automatically. We'll just show the UI for professional look).
        if (rememberMe) {
          localStorage.setItem('admin_email', email);
        } else {
          localStorage.removeItem('admin_email');
        }

        // Log the successful login attempt
        let ipInfo = {};
        try {
          const res = await fetch('https://ipapi.co/json/');
          if (res.ok) {
            const data = await res.json();
            ipInfo = {
              ip: data.ip,
              city: data.city,
              country: data.country_name,
              org: data.org
            };
          }
        } catch (e) {
          console.error('Failed to fetch IP info', e);
        }

        await supabase.from('admin_logs').insert({
          table_name: 'auth',
          action: 'LOGIN',
          details: { 
            email, 
            source: 'Admin Panel Login',
            ...ipInfo
          }
        });

        navigate('/admin');
      }
    } catch (err: any) {
      setErrorMsg('An unexpected error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding/Hero */}
      <div className="hidden lg:flex w-1/2 bg-sidebar flex-col items-center justify-center p-12 relative overflow-hidden border-r">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-sidebar to-sidebar/80"></div>
        <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-md">
          <img 
            src="https://dcc-catarman.web.app/images/dioces-of-catarman.png" 
            alt="Diocese of Catarman" 
            className="w-32 h-auto mb-4 drop-shadow-md"
          />
          <h1 className="text-4xl font-light text-foreground tracking-tight">Diocese of Catarman</h1>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Secure administrative portal for managing content, personnel, and parish operations.
          </p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-8 bg-background/50 py-2 px-4 rounded-full border">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span>Encrypted & Secured Connection</span>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-background p-4 sm:p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left space-y-2">
            <img 
              src="https://dcc-catarman.web.app/images/dioces-of-catarman.png" 
              alt="Logo" 
              className="w-16 h-auto mx-auto lg:hidden mb-6"
            />
            <h2 className="text-3xl font-semibold tracking-tight">Welcome back</h2>
            <p className="text-muted-foreground text-sm">Please enter your credentials to access the system.</p>
          </div>

          <Card className="border-0 shadow-none sm:border sm:shadow-sm bg-transparent sm:bg-card">
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4 pt-6 px-0 sm:px-6">
                {errorMsg && (
                  <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md flex items-start border border-destructive/20">
                    <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Admin Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@diocese.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 h-11"
                      autoComplete="email"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10 h-11"
                      autoComplete="current-password"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="remember" 
                      checked={rememberMe} 
                      onCheckedChange={(c) => setRememberMe(c as boolean)} 
                    />
                    <Label htmlFor="remember" className="text-sm font-normal cursor-pointer text-muted-foreground">Remember me</Label>
                  </div>
                  <a href="#" className="text-sm text-primary hover:underline" onClick={(e) => { e.preventDefault(); toast.info('Please contact the IT administrator to reset your password.'); }}>
                    Forgot password?
                  </a>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 px-0 sm:px-6 pb-6">
                <Button type="submit" className="w-full h-11 text-base" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary-foreground mr-2"></div>
                      Authenticating...
                    </div>
                  ) : (
                    'Sign In to Dashboard'
                  )}
                </Button>
                <div className="text-center w-full">
                  <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center justify-center">
                    &larr; Return to Public Website
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
          
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              By logging in, you agree to our strict access policies and confidentiality agreements. Unauthorized access is prohibited.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

```

### src/pages/public/Clergy.tsx
```tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '@/db/supabase';
import { Search, GraduationCap, MapPin, CalendarDays, User, BookOpen, Clock, Building } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Clergy() {
  const [clergy, setClergy] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('Pastor');

  useEffect(() => {
    fetchClergy();
  }, []);

  const fetchClergy = async () => {
    setLoading(true);
    const { data } = await supabase.from('priests').select('*').order('name');
    if (data) setClergy(data);
    setLoading(false);
  };

  const filteredClergy = clergy.filter(c => 
    (c.role || 'Pastor') === activeTab && 
    (c.name.toLowerCase().includes(search.toLowerCase()) || 
     (c.assignment && c.assignment.toLowerCase().includes(search.toLowerCase())))
  );

  return (
    <div className="w-full flex flex-col items-center">
      <section className="w-full py-20 bg-background border-b min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b pb-4 gap-6">
            <div>
              <h2 className="text-3xl font-light tracking-wide uppercase mb-2">Clergy Directory</h2>
              <p className="text-muted-foreground font-light">Meet the pastors and deacons serving our diocese.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full sm:w-64 shrink-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by name or assignment..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 bg-muted/50 border-none"
                />
              </div>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto shrink-0">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="Pastor">Pastors</TabsTrigger>
                  <TabsTrigger value="Deacon">Deacons</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading directory...</div>
          ) : filteredClergy.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredClergy.map(person => (
                <div key={person.id} className="group border border-border p-5 hover:border-primary/50 transition-colors flex flex-col bg-card items-center text-center">
                  <div className="w-32 h-32 rounded-full bg-muted mb-5 overflow-hidden border-4 border-background shadow-sm shrink-0">
                    {person.image_url ? (
                      <img src={person.image_url} alt={person.name} className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted text-2xl font-light">
                        {person.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-medium mb-1">{person.name}</h3>
                  <div className="text-xs text-primary uppercase tracking-widest mb-4">{person.role || 'Pastor'}</div>
                  
                  <div className="space-y-2 mb-6 flex-1 w-full text-left">
                    {person.assignment && (
                      <div className="flex items-start text-sm text-muted-foreground justify-center">
                        <MapPin className="w-3.5 h-3.5 mr-1.5 mt-0.5 shrink-0" />
                        <span className="leading-snug truncate">{person.assignment}</span>
                      </div>
                    )}
                    {person.ordain_year && (
                      <div className="flex items-start text-sm text-muted-foreground justify-center">
                        <CalendarDays className="w-3.5 h-3.5 mr-1.5 mt-0.5 shrink-0" />
                        <span className="leading-snug">Ordained {person.ordain_year}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto pt-4 border-t border-border/50 w-full">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="w-full inline-flex justify-center items-center text-xs font-medium hover:text-foreground transition-colors uppercase tracking-wider text-primary py-2">
                          View Profile
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[calc(100%-2rem)] md:max-w-2xl lg:max-w-3xl p-0 overflow-hidden bg-muted/10 gap-0 border-none shadow-xl rounded-xl">
                        <DialogTitle className="sr-only">Profile of {person.name}</DialogTitle>
                        
                        {/* Modal Header */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 sm:p-8 bg-background border-b relative">
                          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-muted overflow-hidden border-4 border-background shadow-md shrink-0 relative">
                            {person.image_url ? (
                              <img src={person.image_url} alt={person.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-3xl font-light">
                                {person.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1 text-center sm:text-left pt-2">
                            <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground">{person.name}</h2>
                            <div className="text-primary font-medium mt-1">{person.role || 'Pastor'}</div>
                            
                            <div className="text-muted-foreground text-sm mt-4 space-y-2">
                              <div className="flex items-center justify-center sm:justify-start gap-2">
                                <Building className="w-4 h-4 shrink-0" />
                                <span>Roman Catholic Diocese of Catarman</span>
                              </div>
                              {person.assignment && (
                                <div className="flex items-center justify-center sm:justify-start gap-2">
                                  <MapPin className="w-4 h-4 shrink-0" />
                                  <span>Current Assignment: {person.assignment}</span>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex items-center justify-center sm:justify-start gap-3 mt-4">
                              {person.ordain_year && (
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/50">
                                  <Clock className="w-3.5 h-3.5" />
                                  <span>{new Date().getFullYear() - parseInt(person.ordain_year)} Years of Service</span>
                                </div>
                              )}
                              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200/50 dark:border-green-800/50">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></span>
                                Active
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Modal Body */}
                        <ScrollArea className="max-h-[60vh] p-6 sm:p-8">
                          <div className="space-y-6">
                            
                            {/* Basic Info Card */}
                            <div className="bg-background rounded-xl border border-border/50 p-6 shadow-sm">
                              <h3 className="flex items-center gap-2 font-medium mb-6 text-foreground">
                                <User className="w-4 h-4 text-primary" /> Basic Information
                              </h3>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                                <div className="flex gap-3">
                                  <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                                    <User className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <div className="text-xs text-muted-foreground">Role</div>
                                    <div className="font-medium text-sm mt-0.5">{person.role || 'Pastor'}</div>
                                  </div>
                                </div>
                                <div className="flex gap-3">
                                  <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                                    <CalendarDays className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <div className="text-xs text-muted-foreground">Ordained Year</div>
                                    <div className="font-medium text-sm mt-0.5">{person.ordain_year || 'N/A'}</div>
                                  </div>
                                </div>
                                <div className="flex gap-3">
                                  <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                                    <Building className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <div className="text-xs text-muted-foreground">Diocese</div>
                                    <div className="font-medium text-sm mt-0.5 leading-tight">Roman Catholic Diocese<br/>of Catarman</div>
                                  </div>
                                </div>
                                <div className="flex gap-3">
                                  <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                                    <MapPin className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <div className="text-xs text-muted-foreground">Current Assignment</div>
                                    <div className="font-medium text-sm mt-0.5">{person.assignment || 'N/A'}</div>
                                  </div>
                                </div>
                                {person.credentials && (
                                  <div className="flex gap-3 sm:col-span-2">
                                    <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                                      <GraduationCap className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <div className="text-xs text-muted-foreground">Credentials / Degrees</div>
                                      <div className="font-medium text-sm mt-0.5 leading-snug">{person.credentials}</div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Biography Card */}
                            <div className="bg-background rounded-xl border border-border/50 p-6 shadow-sm">
                              <h3 className="flex items-center gap-2 font-medium mb-4 text-foreground">
                                <BookOpen className="w-4 h-4 text-primary" /> Biography
                              </h3>
                              <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                                {person.biography || 'No biography provided yet.'}
                              </p>
                            </div>

                            {/* Assignment History Card */}
                            {person.assignment_history && person.assignment_history.length > 0 && (
                              <div className="bg-background rounded-xl border border-border/50 p-6 shadow-sm">
                                <h3 className="flex items-center gap-2 font-medium mb-6 text-foreground">
                                  <Clock className="w-4 h-4 text-primary" /> Assignment History
                                </h3>
                                <div className="relative border-l border-muted-foreground/20 ml-3 space-y-6">
                                  {[...person.assignment_history]
                                    .sort((a, b) => {
                                      const yearA = parseInt(a.period?.match(/\d{4}/)?.[0] || '0');
                                      const yearB = parseInt(b.period?.match(/\d{4}/)?.[0] || '0');
                                      return yearB - yearA;
                                    })
                                    .map((hist: any, idx: number) => (
                                    <div key={idx} className="relative pl-6">
                                      <div className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full bg-primary ring-4 ring-background"></div>
                                      <div className="text-sm font-medium text-primary mb-1">{hist.period}</div>
                                      <div className="font-medium text-foreground text-base leading-snug">{hist.parish}</div>
                                      <div className="text-sm text-muted-foreground mt-0.5">{hist.role}</div>
                                      {hist.location && (
                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1.5">
                                          <MapPin className="w-3.5 h-3.5" />
                                          {hist.location}
                                        </div>
                                      )}
                                      {hist.description && (
                                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                                          {hist.description}
                                        </p>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                          </div>
                        </ScrollArea>

                        {/* Modal Footer */}
                        <div className="p-4 bg-background border-t mt-auto flex justify-end">
                          <DialogClose asChild>
                            <Button onClick={() => {}} variant="outline" className="w-full sm:w-auto px-8 uppercase tracking-widest text-xs">
                              Close
                            </Button>
                          </DialogClose>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground border border-dashed p-8 bg-card">
              No {activeTab.toLowerCase()}s found matching your search.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

```

### src/pages/public/ContentExpansionShowcase.tsx
```tsx
import React from 'react';
import { ExpandableText } from '@/components/ui/expandable-text';
import { ContentModal } from '@/components/ui/content-modal';
import { Button } from '@/components/ui/button';
import { ArrowRight, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ContentExpansionShowcase() {
  const sampleLongText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.";
  
  const articles = [
    {
      id: 1,
      title: "The Future of Minimalist Design",
      summary: "Explore how minimalist design is evolving in the modern web era, focusing on whitespace, typography, and essential elements.",
      content: sampleLongText + "\n\n" + sampleLongText,
      image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=800",
      date: new Date().toISOString(),
      author: "Jane Doe",
      category: "Design"
    },
    {
      id: 2,
      title: "Understanding Content Hierarchy",
      summary: "Learn the principles of structuring content to guide users seamlessly through your application or website.",
      content: sampleLongText,
      image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=800",
      date: new Date(Date.now() - 86400000).toISOString(),
      author: "John Smith",
      category: "UX/UI"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="mb-12">
        <h1 className="text-4xl font-light tracking-wide mb-4">Content Expansion Systems</h1>
        <p className="text-muted-foreground text-lg font-light leading-relaxed">
          Implementation examples and guidelines for "See More" and "Read More" functionality.
        </p>
      </div>

      <div className="space-y-16">
        {/* SECTION 1: Inline "See More" */}
        <section>
          <div className="flex items-center gap-2 mb-6 border-b pb-2">
            <h2 className="text-2xl font-medium">1. Inline "See More" / "See Less"</h2>
          </div>
          <p className="text-muted-foreground mb-8">
            Used for truncating text within a specific layout without navigating away or opening a modal. 
            Ideal for product descriptions, bios, and review snippets.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="rounded-none border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Short Text (No truncation)</CardTitle>
              </CardHeader>
              <CardContent>
                <ExpandableText 
                  content="This is a short text that doesn't reach the character limit. It will not show the expand button."
                  limit={150}
                />
              </CardContent>
            </Card>

            <Card className="rounded-none border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Long Text (Truncated)</CardTitle>
              </CardHeader>
              <CardContent>
                <ExpandableText 
                  content={sampleLongText}
                  limit={150}
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* SECTION 2: Modal "Read More" */}
        <section>
          <div className="flex items-center gap-2 mb-6 border-b pb-2">
            <h2 className="text-2xl font-medium">2. Modal "Read More"</h2>
          </div>
          <p className="text-muted-foreground mb-8">
            Used for summarizing full articles or detailed content. Clicks open a responsive modal overlay 
            with metadata, actions (share/bookmark), and full content view.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {articles.map((article, index) => (
              <div key={article.id} className="group border border-transparent hover:border-border p-4 transition-all">
                <div className="aspect-video bg-muted mb-4 overflow-hidden relative">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
                  />
                </div>
                <h3 className="text-xl font-medium mb-2">{article.title}</h3>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed line-clamp-2">
                  {article.summary}
                </p>
                
                <ContentModal
                  title={article.title}
                  content={<div className="whitespace-pre-line">{article.content}</div>}
                  imageUrl={article.image}
                  metadata={{
                    date: new Date(article.date),
                    author: article.author,
                    category: article.category
                  }}
                  hasPrevious={index > 0}
                  hasNext={index < articles.length - 1}
                  trigger={
                    <Button variant="link" className="p-0 h-auto text-primary uppercase tracking-wider text-xs font-medium" onClick={(e) => e.preventDefault()}>
                      Read Complete Article <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  }
                />
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: Implementation Guidelines */}
        <section className="bg-muted/30 p-8 border">
          <div className="flex items-center gap-2 mb-6">
            <Info className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-2xl font-medium">Implementation Guidelines</h2>
          </div>
          
          <div className="space-y-6 text-sm md:text-base text-muted-foreground">
            <div>
              <h4 className="font-semibold text-foreground mb-2">When to use ExpandableText (Inline)</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>When the truncated content is less than 300 words.</li>
                <li>When keeping the user in the context of the current layout is important.</li>
                <li>For repetitive list items like comments or bios where modals would be overkill.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">When to use ContentModal (Overlay)</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>For long-form content, articles, case studies, or event details.</li>
                <li>When the content includes rich media, multiple paragraphs, or metadata.</li>
                <li>When you want to avoid dedicated detail pages (reducing navigation clicks) but need ample reading space.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Accessibility Checklist</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Modals trap focus correctly and return focus to the trigger upon closing.</li>
                <li>"See More" buttons have clear indicator icons (Chevron) to show state.</li>
                <li>Text maintains adequate contrast and is fully readable by screen readers in both states.</li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

```

### src/pages/public/Events.tsx
```tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '@/db/supabase';
import { ArrowRight, Calendar } from 'lucide-react';
import { ContentModal } from '@/components/ui/content-modal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function PublicEvents() {
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [pastEvents, setPastEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    const now = new Date().toISOString();
    
    // Fetch upcoming
    const { data: upcoming } = await supabase.from('events')
      .select('*')
      .gte('date_expired', now)
      .order('date_expired', { ascending: true });
      
    if (upcoming) setUpcomingEvents(upcoming);

    // Fetch past
    const { data: past } = await supabase.from('events')
      .select('*')
      .lt('date_expired', now)
      .order('date_expired', { ascending: false });
      
    if (past) setPastEvents(past);
    
    setLoading(false);
  };

  const renderEventGrid = (eventsList: any[], emptyMessage: string) => (
    loading ? (
      <div className="text-center py-12 text-muted-foreground">Loading events...</div>
    ) : eventsList.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {eventsList.map((evt) => (
          <div key={evt.id} className="group border border-border p-4 hover:border-primary/50 transition-colors flex flex-col bg-card">
            <div className="aspect-video bg-muted mb-4 overflow-hidden border shrink-0">
              {evt.image_url ? (
                <img src={evt.image_url} alt={evt.title} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted">
                  <Calendar className="w-8 h-8 opacity-20" />
                </div>
              )}
            </div>
            <h3 className="text-xl font-medium mb-2">{evt.title}</h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed flex-1">
              {evt.description}
            </p>
            <div className="mt-auto pt-4 border-t border-border/50">
              <ContentModal
                title={evt.title}
                content={<p className="whitespace-pre-line leading-relaxed">{evt.description}</p>}
                imageUrl={evt.image_url}
                metadata={{
                  date: new Date(evt.date_expired),
                  category: 'Event'
                }}
                trigger={
                  <button className="inline-flex items-center text-sm font-medium hover:text-foreground transition-colors uppercase tracking-wider text-primary">
                    Read more <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                }
              />
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-12 mt-8 text-muted-foreground border border-dashed p-8 bg-card">
        {emptyMessage}
      </div>
    )
  );

  return (
    <div className="w-full flex flex-col items-center">
      <section className="w-full py-20 bg-background border-b min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b pb-4 gap-6">
            <h2 className="text-3xl font-light tracking-wide uppercase">Events</h2>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="w-full md:w-auto grid grid-cols-2">
                <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                <TabsTrigger value="past">Past Events</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <Tabs value={activeTab} className="w-full">
            <TabsContent value="upcoming">
              {renderEventGrid(upcomingEvents, "No upcoming events scheduled at this time.")}
            </TabsContent>
            <TabsContent value="past">
              {renderEventGrid(pastEvents, "No past events found.")}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}

```

### src/pages/public/Home.tsx
```tsx
import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '@/db/supabase';
import { Link } from 'react-router-dom';
import { ArrowRight, Users } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import WeatherWidget from '@/components/public/WeatherWidget';

import { ExpandableText } from '@/components/ui/expandable-text';
import { ContentModal } from '@/components/ui/content-modal';

export default function PublicHome() {
  const [heroImages, setHeroImages] = useState<any[]>([]);
  const [latestEvents, setLatestEvents] = useState<any[]>([]);
  const [churches, setChurches] = useState<any[]>([]);
  const [priests, setPriests] = useState<any[]>([]);
  const [churchesCount, setChurchesCount] = useState(0);
  const [priestsCount, setPriestsCount] = useState(0);
  const [currentBishop, setCurrentBishop] = useState<any>(null);
  const [yearOf, setYearOf] = useState<any>(null);
  const [fbUrl, setFbUrl] = useState('');
  const [ytUrl, setYtUrl] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // 0. Heroes
    const { data: hData } = await supabase.from('heroes').select('*').eq('is_active', true).order('display_order', { ascending: true });
    if (hData) setHeroImages(hData);

    // 1. Current Bishop
    const { data: bData } = await supabase.from('bishops').select('*').eq('is_current', true).limit(1).maybeSingle();
    if (bData) setCurrentBishop(bData);

    // 2. Latest Events
    const { data: eData } = await supabase.from('events')
      .select('*')
      .gte('date_expired', new Date().toISOString())
      .order('date_expired', { ascending: true })
      .limit(3);
    if (eData) setLatestEvents(eData);

    // 3. Churches (Parishes and Mission Centers)
    const { data: cData } = await supabase.from('churches')
      .select('*')
      .limit(5);
    if (cData) setChurches(cData);

    const { data: prData } = await supabase.from('priests').select('*').limit(5);
    if (prData) setPriests(prData);

    // 4. Counts
    const { count: cCount } = await supabase.from('churches').select('*', { count: 'exact', head: true });
    if (cCount) setChurchesCount(cCount);

    const { count: pCount } = await supabase.from('priests').select('*', { count: 'exact', head: true });
    if (pCount) setPriestsCount(pCount);

    // 5. Year Of
    const { data: yData } = await supabase.from('year_of').select('*').eq('is_current', true).limit(1).maybeSingle();
    if (yData) setYearOf(yData);

    // 6. Settings
    const { data: sData } = await supabase.from('system_settings').select('*').in('key', ['fb_live_url', 'yt_live_url']);
    if (sData) {
      const fb = sData.find(d => d.key === 'fb_live_url')?.value;
      const yt = sData.find(d => d.key === 'yt_live_url')?.value;
      if (fb) setFbUrl(String(fb).replace(/"/g, ''));
      if (yt) setYtUrl(String(yt).replace(/"/g, ''));
    }
  };

  const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return '';
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|live\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    return match && match[1] ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden border-b">
        
        {/* Background Carousel */}
        <div className="absolute inset-0 z-0">
          <Carousel 
            plugins={[plugin.current]} 
            opts={{ loop: true }}
            className="w-full h-full"
          >
            <CarouselContent className="h-full ml-0">
              {heroImages.map((hero, index) => (
                <CarouselItem key={index} className="h-full w-full pl-0 relative">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${hero.image_url})` }}
                  />
                  <div className="absolute inset-0 bg-background/80 md:bg-background/60" />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/50 to-transparent pointer-events-none z-0" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-24 md:pt-0 h-full pb-12 md:pb-0">
          <div className="max-w-xl self-center text-center md:text-left order-first mb-4 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-light text-foreground mb-4 md:mb-6 leading-tight">
              {heroImages[0]?.title || 'God is for you,'}<br />
              <span className="italic text-muted-foreground text-2xl md:text-3xl lg:text-4xl">{heroImages[0]?.subtitle || 'and so are we.'}</span>
            </h1>
          </div>
          
          {currentBishop && (
            <div className="flex justify-center md:justify-end order-last">
              <div className="bg-background border p-4 shadow-sm w-64 md:rotate-2 hover:rotate-0 transition-transform duration-300">
                <div className="aspect-[3/4] bg-muted mb-4 overflow-hidden">
                  {currentBishop.image_url ? (
                    <img src={currentBishop.image_url} alt={currentBishop.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground border">
                       <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
                    </div>
                  )}
                </div>
                <div className="text-sm font-medium uppercase tracking-wider text-center border-b pb-2 mb-2">{currentBishop.name}</div>
                <div className="text-xs text-muted-foreground text-center">Current Bishop</div>
                <div className="text-xs text-muted-foreground text-center">Ordained: {currentBishop.year_installed || 'N/A'}</div>
              </div>
            </div>
          )}
        </div>
        
        <div className="absolute bottom-8 flex space-x-2">
          <div className="w-2 h-2 rounded-full bg-foreground"></div>
          <div className="w-2 h-2 rounded-full bg-muted-foreground/30"></div>
          <div className="w-2 h-2 rounded-full bg-muted-foreground/30"></div>
          <div className="w-2 h-2 rounded-full bg-muted-foreground/30"></div>
          <div className="w-2 h-2 rounded-full bg-muted-foreground/30"></div>
        </div>
      </section>


      {/* Latest Section */}
      <section id="latest" className="w-full py-20 bg-background border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end border-b pb-4 mb-10">
            <h2 className="text-2xl font-light tracking-wide uppercase">Latest events</h2>
            <Link to="/events" className="inline-flex items-center text-sm font-medium hover:text-foreground transition-colors uppercase tracking-wider text-muted-foreground">
              See all events <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestEvents.length > 0 ? latestEvents.map((evt) => (
              <div key={evt.id} className="group flex flex-col">
                <div className="aspect-video bg-muted mb-4 overflow-hidden border shrink-0">
                  {evt.image_url ? (
                    <img src={evt.image_url} alt="Event" className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                  ) : (
                    <img src="https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&q=80&w=600" alt="Event" className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                  )}
                </div>
                <h3 className="text-lg font-medium mb-2">{evt.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed flex-1">{evt.description}</p>
                <div className="mt-auto">
                  <ContentModal
                    title={evt.title}
                    content={<p className="whitespace-pre-line leading-relaxed">{evt.description}</p>}
                    imageUrl={evt.image_url}
                    metadata={{
                      date: new Date(evt.date_expired),
                      category: 'Event'
                    }}
                    trigger={
                      <button className="inline-flex items-center text-sm font-medium hover:text-foreground transition-colors uppercase tracking-wider text-primary">
                        Read more <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    }
                  />
                </div>
              </div>
            )) : (
              <div className="col-span-3 text-center py-12 text-muted-foreground">No latest news or events.</div>
            )}
          </div>
        </div>
      </section>
      {/* Parishes and Mission Centers */}
      <section id="parishes" className="w-full py-20 bg-background border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10 border-b pb-4">
            <h2 className="text-2xl font-light tracking-wide uppercase text-foreground">
              Parishes and Mission Centers
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Block 1: Parishes */}
            <div className="bg-card border rounded-none p-6 lg:p-8 flex flex-col md:flex-row gap-8 shadow-sm hover:border-primary/50 transition-colors">
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-[45%] lg:w-1/2">
                <div className="flex-shrink-0 flex items-center justify-center md:h-full">
                  <h3 className="text-lg font-light tracking-widest uppercase md:writing-vertical-rl md:rotate-180 text-muted-foreground">Parishes & Mission Centers</h3>
                </div>
                <div className="relative w-full aspect-[3/4]">
                  {churches.length >= 3 ? (
                    <>
                      <div className="absolute w-[75%] aspect-[3/4] top-[4%] left-[4%] -rotate-6 rounded-none border border-border shadow-sm overflow-hidden z-10 transition-all duration-500 hover:-translate-y-2 hover:-rotate-3 hover:shadow-md hover:z-40">
                        <img src={churches[0]?.image_url} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                      </div>
                      <div className="absolute w-[75%] aspect-[3/4] top-[14.5%] left-[12.5%] rotate-2 rounded-none border border-border shadow-sm overflow-hidden z-20 transition-all duration-500 hover:-translate-y-2 hover:rotate-0 hover:shadow-md hover:z-40">
                        <img src={churches[1]?.image_url} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                      </div>
                      <div className="absolute w-[75%] aspect-[3/4] top-[25%] left-[21%] rotate-6 rounded-none border border-border shadow-sm overflow-hidden z-30 transition-all duration-500 hover:-translate-y-2 hover:rotate-3 hover:shadow-md hover:z-40">
                        <img src={churches[2]?.image_url} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full border border-dashed border-border flex items-center justify-center text-muted-foreground text-sm text-center p-4">Images required</div>
                  )}
                </div>
              </div>
              <div className="w-full md:w-[55%] lg:w-1/2 flex flex-col justify-center gap-6">
                {churches.slice(0, 4).map(c => (
                  <div key={c.id} className="flex items-start gap-4 group">
                    <div className="mt-1 w-10 h-10 bg-muted text-muted-foreground flex items-center justify-center flex-shrink-0 overflow-hidden border group-hover:border-foreground transition-colors">
                      {c.image_url ? (
                        <img src={c.image_url} alt={c.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M8 6h8"/><path d="M4 22h16"/><path d="M12 2l-6 6v14h12V8z"/></svg>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-foreground text-sm md:text-base leading-tight">{c.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{c.address || c.status}</div>
                    </div>
                  </div>
                ))}
                <div className="mt-2 text-right">
                  <Link to="/parishes" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors tracking-widest uppercase">
                    See more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Block 2: Stations / Priests */}
            <div className="bg-card border rounded-none p-6 lg:p-8 flex flex-col md:flex-row gap-8 shadow-sm hover:border-primary/50 transition-colors">
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-[45%] lg:w-1/2">
                <div className="flex-shrink-0 flex items-center justify-center md:h-full">
                  <h3 className="text-lg font-light tracking-widest uppercase md:writing-vertical-rl md:rotate-180 text-muted-foreground">Pastors & Deacons</h3>
                </div>
                <div className="relative w-full aspect-[3/4]">
                  {priests.length >= 3 ? (
                    <>
                      <div className="absolute w-[75%] aspect-[3/4] top-[4%] left-[4%] -rotate-6 rounded-none border border-border shadow-sm overflow-hidden z-10 transition-all duration-500 hover:-translate-y-2 hover:-rotate-3 hover:shadow-md hover:z-40">
                        <img src={priests[0]?.image_url || currentBishop?.image_url} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                      </div>
                      <div className="absolute w-[75%] aspect-[3/4] top-[14.5%] left-[12.5%] rotate-2 rounded-none border border-border shadow-sm overflow-hidden z-20 transition-all duration-500 hover:-translate-y-2 hover:rotate-0 hover:shadow-md hover:z-40">
                        <img src={priests[1]?.image_url || currentBishop?.image_url} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                      </div>
                      <div className="absolute w-[75%] aspect-[3/4] top-[25%] left-[21%] rotate-6 rounded-none border border-border shadow-sm overflow-hidden z-30 transition-all duration-500 hover:-translate-y-2 hover:rotate-3 hover:shadow-md hover:z-40">
                        <img src={priests[2]?.image_url || currentBishop?.image_url} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                      </div>
                    </>
                  ) : priests.length >= 1 ? (
                    <div className="absolute w-[80%] aspect-[3/4] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-none border border-border shadow-sm overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-md">
                      <img src={priests[0]?.image_url || currentBishop?.image_url} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                    </div>
                  ) : (
                    <div className="w-full h-full border border-dashed border-border flex items-center justify-center text-muted-foreground text-sm text-center p-4">Images required</div>
                  )}
                </div>
              </div>
              <div className="w-full md:w-[55%] lg:w-1/2 flex flex-col justify-center gap-6">
                {priests.slice(0, 4).map(p => (
                  <div key={p.id} className="flex items-start gap-4 group">
                    <div className="mt-1 w-10 h-10 bg-muted text-muted-foreground flex items-center justify-center flex-shrink-0 overflow-hidden border group-hover:border-foreground transition-colors">
                      {p.image_url ? (
                        <img src={p.image_url} alt={p.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                      ) : (
                        <Users className="w-5 h-5" strokeWidth={1}/>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-foreground text-sm md:text-base leading-tight">{p.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{p.assignment || 'Assigned to Parish'}</div>
                    </div>
                  </div>
                ))}
                {priests.length === 0 && (
                   <div className="text-sm text-muted-foreground text-center italic">No pastors listed yet.</div>
                )}
                <div className="mt-2 text-right">
                  <Link to="/clergy" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors tracking-widest uppercase">
                    See more <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* Live Streams Section */}
      {(fbUrl || ytUrl) && (
        <section id="streams" className="w-full py-20 bg-background border-b">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-light tracking-wide uppercase mb-10 border-b pb-4">Live Streams</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {fbUrl && (
                <div className="aspect-video bg-muted border overflow-hidden">
                  <iframe 
                    src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(fbUrl)}&show_text=false&width=auto`} 
                    className="w-full h-full border-0" 
                    scrolling="no" 
                    frameBorder="0" 
                    allowFullScreen={true} 
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  ></iframe>
                </div>
              )}
              {ytUrl && (
                <div className="aspect-video bg-muted border overflow-hidden">
                  <iframe 
                    src={getYoutubeEmbedUrl(ytUrl)} 
                    className="w-full h-full border-0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
      {/* Info & Weather Section */}

      {/* Year Of Section */}
      {yearOf && (
        <section id="yearof" className="w-full py-20 bg-background border-b">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-light tracking-wide uppercase mb-10 border-b pb-4">Year of {yearOf.year_name.replace(/^Year of /i, '')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
              <div className="col-span-1">
                <div className="aspect-square bg-muted border overflow-hidden relative group">
                  {yearOf.image_url ? (
                    <img src={yearOf.image_url} alt={yearOf.year_name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  ) : (
                    <img src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=600" alt="Theme" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                  )}
                </div>
              </div>
              <div className="col-span-1 md:col-span-2 flex flex-col justify-center">
                <ExpandableText 
                  content={yearOf.description || "The Diocese dedicates this year to focusing on specific pastoral goals, renewing our commitment to faith, and strengthening our community bonds through dedicated programs and spiritual exercises."}
                  limit={300}
                  className="text-muted-foreground md:text-lg mb-8"
                  expandText="Read More About This Theme"
                />
              </div>
            </div>
          </div>
        </section>
      )}
      {/* Vision & Mission */}
      <section id="vision" className="w-full py-32 bg-muted/5">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center space-y-32">
          <div>
            <h2 className="text-2xl font-light tracking-widest uppercase mb-12">Vision</h2>
            <p className="text-xl md:text-2xl text-foreground leading-relaxed font-light italic">
              "A communion of communities, deeply rooted in Christ, living the Gospel values, and actively participating in the transformation of society."
            </p>
          </div>
          
          <div id="mission">
            <h2 className="text-2xl font-light tracking-widest uppercase mb-12">Mission</h2>
            <p className="text-xl md:text-2xl text-foreground leading-relaxed font-light italic">
              "To proclaim the Good News, celebrate the sacraments faithfully, and serve the poor and marginalized with love, building a just and peaceful Diocese of Catarman."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
```

### src/pages/public/Maintenance.tsx
```tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/db/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Phone, ExternalLink } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function PublicMaintenance() {
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get('preview') === 'true';
  const [settings, setSettings] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase.from('maintenance_settings').select('*').limit(1).maybeSingle();
    if (data) {
      setSettings(data);
      if (data.show_countdown && data.end_time) {
        startCountdown(new Date(data.end_time));
      }
    }
  };

  const startCountdown = (endTime: Date) => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = endTime.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft(null);
        if (!isPreview) {
          window.location.href = '/'; // Check if we can reload the site
        }
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from('maintenance_subscribers').insert([{ email }]);
      if (error && error.code !== '23505') throw error; // Ignore unique constraint for UX
      toast.success("You'll be notified when we're back online!");
      setEmail('');
    } catch (err) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!settings && !isPreview) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const displaySettings = settings || {
    message: 'We are currently performing scheduled maintenance. Please check back later.',
    show_countdown: false,
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {isPreview && (
        <div className="absolute top-0 inset-x-0 bg-yellow-500 text-white text-center py-2 font-bold z-50">
          PREVIEW MODE
        </div>
      )}
      
      <div className="max-w-2xl w-full text-center space-y-8 relative z-10">
        <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center mb-8 shadow-sm">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
        </div>

        <h1 className="text-4xl md:text-5xl font-light text-foreground mb-4">Site Under Maintenance</h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto whitespace-pre-wrap">
          {displaySettings.message}
        </p>

        {timeLeft && displaySettings.show_countdown && (
          <div className="flex justify-center gap-4 py-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-card border rounded-lg flex items-center justify-center text-2xl font-bold shadow-sm">
                {timeLeft.days}
              </div>
              <span className="text-xs text-muted-foreground mt-2 uppercase tracking-wider">Days</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-card border rounded-lg flex items-center justify-center text-2xl font-bold shadow-sm">
                {timeLeft.hours}
              </div>
              <span className="text-xs text-muted-foreground mt-2 uppercase tracking-wider">Hours</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-card border rounded-lg flex items-center justify-center text-2xl font-bold shadow-sm">
                {timeLeft.minutes}
              </div>
              <span className="text-xs text-muted-foreground mt-2 uppercase tracking-wider">Mins</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-card border rounded-lg flex items-center justify-center text-2xl font-bold shadow-sm">
                {timeLeft.seconds}
              </div>
              <span className="text-xs text-muted-foreground mt-2 uppercase tracking-wider">Secs</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubscribe} className="max-w-md mx-auto mt-12 flex gap-2">
          <Input 
            type="email" 
            placeholder="Enter email for updates..." 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
            className="bg-background"
          />
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Subscribing...' : 'Notify Me'}
          </Button>
        </form>

        {(displaySettings.contact_email || displaySettings.contact_phone || displaySettings.support_link) && (
          <div className="pt-8 mt-8 border-t flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
            {displaySettings.contact_email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${displaySettings.contact_email}`} className="hover:text-foreground transition-colors">{displaySettings.contact_email}</a>
              </div>
            )}
            {displaySettings.contact_phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href={`tel:${displaySettings.contact_phone}`} className="hover:text-foreground transition-colors">{displaySettings.contact_phone}</a>
              </div>
            )}
            {displaySettings.support_link && (
              <div className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                <a href={displaySettings.support_link} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Support Portal</a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
```

### src/pages/public/ModalShowcase.tsx
```tsx
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter, 
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, Info, Send, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet-async';

export default function ModalShowcase() {
  const [isFormLoading, setIsFormLoading] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormLoading(true);
    setTimeout(() => {
      setIsFormLoading(false);
      toast.success('Form submitted successfully!');
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Modal Design Specifications | Church Website Design</title>
      </Helmet>

      <div className="min-h-screen bg-muted/20 py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              Professional Modal Dialogs
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base">
              A comprehensive showcase of modal components designed for enterprise applications, 
              featuring forms, alerts, and informational overlays with a minimal, airy aesthetic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 1. Standard Information Modal */}
            <div className="bg-background rounded-xl p-8 border border-border/50 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                <Info className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-lg">Information Modal</h3>
                <p className="text-sm text-muted-foreground">Standard overlay for displaying content or settings.</p>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="default" className="mt-4">View Example</Button>
                </DialogTrigger>
                <DialogContent className="max-w-[calc(100%-2rem)] md:max-w-lg rounded-xl">
                  <DialogHeader>
                    <DialogTitle>System Update Features</DialogTitle>
                    <DialogDescription>
                      Review the latest features introduced in Version 2.4
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Enhanced Security</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        We have upgraded our encryption standards to ensure all data transmissions are fully protected using AES-256 protocols.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Performance Boost</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Database indexing and caching layers have been optimized, resulting in a 40% faster load time for administrative dashboards.
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button onClick={() => {}} type="button" className="w-full sm:w-auto">Acknowledge</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* 2. Form Submission Modal */}
            <div className="bg-background rounded-xl p-8 border border-border/50 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center">
                <Send className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-lg">Form Submission Modal</h3>
                <p className="text-sm text-muted-foreground">Interactive modal for capturing user input.</p>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="mt-4">Open Form</Button>
                </DialogTrigger>
                <DialogContent className="max-w-[calc(100%-2rem)] md:max-w-md rounded-xl">
                  <DialogHeader>
                    <DialogTitle>Contact Support</DialogTitle>
                    <DialogDescription>
                      Fill out the form below and our team will get back to you shortly.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleFormSubmit}>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="john@example.com" required className="px-3" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="What is this regarding?" required className="px-3" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" placeholder="Please describe your issue in detail..." rows={4} required className="px-3" />
                      </div>
                    </div>
                    <DialogFooter className="gap-2 sm:gap-0">
                      <DialogClose asChild>
                        <Button onClick={() => {}} type="button" variant="ghost">Cancel</Button>
                      </DialogClose>
                      <Button type="submit" disabled={isFormLoading}>
                        {isFormLoading ? 'Sending...' : 'Send Message'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* 3. Destructive Alert Modal */}
            <div className="bg-background rounded-xl p-8 border border-border/50 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 bg-destructive/10 text-destructive rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-lg">Destructive Alert Modal</h3>
                <p className="text-sm text-muted-foreground">Requires explicit user confirmation for critical actions.</p>
              </div>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="mt-4">Delete Record</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-[calc(100%-2rem)] md:max-w-md rounded-xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2 text-destructive">
                      <AlertCircle className="w-5 h-5" /> Confirm Deletion
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you absolutely sure you want to delete this record? This action cannot be undone and all associated data will be permanently removed from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Yes, Delete Record
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            {/* 4. Success / Confirmation Modal */}
            <div className="bg-background rounded-xl p-8 border border-border/50 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-medium text-lg">Success Confirmation</h3>
                <p className="text-sm text-muted-foreground">Positive reinforcement after a successful operation.</p>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" className="mt-4">Complete Setup</Button>
                </DialogTrigger>
                <DialogContent className="max-w-[calc(100%-2rem)] md:max-w-sm rounded-xl text-center">
                  <div className="flex flex-col items-center py-6 space-y-4">
                    <div className="w-16 h-16 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mb-2">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <DialogTitle className="text-xl">Setup Complete!</DialogTitle>
                    <DialogDescription className="text-center">
                      Your account has been successfully configured. You can now access all features of the administrative dashboard.
                    </DialogDescription>
                  </div>
                  <DialogFooter className="sm:justify-center">
                    <DialogClose asChild>
                      <Button onClick={() => {}} type="button" className="w-full sm:w-auto px-8">Continue to Dashboard</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

```

### src/pages/public/Parishes.tsx
```tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '@/db/supabase';
import { MapPin, Users, Calendar, Search, Building, BookOpen, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Parishes() {
  const [churches, setChurches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('Parish');

  useEffect(() => {
    fetchChurches();
  }, []);

  const fetchChurches = async () => {
    setLoading(true);
    const { data } = await supabase.from('churches')
      .select(`
        *,
        in_charge_priest:in_charge_priest_id(name)
      `)
      .order('name');
    if (data) setChurches(data);
    setLoading(false);
  };

  const filteredChurches = churches.filter(c => 
    c.status === activeTab && 
    (c.name.toLowerCase().includes(search.toLowerCase()) || 
     (c.address && c.address.toLowerCase().includes(search.toLowerCase())))
  );

  return (
    <div className="w-full flex flex-col items-center">
      <section className="w-full py-20 bg-background border-b min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b pb-4 gap-6">
            <div>
              <h2 className="text-3xl font-light tracking-wide uppercase mb-2">Parishes & Churches</h2>
              <p className="text-muted-foreground font-light">Explore our parishes and mission centers across the diocese.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full sm:w-64 shrink-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search churches..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 bg-muted/50 border-none"
                />
              </div>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto shrink-0">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="Parish">Parishes</TabsTrigger>
                  <TabsTrigger value="Mission Center">Mission Centers</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading churches...</div>
          ) : filteredChurches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredChurches.map(church => (
                <div key={church.id} className="group border border-border p-5 hover:border-primary/50 transition-colors flex flex-col bg-card">
                  <div className="aspect-video bg-muted mb-5 overflow-hidden border shrink-0 relative">
                    {church.image_url ? (
                      <img src={church.image_url} alt={church.name} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted">
                        <span className="text-xs uppercase tracking-widest opacity-50">No Image</span>
                      </div>
                    )}
                    {church.year_established && (
                      <div className="absolute top-2 right-2 bg-background/90 backdrop-blur text-xs font-medium px-2 py-1 shadow-sm">
                        Est. {church.year_established}
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-medium mb-1">{church.name}</h3>
                  <div className="text-sm text-primary mb-4">{church.patron && `Patron: ${church.patron}`}</div>
                  
                  <div className="space-y-2 mb-6 flex-1">
                    {church.address && (
                      <div className="flex items-start text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                        <span className="leading-snug">{church.address}</span>
                      </div>
                    )}
                    {church.in_charge_priest && (
                      <div className="flex items-start text-sm text-muted-foreground">
                        <Users className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                        <span className="leading-snug">Priest: {church.in_charge_priest.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto pt-4 border-t border-border/50">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="w-full inline-flex justify-center items-center text-sm font-medium hover:text-foreground transition-colors uppercase tracking-wider text-primary border border-primary/20 py-2 hover:bg-primary/5">
                          View Details
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[calc(100%-2rem)] md:max-w-2xl lg:max-w-4xl p-0 overflow-hidden bg-muted/10 gap-0 border-none shadow-xl rounded-xl">
                        <DialogTitle className="sr-only">Details of {church.name}</DialogTitle>
                        
                        {/* Modal Header */}
                        {church.image_url ? (
                          <div className="relative w-full h-48 sm:h-64 shrink-0 border-b">
                            <img src={church.image_url} alt={church.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent pointer-events-none" />
                            <div className="absolute bottom-6 left-6 right-6">
                              <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground drop-shadow-sm">{church.name}</h2>
                              <div className="text-primary font-medium mt-1 drop-shadow-sm">{church.patron && `Patron: ${church.patron}`}</div>
                            </div>
                          </div>
                        ) : (
                          <div className="p-6 sm:p-8 bg-background border-b relative">
                            <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground">{church.name}</h2>
                            <div className="text-primary font-medium mt-1">{church.patron && `Patron: ${church.patron}`}</div>
                          </div>
                        )}

                        {/* Modal Body */}
                        <ScrollArea className="max-h-[60vh] p-6 sm:p-8">
                          <div className="space-y-6">
                            
                            {/* Basic Info Card */}
                            <div className="bg-background rounded-xl border border-border/50 p-6 shadow-sm">
                              <h3 className="flex items-center gap-2 font-medium mb-6 text-foreground">
                                <Building className="w-4 h-4 text-primary" /> Basic Information
                              </h3>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                                <div className="flex gap-3">
                                  <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                                    <Building className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <div className="text-xs text-muted-foreground">Status</div>
                                    <div className="font-medium text-sm mt-0.5">{church.status}</div>
                                  </div>
                                </div>
                                <div className="flex gap-3">
                                  <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                                    <Calendar className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <div className="text-xs text-muted-foreground">Year Established</div>
                                    <div className="font-medium text-sm mt-0.5">{church.year_established || 'Unknown'}</div>
                                  </div>
                                </div>
                                <div className="flex gap-3">
                                  <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                                    <BookOpen className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <div className="text-xs text-muted-foreground">Denomination</div>
                                    <div className="font-medium text-sm mt-0.5">{church.denomination || 'Catholic'}</div>
                                  </div>
                                </div>
                                <div className="flex gap-3">
                                  <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                                    <Users className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <div className="text-xs text-muted-foreground">Capacity</div>
                                    <div className="font-medium text-sm mt-0.5">{church.capacity ? `${church.capacity} persons` : 'Unknown'}</div>
                                  </div>
                                </div>
                                <div className="flex gap-3 sm:col-span-2">
                                  <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                                    <MapPin className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <div className="text-xs text-muted-foreground">Address</div>
                                    <div className="font-medium text-sm mt-0.5">{church.address || 'N/A'}</div>
                                  </div>
                                </div>
                                {church.in_charge_priest && (
                                  <div className="flex gap-3 sm:col-span-2">
                                    <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                                      <Users className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <div className="text-xs text-muted-foreground">Priest In-Charge</div>
                                      <div className="font-medium text-sm mt-0.5">{church.in_charge_priest.name}</div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* History Card */}
                            <div className="bg-background rounded-xl border border-border/50 p-6 shadow-sm">
                              <h3 className="flex items-center gap-2 font-medium mb-4 text-foreground">
                                <Clock className="w-4 h-4 text-primary" /> History & Details
                              </h3>
                              <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                                {church.history || 'No historical information provided yet.'}
                              </p>
                            </div>
                            
                          </div>
                        </ScrollArea>

                        {/* Modal Footer */}
                        <div className="p-4 bg-background border-t mt-auto flex justify-end">
                          <DialogClose asChild>
                            <Button onClick={() => {}} variant="outline" className="w-full sm:w-auto px-8 uppercase tracking-widest text-xs">
                              Close
                            </Button>
                          </DialogClose>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground border border-dashed p-8 bg-card">
              No {activeTab.toLowerCase()}s found matching your search.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

```

### src/routes.tsx
```tsx
import PublicHome from './pages/public/Home';
import Login from './pages/auth/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminPriests from './pages/admin/Priests';
import AdminBishops from './pages/admin/Bishops';
import AdminChurches from './pages/admin/Churches';
import AdminEvents from './pages/admin/Events';
import AdminYearOf from './pages/admin/YearOf';
import AdminSettings from './pages/admin/Settings';
import AdminAccount from './pages/admin/Account';
import AdminHeroes from './pages/admin/Heroes';
import AdminAnnouncements from './pages/admin/Announcements';
import AdminMaintenance from './pages/admin/Maintenance';

import type { ReactNode } from 'react';

export interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
  public?: boolean;
}

export const routes: RouteConfig[] = [
  // Handled specifically in App.tsx due to layout differences
];

```

### src/services/.keep
```keep

```

### src/svg.d.ts
```ts
declare module "*.svg?react" {
  import React = require("react");
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

```

### src/types/index.ts
```ts
export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

```

### src/vite-env.d.ts
```ts
/// <reference types="vite/client" />

```

### supabase/config.toml
```toml
[auth.email]
enable_confirmations = false

[auth.phone]
enable_confirmations = false

```

### supabase/migrations/00001_01_initial_schema.sql
```sql
CREATE TYPE public.user_role AS ENUM ('super_admin', 'admin', 'moderator', 'bishop', 'father', 'user');

CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username text UNIQUE,
  full_name text,
  email text,
  phone_number text,
  role public.user_role DEFAULT 'user'::public.user_role,
  status text DEFAULT 'active', -- 'active', 'inactive'
  avatar_url text,
  permissions jsonb DEFAULT '{}'::jsonb,
  last_login timestamptz,
  updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- RLS helper
CREATE OR REPLACE FUNCTION public.get_user_role(uid uuid)
RETURNS public.user_role
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = uid;
$$;

-- Trigger to sync user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, phone_number, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.phone,
    'user'::public.user_role
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Audit Logs
CREATE TABLE public.admin_audit_logs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  action_type text NOT NULL,
  affected_entity text,
  ip_address text,
  result text,
  timestamp timestamptz DEFAULT now()
);

-- Newsletters
CREATE TABLE public.newsletter_subscribers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  name text,
  status text DEFAULT 'active', -- 'active', 'unsubscribed'
  subscribed_at timestamptz DEFAULT now()
);

CREATE TABLE public.newsletters (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  content text,
  status text DEFAULT 'draft', -- 'draft', 'scheduled', 'sent'
  scheduled_date timestamptz,
  sent_at timestamptz,
  created_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.newsletter_analytics (
  newsletter_id uuid REFERENCES public.newsletters(id) ON DELETE CASCADE PRIMARY KEY,
  sent_count integer DEFAULT 0,
  delivered_count integer DEFAULT 0,
  failed_count integer DEFAULT 0,
  open_count integer DEFAULT 0,
  click_count integer DEFAULT 0
);

-- Inventory
CREATE TABLE public.inventory_categories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text UNIQUE NOT NULL
);

CREATE TABLE public.inventory_locations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text UNIQUE NOT NULL
);

CREATE TABLE public.inventory_resources (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  category_id uuid REFERENCES public.inventory_categories(id) ON DELETE SET NULL,
  location_id uuid REFERENCES public.inventory_locations(id) ON DELETE SET NULL,
  quantity integer DEFAULT 0,
  availability_status text DEFAULT 'Available', -- 'Available', 'Assigned', 'Unavailable'
  description text,
  photo_url text,
  maintenance_schedule jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE public.inventory_assignments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  resource_id uuid REFERENCES public.inventory_resources(id) ON DELETE CASCADE,
  assigned_to uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  assigned_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  assignment_date timestamptz DEFAULT now(),
  return_date timestamptz,
  status text DEFAULT 'active', -- 'active', 'returned'
  location_during_assignment uuid REFERENCES public.inventory_locations(id) ON DELETE SET NULL,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Push Subscriptions
CREATE TABLE public.push_subscriptions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  subscription jsonb NOT NULL,
  preferences jsonb DEFAULT '{"inventory_changes": true, "assignments": true, "reassignments": true, "availability": true, "maintenance": true}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- System Settings
CREATE TABLE public.system_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

```

### supabase/migrations/00002_02_rls_policies.sql
```sql
-- Profiles Policies
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT TO authenticated USING (public.get_user_role(auth.uid()) IN ('super_admin', 'admin'));

CREATE POLICY "Super Admins have full access to profiles" ON public.profiles
  FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) = 'super_admin');

CREATE POLICY "Admins can update profiles" ON public.profiles
  FOR UPDATE TO authenticated USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can delete profiles" ON public.profiles
  FOR DELETE TO authenticated USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id)
  WITH CHECK (role IS NOT DISTINCT FROM public.get_user_role(auth.uid()));

-- Inventory Resources
CREATE POLICY "Public can view inventory" ON public.inventory_resources
  FOR SELECT TO public, anon, authenticated USING (true);

CREATE POLICY "Admins can manage inventory" ON public.inventory_resources
  FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) IN ('super_admin', 'admin'));

-- Inventory Categories and Locations
CREATE POLICY "Public can view categories" ON public.inventory_categories
  FOR SELECT TO public, anon, authenticated USING (true);
CREATE POLICY "Public can view locations" ON public.inventory_locations
  FOR SELECT TO public, anon, authenticated USING (true);
CREATE POLICY "Admins can manage categories" ON public.inventory_categories
  FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) IN ('super_admin', 'admin'));
CREATE POLICY "Admins can manage locations" ON public.inventory_locations
  FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) IN ('super_admin', 'admin'));

-- Inventory Assignments
CREATE POLICY "Admins can view assignments" ON public.inventory_assignments
  FOR SELECT TO authenticated USING (public.get_user_role(auth.uid()) IN ('super_admin', 'admin', 'bishop'));
CREATE POLICY "Users can view their assignments" ON public.inventory_assignments
  FOR SELECT TO authenticated USING (assigned_to = auth.uid());
CREATE POLICY "Admins can manage assignments" ON public.inventory_assignments
  FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) IN ('super_admin', 'admin'));

-- Newsletters
CREATE POLICY "Admins can view newsletters" ON public.newsletters
  FOR SELECT TO authenticated USING (public.get_user_role(auth.uid()) IN ('super_admin', 'admin'));
CREATE POLICY "Admins can manage newsletters" ON public.newsletters
  FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) IN ('super_admin', 'admin'));

CREATE POLICY "Admins can view subscribers" ON public.newsletter_subscribers
  FOR SELECT TO authenticated USING (public.get_user_role(auth.uid()) IN ('super_admin', 'admin'));
CREATE POLICY "Admins can manage subscribers" ON public.newsletter_subscribers
  FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) IN ('super_admin', 'admin'));

CREATE POLICY "Admins can view analytics" ON public.newsletter_analytics
  FOR SELECT TO authenticated USING (public.get_user_role(auth.uid()) IN ('super_admin', 'admin'));
CREATE POLICY "Admins can manage analytics" ON public.newsletter_analytics
  FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) IN ('super_admin', 'admin'));

-- Audit Logs
CREATE POLICY "Admins can view audit logs" ON public.admin_audit_logs
  FOR SELECT TO authenticated USING (public.get_user_role(auth.uid()) IN ('super_admin', 'admin', 'moderator'));
CREATE POLICY "Service can insert audit logs" ON public.admin_audit_logs
  FOR INSERT TO authenticated WITH CHECK (true); -- allowed so we can insert from frontend

-- System Settings
CREATE POLICY "Admins can view settings" ON public.system_settings
  FOR SELECT TO authenticated USING (public.get_user_role(auth.uid()) IN ('super_admin', 'admin'));
CREATE POLICY "Super Admins can manage settings" ON public.system_settings
  FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) = 'super_admin');

-- Push subscriptions
CREATE POLICY "Users can view own push subscriptions" ON public.push_subscriptions
  FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can manage own push subscriptions" ON public.push_subscriptions
  FOR ALL TO authenticated USING (user_id = auth.uid());

```

### supabase/migrations/00003_03_seed_data.sql
```sql
INSERT INTO public.system_settings (key, value) VALUES
('email_settings', '{"server": "smtp.example.com", "port": 587}'::jsonb),
('session_timeout', '{"duration_minutes": 60}'::jsonb),
('password_policy', '{"min_length": 8, "require_complexity": true}'::jsonb)
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory_categories (name) VALUES
('Furniture'),
('Electronics'),
('Vehicles'),
('Liturgical Items')
ON CONFLICT DO NOTHING;

INSERT INTO public.inventory_locations (name) VALUES
('Main Church'),
('Parish Office'),
('Mission Center'),
('Storage Room')
ON CONFLICT DO NOTHING;

```

### supabase/migrations/00004_04_new_diocese_schema.sql
```sql
-- Create new tables for Diocese Website Management System

CREATE TABLE IF NOT EXISTS public.priests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  ordain_year text,
  assignment text,
  image_url text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.bishops (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  year_installed text,
  image_url text,
  is_current boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.churches (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  address text,
  patron text,
  year_established text,
  status text, -- 'Parish' or 'Mission Center'
  history text,
  in_charge_priest_id uuid REFERENCES public.priests(id) ON DELETE SET NULL,
  assistant_priests jsonb DEFAULT '[]'::jsonb, -- array of priest IDs
  secretary text,
  image_url text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  date_expired timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.year_of (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  year_name text NOT NULL,
  description text,
  is_current boolean DEFAULT false,
  image_url text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.staff (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  role text,
  year_hired text,
  created_at timestamptz DEFAULT now()
);

-- RLS Policies
ALTER TABLE public.priests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bishops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.churches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.year_of ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;

-- Public can view
CREATE POLICY "Public can view priests" ON public.priests FOR SELECT USING (true);
CREATE POLICY "Public can view bishops" ON public.bishops FOR SELECT USING (true);
CREATE POLICY "Public can view churches" ON public.churches FOR SELECT USING (true);
CREATE POLICY "Public can view events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Public can view year_of" ON public.year_of FOR SELECT USING (true);
CREATE POLICY "Public can view staff" ON public.staff FOR SELECT USING (true);

-- Admins can manage
CREATE POLICY "Admins can manage priests" ON public.priests FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) IN ('super_admin', 'admin'));
CREATE POLICY "Admins can manage bishops" ON public.bishops FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) IN ('super_admin', 'admin'));
CREATE POLICY "Admins can manage churches" ON public.churches FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) IN ('super_admin', 'admin'));
CREATE POLICY "Admins can manage events" ON public.events FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) IN ('super_admin', 'admin'));
CREATE POLICY "Admins can manage year_of" ON public.year_of FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) IN ('super_admin', 'admin'));
CREATE POLICY "Admins can manage staff" ON public.staff FOR ALL TO authenticated USING (public.get_user_role(auth.uid()) IN ('super_admin', 'admin'));

-- Trigger to ensure only one current Year Of
CREATE OR REPLACE FUNCTION public.handle_current_year_of()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.is_current = true THEN
    UPDATE public.year_of SET is_current = false WHERE id != NEW.id AND is_current = true;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_year_of_change
  BEFORE INSERT OR UPDATE OF is_current ON public.year_of
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_current_year_of();

-- Trigger to ensure only one current Bishop
CREATE OR REPLACE FUNCTION public.handle_current_bishop()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.is_current = true THEN
    UPDATE public.bishops SET is_current = false WHERE id != NEW.id AND is_current = true;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_bishop_change
  BEFORE INSERT OR UPDATE OF is_current ON public.bishops
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_current_bishop();

-- Create Storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true) ON CONFLICT DO NOTHING;
CREATE POLICY "Public can view images" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Admins can insert images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'images');
CREATE POLICY "Admins can update images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'images');
CREATE POLICY "Admins can delete images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'images');

```

### supabase/migrations/00005_create_heroes_table.sql
```sql
CREATE TABLE IF NOT EXISTS heroes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_url TEXT NOT NULL,
    title TEXT,
    subtitle TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE heroes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to active heroes"
    ON heroes FOR SELECT
    USING (is_active = true);

CREATE POLICY "Allow admin full access to heroes"
    ON heroes FOR ALL
    USING (auth.role() = 'authenticated');

```

### supabase/migrations/00006_create_maintenance_tables.sql
```sql
CREATE TABLE IF NOT EXISTS maintenance_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    is_active BOOLEAN DEFAULT false,
    message TEXT,
    end_time TIMESTAMPTZ,
    show_countdown BOOLEAN DEFAULT false,
    contact_email TEXT,
    contact_phone TEXT,
    support_link TEXT,
    scheduled_start TIMESTAMPTZ,
    scheduled_end TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT now(),
    updated_by UUID REFERENCES auth.users(id)
);

-- Insert a default row if none exists
INSERT INTO maintenance_settings (is_active) 
SELECT false WHERE NOT EXISTS (SELECT 1 FROM maintenance_settings);

CREATE TABLE IF NOT EXISTS maintenance_whitelisted_ips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ip_address TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    created_by UUID REFERENCES auth.users(id)
);

CREATE TABLE IF NOT EXISTS maintenance_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action TEXT NOT NULL, -- 'Enabled', 'Disabled', 'Updated'
    reason TEXT,
    duration TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    created_by UUID REFERENCES auth.users(id)
);

-- RLS
ALTER TABLE maintenance_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_whitelisted_ips ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to maintenance settings"
    ON maintenance_settings FOR SELECT
    USING (true);

CREATE POLICY "Allow admin full access to maintenance settings"
    ON maintenance_settings FOR ALL
    USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public read access to whitelisted IPs"
    ON maintenance_whitelisted_ips FOR SELECT
    USING (true);

CREATE POLICY "Allow admin full access to whitelisted IPs"
    ON maintenance_whitelisted_ips FOR ALL
    USING (auth.role() = 'authenticated');

CREATE POLICY "Allow admin full access to maintenance logs"
    ON maintenance_logs FOR ALL
    USING (auth.role() = 'authenticated');

```

### supabase/migrations/00007_create_maintenance_subscribers.sql
```sql
CREATE TABLE IF NOT EXISTS maintenance_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE maintenance_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert to maintenance_subscribers" 
    ON maintenance_subscribers FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Allow admin read maintenance_subscribers" 
    ON maintenance_subscribers FOR SELECT 
    USING (auth.role() = 'authenticated');
```

### supabase/migrations/00008_fix_maintenance_fkeys.sql
```sql
ALTER TABLE maintenance_logs DROP CONSTRAINT maintenance_logs_created_by_fkey;
ALTER TABLE maintenance_logs ADD CONSTRAINT maintenance_logs_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.profiles(id);

ALTER TABLE maintenance_settings DROP CONSTRAINT maintenance_settings_updated_by_fkey;
ALTER TABLE maintenance_settings ADD CONSTRAINT maintenance_settings_updated_by_fkey FOREIGN KEY (updated_by) REFERENCES public.profiles(id);

ALTER TABLE maintenance_whitelisted_ips DROP CONSTRAINT maintenance_whitelisted_ips_created_by_fkey;
ALTER TABLE maintenance_whitelisted_ips ADD CONSTRAINT maintenance_whitelisted_ips_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.profiles(id);
```

### supabase/migrations/00009_create_announcements_table.sql
```sql
CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT,
    published_date DATE NOT NULL,
    status TEXT DEFAULT 'Active',
    created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to active announcements" 
    ON announcements FOR SELECT 
    USING (status = 'Active');

CREATE POLICY "Allow admin full access to announcements" 
    ON announcements FOR ALL 
    USING (auth.role() = 'authenticated');
```

### supabase/migrations/00010_create_donations_table.sql
```sql
CREATE TABLE IF NOT EXISTS public.donation_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    qr_image_url TEXT NOT NULL,
    icon_name TEXT,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.donation_options ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to donation_options" 
ON public.donation_options FOR SELECT USING (true);

CREATE POLICY "Allow authenticated full access to donation_options" 
ON public.donation_options FOR ALL USING (auth.role() = 'authenticated');

```

### supabase/migrations/00011_00011_seed_donations.sql
```sql
INSERT INTO public.donation_options (name, description, qr_image_url, icon_name, display_order) VALUES
('GCash', 'Fast, secure mobile payment', 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=gcash-donation', 'Smartphone', 1),
('PayMaya', 'Quick digital wallet transfer', 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=paymaya-donation', 'Wallet', 2),
('Bank Transfer', 'Direct bank deposit', 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=bank-transfer', 'Banknote', 3);
```

### supabase/migrations/00012_create_admin_logs.sql
```sql
CREATE TABLE IF NOT EXISTS public.admin_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name TEXT NOT NULL,
    action TEXT NOT NULL,
    record_id TEXT,
    details JSONB,
    user_id UUID,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.admin_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated read access to admin_logs" 
ON public.admin_logs FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert access to admin_logs" 
ON public.admin_logs FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE OR REPLACE FUNCTION log_admin_action()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.admin_logs (table_name, action, record_id, details, user_id)
    VALUES (
        TG_TABLE_NAME,
        TG_OP,
        COALESCE(NEW.id::text, OLD.id::text, 'unknown'),
        row_to_json(COALESCE(NEW, OLD)),
        auth.uid()
    );
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_bishops_log ON public.bishops;
CREATE TRIGGER trg_bishops_log AFTER INSERT OR UPDATE OR DELETE ON public.bishops FOR EACH ROW EXECUTE FUNCTION log_admin_action();

DROP TRIGGER IF EXISTS trg_priests_log ON public.priests;
CREATE TRIGGER trg_priests_log AFTER INSERT OR UPDATE OR DELETE ON public.priests FOR EACH ROW EXECUTE FUNCTION log_admin_action();

DROP TRIGGER IF EXISTS trg_churches_log ON public.churches;
CREATE TRIGGER trg_churches_log AFTER INSERT OR UPDATE OR DELETE ON public.churches FOR EACH ROW EXECUTE FUNCTION log_admin_action();

DROP TRIGGER IF EXISTS trg_events_log ON public.events;
CREATE TRIGGER trg_events_log AFTER INSERT OR UPDATE OR DELETE ON public.events FOR EACH ROW EXECUTE FUNCTION log_admin_action();

DROP TRIGGER IF EXISTS trg_announcements_log ON public.announcements;
CREATE TRIGGER trg_announcements_log AFTER INSERT OR UPDATE OR DELETE ON public.announcements FOR EACH ROW EXECUTE FUNCTION log_admin_action();

DROP TRIGGER IF EXISTS trg_heroes_log ON public.heroes;
CREATE TRIGGER trg_heroes_log AFTER INSERT OR UPDATE OR DELETE ON public.heroes FOR EACH ROW EXECUTE FUNCTION log_admin_action();

DROP TRIGGER IF EXISTS trg_donation_options_log ON public.donation_options;
CREATE TRIGGER trg_donation_options_log AFTER INSERT OR UPDATE OR DELETE ON public.donation_options FOR EACH ROW EXECUTE FUNCTION log_admin_action();

```

### supabase/migrations/00013_add_image_to_events.sql
```sql
-- Add image_url to events
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS image_url text;

```

### supabase/migrations/00014_add_detail_fields.sql
```sql
-- Add detailed fields for Churches
ALTER TABLE public.churches 
ADD COLUMN IF NOT EXISTS capacity integer,
ADD COLUMN IF NOT EXISTS denomination text DEFAULT 'Catholic';

-- Add detailed fields for Priests (Pastors and Deacons)
ALTER TABLE public.priests 
ADD COLUMN IF NOT EXISTS biography text,
ADD COLUMN IF NOT EXISTS credentials text,
ADD COLUMN IF NOT EXISTS role text DEFAULT 'Pastor'; -- 'Pastor' or 'Deacon'

```

### supabase/migrations/00015_add_assignment_history.sql
```sql
ALTER TABLE public.priests 
ADD COLUMN IF NOT EXISTS assignment_history jsonb DEFAULT '[]'::jsonb;

```

### supabase/migrations/00016_seed_assignment_history.sql
```sql
DO $$ 
BEGIN
  UPDATE public.priests
  SET assignment_history = '[
    {
      "period": "2022 - Present",
      "parish": "St. Joseph Parish",
      "role": "Pastor",
      "location": "Allen, Northern Samar",
      "description": "Led the parish community through post-pandemic recovery and initiated the construction of the new parish hall."
    },
    {
      "period": "2018 - 2022",
      "parish": "St. Michael Parish",
      "role": "Associate Pastor",
      "location": "Catarman, Northern Samar",
      "description": "Focused on youth ministry and expanded the local outreach programs."
    },
    {
      "period": "2012 - 2018",
      "parish": "Holy Cross Parish",
      "role": "Pastor",
      "location": "Bobon, Northern Samar",
      "description": "Spearheaded the renovation of the main church building and established a new scholarship fund."
    }
  ]'::jsonb
  WHERE assignment_history IS NULL OR jsonb_typeof(assignment_history) != 'array' OR jsonb_array_length(assignment_history) = 0;
END $$;

```

### tailwind.config.js
```js
import tailwindAnimate from 'tailwindcss-animate';
import containerQuery from '@tailwindcss/container-queries';
import intersect from 'tailwindcss-intersect';

export default {
    darkMode: ['class'],
    content: [
        './index.html',
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
        './node_modules/streamdown/dist/**/*.js'
    ],
    safelist: ['border', 'border-border'],
    prefix: '',
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                border: 'hsl(var(--border))',
                borderColor: {
                    border: 'hsl(var(--border))'
                },
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                education: {
                    blue: 'hsl(var(--education-blue))',
                    green: 'hsl(var(--education-green))'
                },
                success: 'hsl(var(--success))',
                warning: 'hsl(var(--warning))',
                info: 'hsl(var(--info))',
                sidebar: {
                    DEFAULT: 'hsl(var(--sidebar-background))',
                    background: 'hsl(var(--sidebar-background))',
                    foreground: 'hsl(var(--sidebar-foreground))',
                    primary: 'hsl(var(--sidebar-primary))',
                    'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
                    accent: 'hsl(var(--sidebar-accent))',
                    'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
                    border: 'hsl(var(--sidebar-border))',
                    ring: 'hsl(var(--sidebar-ring))'
                },
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            backgroundImage: {
                'gradient-primary': 'var(--gradient-primary)',
                'gradient-card': 'var(--gradient-card)',
                'gradient-background': 'var(--gradient-background)'
            },
            boxShadow: {
                card: 'var(--shadow-card)',
                hover: 'var(--shadow-hover)'
            },
            keyframes: {
                'accordion-down': {
                    from: {
                        height: '0'
                    },
                    to: {
                        height: 'var(--radix-accordion-content-height)'
                    }
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-content-height)'
                    },
                    to: {
                        height: '0'
                    }
                },
                'fade-in': {
                    from: {
                        opacity: '0',
                        transform: 'translateY(10px)'
                    },
                    to: {
                        opacity: '1',
                        transform: 'translateY(0)'
                    }
                },
                'slide-in': {
                    from: {
                        opacity: '0',
                        transform: 'translateX(-20px)'
                    },
                    to: {
                        opacity: '1',
                        transform: 'translateX(0)'
                    }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'fade-in': 'fade-in 0.5s ease-out',
                'slide-in': 'slide-in 0.5s ease-out'
            }
        }
    },
    plugins: [
        tailwindAnimate,
        containerQuery,
        intersect,
        function ({addUtilities}) {
            addUtilities(
                {
                    '.border-t-solid': {'border-top-style': 'solid'},
                    '.border-r-solid': {'border-right-style': 'solid'},
                    '.border-b-solid': {'border-bottom-style': 'solid'},
                    '.border-l-solid': {'border-left-style': 'solid'},
                    '.border-t-dashed': {'border-top-style': 'dashed'},
                    '.border-r-dashed': {'border-right-style': 'dashed'},
                    '.border-b-dashed': {'border-bottom-style': 'dashed'},
                    '.border-l-dashed': {'border-left-style': 'dashed'},
                    '.border-t-dotted': {'border-top-style': 'dotted'},
                    '.border-r-dotted': {'border-right-style': 'dotted'},
                    '.border-b-dotted': {'border-bottom-style': 'dotted'},
                    '.border-l-dotted': {'border-left-style': 'dotted'},
                },
                ['responsive']
            );
        },
    ],
};

```

### vite.config.ts
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

```

# Firebase Backend Structure and Instructions

This application currently uses Supabase. To migrate to **Firebase**, use the following file structure and instructions.

## Firebase Project Structure

```
firebase-backend/
├── .env.local
├── package.json
├── src/
│   ├── firebase/
│   │   ├── config.ts             # Firebase app initialization
│   │   ├── auth.ts               # Auth wrappers and providers
│   │   ├── firestore.ts          # Firestore collections and queries
│   │   └── storage.ts            # Firebase Storage helpers
└── README.md
```

## Instructions

1. **Create a Firebase project** in the [Firebase Console](https://console.firebase.google.com/).
2. **Enable required services**: Authentication (Email/Password), Cloud Firestore, and Firebase Storage.
3. **Register a Web App** and copy the Firebase configuration object.
4. **Set environment variables** in your `.env.local`:
   ```env
   VITE_FIREBASE_API_KEY="your_api_key"
   VITE_FIREBASE_AUTH_DOMAIN="your_project_id.firebaseapp.com"
   VITE_FIREBASE_PROJECT_ID="your_project_id"
   VITE_FIREBASE_STORAGE_BUCKET="your_project_id.appspot.com"
   VITE_FIREBASE_MESSAGING_SENDER_ID="your_sender_id"
   VITE_FIREBASE_APP_ID="your_app_id"
   ```
5. **Install dependencies**:
   ```bash
   npm install firebase
   ```
6. **Replace Supabase Client (`src/db/supabase.ts`)**: Replace all Supabase queries with their Firestore equivalents, update Auth Context to use `onAuthStateChanged`, and change Storage uploads to use `uploadBytes` and `getDownloadURL`.

## Minimal Firebase Configuration Example (`src/firebase/config.ts`)

```typescript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

## Minimal Firestore Query Example

```typescript
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./config";

export const getActiveChurches = async () => {
  const churchesCol = collection(db, "churches");
  const q = query(churchesCol, where("is_active", "==", true));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
```
