import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
const express = require('express');
const next = require('next');
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const server = express();

  const dev = process.env.NODE_ENV !== 'production';
  const nextApp = next({ dev, dir: join(__dirname, '..', 'frontend') });
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
