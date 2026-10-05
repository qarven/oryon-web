# Oryon Web

Oryon Web is the web application for Oryon.

## Tech Stack

- React 19
- TypeScript
- Vite
- TanStack Router / Start
- Tailwind CSS
- shadcn/ui
- Bun
- ConnectRPC
- Paraglide JS for localization
- Biome / Ultracite for code quality

## Requirements

- [Bun](https://bun.sh/) installed
- Git
- Access to the repository submodules

## Getting Started

### 1. Clone the repository

Clone the repository with its submodules:

```bash
git clone --recurse-submodules git@github.com:qarven/oryon-web.git
cd oryon-web
```

If the repository was already cloned without its submodules:

```bash
git submodule update --init --recursive
```

### 2. Install dependencies

```bash
bun install
```

### 3. Configure environment variables

Copy the example environment file:

```bash
cp .env.example .env
```

Update the values in `.env` for your local environment. The example configuration includes the backend URL and Turnstile settings.

### 4. Start the development server

```bash
bun run dev
```

The Vite development server will start locally and print its URL in the terminal.

## Available Commands

| Command | Description |
| --- | --- |
| `bun run dev` | Start the development server |
| `bun run build` | Build the application for production |
| `bun run preview` | Preview the production build |
| `bun run ts` | Run the TypeScript compiler |
| `bun run fix` | Run the project's formatting/lint fixes |

## Docker / Podman

A `Dockerfile` is included for building a production image. Podman can be used with the Makefile targets:

```bash
make podman-build
make podman-run
```

The production container is exposed on port `3000`.

## Project Structure

```
.
├── messages/       # Localization messages
├── mono/           # Git submodule / generated shared code
├── public/         # Static assets
├── src/            # Application source
│   ├── app
│   │   ├── middlewares
│   │   └── providers
│   ├── components
│   │   ├── form
│   │   ├── logos
│   │   └── ui
│   ├── features
│   │   ├── auth
│   │   │   ├── application
│   │   │   │   ├── ports
│   │   │   │   └── use-cases
│   │   │   ├── domain
│   │   │   │   ├── mappers
│   │   │   │   └── types
│   │   │   ├── infrastructure
│   │   │   │   ├── cookies
│   │   │   │   ├── data
│   │   │   │   ├── middlewares
│   │   │   │   └── servers
│   │   │   └── presentation
│   │   │       ├── components
│   │   │       ├── hooks
│   │   │       └── models
│   │   └── ...
│   ├── lib
│   │   ├── clients
│   │   ├── hooks
│   │   ├── paraglide
│   │   │   └── messages
│   │   └── utils
│   └── routes
├── features
├── project.inlang/ # Localization configuration
├── .env.example    # Environment variable template
├── Dockerfile      # Production container definition
├── Makefile        # Development and container helpers
└── vite.config.ts  # Vite configuration
```

## Development

Before opening a pull request, run the relevant checks locally:

```bash
bun run ts
bun run build
bun run fix
```

Keep changes focused and follow the existing project conventions.
