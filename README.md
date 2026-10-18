# London Blooms 🌸

A React application that predicts when cherry blossoms will bloom in London with a 4bit retro video game aesthetic.

## Features

- **Prediction Display**: Shows the next season's predicted bloom date based on historical weather data
- **Interactive Map**: Displays London cherry blossom locations
- **Hover Pins**: Map pins show location details on hover
- **History Page**: Information about cherry blossoms in London's history
- **4bit Retro Design**: Pixel-art aesthetic with falling cherry blossoms animation
- **Cursor Following Blossom**: Interactive cherry blossom that follows your mouse
- **Hit Counter**: Tracks visitor count with lucky cat theme
- **Error Handling**: Friendly "gomenasorry" message with 4bit lucky cat

## Tech Stack

- React 18
- Vite
- React Router

## Current Status

✅ **Build Complete!**

The application is running at: http://localhost:3000

## Key Features Implemented

1. **Prediction Algorithm** (from `a.js`):
   - Analyzes 3 years of historical weather data (2022-2024)
   - Identifies bloom patterns based on temperature thresholds
   - Predicts next season's bloom: April 8, 2027

2. **Components Created**:
   - LandingPage with prediction display
   - History page with London cherry blossom information
   - Map placeholder (ready for MapLibre/Leaflet integration)
   - Falling blossoms background animation
   - Cursor-following cherry blossom
   - Hit counter with lucky cat

3. **Design**:
   - 4bit retro video game aesthetic
   - Pixel-art inspired UI
   - Terminal-style headers
   - Scanline effects

## File Structure

```
london-blooms/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── LandingPage.jsx
│   │   ├── HistoryPage.jsx
│   │   ├── Map.jsx
│   │   ├── PredictionCard.jsx
│   │   ├── FallingBlossoms.jsx
│   │   ├── CursorBlossom.jsx
│   │   ├── HitCounter.jsx
│   │   ├── LocationPin.jsx
│   │   └── ErrorState.jsx
│   ├── data/
│   │   └── locations.js
│   ├── prediction.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Next Steps

### To Continue Development:

1. **Integrate Real Map**: Replace placeholder with MapLibre or Leaflet
   ```javascript
   import MapLibre from 'maplibre-gl';
   ```

2. **Add Live Weather API**: Connect to Met Office UK for real-time predictions

3. **Enhance Animations**: Add more 4bit-style visual effects

4. **Deploy**: Build and deploy to a hosting service (Netlify, Vercel, etc.)

### For Hackathon Submission (6-ship):

- Create demo video showing the app in action
- Write Devpost submission with screenshots
- Document the learning journey
- Prepare presentation of the unique kernel and core loop

## Algorithm Summary

The prediction algorithm (`prediction.js`) uses:
- **Average bloom day**: March 8th (±3.7 day standard deviation)
- **Temperature thresholds**: Max ≥12°C, Min ≥5°C
- **95% confidence interval**: Days 1-15 of the month
- **Next prediction**: April 8, 2027 (179 days from reference date)

