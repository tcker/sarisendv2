import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join, resolve } from 'path';
import { existsSync } from 'fs';
const express = require('express');
const next = require('next');
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const server = express();
  const dev = process.env.NODE_ENV !== 'production';

  const possiblePaths = [
    resolve(__dirname, '..', 'frontend'),
    resolve(__dirname, '..', '..', 'frontend'),
  ];

  const frontendDir = possiblePaths.find(p =>
    existsSync(join(p, 'pages')) ||
    existsSync(join(p, 'app')) ||
    existsSync(join(p, 'src', 'app'))
  );

  if (!frontendDir) {
    throw new Error("❌ Couldn't find a valid `pages`, `app`, or `src/app` directory inside any frontend folder.");
  }

  const nextApp = next({ dev, dir: frontendDir });
  const handle = nextApp.getRequestHandler();

  await nextApp.prepare();

  server.use((req, res, nextFn) => {
    handle(req, res).catch(err => {
      console.error('Next.js routing error:', err);
      res.status(500).end('Internal Server Error');
    });
  });

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.listen(3000);
}
bootstrap();
