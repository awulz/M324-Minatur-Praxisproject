# Swiss Weather App

Interactive weather map application for Swiss cities with automated CI/CD pipeline.

## Tech Stack

- **Next.js 15** - App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
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

## Project Structure

```
├── .github/
│   └── workflows/
│       └── ci.yml           # GitHub Actions CI workflow
├── app/
│   ├── globals.css          # Tailwind CSS imports
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── page.test.tsx        # Home page tests
├── jest.config.ts           # Jest configuration
├── jest.setup.ts            # Jest setup file
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
