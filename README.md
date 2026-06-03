# Dynamic Work Intelligence Platform

Enterprise-grade AI-powered SaaS for IT Administrators and Innovation Consultants.

## Tech Stack
- **Frontend**: Next.js (React), Tailwind CSS, TypeScript
- **Backend**: NestJS (Node.js), TypeScript
- **Database**: PostgreSQL
- **Caching & Queues**: Redis
- **Search & AI Retrieval**: ElasticSearch

## How to Run

1. Make sure you have Docker and Docker Compose installed.
2. Run the following command to build and start the entire platform:

```bash
docker-compose up -d --build
```

3. The services will be available at:
   - Frontend (Optibiz UI): `http://localhost:3000`
   - Backend API: `http://localhost:3001`
   - PostgreSQL DB: `localhost:5432`
   - Redis: `localhost:6379`
   - ElasticSearch: `localhost:9200`
