<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://nextjs.org/" target="blank">
    <img src="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png" width="120" alt="Next.js Logo" />
  </a>
</p>

```markdown
## Description

This project is a **unified fullstack application** that serves a **Next.js frontend** directly from a **NestJS backend** using Express. It simplifies deployment and development by eliminating CORS issues and serving everything through a single port.

---

## Project Setup

```bash
# Install backend and frontend dependencies
npm install
cd frontend
npm install
cd ..
```

---

## Development

```bash
# Start NestJS + serve Next.js frontend
npm run start:dev
```

- Open [http://localhost:3000](http://localhost:3000)
- NestJS will serve the Next.js app on the same port

---

## Production

```bash
# Build frontend
cd frontend
npm run build
cd ..

# Build backend
npm run build

# Serve production
npm run start:prod
```

---

## Testing

```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e

# Coverage
npm run test:cov
```

---

## Resources

- [NestJS Docs](https://docs.nestjs.com) — backend framework documentation  
- [Next.js Docs](https://nextjs.org/docs) — frontend rendering framework  
- [NestJS + Express adapter](https://docs.nestjs.com/faq/nest-application-context#use-express-with-nest) — for server integration  
- [Official Discord](https://discord.gg/G7Qnnhy) — community and help  
- [Devtools](https://devtools.nestjs.com) — visualize module graph for debugging  

---

## Deployment Options

This unified fullstack setup can be deployed like a regular Node.js server:

- Railway / Render / Heroku  
- Docker  
- VPS + PM2 + Nginx  
- AWS (via custom Node runtime or containers)

> Since NestJS serves both frontend and API, deployment is simplified to just one service.

---

## License

MIT License  
© [NestJS](https://nestjs.com) & contributors
```
