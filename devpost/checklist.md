---
doc: checklist
status: approved
---
<!-- `status` is the progress state every skill reads. Write `draft` when you first save this file,
     and change it to `approved` when the learner clearly approves the displayed plan ("looks good" counts).
     Do not request a second sign-off. Never skip the draft save —
     an unsaved draft dies with the conversation. -->

<!-- Progress state for `5-build`. `5-build` reads this file to find the next
     unchecked slice, and rewrites it as it goes — ticking boxes and appending to
     Revisions. Every slice MUST carry the same fields in the same order so parsing
     stays reliable. `Learner check:` gives the learner a plain-language way to
     try the completed behavior in learn mode and at fast-mode checkpoints.
     Keep this checklist in Markdown only, regardless of Review Format.

     Internally, a slice is a thin end-to-end increment that makes a real part of the product
     usable, never a lone layer like "build the data model". Slice 1 includes project
     bootstrapping — scaffold, dependencies, config — as part of delivering its first
     real behavior. The examples below show the format; replace them entirely. -->

# Build Checklist

Build mode: fast

## Slices

- [x] **1. Project scaffold with prediction and London map**
  Becomes usable: A working React app that shows the predicted bloom date and a MapLibre map of London centered on the cherry blossom locations.
  Why now: Proves the core prediction and map work together on day one — the unique kernel is visible and interactive immediately.
  PRD ref: `prd.md > The Core Journey` (steps 1-2), `scope.md > What "Working" Looks Like`
  Spec ref: `spec.md > Components (App, Map, HitCounter)`, `spec.md > File Structure`, `spec.md > Data Sources (prediction.json, locations.json)`
  Build: Initialize Vite React project, install MapLibre GL JS, create `src/data/locations.json` from the CSV, wire up the App component to show prediction.json and the Map component with 12 pins.
  Verify (mechanical): `npm run dev` starts, homepage shows prediction date and a map with pins visible.
  Learner check: Open http://localhost:5173 and confirm you see the predicted bloom date and a map of London with pins.
  Commit: `Scaffold project with prediction and London map`

- [x] **2. Interactive pins with location info on hover**
  Becomes usable: Hovering over any map pin shows the location name, image, tree count, and bloom date.
  Why now: Turns the map from static to interactive — users can now discover each location's details.
  PRD ref: `prd.md > The Core Journey` (step 2), `scope.md > What "Working" Looks Like`
  Spec ref: `spec.md > Components > Map`, `spec.md > States and Error Handling > Hover state`, `spec.md > Data Sources > locations.json`
  Build: Use the MapLibre GeoJSON circle layer to render each location and show a popup with its blossom mark, name, tree count, and bloom date from locations.json on hover.
  Verify (mechanical): Run `npm run build`; confirm MapComponent wires pointer events and feature state to the matching location data.
  Learner check: Hover over a pin on the map and read the info that appears.
  Commit: `Add interactive pins with location info`

- [x] **3. History page with Royal Parks content**
  Becomes usable: A separate page showing historical facts about cherry blossoms in London.
  Why now: Completes the core journey — users can now explore not just the prediction and map, but also the history.
  PRD ref: `prd.md > The Core Journey` (step 3), `scope.md > What "Working" Looks Like`
  Spec ref: `spec.md > Components > History, Navbar`, `spec.md > Data Sources > history-content.json`, `spec.md > Pages and Navigation`
  Build: Store sourced, paraphrased Royal Parks facts in src/data/history-content.json and render them in the History page; retain the existing Navbar and state-based navigation.
  Verify (mechanical): Run `npm run build`; confirm the History page renders the data file and includes its source link.
  Learner check: Click the navbar and navigate to the History page; read the historical content.
  Commit: `Add History page with navigation`

- [x] **4. Falling cherry blossoms animation**
  Becomes usable: Cherry blossom particles fall from top to bottom across the map, adding atmosphere.
  Why now: Adds the classic game aesthetic the learner specifically requested for the visual feel.
  PRD ref: `prd.md > Look and Feel`, `spec.md > Cozy Classic Game Visual Design`
  Spec ref: `spec.md > Components > FallingBlossoms`, `spec.md > File Structure`
  Build: Create FallingBlossoms component with particle animation, integrate into homepage.
  Verify (mechanical): Open the app and confirm cherry blossom particles fall across the screen.
  Learner check: Watch the homepage and confirm cherry blossom animations appear.
  Commit: `Add falling cherry blossoms animation`

- [x] **5. Hit counter with lucky cat**
  Becomes usable: A visitor counter that increments each time you visit, displayed with a lucky cat image.
  Why now: Adds the interactive "lucky" element and tracks engagement as described in the spec.
  PRD ref: `prd.md > Look and Feel`, `spec.md > Components (HitCounter)`
  Spec ref: `spec.md > Components > HitCounter`, `spec.md > Decisions and Open Issues > Hit counter storage`
  Build: Create HitCounter component reading from localStorage, increment on page load, add lucky cat image.
  Verify (mechanical): Visit the page multiple times or refresh and confirm count increments.
  Learner check: Refresh the page a few times and confirm the visitor count goes up.
  Commit: `Add hit counter with lucky cat`

- [x] **6. Error handling with lucky cat fallback**
  Becomes usable: If the map or data fails to load, a friendly lucky cat appears instead of a crash.
  Why now: Provides graceful degradation as specified — the app never crashes, it just shows a friendly message.
  PRD ref: `prd.md > How This Works, In Plain Language` (step 5), `spec.md > States and Error Handling`
  Spec ref: `spec.md > Components > ErrorState`, `spec.md > States and Error Handling`
  Build: Keep the existing ErrorState and route failed/non-OK prediction responses and pre-load MapLibre errors into it; catch map setup and layer initialization failures.
  Verify (mechanical): Run `npm run build`; confirm the prediction response checks and MapLibre pre-load/error paths call the shared fallback.
  Learner check: Intentionally break something (like commenting out MapLibre) and see the lucky cat error message.
  Commit: `Add error handling with lucky cat fallback`

## Hands-on Checkpoints

<!-- Plan early feedback where it can shape the remaining build and a final review.
     Add an integrated core-journey checkpoint only if it offers distinct value.
     A single-slice build may cover early feedback and final review in one session;
     record that here rather than inventing separate passes or extra slices.
     At each planned checkpoint, the learner tries the app and gives feedback.
     Check a box only after the learner reports back and issues are resolved. -->

- [x] Early usable behavior explored — slice 1 (prediction + map)
- [ ] Final kick-the-tires exploration and feedback completed

## Final Review

<!-- Add agreed revision tasks as unchecked boxes here. Track findings and verification
     briefly so a fresh session can resume. No changes needed is a valid recorded result.
     Complete the box below only after all agreed revisions are verified, committed,
     retried by the learner, and they explicitly confirm readiness. -->

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

<!-- This heading is retained for routing compatibility. After final revisions,
     both modes get one 3–5 minute learning wrap-up, shorter if practice already happened.
     Guided code route by default for newcomers; a focused alternative for familiar
     plan-first users. Never require both. Record actual evidence, not claimed mastery.
     Keep personal reflection in the ignored profile, not this public record.
     Honor completed older code tours/maps; don't reopen them for new fields. -->

- [ ] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: [what actually happened; real document/test/code references; unfinished work if interrupted]
Route and stops: [actual paths and symbols; guided stops completed, or reference-only route]
Edit outcome: [tried/kept/reverted/declined/not applicable; verification if changed]
Reflection: [offered/answered/declined/already covered — personal answer belongs only in the ignored profile]
Activity mode: [live app and editor, explicit static fallback, focused alternative, prior practice, or recap]

## Revisions

<!-- Leave this section empty when you write the checklist — no placeholder bullet.
     `5-build` appends a bullet here when implementation contradicts an assumption
     in the plan, in the form:

       - [What changed] — [what the build discovered that made the original plan wrong].

     One bullet per revision, no dates. This is how plan adaptation gets recorded,
     and it replaces any separate log. -->

- Map pins use a single GeoJSON feature layer rather than separate DOM Pin components — the rendered map supports feature-state hover and keeps pins aligned as the map zooms.
- History content is kept in the specified local JSON file and paraphrased from the official Royal Parks source; the original embedded copy contained unsupported historical claims.
- Error handling now treats non-OK prediction responses and map setup/style-load failures as app errors so the planned fallback can appear.
- Live inspection showed the blossom animation received unitless CSS timing values and did not run; the component now supplies valid seconds and percentage units.
