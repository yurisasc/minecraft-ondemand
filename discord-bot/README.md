## Installation
Install dependencies

```sh
npm install
```

Create environment variable files `.env` and `.env.dev` based on [.env.example](./.env.example) on project root folder

```bash
# linux / macOS
cp .env.example .env
cp .env.example .env.dev
```

```bash
# windows
copy .env.example .env
copy .env.example .env.dev
```

## Running on production environment

### With Docker

> ⚠ Remember to follow the [Installation](#Installation) steps before proceeding

```bash
docker build -t your-app-name .
docker run -it --rm -e DISCORD_TOKEN="YOUR TOKEN HERE" --name your-app-name your-app-name
```

### Without Docker

> ⚠ Remember to follow the [Installation](#Installation) steps before proceeding

Startup bot

```bash
npm start # or cross-env NODE_ENV=production env-cmd -f .env node ./dist/index.js
```

> ⚠ Note that the loaded environment variables file is `.env`
