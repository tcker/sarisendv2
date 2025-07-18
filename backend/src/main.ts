import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Sarisend API')
    .setDescription('API for QR-based crypto payments')
    .setVersion('1.0')
    .addTag('sarisend')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const PORT = parseInt(process.env.PORT || '2000', 10);
  await app.listen(PORT, () => {
    console.log(`✅ Listening on http://localhost:${PORT}`);
    console.log(`📚 Swagger available at http://localhost:${PORT}/docs`);
  });
}
bootstrap();