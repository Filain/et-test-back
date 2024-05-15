import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {SwaggerHelper} from "./common/helpers/swagger.helper";
import {AppConfig, Config} from "./configs/config.type";
import {ConfigService} from "@nestjs/config";
import { Logger, ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/exeptions/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle('ET-test')
      .setDescription('by Volodymyr Fylypiv')
      .setVersion('1.0')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerHelper.setDefaultResponses(document);
  SwaggerModule.setup('docs', app, document,{
    swaggerOptions: {
      docExpansion: 'list',
      defaultModelsExpandDepth: 3,
      persistAuthorization: true,
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, //- цей параметр вказує, що дані будуть автоматично перетворюватись до відповідного типу.
      forbidNonWhitelisted: true, //- вказує, що будь-які поля, які не вказані в схемі (білому списку), будуть заборонені.
      whitelist: true, // -- вказує, що будь-які поля, які не вказані в схемі (білому списку), будуть відфільтровані та видалені.
    }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter());


  const configService = app.get(ConfigService<Config>);
  const appConfig = configService.get<AppConfig>('app');
  await app.listen(appConfig.port, () => {
    Logger.log(`Server running  http://localhost:${appConfig.port}`);
    Logger.log(`Swagger running http://localhost:${appConfig.port}/docs`);
  });

}
bootstrap();
