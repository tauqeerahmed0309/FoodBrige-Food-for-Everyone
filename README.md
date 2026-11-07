# FoodBridge — Every meal deserves a destination.

FoodBridge is a React/Vite frontend prototype for the OSCode AI Prompt Battle. It connects restaurants, households, food donors, NGOs and volunteers through an interactive food-rescue network.

## Problem and approach

Food waste and hunger are connected coordination problems. UNEP reports that **1.05 billion tonnes** of food waste (including inedible parts) were generated in 2022 across retail, food service and households—about **19%** of food available to consumers. The report also notes that **783 million** people were affected by hunger in 2022. See the [UNEP Food Waste Index Report 2024](https://www.unep.org/resources/publication/food-waste-index-report-2024).

The prototype captures category, quantity, servings, location, preparation time, handling confirmation, storage condition/temperature (when known), and a donor-stated deadline.

## What is implemented

- Accessible donation, volunteer, and partnership forms with client-side validation.
- A local-only donation listing and available-donations view, with sample NGO interest recording.
- NGO search by name or location; donation search by category or location.
- Expired-listing filtering, duplicate-interest prevention, robust localStorage reads, and a scoped clear-demo-data action.
- Keyboard-operable modal, mobile navigation, and carousel controls; reduced-motion support.
- Local image assets with fallback handling, lazy loading below the fold, and descriptive alt text.
- **Rescue Loop:** a local, deterministic Rescue Radar that applies hard area/category/capacity eligibility before ranking compatible sample NGOs. Its visible 100-point score is 45 area + 30 category + 15 capacity + 10 known storage condition; it is a prototype compatibility indicator, not AI or an acceptance probability.
- Rescue Passport, simulated journey timeline, browser-local Impact Ripple, and a separate “Experience a Food Rescue” seeded judge scenario. Demo data never overwrites donor records.
- Community Need Radar, Rescue Clock, and priority-first Smart Split recommendations with capacity and deadline safeguards.
- Editable proposed allocations, an Impact Canvas (up to 120 visual serving units), and a print-friendly Rescue Impact Story. These are planning tools only; they never indicate a completed collection or delivery.

## Demonstration limitations and safety

This is a frontend demonstration. Donations, contacts and interests remain in the current browser only. No real NGO is notified, no matching/logistics/pickup occurs, and organisations/stories/impact figures are illustrative.

The **Clear FoodBridge demo data** control removes only the isolated judge-demo donation and any interest records attached to it. It preserves user-created donation, volunteer, and partnership records. Legacy browser records are safely migrated once to the FoodBridge LocalStorage namespace without overwriting stable IDs or relationships.

FoodBridge does not independently certify food safety. Donors are responsible for accurate handling and storage information. Food must be assessed by the receiving organization before acceptance. The form intentionally does not present universal 4-hour or 24-hour rules as FSSAI requirements. FSSAI's [Surplus Food Regulations, 2019](https://www.fssai.gov.in/upload/uploadfiles/files/Gazette_Notification_Surplus_Food_06_08_2019.pdf) require surplus food to be safe for human consumption and stored hygienically at an optimum temperature; real deployment needs operating procedures and qualified local partners.

## Stack and structure

React 18, Vite 5, Tailwind CSS, Framer Motion, Lucide React, and Vitest.

- `src/forms`: form configuration and submission UI
- `src/hooks/useStorage.js`: FoodBridge-owned LocalStorage keys, legacy migration, and safe storage access
- `src/sections`: homepage sections and demonstration discovery UI
- `src/data/images.js`: locally served image metadata
- `public/images`: bundled photographs

## Install, develop, test, build

```bash
npm install
npm run dev
npm test
npm run build
npm run preview
```

## Photography

The bundled images are copies of the former Unsplash Source URLs used by the project, retained locally for deployment reliability. Before a commercial/public launch, review each image's source page and current [Unsplash License](https://unsplash.com/license), retain any desired attribution, and replace assets if the usage context requires it.

## GitHub and Vercel preparation

No repository, commits, deployment, or external account access is performed by this project. To publish: create a GitHub repository, commit this folder, and import it into Vercel. Select Vite, use `npm run build`, and publish `dist`. No environment variables are required.

## AI tools and prompting

The project was shaped with AI-assisted implementation using role framing, explicit design constraints, acceptance criteria, source verification, and a strict distinction between local simulation and production capabilities. A production version would add authenticated users, a verified NGO network, consent/privacy controls, audited food-safety SOPs, notifications, and logistics integrations.
