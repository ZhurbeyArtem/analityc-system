import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', 
    credentials: true, 
  });
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  await app.listen(port, () => console.log(`app started on ${port} port`));
}
bootstrap();
