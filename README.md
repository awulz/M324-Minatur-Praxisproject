# Swiss Weather App

[![CI](https://github.com/WandaMaxCH/M324-Minatur-Praxisproject/actions/workflows/ci.yml/badge.svg)](https://github.com/WandaMaxCH/M324-Minatur-Praxisproject/actions/workflows/ci.yml)

Interactive weather map application for Swiss cities with automated CI/CD pipeline.

## Tech Stack

- **Next.js 15** - App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Leaflet** - Interactive maps
- **react-leaflet** - React integration for Leaflet
- **Open-Meteo API** - Weather data and geocoding
- **lucide-react** - Weather icons
- **Jest** - Testing framework
- **React Testing Library** - Component testing
- **GitHub Actions** - CI/CD automation

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

### Interactive Map

- Leaflet map centered on Switzerland
- Click anywhere on the map to place a marker and fetch weather
- Smooth fly-to animation when selecting a city
- OpenStreetMap tiles for map rendering
- Dynamic import to avoid SSR issues

### City Search

- Search bar with autocomplete for Swiss cities
- Powered by Open-Meteo Geocoding API
- Debounced search (300ms) to reduce API calls
- Max 5 city suggestions displayed
- Click city to center map and fetch weather

### Weather Display

- **Current Weather Card**: Temperature, weather condition, humidity, wind speed
- **24-Hour Forecast**: Hourly temperature and weather icons
- **7-Day Forecast**: Daily min/max temperatures with weather conditions
- Weather data from Open-Meteo Forecast API (icon_ch model)
- Beautiful lucide-react weather icons
- Automatic fetch when location is selected

## Testing

Run tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm test:watch
```

## CI/CD Pipeline

### Continuous Integration

Every Pull Request automatically runs:
1. Install dependencies with npm ci
2. Run all tests
3. Build application

Configuration: `.github/workflows/ci.yml`

All PRs must pass these checks before merging to main.

### Continuous Deployment

Automatic deployment to Netlify on merge to main:
- Configured via `netlify.toml`
- Uses `@netlify/plugin-nextjs` for optimized Next.js builds
- Environment variables managed in Netlify dashboard

## Deployment

### Deploy to Netlify

1. **Connect Repository:**
   - Sign in to [Netlify](https://www.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository

2. **Configure Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - The `netlify.toml` file will automatically configure these

3. **Set Environment Variables:**
   - Go to Site configuration → Environment variables
   - Add: `NEXT_PUBLIC_APP_NAME` = `Swiss Weather App`

4. **Deploy:**
   - Click "Deploy site"
   - Every push to main will automatically deploy

### Environment Variables

Required environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_APP_NAME` | Application name displayed in footer | Swiss Weather App |

**Note:** Open-Meteo API requires no API keys.

## Project Structure

```
├── .github/
│   └── workflows/
│       └── ci.yml           # GitHub Actions CI workflow
├── app/
│   ├── components/
│   │   ├── Footer.tsx       # Footer with env variable
│   │   ├── Map.tsx          # Leaflet map component
│   │   ├── SearchBar.tsx    # City search with autocomplete
│   │   └── WeatherDisplay.tsx # Weather data display
│   ├── lib/
│   │   ├── geocoding.ts     # Geocoding API utilities
│   │   └── weather.ts       # Weather API utilities
│   ├── globals.css          # Tailwind CSS imports
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── page.test.tsx        # Home page tests
├── .env.local.example       # Example environment variables
├── jest.config.ts           # Jest configuration
├── jest.setup.ts            # Jest setup file
├── netlify.toml             # Netlify deployment config
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## Development Workflow

1. Create feature branch from main
2. Make changes and write tests
3. Push branch and create Pull Request
4. Wait for CI to pass (tests + build)
5. Merge to main after approval

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint

## APIs Used

- **Open-Meteo Forecast API** - Weather data (no API key required)
- **Open-Meteo Geocoding API** - Swiss city search (no API key required)

## License

M324 School Project - CI/CD Pipeline Implementation

## Credits

- Weather data: [Open-Meteo](https://open-meteo.com/)
- Map tiles: [OpenStreetMap](https://www.openstreetmap.org/)
- Icons: [Lucide React](https://lucide.dev/)
