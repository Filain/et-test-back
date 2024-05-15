import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {SwaggerHelper} from "./common/helpers/swagger.helper";
import {AppConfig, Config} from "./configs/config.type";
import {ConfigService} from "@nestjs/config";
import {Logger} from "@nestjs/common";

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
  const configService = app.get(ConfigService<Config>);
  const appConfig = configService.get<AppConfig>('app');
  await app.listen(appConfig.port, () => {
    Logger.log(`Server running  http://localhost:${appConfig.port}`);
    Logger.log(`Swagger running http://localhost:${appConfig.port}/docs`);
  });

}
bootstrap();
