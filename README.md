# Hashbase Backend

Hashbase is a modern torrent indexing backend built with **NestJS**, **PostgreSQL**, **Meilisearch**, and **Docker**. It supports advanced features like magnet link parsing, auto-tagging, report tracking, and full-text search.

---

## 🚀 Features

- Submit torrents via magnet links
- Auto-tagging by file extension, size, and trackers
- Meilisearch-powered full-text search with pagination and freshness ranking
- Report system with abuse prevention (rate-limited)
- Global validation pipeline for input safety
- Health check endpoint (`/health`)
- Fully dockerized with PostgreSQL and Meilisearch

---

## 📦 Stack

- **Backend**: [NestJS](https://nestjs.com/)
- **Database**: PostgreSQL
- **Search Engine**: Meilisearch
- **ORM**: TypeORM
- **Containerization**: Docker + Docker Compose

---

## 🧑‍💻 Development

### Prerequisites

- Node.js v20+
- Docker & Docker Compose

### Clone the repo

```bash
git clone https://github.com/your-org/hashbase-backend.git
cd hashbase-backend
```

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run start:dev
```

### Run with Docker

```bash
npm run docker
```

This will spin up the full stack with PostgreSQL and Meilisearch.

---

## 🧪 Testing

```bash
npm run test
```

---

## 📌 Environment Variables

Copy `.env.example` to `.env` and configure the following:

```
DATABASE_URL=postgres://postgres:postgres@localhost:5432/hashbase
MEILISEARCH_HOST=http://localhost:7700
MEILISEARCH_API_KEY=masterKey
```

---

## 🔍 Search Index

The `torrents` Meilisearch index is automatically created and seeded on app startup. It supports ranking by:

- `_score`
- `updatedAt`
- `createdAt`

---

## 🏥 Healthcheck

- `GET /health` returns:

```json
{
  "status": "ok",
  "db": "connected",
  "search": "available"
}
```

---

## 📄 License

MIT License