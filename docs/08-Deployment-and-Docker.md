# 08 — Dockerization and Deployment Notes

## Docker Support
The project includes:
- `Dockerfile`
- `docker-compose.yml`
- `nginx.conf`

## Build and Run
```bash
docker compose up --build
```

## Expected Behavior
- Frontend is built with Vite
- Static assets are served via Nginx
- Containerized app runs in a reproducible environment
