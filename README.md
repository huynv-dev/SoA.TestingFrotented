# LDP Interview Project

This is a Next.js application built for the LDP interview process.

## Technical Requirements

- Node.js version: 20.12
- Package manager: npm/yarn/pnpm

## Installation

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

## Development

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev
```

## Production Build

```bash
# Using npm
npm run build
npm start

# Using yarn
yarn build
yarn start

# Using pnpm
pnpm build
pnpm start
```

## Docker Deployment

A Dockerfile is provided for containerized deployment. The image is configured for production use.

### Build the Docker image

```bash
docker build -t ldp-interview .
```

### Run the container

```bash
docker run -p 3000:3000 ldp-interview
```

The application will be available at `http://localhost:3000`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Add any required environment variables here
```

## Project Structure

```
├── app/                # Next.js 13 app directory
├── components/         # React components
├── lib/               # Utility functions and API
├── public/            # Static assets
└── types/             # TypeScript type definitions
```

## Features

- Server-side and Client-side rendering
- Language switching support via URL parameters
- Interactive map integration
- Responsive design
- TypeScript support
