---
doc: prd
status: approved
---

# London Blooms — Product Requirements

A website that predicts when cherry blossoms will bloom in London, built with a 4bit retro video game aesthetic.

Source: `scope.md > The Core Loop`, `scope.md > The Unique Kernel`

## The Core Journey

1. User opens the website and sees the homepage with an onboarding message beside an interactive map
2. User hovers over pins on the map → pin displays location name, blossom image, number of trees, and estimated bloom date
3. User stops hovering → pin information disappears
4. User clicks the navbar → navigates to the history page
5. User sees historical information about cherry blossoms in London (origins, diplomatic exchanges, species characteristics)

## Screens and Layout

### Homepage
- **Layout:** Split view with onboarding message on one side, interactive map on the other
- **Onboarding:** Short sentence describing the project
- **Map:** Displays London with pins at notable cherry blossom locations
- **Navbar/Toolbar:** Accessible link to navigate to the history page

### History Page
- **Layout:** Single page with static content
- **Content:** Information about the origin of cherry blossoms in London, fun facts (diplomatic exchanges, special characteristics of local species)
- **Source:** Information extracted from trustworthy websites like Wikipedia

## Look and Feel

- **Style:** 4bit retro, nostalgic old video game vibe
- **Interactive elements:**
  - Cherry blossom follows the cursor
  - Falling cherry blossoms animation in background
- **Error state:** 4bit lucky cat image saying "gomenasorry" when map or prediction data fails

## Features and Behavior

### Map and Location Display
What the user can do here, and what they see.

- As a tourist or local, I want to see notable cherry blossom locations on a map so I can plan my viewing trips
  - [ ] Acceptance criterion: Map displays London area with pins at notable cherry blossom locations
  - [ ] Acceptance criterion: Pins show location name, image of blossoms, number of trees, and estimated bloom date on hover
  - [ ] Acceptability criterion: Pin information disappears when hovering stops

### Prediction Display
What the user can do here, and what they see.

- As a tourist or local, I want to see the next season's prediction dates so I can time my visit
  - [ ] Acceptance criterion: Next season prediction with dates is displayed on the homepage

### History Page
What the user can do here, and what they see.

- As a tourist or local, I want to learn about cherry blossoms in London so I can appreciate the history
  - [ ] Acceptance criterion: History page displays information about the origin of cherry blossoms in London
  - [ ] Acceptance criterion: History page includes fun facts (diplomatic exchanges, special characteristics of local species)
  - [ ] Acceptance criterion: History page content is sourced from trustworthy websites

### Navigation
What the user can do here, and what they see.

- As a user, I want to navigate between the homepage and history page easily
  - [ ] Acceptance criterion: Navbar/toolbar on homepage provides access to history page

### Page Hit Counter
What the user can do here, and what they see.

- As a visitor, I want to see how many people have visited the site (with a lucky cat theme)
  - [ ] Acceptance criterion: Page hit counter is displayed with a lucky cat image

### Error Handling
What the user can do here, and what they see.

- As a user, I want clear feedback if something goes wrong
  - [ ] Acceptance criterion: If map or prediction data fails to load, a 4bit lucky cat image displays "gomenasorry"

## States and Boundaries

- **First use:** User opens site, sees onboarding message beside map with falling cherry blossoms animation
- **Normal use:** User interacts with map pins by hovering, navigates to history page
- **Hover state:** Pin information (name, image, tree count, estimated date) appears when hovering over a pin
- **Non-hover state:** Pin information disappears when hovering stops
- **Error state:** 4bit lucky cat image with "gomenasorry" message when map or prediction data fails to load
- **History page state:** Static content displaying historical information (no loading state expected)
- **Persistence:** Hit counter persists between sessions; no other data persistence required

## Product Decisions

- **4bit retro design chosen** — Creates nostalgic video game vibe that differentiates from typical nature websites
- **Hover-based pin interaction chosen** — Keeps interaction simple and intuitive without requiring clicks
- **Falling cherry blossoms animation** — Adds visual interest and thematic consistency
- **Cursor-following cherry blossom** — Interactive element that enhances the playful retro aesthetic
- **Lucky cat error state** — Consistent with 4bit aesthetic, provides friendly error messaging
- **Hit counter with lucky cat** — Adds charm and tracks visitor engagement

## What We're Building

Everything the proof of concept must do to be complete:
- Homepage with onboarding message beside interactive map
- Map pins showing location name, blossom image, tree count, and estimated date on hover
- History page with content about cherry blossom origins and fun facts
- Navbar for navigation between pages
- 4bit retro visual design with cursor-following cherry blossom
- Falling cherry blossoms background animation
- Page hit counter with lucky cat image
- Error state with lucky cat apologizing when data fails

## Deferred From the POC

Features this product implies but is not building now:
- **Real-time weather data integration** — Prediction would be more accurate with live weather data from meteorological agencies (currently using static predictions)
- **User account system** — For saving personal viewing preferences or revisiting predictions
- **Social sharing** — Allow users to share their predicted viewing locations
- **Customizable pin details** — Let users choose what information to display on pins

## Possible Later Enhancements

- Add live weather data integration for more accurate predictions
- Implement user accounts to save personal viewing preferences
- Add social sharing features for viewing locations
- Expand history page with more detailed information and sources
- Add seasonal notifications when blossoms are predicted to be in full bloom

## Non-Goals

Specific things this project will NOT do:
- **Real-time data integration** — Static predictions only for PoC; real weather data integration is deferred
- **User accounts** — No registration or login required
- **Social features** — No sharing or collaboration features
- **Mobile app** — Web-only interface
- **Advanced map features** — Only basic pin display and hover interaction
- **Customization** — No user-configurable settings

## Open Questions

- **Hit counter storage** — Will use browser-local storage or server-side? (Recommendation: server-side for accuracy, but local storage acceptable for PoC)
- **Image assets** — Will use placeholder images or require external sources for cherry blossom photos? (Recommendation: placeholder images for PoC)
- **Weather data source** — Which meteorological agency to use for predictions? (Recommendation: Met Office UK for London)
