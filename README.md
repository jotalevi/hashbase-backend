# HashBase Backend

This is the backend service for **HashBase**, a modern torrent indexing platform. It is built with [NestJS](https://nestjs.com/), [PostgreSQL](https://www.postgresql.org/), and [MeiliSearch](https://www.meilisearch.com/), and is fully containerized with Docker.

## Features

- Add torrents via magnet links
- Automatic metadata extraction from `.torrent` files
- MeiliSearch indexing for fast and powerful search
- Auto-tagging based on file extensions, size, and trackers
- Report system with rate limiting
- Global validation and health checks
- Built-in Postman collection for API testing

## Getting Started

### Clone the repository

```bash
git clone https://github.com/jotalevi/hashbase-backend.git
cd hashbase-backend
```

### Environment Configuration

This project includes a default `.env` file in the root directory. **If you plan to expose this service publicly, make sure to change the credentials.**

`.env` file: [./.env](./.env)

```env
# App
PORT=3000                      # Port the app will run on

# Database
DB_HOST=db                    # Docker service name for PostgreSQL
DB_PORT=5432                  # PostgreSQL default port
DB_USERNAME=postgres          # Change this in production!
DB_PASSWORD=postgres          # Change this in production!
DB_NAME=hashbase              # Name of the database

# Meilisearch
MEILI_HOST=http://meilisearch:7700  # MeiliSearch host for indexing
```

### Running with Docker

```bash
npm run docker
```

This will spin up the app, database, and MeiliSearch using Docker Compose.

## Postman Collection

You can test the API using the included Postman collection:

📄 **[HashBase.postman.json](./HashBase.postman.json)**

Import it into Postman to explore available routes, including:
- `POST /torrent`
- `GET /torrent/search`
- `POST /report`
- `GET /health`

## License

MIT
