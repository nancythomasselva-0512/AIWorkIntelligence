import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api'); // Match the /api prefix used by frontend
  
  const port = process.env.PORT || 5000; // Frontend uses localhost:5000
  await app.listen(port);
  console.log(`Dynamic Work Intelligence API is running on port ${port}`);
}
bootstrap();
