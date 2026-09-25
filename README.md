# GDGoC Bowen Events Hub

A small events app for GDGoC Bowen University: browse events, search and filter them, and RSVP.

**Live demo:** [https://vercel.com/okunade-victors-projects/gdgoc-events-hub]

![Screenshot of the events page](./screenshot.png)

## Features

- Event list with loading skeletons, an error state with retry, and an empty state
- Search and category filter, stored in the URL so filtered views can be shared and survive a refresh
- Event details page with an RSVP form (name, email, level, track)
- Inline validation, duplicate-RSVP protection, and a confirmation message
- Going count that updates after RSVPing
- My RSVPs page, saved in the browser's localStorage
- Light and dark themes with the choice remembered
- Responsive from 360px up; keyboard accessible

## Tech stack

React, JavaScript, Vite, Tailwind CSS, React Router, Vitest

## Run locally

```bash
npm install
npm run dev
npm test
```

Add `?fail=1` to the URL to see the error state.

## Project structure

```
src/
  components/   reusable UI (cards, form, filters, states) and ui/ primitives
  context/      events state: loading status, RSVPs
  hooks/        useEvents, useTheme
  lib/          pure helpers: filtering, validation, formatting, storage
  pages/        one component per route
  services/     mock API (simulated network delay and failure)
  data/         events.json
```

## Decisions

- **Mock API layer:** `fetchEvents()` returns a promise after a short delay, so loading and error states are real and the app can move to a real backend by changing one file.
- **Filters in the URL:** search and category are read from the URL and the visible list is derived on each render, so there's no extra state to keep in sync.
- **Pure logic in `lib/`:** validation and filtering are plain functions with unit tests.
- **Details as a page, not a modal:** every event has its own link, and it's easier to use on mobile and with a keyboard.
- **Native selects:** the built-in dropdowns are fully accessible and work well on phones.
- **Tailwind class names written in full:** so the build can always detect them.

## Assumptions and limitations

- There's no backend, so RSVPs and the "going" counts added by RSVPs exist only in the browser where they were made.
- The starting "going" numbers are mock data.
- Duplicate protection checks the email per event, within this browser only.

## What I'd improve with more time

- A real backend and database, with email confirmation for RSVPs
- Authentication so "My RSVPs" follows a user across devices
- Cancel RSVP, capacity limits, and add-to-calendar
- End-to-end tests and component tests
- Pagination or infinite scroll for a larger event list