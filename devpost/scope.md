---
doc: scope
status: approved
---

# London Blooms

A website that predicts when cherry blossoms will bloom in London.

## The Unique Kernel

London cherry blossom predictors don't exist — the capital isn't known for blooms other than to local residents, and this fills a gap for both tourists and locals.

## Who It's For

Tourists and locals who want to plan cherry blossom viewing in London. They're looking for a convenient way to know when and where to see the blossoms, rather than guessing or relying on word-of-mouth.

## The Core Loop

Open the site → see the next season's prediction dates → view London locations → interact with the map. They come back to check if predictions are accurate and plan their viewing trips.

## Inspiration & Identity

Borrowed from Japanese cherry blossom predictor websites that use historical weather data and current weather estimates from meteorological agencies to make predictions.

## Why This Matters to the Learner

You want to learn how to actually build a project with an AI assistant — moving from having the idea to creating something real.

## What "Working" Looks Like

The webpage loads up fine, an accurate prediction is shown, and the map displays London locations with the prediction information. Everything behaves as expected without crashes. The "oh, that's cool" moment is seeing the prediction appear alongside the map.

## The POC Boundary

**In:**
- Next season prediction with dates
- Locations in London (displayed)
- History page about cherry blossoms in London
- Map display using maplibre

**Out:**
- Dynamic graphics that change with proximity to the season (cut for now)

## Later

- Dynamic graphics that respond to season proximity
- Enhanced map features
- More historical data points

## Explicitly Cut

**Dynamic graphics that change with proximity to the cherry blossom season** — This is a nice-to-have feature but not essential for the core prediction experience. Cutting this allows us to focus on the fundamental prediction and map functionality within the 2–4 hour hackathon timeframe.
